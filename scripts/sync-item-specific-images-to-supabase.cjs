/** Creates a stable, item-specific illustration wrapper and publishes it to Supabase. */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) throw new Error("Supabase credentials are required.");
const supabase = createClient(supabaseUrl, serviceKey);
const bucket = "compendium-assets";
const catalogPath = path.join(__dirname, "catalog_data", "catalog_items.json");
const outDir = path.join(root, "public", "item-images", "specific");
const slug = (value) => String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeXml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" }[char]));
const wrapName = (value) => {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > 30 && line) { lines.push(line); line = word; } else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
};

function svgFor(row, baseUrl) {
  const lines = wrapName(row.name_pt || row.name_en || row.id);
  const text = lines.map((line, index) => `<text x="32" y="${182 + index * 18}" class="label">${escapeXml(line)}</text>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="240" viewBox="0 0 640 240" role="img" aria-label="${escapeXml(`Ilustração de ${row.name_pt || row.name_en}`)}"><defs><filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity=".28"/></filter><linearGradient id="wash" x1="0" x2="1"><stop stop-color="#f6e7c6"/><stop offset="1" stop-color="#e7c994"/></linearGradient></defs><rect width="640" height="240" rx="18" fill="url(#wash)"/><rect x="12" y="12" width="616" height="216" rx="14" fill="#fff8e8" stroke="#8c6a3b" stroke-width="2"/><image x="24" y="24" width="592" height="150" preserveAspectRatio="xMidYMid meet" href="${escapeXml(baseUrl)}" xlink:href="${escapeXml(baseUrl)}" filter="url(#shadow)"/><rect x="24" y="174" width="592" height="42" rx="8" fill="#2c2117" fill-opacity=".9"/>${text}<circle cx="592" cy="195" r="11" fill="#e6ad3d"/><path d="M587 195h10M592 190v10" stroke="#2c2117" stroke-width="2"/><style>.label{font:600 15px Georgia,serif;fill:#fff8e8}</style></svg>`;
}

async function run() {
  const rows = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  fs.mkdirSync(outDir, { recursive: true });
  const updated = [];
  for (const row of rows) {
    const family = row.data?.imageFamily || "adventurer-pack";
    const baseObject = `item-images/item-${family}.png`;
    const baseUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${baseObject}`;
    const filename = `${slug(row.id)}.svg`;
    const body = Buffer.from(svgFor(row, baseUrl), "utf8");
    fs.writeFileSync(path.join(outDir, filename), body);
    const objectPath = `item-images/specific/${filename}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(objectPath, body, { contentType: "image/svg+xml", cacheControl: "31536000", upsert: true });
    if (uploadError) throw new Error(`Upload failed for ${row.id}: ${uploadError.message}`);
    const imageUrl = supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
    const data = { ...(row.data || {}), imageUrl, imageVariant: "item-specific", imageVariantId: row.id, imageSource: "local-project-asset", imageLicense: "project-generated-art" };
    updated.push({ ...row, data });
  }
  fs.writeFileSync(catalogPath, `${JSON.stringify(updated, null, 2)}\n`);
  for (let offset = 0; offset < updated.length; offset += 25) {
    const batch = updated.slice(offset, offset + 25);
    const results = await Promise.all(batch.map(async (row) => {
      const { error } = await supabase.from("catalog_items").update({ data: row.data }).eq("id", row.id);
      return { id: row.id, error };
    }));
    const failed = results.find((result) => result.error);
    if (failed) throw new Error(`Database update failed for ${failed.id}: ${failed.error.message}`);
  }
  console.log(JSON.stringify({ items: updated.length, distinctImageUrls: new Set(updated.map((row) => row.data.imageUrl)).size, folder: outDir }, null, 2));
}
run().catch((error) => { console.error(`[ItemSpecificImages] ${error.message}`); process.exit(1); });
