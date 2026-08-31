import { useEffect, useMemo, useRef, useState } from "react";
import type { PickerBridge, PickerItem, PickerSelectionOption, PickerType } from "./types";
import { useI18n, getItemDisplayName, type MessageKey } from "./i18n";
import { coinsToCopper, parsePriceToCopper, canAffordPrice, formatCopperToString, formatPriceToLocale } from "./utils/economy";

const pickerLabelKeys: Record<PickerType, MessageKey> = {
  ancestry: "ancestries", class: "classes", subclass: "subclasses", background: "backgrounds", weapon: "weapons", armor: "armors", shield: "armors",
  heritage: "heritages", archetype: "archetypes", spell: "spells", ritual: "rituals", feat: "feats", item: "items", gear: "items", pet: "pets", action: "actions", condition: "conditions", buff: "buffs", formula: "formulas",
};

function getPrerequisiteMessage(reason: string, locale: "pt-BR" | "en" | "es", details: any = {}) {
  const copy = {
    "pt-BR": {
      "level-too-low": `Requer nível ${details.requiredLevel}.`,
      "class-mismatch": "O pré-requisito de classe não foi atendido.",
      "ancestry-mismatch": "O pré-requisito de ancestralidade não foi atendido.",
      "ability-too-low": "O pré-requisito de atributo não foi atendido.",
      "skill-rank-too-low": "O pré-requisito de proficiência de perícia não foi atendido.",
      "proficiency-too-low": "O pré-requisito de proficiência de combate não foi atendido.",
      "weapon-proficiency-too-low": "O pré-requisito de proficiência com armas não foi atendido.",
      "spellcasting-required": "Requer uma classe conjuradora.",
      "equipment-required": `Requer o equipamento: ${details.missingEquipment}.`,
      "familiar-abilities-too-low": `Requer ${details.requiredFamiliarAbilities} habilidades de familiar.`,
      "dedication-required": "Requer a dedicação indicada.",
      "flight-required": "Requer uma forma de voo conhecida ou obtida.",
      "anatomy-required": "Requer língua preênsil ou cauda compatível.",
      "shield-required": "Requer um escudo empunhado.",
      "mounted-required": "Requer estar montado.",
      "unarmored-required": "Requer não estar usando armadura.",
      "unarmored-proficiency-too-low": "Requer Especialista em Defesa sem Armadura.",
      "two-melee-weapons-required": "Requer duas armas corpo a corpo empunhadas.",
      "one-hand-free-required": "Requer uma arma de uma mão e a outra mão livre.",
      "deviant-required": "Requer uma habilidade desviante.",
      "deity-required": "Requer uma divindade ou filosofia selecionada.",
      "patron-must-be-absent": "Requer que a ficha não tenha patrono.",
      "subclass-mismatch": "A subclasse escolhida não atende ao pré-requisito.",
      "tradition-skill-rank-too-low": `Requer ${details.requiredRank} em ${details.skill}.`,
      "sanctification-mismatch": "A santificação da causa não atende ao pré-requisito.",
      "sanctification-prohibited": "A santificação da causa é proibida para esta opção.",
      "feat-required": `Requer o talento: ${details.requiredFeat}.`,
      "action-required": `Requer a ação: ${details.requiredFeat}.`,
      "undead-prohibited": "Esta opção exige que o personagem não seja morto-vivo.",
      "research-field-mismatch": "O campo de pesquisa selecionado não atende ao requisito.",
    },
    en: {
      "level-too-low": `Requires level ${details.requiredLevel}.`,
      "class-mismatch": "The class prerequisite is not met.",
      "ancestry-mismatch": "The ancestry prerequisite is not met.",
      "ability-too-low": "The ability prerequisite is not met.",
      "skill-rank-too-low": "The skill proficiency prerequisite is not met.",
      "proficiency-too-low": "The combat proficiency prerequisite is not met.",
      "weapon-proficiency-too-low": "The weapon proficiency prerequisite is not met.",
      "spellcasting-required": "Requires a spellcasting class.",
      "equipment-required": `Requires the equipment: ${details.missingEquipment}.`,
      "familiar-abilities-too-low": `Requires ${details.requiredFamiliarAbilities} familiar abilities.`,
      "dedication-required": "Requires the listed dedication.",
      "flight-required": "Requires a known or granted form of flight.",
      "anatomy-required": "Requires a compatible prehensile tongue or tail.",
      "shield-required": "Requires a wielded shield.",
      "mounted-required": "Requires being mounted.",
      "unarmored-required": "Requires not wearing armor.",
      "unarmored-proficiency-too-low": "Requires expert unarmored defense proficiency.",
      "two-melee-weapons-required": "Requires two wielded melee weapons.",
      "one-hand-free-required": "Requires a one-handed weapon and one free hand.",
      "deviant-required": "Requires a deviant ability.",
      "deity-required": "Requires a selected deity or philosophy.",
      "patron-must-be-absent": "Requires the character to have no patron.",
      "subclass-mismatch": "The selected subclass does not meet the prerequisite.",
      "tradition-skill-rank-too-low": `Requires ${details.requiredRank} in ${details.skill}.`,
      "sanctification-mismatch": "The cause's sanctification does not meet the prerequisite.",
      "sanctification-prohibited": "The cause's sanctification is prohibited for this option.",
      "feat-required": `Requires the feat: ${details.requiredFeat}.`,
      "action-required": `Requires the action: ${details.requiredFeat}.`,
      "undead-prohibited": "This option requires the character not to be undead.",
      "research-field-mismatch": "The selected research field does not meet the requirement.",
    },
    es: {
      "level-too-low": `Requiere nivel ${details.requiredLevel}.`,
      "class-mismatch": "No se cumple el requisito de clase.",
      "ancestry-mismatch": "No se cumple el requisito de ascendencia.",
      "ability-too-low": "No se cumple el requisito de atributo.",
      "skill-rank-too-low": "No se cumple el requisito de competencia de habilidad.",
      "proficiency-too-low": "No se cumple el requisito de competencia de combate.",
      "weapon-proficiency-too-low": "No se cumple el requisito de competencia con armas.",
      "spellcasting-required": "Requiere una clase lanzadora de conjuros.",
      "equipment-required": `Requiere el equipo: ${details.missingEquipment}.`,
      "familiar-abilities-too-low": `Requiere ${details.requiredFamiliarAbilities} habilidades de familiar.`,
      "dedication-required": "Requiere la dedicación indicada.",
      "flight-required": "Requiere una forma de vuelo conocida u obtenida.",
      "anatomy-required": "Requiere una lengua prensil o cola compatible.",
      "shield-required": "Requiere un escudo empuñado.",
      "mounted-required": "Requiere estar montado.",
      "unarmored-required": "Requiere no llevar armadura.",
      "unarmored-proficiency-too-low": "Requiere competencia experta en defensa sin armadura.",
      "two-melee-weapons-required": "Requiere dos armas cuerpo a cuerpo empuñadas.",
      "one-hand-free-required": "Requiere un arma de una mano y la otra mano libre.",
      "deviant-required": "Requiere una habilidad desviada.",
      "deity-required": "Requiere una deidad o filosofía seleccionada.",
      "patron-must-be-absent": "Requiere que el personaje no tenga patrón.",
      "subclass-mismatch": "La subclase elegida no cumple el requisito.",
      "tradition-skill-rank-too-low": `Requiere ${details.requiredRank} en ${details.skill}.`,
      "sanctification-mismatch": "La santificación de la causa no cumple el requisito.",
      "sanctification-prohibited": "La santificación de la causa está prohibida para esta opción.",
      "feat-required": `Requiere el dote: ${details.requiredFeat}.`,
      "action-required": `Requiere la acción: ${details.requiredFeat}.`,
      "undead-prohibited": "Esta opción exige que el personaje no sea muerto viviente.",
      "research-field-mismatch": "El campo de investigación elegido no cumple el requisito.",
    },
  } as const;
  return copy[locale][reason as keyof typeof copy[typeof locale]] || reason;
}

const tabTranslations: Record<string, Record<string, string>> = {
  "All": { "pt-BR": "Todos", "es": "Todos", "en": "All" },
  "Simple": { "pt-BR": "Simples", "es": "Simples", "en": "Simple" },
  "Martial": { "pt-BR": "Marciais", "es": "Marciales", "en": "Martial" },
  "Advanced": { "pt-BR": "Avançadas", "es": "Avanzadas", "en": "Advanced" },
  "Unarmed": { "pt-BR": "Desarmado", "es": "Desarmado", "en": "Unarmed" },
  "Proficient": { "pt-BR": "Proficiente", "es": "Competente", "en": "Proficient" },
  "Light": { "pt-BR": "Leve", "es": "Ligera", "en": "Light" },
  "Medium": { "pt-BR": "Média", "es": "Media", "en": "Medium" },
  "Heavy": { "pt-BR": "Pesada", "es": "Pesada", "en": "Heavy" },
  "Standard": { "pt-BR": "Padrão", "es": "Estándar", "en": "Standard" },
  "Material": { "pt-BR": "Material Especial", "es": "Material Especial", "en": "Material" },
  "Magic": { "pt-BR": "Mágico", "es": "Mágico", "en": "Magic" },
  "Custom": { "pt-BR": "Personalizado", "es": "Personalizado", "en": "Custom" },
  "Gear": { "pt-BR": "Equipamentos", "es": "Equipo", "en": "Gear" },
  "Consumables": { "pt-BR": "Consumíveis", "es": "Consumibles", "en": "Consumables" },
  "Magic Items": { "pt-BR": "Itens Mágicos", "es": "Objetos Mágicos", "en": "Magic Items" },
  "Ancestry Feats": { "pt-BR": "Talentos Ancestrais", "es": "Dotes de Ascendencia", "en": "Ancestry Feats" },
  "Class Feats": { "pt-BR": "Talentos de Classe", "es": "Dotes de Clase", "en": "Class Feats" },
  "Impulse Feats": { "pt-BR": "Impulsos", "es": "Impulsos", "en": "Impulse Feats" },
  "Dedication Feats": { "pt-BR": "Talentos de Dedicação", "es": "Dotes de Dedicación", "en": "Dedication Feats" },
  "Archetype Class Feats": { "pt-BR": "Talentos de Arquétipo", "es": "Dotes de Arquetipo", "en": "Archetype Class Feats" },
  "General Feats": { "pt-BR": "Talentos Gerais", "es": "Dotes Generales", "en": "General Feats" },
  "Skill Feats": { "pt-BR": "Talentos de Perícia", "es": "Dotes de Habilidad", "en": "Skill Feats" },
  "Archetype Skill Feats": { "pt-BR": "Talentos de Perícia de Arquétipo", "es": "Dotes de Habilidad de Arquetipo", "en": "Archetype Skill Feats" },
  "All Feats": { "pt-BR": "Todos os Talentos", "es": "Todos los Dotes", "en": "All Feats" },
  "Adventuring": { "pt-BR": "Aventura", "es": "Aventura", "en": "Adventuring" },
  "Ammunition": { "pt-BR": "Munição", "es": "Munición", "en": "Ammunition" },
  "Misc": { "pt-BR": "Diversos", "es": "Varios", "en": "Misc" },
  "Weapon Attachments": { "pt-BR": "Acoplamentos", "es": "Accesorios", "en": "Weapon Attachments" }
};

interface PickerModalProps {
  onBridgeReady?: (bridge: PickerBridge) => void;
}

export function getWeaponProficiencyRank(character: any, item: any): "U" | "T" | "E" | "M" | "L" {
  if (!character) return "T";
  const cat = String(item?.data?.category || item?.category || "").toLowerCase();

  // Custom weapon proficiencies on character
  const customProf = character.weaponProficiencies;
  if (customProf) {
    if (cat.includes("simples") || cat.includes("simple")) {
      const r = customProf.Simples || customProf.simple;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("marcial") || cat.includes("martial")) {
      const r = customProf.Marcial || customProf.martial;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("avan") || cat.includes("advanced")) {
      const r = customProf.Avançada || customProf.advanced;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("desarmad") || cat.includes("unarmed")) {
      const r = customProf.Desarmado || customProf.unarmed;
      if (r) return rankToInitial(r);
    }
  }

  // Class default proficiencies
  const classIdentity = character.class && typeof character.class === "object"
    ? character.class.id || character.class.name || character.class["pt-BR"] || character.class.en || character.class.es
    : character.class;
  const className = String(classIdentity || "").toLowerCase();
  if (cat.includes("simples") || cat.includes("simple")) {
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("desarmad") || cat.includes("unarmed")) {
    if (className.includes("monge") || className.includes("monk")) return "E";
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("marcial") || cat.includes("martial")) {
    if (
      className.includes("mago") ||
      className.includes("wizard") ||
      className.includes("feiticeir") ||
      className.includes("sorcerer") ||
      className.includes("brux") ||
      className.includes("witch") ||
      className.includes("clausur") ||
      className.includes("cloistered")
    ) {
      return "U";
    }
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("avan") || cat.includes("advanced")) {
    if (className.includes("guerreiro") || className.includes("fighter")) return "T";
    return "U";
  }

  return "T";
}

function rankToInitial(rank: string): "U" | "T" | "E" | "M" | "L" {
  const norm = String(rank).toUpperCase().trim();
  if (norm.startsWith("L") || norm.includes("LENDÁRIO") || norm.includes("LEGENDARY")) return "L";
  if (norm.startsWith("M") || norm.includes("MESTRE") || norm.includes("MASTER")) return "M";
  if (norm.startsWith("E") || norm.includes("ESPECIALISTA") || norm.includes("EXPERT")) return "E";
  if (norm.startsWith("T") || norm.includes("TREINADO") || norm.includes("TRAINED")) return "T";
  return "U";
}

export function PickerModal({ onBridgeReady }: PickerModalProps) {
  const { locale, t } = useI18n();
  const customCopy = {
    "pt-BR": { create: "Criar", weapon: "Arma Personalizada", armor: "Armadura Personalizada", shield: "Escudo Personalizado", item: "Item Personalizado", name: "Nome", category: "Categoria", damageDie: "Dado de Dano", damageType: "Tipo de Dano", bulk: "Carga (Bulk)", hands: "Mãos", price: "Preço", traits: "Traços (separados por vírgula)", description: "Descrição / Efeitos", free: "Adicionar Grátis", buy: "Comprar", namePlaceholder: "Ex: Machado Vorpal Ancestral", traitsPlaceholder: "Ex: Ágil, Acurada, Versátil C", descriptionPlaceholder: "Regras especiais e lore...", customDescription: "Item personalizado criado pelo jogador." },
    en: { create: "Create", weapon: "Custom Weapon", armor: "Custom Armor", shield: "Custom Shield", item: "Custom Item", name: "Name", category: "Category", damageDie: "Damage Die", damageType: "Damage Type", bulk: "Bulk", hands: "Hands", price: "Price", traits: "Traits (comma-separated)", description: "Description / Effects", free: "Add for Free", buy: "Buy", namePlaceholder: "E.g. Ancestral Vorpal Axe", traitsPlaceholder: "E.g. Agile, Finesse, Versatile P", descriptionPlaceholder: "Special rules and lore...", customDescription: "Custom item created by the player." },
    es: { create: "Crear", weapon: "Arma personalizada", armor: "Armadura personalizada", shield: "Escudo personalizado", item: "Objeto personalizado", name: "Nombre", category: "Categoría", damageDie: "Dado de daño", damageType: "Tipo de daño", bulk: "Carga (Bulk)", hands: "Manos", price: "Precio", traits: "Rasgos (separados por comas)", description: "Descripción / Efectos", free: "Añadir gratis", buy: "Comprar", namePlaceholder: "Ej.: Hacha vorpal ancestral", traitsPlaceholder: "Ej.: Ágil, Sutil, Versátil P", descriptionPlaceholder: "Reglas especiales y trasfondo...", customDescription: "Objeto personalizado creado por el jugador." },
  }[locale];
  const footerCopy = {
    "pt-BR": { buy: "Comprar", give: "Adicionar", custom: "Personalizado", prd: "PRD", clear: "Limpar", buyTitle: "Comprar e deduzir moedas", giveTitle: "Adicionar sem deduzir moedas", walletTitle: "Sua carteira de moedas atual" },
    en: { buy: "Buy", give: "Give", custom: "Custom", prd: "PRD", clear: "Clear", buyTitle: "Buy and deduct coins", giveTitle: "Add without deducting coins", walletTitle: "Your current coin purse" },
    es: { buy: "Comprar", give: "Añadir", custom: "Personalizado", prd: "PRD", clear: "Limpiar", buyTitle: "Comprar y deducir monedas", giveTitle: "Añadir sin deducir monedas", walletTitle: "Tu bolsa de monedas actual" },
  }[locale];
  const [pickerType, setPickerType] = useState<PickerType | null>(null);
  const [pickerOptions, setPickerOptions] = useState<import("./types").IPickerOpenOptions | undefined>();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [optionSelections, setOptionSelections] = useState<Record<string, string>>({});
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");
  const [activeSubTab, setActiveSubTab] = useState<string>("Standard");
  const [characterRevision, setCharacterRevision] = useState(0);

  // Custom weapon form state
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState("Marcial");
  const [customDamage, setCustomDamage] = useState("1d8");
  const [customDamageType, setCustomDamageType] = useState("Cortante");
  const [customBulk, setCustomBulk] = useState("1");
  const [customHands, setCustomHands] = useState("1");
  const [customPrice, setCustomPrice] = useState(locale === "en" ? "2 GP" : "2 PO");
  const [customTraits, setCustomTraits] = useState("");
  const [customDesc, setCustomDesc] = useState("");

  const categoryTabs = useMemo(() => {
    if (!pickerType) return [];
    if (pickerType === "weapon") {
      return ["All", "Simple", "Martial", "Advanced", "Unarmed", "Proficient"];
    }
    if (pickerType === "armor") {
      return ["All", "Light", "Medium", "Heavy"];
    }
    if (pickerType === "shield") {
      return ["Standard", "Material", "Magic", "Custom"];
    }
    if (pickerType === "item" || pickerType === "gear") {
      return ["Gear", "Consumables", "Magic Items", "All", "Custom"];
    }
    if (pickerType === "feat") {
      const fType = pickerOptions?.filterType?.toLowerCase() || "";
      if (fType.includes("ancestry")) {
        return ["Ancestry Feats", "All Feats"];
      } else if (fType.includes("class")) {
        return ["Class Feats", "Impulse Feats", "Dedication Feats", "Archetype Class Feats", "All Feats"];
      } else {
        return ["General Feats", "Skill Feats", "Archetype Skill Feats", "All Feats"];
      }
    }
    return [t(pickerLabelKeys[pickerType])];
  }, [pickerType, pickerOptions, t]);

  const subTabs = useMemo(() => {
    if (pickerType === "weapon" || pickerType === "armor") {
      return ["Standard", "Magic", "Custom"];
    }
    if (pickerType === "shield") {
      return [];
    }
    if (pickerType === "item" || pickerType === "gear") {
      if (activeCategoryTab === "Gear" || activeCategoryTab === "All") {
        return ["Adventuring", "Ammunition", "Misc", "Weapon Attachments"];
      }
      return [];
    }
    return [];
  }, [pickerType, activeCategoryTab]);

  useEffect(() => {
    if (categoryTabs.length > 0 && !categoryTabs.includes(activeCategoryTab)) {
      setActiveCategoryTab(categoryTabs[0]);
    }
  }, [categoryTabs, activeCategoryTab]);

  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const bridge = useMemo<PickerBridge>(() => ({
    open(type, options) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setPickerType(type);
      setPickerOptions(options);
      setQuery("");
      setSelectedIndex(0);
      setOptionSelections({});
      setActiveSubTab("Standard");
    },
    close() {
      setPickerType(null);
      setPickerOptions(undefined);
      requestAnimationFrame(() => returnFocusRef.current?.focus());
    },
  }), []);

  useEffect(() => {
    onBridgeReady?.(bridge);
    window.pathbuilderPicker = bridge;
    const pending = window.app?.consumePendingPicker?.();
    if (pending) {
      if (typeof pending === "string") bridge.open(pending as PickerType);
      else if (pending.type) bridge.open(pending.type, pending.options);
    }
    if (import.meta.env.DEV) {
      const previewType = new URLSearchParams(window.location.search).get("picker") as PickerType | null;
      if (previewType && previewType in pickerLabelKeys) bridge.open(previewType);
    }
    return () => {
      if (window.pathbuilderPicker === bridge) delete window.pathbuilderPicker;
    };
  }, [bridge, onBridgeReady]);

  // O legado muta a ficha fora do ciclo React. Recalcular imediatamente evita
  // que uma opção se torne selecionável visualmente após uma troca de classe,
  // ancestralidade ou nível enquanto o picker permanece aberto.
  useEffect(() => {
    const refresh = () => setCharacterRevision((revision) => revision + 1);
    window.addEventListener("pathbuilder:character-render", refresh);
    return () => window.removeEventListener("pathbuilder:character-render", refresh);
  }, []);

  useEffect(() => {
    if (!pickerType) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") bridge.close();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [bridge, pickerType]);

  const character = window.app?.character;
  const characterCoins = character?.coins || { pp: 0, gp: 15, sp: 0, cp: 0 };
  const coinLabels = locale === "pt-BR"
    ? { pp: "PL", gp: "PO", sp: "PP", cp: "PC" }
    : locale === "en"
      ? { pp: "PP", gp: "GP", sp: "SP", cp: "CP" }
      : { pp: "PP", gp: "PO", sp: "PA", cp: "PC" };
  const isPurchasable = pickerType === "weapon" || pickerType === "armor" || pickerType === "shield" || pickerType === "item" || pickerType === "gear";

  const items = useMemo(() => {
    if (!pickerType || !window.app) return [];
    const needle = query.toLocaleLowerCase(locale);
    let rawItems = window.app.getPickerItems(pickerType);
    const slotLevel = Number(pickerOptions?.level);
    const baseCompatibilityCharacter = (window.app as any).getPickerCompatibilityCharacter?.(pickerType) || character;
    const compatibilityCharacter = pickerType === "feat" && Number.isInteger(slotLevel) && slotLevel > 0
      ? { ...baseCompatibilityCharacter, level: slotLevel }
      : baseCompatibilityCharacter;
    const heritageInnate = pickerType === "spell" && pickerOptions?.heritageInnate === true;
    rawItems = rawItems.map((item) => {
      if (pickerType === "spell") {
        if (heritageInnate) {
          const checker = (window as any).PF2E_ENGINE?.getPrerequisiteCompatibility;
          const prerequisiteCompatibility = typeof checker === "function"
            ? checker.call((window as any).PF2E_ENGINE, compatibilityCharacter, item.data)
            : null;
          // Truques ocultistas inatos dispensam conjuração normal, mas não
          // dispensam classe, ancestralidade, nível ou outros gates explícitos.
          if (prerequisiteCompatibility?.state === "incompatible" && prerequisiteCompatibility.reason !== "spellcasting-required") {
            return {
              ...item,
              data: {
                ...item.data,
                selectionState: "incompatible",
                selectionMessages: {
                  ...(item.data?.selectionMessages || {}),
                  [locale]: getPrerequisiteMessage(prerequisiteCompatibility.reason, locale, prerequisiteCompatibility),
                },
              },
            };
          }
          return { ...item, data: { ...item.data, selectionState: "available" } };
        }
        const spellCompatibility = (window as any).PF2E_ENGINE?.getSpellCompatibility?.(compatibilityCharacter, item.data);
        if (spellCompatibility?.state === "incompatible") {
          return {
            ...item,
            data: {
              ...item.data,
              selectionState: "incompatible",
              selectionMessages: {
                ...(item.data?.selectionMessages || {}),
                [locale]: getPrerequisiteMessage(spellCompatibility.reason, locale, spellCompatibility),
              },
            },
          };
        }
        return { ...item, data: { ...item.data, selectionState: spellCompatibility?.state || item.data?.selectionState || "available" } };
      }
      const checker = (window as any).PF2E_ENGINE?.getPrerequisiteCompatibility;
      if (typeof checker !== "function") return item;
      const compatibility = checker.call((window as any).PF2E_ENGINE, compatibilityCharacter, item.data);
      if (compatibility?.state !== "incompatible") return item;
      return {
        ...item,
        data: {
          ...item.data,
          selectionState: "incompatible",
          selectionMessages: {
            ...(item.data?.selectionMessages || {}),
            [locale]: getPrerequisiteMessage(compatibility.reason, locale, compatibility),
          },
        },
      };
    });
    // Opções incompatíveis não devem aparecer como escolhas disponíveis.
    // O bridge legado ainda revalida a seleção para proteger fichas antigas.
    rawItems = rawItems.filter((item) => item.data?.selectionState !== "incompatible");

    // Category Tabs Filtering for Feats
    if (pickerType === "feat") {
      if (activeCategoryTab === "General Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("geral") || cat.includes("general") || traits.includes("geral") || traits.includes("general");
        });
      } else if (activeCategoryTab === "Skill Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("perícia") || cat.includes("pericia") || cat.includes("skill") || traits.includes("perícia") || traits.includes("pericia") || traits.includes("skill");
        });
      } else if (activeCategoryTab === "Archetype Skill Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          const isArchetype = cat.includes("arquétipo") || cat.includes("arquetipo") || cat.includes("archetype") || traits.includes("arquétipo") || traits.includes("arquetipo") || traits.includes("archetype");
          const isSkill = cat.includes("perícia") || cat.includes("pericia") || cat.includes("skill") || traits.includes("perícia") || traits.includes("pericia") || traits.includes("skill");
          return isArchetype || isSkill;
        });
      } else if (activeCategoryTab === "Class Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("classe") || cat.includes("class") || traits.includes("classe") || traits.includes("class");
        });
      } else if (activeCategoryTab === "Impulse Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("impulso") || cat.includes("impulse") || traits.includes("impulso") || traits.includes("impulse");
        });
      } else if (activeCategoryTab === "Dedication Feats") {
        rawItems = rawItems.filter((i) => {
          const name = String(i.name || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return name.includes("dedica") || name.includes("dedication") || traits.includes("dedicação") || traits.includes("dedicacao") || traits.includes("dedication");
        });
      } else if (activeCategoryTab === "Archetype Class Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("arquétipo") || cat.includes("arquetipo") || cat.includes("archetype") || traits.includes("arquétipo") || traits.includes("arquetipo") || traits.includes("archetype");
        });
      } else if (activeCategoryTab === "Ancestry Feats") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.category || i.data?.category || i.type || "").toLowerCase();
          const traits = (i.data?.traits || []).map((t: string) => t.toLowerCase());
          return cat.includes("ancestr") || traits.includes("ancestr");
        });
      }
    }

    // Category Tabs Filtering for Weapons
    if (pickerType === "weapon") {
      if (activeCategoryTab === "Simple") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("simples") || cat.includes("simple");
        });
      } else if (activeCategoryTab === "Martial") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("marcial") || cat.includes("martial");
        });
      } else if (activeCategoryTab === "Advanced") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("avan") || cat.includes("advanced");
        });
      } else if (activeCategoryTab === "Unarmed") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("desarmad") || cat.includes("unarmed");
        });
      } else if (activeCategoryTab === "Proficient") {
        rawItems = rawItems.filter((i) => getWeaponProficiencyRank(character, i) !== "U");
      }

      if (activeSubTab === "Magic") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) > 0 || (i.data?.traits || []).some((t: string) => /mágic|magic|runa|rune/i.test(t)));
      } else if (activeSubTab === "Standard") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) <= 1);
      }
    }

    // Category Tabs Filtering for Armor
    if (pickerType === "armor") {
      if (activeCategoryTab === "Light") {
        rawItems = rawItems.filter((i) => /leve|light/i.test(String(i.data?.category || "")));
      } else if (activeCategoryTab === "Medium") {
        rawItems = rawItems.filter((i) => /m[eé]dia|medium/i.test(String(i.data?.category || "")));
      } else if (activeCategoryTab === "Heavy") {
        rawItems = rawItems.filter((i) => /pesada|heavy/i.test(String(i.data?.category || "")));
      }

      if (activeSubTab === "Magic") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) > 0 || (i.data?.traits || []).some((t: string) => /mágic|magic|runa|rune/i.test(t)));
      } else if (activeSubTab === "Standard") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) <= 1);
      }
    }

    // Shield Tabs Filtering
    if (pickerType === "shield") {
      if (activeCategoryTab === "Magic") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) > 0 || (i.data?.traits || []).some((t: string) => /mágic|magic/i.test(t)));
      } else if (activeCategoryTab === "Material") {
        rawItems = rawItems.filter((i) => /madeira|aço|steel|wood|hide|couro/i.test(String(i.name || "")));
      } else if (activeCategoryTab === "Standard") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) <= 0);
      }
    }

    // Gear / Items Tabs Filtering
    if (pickerType === "item" || pickerType === "gear") {
      if (activeCategoryTab === "Gear") {
        rawItems = rawItems.filter((i) => !/consumable|poç|elixir|bomba/i.test(String(i.data?.category || "")));
        if (activeSubTab === "Adventuring") {
          rawItems = rawItems.filter((i) => String(i.data?.subcategory || "").toLowerCase().includes("adventuring") || (i.data?.level || 0) === 0);
        } else if (activeSubTab === "Ammunition") {
          rawItems = rawItems.filter((i) => /ammunition|muniç/i.test(String(i.data?.subcategory || "") + String(i.name || "")));
        } else if (activeSubTab === "Weapon Attachments") {
          rawItems = rawItems.filter((i) => /attachment|skirt|acopl/i.test(String(i.data?.subcategory || "") + String(i.name || "")));
        } else if (activeSubTab === "Misc") {
          rawItems = rawItems.filter((i) => /misc|kit|ferramenta|tool|lock/i.test(String(i.data?.subcategory || "") + String(i.name || "")));
        }
      } else if (activeCategoryTab === "Consumables") {
        rawItems = rawItems.filter((i) => /consumable|poç|elixir|bomba/i.test(String(i.data?.category || "")));
      } else if (activeCategoryTab === "Magic Items") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) > 0 || (i.data?.traits || []).some((t: string) => /mágic|magic/i.test(t)));
      }
    }

    const filtered = rawItems.filter((item) => {
      if (!item) return false;
      const localizedName = getItemDisplayName(item, locale);
      const localizedSummary = item.data?.summaries?.[locale] ?? item.data?.description ?? "";
      return `${localizedName} ${item.name || ""} ${localizedSummary}`.toLocaleLowerCase(locale).includes(needle);
    });

    return filtered.slice().sort((a, b) => {
      if (pickerType === "spell") {
        const weights: Record<string, number> = { available: 0, "requires-choice": 1, incompatible: 2 };
        const stateA = weights[a.data?.selectionState ?? "available"] ?? 0;
        const stateB = weights[b.data?.selectionState ?? "available"] ?? 0;
        if (stateA !== stateB) return stateA - stateB;
        if ((a.data?.rank ?? 0) !== (b.data?.rank ?? 0)) return (a.data?.rank ?? 0) - (b.data?.rank ?? 0);
      }
      const nameA = getItemDisplayName(a, locale);
      const nameB = getItemDisplayName(b, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [locale, pickerOptions, pickerType, query, activeCategoryTab, activeSubTab, character, characterRevision]);

  useEffect(() => {
    if (selectedIndex >= items.length) setSelectedIndex(0);
  }, [items.length, selectedIndex]);

  if (!pickerType) return null;

  const selectedItem: PickerItem | undefined = items[selectedIndex];
  const selectedState = selectedItem?.data.selectionState ?? "available";
  const selectedMessage = selectedItem?.data.selectionMessages?.[locale] ?? selectedItem?.data.selectionMessages?.["pt-BR"] ?? "";
  const canConfirm = Boolean(selectedItem) && selectedState === "available";
  const source = selectedItem?.data.source;
  const sourceLabel = source?.book
    ? `${source.book}${source.page ? `, p. ${source.page}` : ""}`
    : t("catalogReview");
  const rarity = selectedItem?.data.rarity === "rare" ? t("rarityRare") : selectedItem?.data.rarity === "uncommon" ? t("rarityUncommon") : selectedItem?.data.rarity === "common" ? t("rarityCommon") : null;
  const castingTimes = selectedItem?.data.castingTimes as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const traditionNames = selectedItem?.data.traditionNames as Partial<Record<"pt-BR" | "en" | "es", string[]>> | undefined;
  const primaryChecks = selectedItem?.data.primaryChecks as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const ruleFacts = selectedItem ? [
    typeof selectedItem.data.rank === "number" ? `${t("rank")} ${selectedItem.data.rank}` : null,
    castingTimes?.[locale] ? `${t("castingTime")}: ${castingTimes[locale]}` : null,
    traditionNames?.[locale]?.length ? `${t("traditions")}: ${traditionNames[locale]?.join(", ")}` : null,
    primaryChecks?.[locale] ? `${t("primaryCheck")}: ${primaryChecks[locale]}` : null,
  ].filter((fact): fact is string => Boolean(fact)) : [];
  const selectionGroups = selectedItem?.data.selectionGroups ?? [];
  const resolvedSelections = Object.fromEntries(selectionGroups.map((group) => {
    const selectedId = optionSelections[group.id] ?? group.options[0]?.id;
    return [group.id, group.options.find((option) => option.id === selectedId) ?? group.options[0]];
  })) as Record<string, PickerSelectionOption | undefined>;
  const resolvedSize = resolvedSelections.size;
  const resolvedHeritage = resolvedSelections.heritage;
  const resolvedHp = resolvedSize?.hp ?? selectedItem?.data.hp;
  const resolvedSpeed = resolvedHeritage?.speed ?? selectedItem?.data.speed;

  // Economy & Price Affordability
  const itemPrice = selectedItem?.data?.price ?? selectedItem?.price ?? (locale === "en" ? "0 GP" : "0 PO");
  const isAffordable = canAffordPrice(characterCoins, itemPrice, 1, locale);
  const itemPriceText = formatPriceToLocale(itemPrice, locale);

  const confirm = (deductCoins: boolean = false) => {
    if (!selectedItem || selectedState !== "available") return;
    // A UI desabilitada não é uma barreira suficiente: teclado, automação ou
    // uma integração externa ainda podem chamar o confirmador diretamente.
    if (deductCoins && !isAffordable) return;
    const selection = Object.fromEntries(selectionGroups.map((group) => [group.id, resolvedSelections[group.id]?.id ?? group.options[0]?.id]));
    const itemPayload = { ...selectedItem, ...(selectionGroups.length ? { selection } : {}) };
    if (pickerOptions) {
      if (deductCoins) {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, pickerOptions, true);
      } else {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, pickerOptions);
      }
    } else {
      if (deductCoins) {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, undefined, true);
      } else {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload);
      }
    }
    bridge.close();
  };

  const handleCreateCustom = (deductCoins: boolean) => {
    if (!customName.trim()) return;
    const normalizedName = customName.trim();
    const customDescription = customDesc.trim() || customCopy.customDescription;
    const customId = `custom.item.${normalizedName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "item"}.${Date.now()}`;
    const customItem: PickerItem = {
      name: normalizedName,
      type: pickerType === "weapon" ? "Arma" : pickerType === "armor" ? "Armadura" : pickerType === "shield" ? "Escudo" : "Item",
      data: {
        id: customId,
        name: normalizedName,
        names: { "pt-BR": normalizedName, en: normalizedName, es: normalizedName },
        category: customCategory,
        damage: customDamage,
        damageType: customDamageType,
        bulk: customBulk || "1",
        hands: customHands,
        price: customPrice || (locale === "en" ? "0 GP" : "0 PO"),
        traits: customTraits ? customTraits.split(",").map((s) => s.trim()).filter(Boolean) : [],
        description: customDescription,
        summaries: { "pt-BR": customDescription, en: customDescription, es: customDescription },
        ruleset: "needs_review",
        needs_review: true,
        custom: true,
      }
    };
    if (pickerOptions) {
      (window.app?.applyPickerSelection as any)?.(pickerType, customItem, pickerOptions, deductCoins);
    } else {
      (window.app?.applyPickerSelection as any)?.(pickerType, customItem, undefined, deductCoins);
    }
    bridge.close();
  };

  const clearSelection = () => {
    if (pickerOptions) {
      window.app?.applyPickerSelection(pickerType, null, pickerOptions);
    }
    bridge.close();
  };

  return (
    <div
      className="picker-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) bridge.close();
      }}
    >
      <section
        ref={dialogRef}
        className="picker-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
      >
        <h2 id="picker-title" className="sr-only">{t("select")} {t(pickerLabelKeys[pickerType])}</h2>
        
        {/* TOP BAR */}
        <header className="picker-nav">
          <div className="picker-tabs-bar">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`picker-tab-btn ${activeCategoryTab === tab ? "active" : ""}`}
                onClick={() => setActiveCategoryTab(tab)}
              >
                {tabTranslations[tab]?.[locale] || tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
            <label className="picker-search">
              <span className="sr-only">{t("searchOptions")}</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={t("search")}
              />
            </label>
            <button type="button" className="picker-filter-btn" title={t("advancedFilters")} aria-label={t("advancedFilters")}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
            </button>
          </div>
        </header>

        {/* SUB TABS BAR (STANDARD | MAGIC | CUSTOM) */}
        {subTabs.length > 0 && (
          <div className="picker-subtabs-bar">
            {subTabs.map((st) => (
              <button
                key={st}
                type="button"
                className={`picker-subtab-btn ${activeSubTab === st ? "active" : ""}`}
                onClick={() => setActiveSubTab(st)}
              >
                {tabTranslations[st]?.[locale] || st}
              </button>
            ))}
          </div>
        )}

        {/* MAIN BODY */}
        <div className="picker-content">
          {activeSubTab === "Custom" ? (
            <div className="picker-custom-form-container">
              <h3 style={{ color: "var(--pb-orange)", marginBottom: "16px", fontSize: "18px" }}>
                {customCopy.create} {pickerType === "weapon" ? customCopy.weapon : pickerType === "armor" ? customCopy.armor : pickerType === "shield" ? customCopy.shield : customCopy.item}
              </h3>
              <div className="picker-custom-grid">
                <label>
                  <span>{customCopy.name}:</span>
                  <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder={customCopy.namePlaceholder} />
                </label>
                <label>
                  <span>{customCopy.category}:</span>
                  <select value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}>
                    <option value="Simples">{locale === "en" ? "Simple" : locale === "es" ? "Simple" : "Simples"}</option>
                    <option value="Marcial">{locale === "en" ? "Martial" : locale === "es" ? "Marcial" : "Marcial"}</option>
                    <option value="Avançada">{locale === "en" ? "Advanced" : locale === "es" ? "Avanzada" : "Avançada"}</option>
                    <option value="Desarmado">{locale === "en" ? "Unarmed" : locale === "es" ? "Desarmado" : "Desarmado"}</option>
                  </select>
                </label>
                <label>
                  <span>{customCopy.damageDie}:</span>
                  <select value={customDamage} onChange={(e) => setCustomDamage(e.target.value)}>
                    <option value="1d4">1d4</option>
                    <option value="1d6">1d6</option>
                    <option value="1d8">1d8</option>
                    <option value="1d10">1d10</option>
                    <option value="1d12">1d12</option>
                    <option value="2d6">2d6</option>
                  </select>
                </label>
                <label>
                  <span>{customCopy.damageType}:</span>
                  <select value={customDamageType} onChange={(e) => setCustomDamageType(e.target.value)}>
                    <option value="Cortante">{locale === "en" ? "Slashing (S)" : locale === "es" ? "Cortante (S)" : "Cortante (S)"}</option>
                    <option value="Perfuração">{locale === "en" ? "Piercing (P)" : locale === "es" ? "Perforante (P)" : "Perfuração (P)"}</option>
                    <option value="Impacto">{locale === "en" ? "Bludgeoning (B)" : locale === "es" ? "Contundente (B)" : "Impacto (B)"}</option>
                    <option value="Elemental">{locale === "en" ? "Elemental" : locale === "es" ? "Elemental" : "Elemental"}</option>
                  </select>
                </label>
                <label>
                  <span>{customCopy.bulk}:</span>
                  <input value={customBulk} onChange={(e) => setCustomBulk(e.target.value)} placeholder="1 ou L" />
                </label>
                <label>
                  <span>{customCopy.hands}:</span>
                  <input value={customHands} onChange={(e) => setCustomHands(e.target.value)} placeholder="1 ou 2" />
                </label>
                <label>
                  <span>{customCopy.price}:</span>
                  <input value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder={locale === "en" ? "E.g. 5 GP" : locale === "es" ? "Ej.: 5 PO" : "Ex: 5 PO"} />
                </label>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>{customCopy.traits}:</span>
                  <input value={customTraits} onChange={(e) => setCustomTraits(e.target.value)} placeholder={customCopy.traitsPlaceholder} />
                </label>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>{customCopy.description}:</span>
                  <textarea rows={3} value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} placeholder={customCopy.descriptionPlaceholder} />
                </label>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="button" className="picker-confirm" onClick={() => handleCreateCustom(false)}>
                  {customCopy.free}
                </button>
                <button type="button" className="picker-buy-btn" onClick={() => handleCreateCustom(true)}>
                  {customCopy.buy} ({customPrice || (locale === "en" ? "0 GP" : "0 PO")})
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* LEFT LIST */}
              <div className="picker-list" role="listbox" aria-label={t("availableOptions")}>
                {items.map((item, index) => {
                  const itemState = item.data?.selectionState ?? "available";
                  const isSelected = selectedIndex === index;
                  const isBlocked = itemState !== "available";
                  const itemLvl = item.data?.level ?? item.data?.rank ?? 0;
                  const profRank = pickerType === "weapon" ? getWeaponProficiencyRank(character, item) : null;

                  return (
                    <button
                      key={`${item.name}-${index}`}
                      ref={(element) => { itemRefs.current[index] = element; }}
                      role="option"
                      aria-selected={isSelected}
                      className={`picker-item ${itemState}${isSelected ? " selected" : ""}${isBlocked ? " blocked" : ""}`}
                      onClick={() => setSelectedIndex(index)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown") {
                          event.preventDefault();
                          const next = (index + 1) % items.length;
                          setSelectedIndex(next);
                          itemRefs.current[next]?.focus();
                        } else if (event.key === "ArrowUp") {
                          event.preventDefault();
                          const prev = (index - 1 + items.length) % items.length;
                          setSelectedIndex(prev);
                          itemRefs.current[prev]?.focus();
                        } else if (event.key === "Enter") {
                          event.preventDefault();
                          confirm(false);
                        }
                      }}
                      type="button"
                    >
                      <div className="picker-item-left">
                        {profRank && (
                          <span className={`picker-prof-badge ${profRank.toLowerCase()}`} title={`Proficiência: ${profRank}`}>
                            {profRank}
                          </span>
                        )}
                        <span className="picker-item-name">
                          {getItemDisplayName(item, locale)}
                        </span>
                        {item.data?.rarity === "rare" && (
                          <span className="picker-trait-pill" style={{ marginLeft: "6px", color: "#fca5a5", borderColor: "#b91c1c", background: "#450a0a" }}>
                            {t("rarityRare")}
                          </span>
                        )}
                      </div>
                      <span className="picker-item-level-box">
                        {itemLvl}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT DETAILS PANE */}
              <article className="picker-detail">
                {selectedItem ? (
                  <>
                    <header className="picker-detail-header">
                      <div>
                        <h3>{getItemDisplayName(selectedItem, locale)}</h3>
                        <div style={{ fontSize: "12px", color: "var(--pb-text-muted)", marginTop: "2px" }}>
                          {selectedItem.data?.category ? `${selectedItem.data.category} ${locale === "en" ? "Weapon" : locale === "es" ? "Arma" : "Arma"}` : selectedItem.type}
                        </div>
                        {rarity && (
                          <span className="picker-trait-pill" style={{ display: "inline-flex", marginTop: "6px", color: selectedItem.data?.rarity === "rare" ? "#fca5a5" : "#fde68a", borderColor: selectedItem.data?.rarity === "rare" ? "#b91c1c" : "#a16207", background: selectedItem.data?.rarity === "rare" ? "#450a0a" : "#422006" }}>
                            {rarity}{selectedItem.data?.rareSelection ? ` · ${locale === "en" ? "GM approval" : locale === "es" ? "aprobación del GM" : "aprovação do Mestre"}` : ""}
                          </span>
                        )}
                      </div>
                      <span className="picker-item-level-box" style={{ fontSize: "13px", padding: "3px 9px" }}>
                        {locale === "en" ? "Level" : locale === "es" ? "Nivel" : "Nível"} {selectedItem.data?.level ?? selectedItem.data?.rank ?? 0}
                      </span>
                    </header>

                    {/* WEAPON QUICK STATS BAR */}
                    {pickerType === "weapon" && (
                      <div className="picker-weapon-stats-bar">
                        <div className="pws-stat">
                          <span className="pws-label">{t("damage")}</span>
                          <strong className="pws-value" style={{ color: "var(--pb-orange)" }}>
                            {String(selectedItem.data?.damage || "1d6")} {selectedItem.data?.damageType ? `(${String(selectedItem.data.damageType)})` : ""}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("price")}</span>
                          <strong className="pws-value" style={{ color: "var(--pb-gold, #f59e0b)" }}>
                            {String(selectedItem.data?.price || "—")}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("bulk")}</span>
                          <strong className="pws-value">{String(selectedItem.data?.bulk || "1")}</strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{locale === "en" ? "Hands" : locale === "es" ? "Manos" : "Mãos"}</span>
                          <strong className="pws-value">{String(selectedItem.data?.hands || "1")}</strong>
                        </div>
                      </div>
                    )}

                    {/* ARMOR QUICK STATS BAR */}
                    {pickerType === "armor" && (
                      <div className="picker-weapon-stats-bar" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                        <div className="pws-stat">
                          <span className="pws-label">Bônus CA</span>
                          <strong className="pws-value" style={{ color: "#38bdf8" }}>
                            +{String(selectedItem.data?.acBonus || 0)}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">Limite Des</span>
                          <strong className="pws-value">
                            +{String(selectedItem.data?.dexCap !== undefined ? selectedItem.data.dexCap : 5)}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("price")}</span>
                          <strong className="pws-value" style={{ color: "var(--pb-gold, #f59e0b)" }}>
                            {String(selectedItem.data?.price || "—")}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("bulk")}</span>
                          <strong className="pws-value">{String(selectedItem.data?.bulk || "0")}</strong>
                        </div>
                      </div>
                    )}

                    {/* SHIELD QUICK STATS BAR */}
                    {pickerType === "shield" && (
                      <div className="picker-weapon-stats-bar" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                        <div className="pws-stat">
                          <span className="pws-label">Bônus CA</span>
                          <strong className="pws-value" style={{ color: "#38bdf8" }}>
                            +{String(selectedItem.data?.acBonus || 2)}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">Dureza</span>
                          <strong className="pws-value" style={{ color: "var(--pb-orange)" }}>
                            {String(selectedItem.data?.hardness || 3)}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">PV (BT)</span>
                          <strong className="pws-value">
                            {String(selectedItem.data?.maxHp || 12)} ({String(selectedItem.data?.bt || 6)})
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("price")}</span>
                          <strong className="pws-value" style={{ color: "var(--pb-gold, #f59e0b)" }}>
                            {String(selectedItem.data?.price || "—")}
                          </strong>
                        </div>
                      </div>
                    )}

                    {/* GEAR / ITEM QUICK STATS BAR */}
                    {(pickerType === "item" || pickerType === "gear") && (
                      <div className="picker-weapon-stats-bar" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                        <div className="pws-stat">
                          <span className="pws-label">{t("price")}</span>
                          <strong className="pws-value" style={{ color: "var(--pb-gold, #f59e0b)" }}>
                            {String(selectedItem.data?.price || "—")}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{t("bulk")}</span>
                          <strong className="pws-value">{String(selectedItem.data?.bulk !== undefined ? selectedItem.data.bulk : "—")}</strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">{locale === "en" ? "Level" : locale === "es" ? "Nivel" : "Nível"}</span>
                          <strong className="pws-value">{String(selectedItem.data?.level ?? 0)}</strong>
                        </div>
                      </div>
                    )}

                    {/* TRAITS PILLS */}
                    {Array.isArray(selectedItem.data?.traits) && selectedItem.data.traits.length > 0 && (
                      <div className="picker-traits-row">
                        {selectedItem.data.traits.map((trait: string) => (
                          <span key={trait} className="picker-trait-pill">{trait}</span>
                        ))}
                      </div>
                    )}

                    {/* RULE FACTS (SPELLS, ACTIONS, ETC.) */}
                    {ruleFacts.length > 0 && (
                      <div className="picker-traits-row" style={{ marginTop: "4px" }}>
                        {ruleFacts.map((fact) => (
                          <span key={fact} className="picker-trait-pill" style={{ background: "#065f46", borderColor: "#10b981", color: "#a7f3d0" }}>
                            {fact}
                          </span>
                        ))}
                      </div>
                    )}

                    {(selectedItem.data?.prereq || selectedItem.data?.prerequisites || selectedItem.data?.requiredLevel || selectedItem.data?.classId || selectedItem.data?.classIds?.length || selectedItem.data?.ancestryId || selectedItem.data?.ancestryIds?.length) && (
                      <div className="picker-prereqs" role="note">
                        <strong>{t("prerequisites")}:</strong>{" "}
                        {String(selectedItem.data?.prereq || (Array.isArray(selectedItem.data?.prerequisites) ? selectedItem.data.prerequisites.join(", ") : selectedItem.data?.prerequisites) || (selectedItem.data?.requiredLevel ? `${locale === "en" ? "Level" : locale === "es" ? "Nivel" : "Nível"} ${selectedItem.data.requiredLevel}` : selectedItem.data?.classId || selectedItem.data?.classIds?.length ? `${locale === "en" ? "Class" : locale === "es" ? "Clase" : "Classe"} ${(selectedItem.data.classIds || [selectedItem.data.classId]).join(", ")}` : `${locale === "en" ? "Ancestry" : locale === "es" ? "Ascendencia" : "Ancestralidade"} ${(selectedItem.data.ancestryIds || [selectedItem.data.ancestryId]).join(", ")}`))}
                      </div>
                    )}

                    {/* CONFIGURATION SELECTION GROUPS (ANCESTRIES SIZE/HERITAGE) */}
                    {selectionGroups.length > 0 && (
                      <fieldset className="picker-configuration">
                        <legend>{t("configuration")}</legend>
                        {selectionGroups.map((group) => (
                          <label key={group.id}>
                            <span>{t(group.labelKey as MessageKey)}</span>
                            <select
                              aria-label={t(group.labelKey as MessageKey)}
                              value={resolvedSelections[group.id]?.id ?? ""}
                              onChange={(event) => setOptionSelections((current) => ({ ...current, [group.id]: event.target.value }))}
                            >
                              {group.options.map((option) => (
                                <option value={option.id} key={option.id}>
                                  {option.names[locale] ?? option.names["pt-BR"] ?? option.id}
                                </option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </fieldset>
                    )}

                    {resolvedHp !== undefined && (
                      <p style={{ margin: "8px 0", fontSize: "12.5px" }}>
                        {t("baseHp")}: <strong>{resolvedHp}</strong> · {t("landSpeed")}: <strong>{resolvedSpeed ?? 0} {t("feet")}</strong>
                      </p>
                    )}
                    {selectedItem.data?.hpPerLevel && (
                      <p style={{ margin: "8px 0", fontSize: "12.5px" }}>
                        {t("hpPerLevel")}: <strong>{selectedItem.data.hpPerLevel}</strong> · {t("keyAbility")}: <strong>{selectedItem.data.keyAbility?.join(", ")}</strong>
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    <div className="picker-desc">
                      {selectedItem.data?.summaries?.[locale] ?? selectedItem.data?.description ?? t("selectDetails")}
                    </div>

                    {/* SOURCE BOOK */}
                    <div className="picker-source-tag">
                      {t("source")}: {sourceLabel}
                    </div>
                  </>
                ) : (
                  <p className="picker-empty">{t("selectDetails")}</p>
                )}
              </article>
            </>
          )}
        </div>

        {/* FOOTER */}
        <footer className="picker-footer">
          {isPurchasable ? (
            <>
              <button
                className={`picker-buy-btn ${!isAffordable ? "insufficient-funds" : ""}`}
                onClick={() => confirm(true)}
                disabled={!canConfirm || !isAffordable}
                type="button"
                title={isAffordable ? `${footerCopy.buy} ${locale === "en" ? "for" : locale === "es" ? "por" : "por"} ${itemPriceText} ${locale === "en" ? "and deduct from purse" : locale === "es" ? "y deducir de la bolsa" : "e deduzir da carteira"}` : `${locale === "en" ? "Insufficient coins! Cost" : locale === "es" ? "¡Monedas insuficientes! Coste" : "Moedas insuficientes! Custo"}: ${itemPriceText}`}
              >
                {footerCopy.buy} ({itemPriceText})
              </button>
              <button className="picker-confirm" onClick={() => confirm(false)} disabled={!canConfirm} type="button" title={footerCopy.giveTitle}>
                {footerCopy.give}
              </button>
              <button className="picker-cancel" onClick={bridge.close} type="button">
                {t("cancel")}
              </button>
              <button
                className="picker-cancel"
                onClick={() => window.open(pickerType === "weapon" ? "https://2e.aonprd.com/Weapons.aspx" : "https://2e.aonprd.com", "_blank")}
                type="button"
              >
                {footerCopy.prd}
              </button>
              <button
                className={`picker-cancel ${activeSubTab === "Custom" ? "active" : ""}`}
                onClick={() => setActiveSubTab(activeSubTab === "Custom" ? "Standard" : "Custom")}
                type="button"
              >
                {footerCopy.custom}
              </button>

              {/* LIVE COIN PURSE DISPLAY */}
              <div className="picker-footer-coins" title={footerCopy.walletTitle}>
                <span className="coin-indicator">
                  <span className="coin-dot pp" /> {characterCoins.pp || 0} {coinLabels.pp}
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot gp" /> {characterCoins.gp || 0} {coinLabels.gp}
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot sp" /> {characterCoins.sp || 0} {coinLabels.sp}
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot cp" /> {characterCoins.cp || 0} {coinLabels.cp}
                </span>
              </div>
            </>
          ) : (
            <>
              <button className="picker-confirm" onClick={() => confirm(false)} disabled={!canConfirm} type="button">
                {t("accept")}
              </button>
              <button className="picker-cancel" onClick={bridge.close} type="button">
                {t("cancel")}
              </button>
              <button className="picker-cancel" onClick={() => window.open("https://2e.aonprd.com", "_blank")} type="button">
                {footerCopy.prd}
              </button>
              <button className="picker-cancel" onClick={clearSelection} type="button">
                {footerCopy.clear}
              </button>
            </>
          )}
        </footer>
      </section>
    </div>
  );
}
