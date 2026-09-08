const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) { const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/); if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, ""); }
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data: remote, error } = await supabase.from("catalog_items").select("id,name_pt,data").order("id");
  if (error) throw error;
  const rows = remote || [];
  const urls = [...new Set(rows.map((row) => row.data?.imageUrl).filter(Boolean))];
  const statuses = await Promise.all(urls.map(async (url) => { try { return { url, status: (await fetch(url, { method: "HEAD" })).status }; } catch { return { url, status: 0 }; } }));
  const local = JSON.parse(fs.readFileSync(path.join(__dirname, "catalog_data", "catalog_items.json"), "utf8"));
  const remoteById = new Map(rows.map((row) => [row.id, row]));
  const localMismatch = local.filter((row) => row.data?.imageUrl !== remoteById.get(row.id)?.data?.imageUrl);
  const broken = statuses.filter((item) => item.status < 200 || item.status >= 400);
  const result = { items: rows.length, distinctImageUrls: urls.length, missingUrl: rows.filter((row) => !row.data?.imageUrl).length, brokenUrls: broken.length, localMismatch: localMismatch.length, statusCounts: statuses.reduce((a, item) => (a[item.status] = (a[item.status] || 0) + 1, a), {}), broken };
  console.log(JSON.stringify(result, null, 2));
  if (result.missingUrl || result.brokenUrls || result.localMismatch) process.exitCode = 1;
}
run().catch((error) => { console.error(`[ItemImagesAudit] ${error.message}`); process.exit(1); });
