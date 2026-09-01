const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { PDFDocument } = require("pdf-lib");

const positionalArgs = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
const booksDir = path.resolve(positionalArgs[0] || "D:\\Users\\rapha\\Documents\\Projetos\\RPG\\livros");
if (!fs.existsSync(booksDir)) {
  console.error(`Pasta de livros não encontrada: ${booksDir}`);
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
  const files = fs.readdirSync(booksDir, { withFileTypes: true }).filter((entry) => entry.isFile());
  const pdfs = files.filter((entry) => entry.name.toLowerCase().endsWith(".pdf") && !excluded.test(entry.name));
  const reports = pdfs.map((entry) => {
    const base = entry.name.replace(/\.pdf$/i, "");
    const textEntry = files.find((candidate) => candidate.name.toLowerCase() === `${base.toLowerCase()}.txt`);
    const textPath = textEntry ? path.join(booksDir, textEntry.name) : null;
    const characters = textPath ? fs.readFileSync(textPath, "utf8").length : 0;
    return { pdf: entry.name, text: textEntry?.name || null, textCharacters: characters, scannedText: characters > 1000 };
  });
  Promise.all(reports.map(async (report) => {
    try {
      const pdfPath = path.join(booksDir, report.pdf);
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
  })).then(() => {
    const missingText = reports.filter((report) => !report.text || !report.scannedText);
    const invalidPdf = reports.filter((report) => report.pdfReadable === false);
    const result = {
      generatedAt: new Date().toISOString(),
      directory: booksDir,
      bookPdfs: reports.length,
      readablePdfs: reports.filter((report) => report.pdfReadable).length,
      tooLargeForParser: reports.filter((report) => report.pdfTooLargeForParser).map((report) => report.pdf),
      pairedText: reports.filter((report) => report.scannedText).length,
      missingText: missingText.map((report) => report.pdf),
      invalidPdf: invalidPdf.map((report) => ({ pdf: report.pdf, error: report.pdfError })),
      books: reports,
    };
    console.log(JSON.stringify(result, null, 2));
    if (process.argv.includes("--strict") && (missingText.length || invalidPdf.length)) process.exitCode = 1;
  });
}
