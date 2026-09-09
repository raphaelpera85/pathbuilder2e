(function loadFeatMechanicsMap() {
  const applyMap = (map) => {
    if (!map || typeof map !== "object") return;
    globalThis.PF2E_FEATS_MECHANICS_MAP = map;
    if (typeof globalThis.PF2E_ENRICH_FEATS === "function") globalThis.PF2E_ENRICH_FEATS();
  };
  if (typeof fetch !== "function") return;
  fetch("data/pf2e_feats_mechanics.json", { credentials: "same-origin" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
    .then(applyMap)
    .catch(() => {
      // O catálogo do Supabase é a fonte principal quando o mapa legado não chega.
    });
})();
