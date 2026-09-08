const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: rows, error } = await supabase.from("catalog_weapons").select("id,name_pt,data").order("id");
  if (error) throw error;
  const weapons = rows || [];
  const missingUrl = weapons.filter((row) => !row.data?.imageUrl);
  const urls = [...new Set(weapons.map((row) => row.data?.imageUrl).filter(Boolean))];
  const statuses = [];
  for (let i = 0; i < urls.length; i += 8) {
    const batch = urls.slice(i, i + 8);
    statuses.push(...await Promise.all(batch.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return { url, status: response.status };
      } catch {
        return { url, status: 0 };
      }
    })));
  }
  const brokenUrls = statuses.filter((item) => item.status < 200 || item.status >= 400);
  const localRows = JSON.parse(fs.readFileSync(path.join(__dirname, "catalog_data", "catalog_weapons.json"), "utf8"));
  const localMismatch = localRows.filter((row) => row.data?.imageUrl !== weapons.find((remote) => remote.id === row.id)?.data?.imageUrl);
  console.log(JSON.stringify({
    weapons: weapons.length,
    distinctImageUrls: urls.length,
    missingUrl: missingUrl.length,
    brokenUrls: brokenUrls.length,
    localMismatch: localMismatch.length,
    statusCounts: statuses.reduce((acc, item) => { acc[item.status] = (acc[item.status] || 0) + 1; return acc; }, {}),
    broken: brokenUrls,
  }, null, 2));
  if (missingUrl.length || brokenUrls.length || localMismatch.length) process.exitCode = 1;
}

run().catch((error) => { console.error(`[WeaponImagesAudit] ${error.message}`); process.exit(1); });
