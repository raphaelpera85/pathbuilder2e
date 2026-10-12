const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { PDFDocument } = require("pdf-lib");

const positionalArgs = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
const writeInventory = process.argv.includes("--write-inventory");
const configuredBooksDir = positionalArgs[0] || process.env.LIVROS_PATH;
const defaultBooksDirs = [
  "I:\\Meu Drive\\Livros RPG",
  "I:\\Meu Drive\\Livros\\Livros RPG",
  "D:\\Users\\rapha\\Documents\\Projetos\\RPG\\livros",
  "D:\\Users\\rapha\\Documents\\Projetos\\RPG\\Livros RPG",
];
const booksDir = path.resolve(
  configuredBooksDir
    || defaultBooksDirs.find((candidate) => fs.existsSync(candidate))
    || defaultBooksDirs[0]
);
if (!fs.existsSync(booksDir)) {
  console.warn(`[AVISO] Pasta de livros não encontrada em: ${booksDir}. Verifique a variável LIVROS_PATH.`);
  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    directory: booksDir,
    status: "skipped_missing_directory",
    bookPdfs: 0,
    readablePdfs: 0
  }, null, 2));
  process.exitCode = 1;
} else {
const excluded = /ficha|poster|map|folio|raw|test/i;
  const pdfInfoPath = process.env.PDFINFO_PATH || "pdfinfo";
  function readPdfMetadata(pdfPath) {
    const result = spawnSync(pdfInfoPath, [pdfPath], { encoding: "utf8", windowsHide: true });
    if (result.error || result.status !== 0) return null;
    const pages = Number(result.stdout.match(/^Pages:\s+(\d+)/m)?.[1]);
    return Number.isInteger(pages) && pages > 0 ? { pages, pdfReadable: true } : null;
  }
  function collectFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(fullPath);
      return [{ ...entry, fullPath, relativePath: path.relative(booksDir, fullPath) }];
    });
  }
  const files = collectFiles(booksDir);
  const pdfs = files.filter((entry) => entry.name.toLowerCase().endsWith(".pdf")
    && !/[\\/]Mapas[\\/]/i.test(entry.relativePath)
    && !excluded.test(entry.name));
  const excludedMapAssets = files.filter((entry) => entry.name.toLowerCase().endsWith(".pdf") && /[\\/]Mapas[\\/]/i.test(entry.relativePath));
  const reports = pdfs.map((entry) => {
    const base = entry.name.replace(/\.pdf$/i, "");
    const directory = path.dirname(entry.relativePath);
    const textEntry = files.find((candidate) => candidate.name.toLowerCase() === `${base.toLowerCase()}.txt` && path.dirname(candidate.relativePath) === directory);
    const textPath = textEntry?.fullPath || null;
    const characters = textPath ? fs.readFileSync(textPath, "utf8").length : 0;
    return { pdf: entry.relativePath, pdfPath: entry.fullPath, text: textEntry?.relativePath || null, textCharacters: characters, pairedTextUsable: characters > 1000 };
  });
  async function auditReport(report) {
    try {
      const pdfPath = report.pdfPath;
      const fileSize = fs.statSync(pdfPath).size;
      report.bytes = fileSize;
      // pdf-lib limita a leitura a 2 GiB; arquivos maiores continuam sendo
      // inventariados, mas não devem ser classificados como PDFs inválidos.
      if (fileSize > 2 * 1024 ** 3) {
        const metadata = readPdfMetadata(pdfPath);
        report.pages = metadata?.pages ?? null;
        report.pdfReadable = metadata?.pdfReadable ?? null;
        report.pdfTooLargeForParser = true;
        return;
      }
      const bytes = fs.readFileSync(pdfPath);
      const document = await PDFDocument.load(bytes, { ignoreEncryption: true, throwOnInvalidObject: false });
      report.pages = document.getPageCount();
      report.pdfReadable = report.pages > 0;
    } catch (error) {
      report.bytes = 0;
      report.pages = 0;
      report.pdfReadable = false;
      report.pdfError = error instanceof Error ? error.message : String(error);
    }
  }
  async function auditReportsWithLimit(limit) {
    let nextIndex = 0;
    const workerCount = Math.min(limit, reports.length);
    await Promise.all(Array.from({ length: workerCount }, async () => {
      while (nextIndex < reports.length) {
        const report = reports[nextIndex++];
        await auditReport(report);
      }
    }));
  }
  auditReportsWithLimit(2).then(() => {
    const missingText = reports.filter((report) => !report.text || !report.pairedTextUsable);
    const invalidPdf = reports.filter((report) => report.pdfReadable === false);
    const result = {
      generatedAt: new Date().toISOString(),
      directory: booksDir,
      bookPdfs: reports.length,
      readablePdfs: reports.filter((report) => report.pdfReadable).length,
      excludedMapAssetPdfs: excludedMapAssets.length,
      tooLargeForParser: reports.filter((report) => report.pdfTooLargeForParser).map((report) => report.pdf),
      pairedText: reports.filter((report) => report.pairedTextUsable).length,
      missingText: missingText.map((report) => report.pdf),
      invalidPdf: invalidPdf.map((report) => ({ pdf: report.pdf, error: report.pdfError })),
      books: reports,
    };
    if (writeInventory) {
      const systemByFolder = {
        "D&D 3.5": "dnd35",
        "D&D 5E": "dnd5e",
        "Tormenta 20": "t20",
        "Old school Essentials": "ose",
      };
      const manualBookOverrides = {
        "Pathfinder/Livros/LIVRO - Pathfinder - Guia de Ancestralidades - Vários autores.pdf": {
          systemId: "pf2e", ruleset: "legacy", title: "Pathfinder 2e: Presságios Perdidos — Guia de Ancestralidades", evidence: "cover_page",
        },
      };
      const inventory = {
        schemaVersion: 1,
        provenance: "Inventário gerado por audit-books a partir dos PDFs legíveis; sistema/edição são preenchidos somente quando identificáveis pelo diretório ou título. Não representa curadoria do conteúdo interno.",
        auditedDirectory: path.basename(booksDir),
        sourceBookCount: reports.length,
        readablePdfCount: result.readablePdfs,
        pairedTextCount: result.pairedText,
        books: reports.map((report) => {
          const sourcePath = report.pdf.replace(/\\/g, "/").normalize("NFC");
          const filenameTitle = path.basename(report.pdf, path.extname(report.pdf));
          const override = manualBookOverrides[sourcePath];
          const title = override?.title ?? filenameTitle;
          const firstFolder = report.pdf.split(/[\\/]/)[0];
          const editionText = `${firstFolder} ${title}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[–—_-]+/g, " ").replace(/\s+/g, " ");
          const pathfinderEdition = /(?:pathfinder\s*2(?:e|a|nd)?|\bpf\s*2(?:e)?\b|segunda edicao)/i.test(editionText)
            ? "pf2e"
            : /(?:pathfinder\s*(?:rpg|1(?:e|a|st)?|first edition)|\bpf\s*1(?:e)?\b)/i.test(editionText)
              ? "pf1e"
              : null;
          const systemId = override?.systemId ?? (firstFolder === "Pathfinder" ? pathfinderEdition : systemByFolder[firstFolder] ?? null);
          const systemCandidates = firstFolder === "Pathfinder" && !pathfinderEdition && !override ? ["pf1e", "pf2e"] : systemId ? [systemId] : [];
          const explicitEdition = /remaster|2024|revised/i.test(editionText);
          const ruleset = override?.ruleset ?? (systemId === "dnd35" ? "v35"
            : systemId === "pf1e" ? "legacy_pf1"
              : systemId === "pf2e" ? (explicitEdition ? "remaster" : "legacy")
                : systemId === "dnd5e" && explicitEdition ? "2024"
                  : systemId === "t20" && /jogo do ano/i.test(editionText) ? "jogo_do_ano"
                    : systemId === "ose" && /advanced|avancad/i.test(editionText) ? "advanced"
                      : null);
          return {
            id: sourcePath,
            title,
            sourcePath,
            pageCount: report.pages,
            pdfReadable: report.pdfReadable,
            systemId,
            systemCandidates,
            ruleset,
            rulesetEvidence: ruleset ? (override?.evidence ?? (systemId === "dnd35" || systemId === "pf1e" ? "system_folder" : "explicit_title")) : null,
            curationStatus: "inventory_only",
            contentIndexStatus: "pending_manual_review",
            pairedTextUsable: report.pairedTextUsable,
          };
        }),
      };
      const inventoryPath = path.join(__dirname, "..", "src", "data", "knowledge-graph", "book-inventory.json");
      fs.writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
      console.error(`Inventário de fontes gravado em ${path.relative(path.join(__dirname, ".."), inventoryPath)}.`);
    }
    console.log(JSON.stringify(result, null, 2));
    if (process.argv.includes("--strict") && (missingText.length || invalidPdf.length)) process.exitCode = 1;
  });
}
