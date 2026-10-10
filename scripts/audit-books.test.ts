import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { afterEach, describe, expect, it } from "vitest";

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("auditoria do corpus de livros", () => {
  it("informa texto TXT pareado útil sem confundi-lo com detecção de páginas escaneadas", async () => {
    const directory = mkdtempSync(path.join(os.tmpdir(), "pathbuilder-books-audit-"));
    temporaryDirectories.push(directory);
    mkdirSync(path.join(directory, "Pathfinder"));

    const pdf = await PDFDocument.create();
    pdf.addPage();
    writeFileSync(path.join(directory, "Pathfinder", "Com Texto.pdf"), await pdf.save());
    writeFileSync(path.join(directory, "Pathfinder", "Com Texto.txt"), "Conteúdo extraído. ".repeat(60));
    writeFileSync(path.join(directory, "Pathfinder", "Sem Texto.pdf"), await pdf.save());

    const result = spawnSync(
      process.execPath,
      ["scripts/audit-books.cjs", directory],
      { cwd: process.cwd(), encoding: "utf8", windowsHide: true },
    );

    expect(result.status, result.stderr).toBe(0);
    const report = JSON.parse(result.stdout.slice(result.stdout.indexOf("{"))) as {
      pairedText: number;
      missingText: string[];
      books: Array<{ pdf: string; pairedTextUsable: boolean; textCharacters: number; scannedText?: boolean }>;
    };
    const withText = report.books.find((book) => book.pdf.endsWith("Com Texto.pdf"));
    const withoutText = report.books.find((book) => book.pdf.endsWith("Sem Texto.pdf"));

    expect(report.pairedText).toBe(1);
    expect(report.missingText).toEqual([path.join("Pathfinder", "Sem Texto.pdf")]);
    expect(withText).toMatchObject({ pairedTextUsable: true, textCharacters: 1140 });
    expect(withoutText).toMatchObject({ pairedTextUsable: false, textCharacters: 0 });
    expect(report.books.every((book) => !("scannedText" in book))).toBe(true);
  });
});
