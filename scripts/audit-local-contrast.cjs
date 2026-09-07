const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const viewports = [[375, 667], [1280, 800]];

function parseColor(value) {
  const match = value?.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3 || parts.some((part, index) => index < 3 && !Number.isFinite(part))) return null;
  return { r: parts[0], g: parts[1], b: parts[2], a: Number.isFinite(parts[3]) ? parts[3] : 1 };
}

function composite(foreground, background) {
  const alpha = foreground.a;
  return {
    r: foreground.r * alpha + background.r * (1 - alpha),
    g: foreground.g * alpha + background.g * (1 - alpha),
    b: foreground.b * alpha + background.b * (1 - alpha),
    a: 1,
  };
}

function relativeLuminance(color) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

async function auditPage(page, theme) {
  await page.evaluate((nextTheme) => {
    localStorage.setItem("pathbuilder_theme", nextTheme);
  }, theme);
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(350);
  return page.evaluate(({ theme: currentTheme }) => {
    const isVisible = (element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0 || element.getClientRects().length === 0 ||
        element.closest("#legacy-builder-root[hidden], .pb-drawer-overlay[hidden]")) return false;
      for (let node = element; node && node !== document.documentElement; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden" || Number.parseFloat(style.opacity || "1") === 0) return false;
        if (node.classList.contains("pb-drawer-overlay") && !node.classList.contains("active")) return false;
        if (node.classList.contains("pb-mobile-tabs-backdrop") && !node.classList.contains("active")) return false;
      }
      return true;
    };
    const parse = (value) => {
      const match = value?.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      if (parts.length < 3 || parts.some((part, index) => index < 3 && !Number.isFinite(part))) return null;
      return { r: parts[0], g: parts[1], b: parts[2], a: Number.isFinite(parts[3]) ? parts[3] : 1 };
    };
    const blend = (foreground, background) => {
      const alpha = foreground.a;
      return {
        r: foreground.r * alpha + background.r * (1 - alpha),
        g: foreground.g * alpha + background.g * (1 - alpha),
        b: foreground.b * alpha + background.b * (1 - alpha),
        a: 1,
      };
    };
    const luminance = (color) => {
      const channel = (value) => {
        const normalized = value / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
    };
    const ratio = (foreground, background) => {
      const foregroundLuminance = luminance(foreground);
      const backgroundLuminance = luminance(background);
      return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
        (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
    };
    const bodyStyle = getComputedStyle(document.body);
    const bodyBackground = parse(bodyStyle.backgroundColor) || { r: 0, g: 0, b: 0, a: 1 };
    const effectiveBackground = (element) => {
      let background = bodyBackground;
      const ancestors = [];
      for (let node = element; node && node !== document.documentElement; node = node.parentElement) ancestors.unshift(node);
      for (const ancestor of ancestors) {
        const style = getComputedStyle(ancestor);
        const color = parse(style.backgroundColor);
        if (color && color.a > 0) background = blend(color, background);
      }
      return background;
    };
    const allElements = [...document.querySelectorAll("body *")];
    const visibleElements = allElements.filter(isVisible);
    const textElements = visibleElements.filter((element) => {
      if (!isVisible(element)) return false;
      if (!["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL", "P", "SPAN", "SMALL", "STRONG", "EM", "H1", "H2", "H3", "H4", "LI", "DT", "DD"].includes(element.tagName)) return false;
      const text = element.textContent.trim();
      const childWithText = [...element.children].some((child) => child.textContent.trim().length > 0);
      return text.length >= 2 && /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(text) && !childWithText;
    });
    const entries = textElements.map((element) => {
      const style = getComputedStyle(element);
      const foreground = parse(style.color);
      if (!foreground) return null;
      const background = effectiveBackground(element);
      const computedRatio = ratio(foreground, background);
      const fontSize = Number.parseFloat(style.fontSize) || 16;
      const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
      const largeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const required = largeText ? 3 : 4.5;
      return {
        text: element.textContent.trim().replace(/\s+/g, " ").slice(0, 100),
        selector: element.id ? `#${element.id}` : `.${[...element.classList].join(".")}` || element.tagName.toLowerCase(),
        ratio: Number(computedRatio.toFixed(2)),
        required,
        foreground: style.color,
        background: `rgb(${Math.round(background.r)}, ${Math.round(background.g)}, ${Math.round(background.b)})`,
        fontSize: style.fontSize,
      };
    }).filter(Boolean);
    return {
      examined: entries.length,
      visible: visibleElements.length,
      candidates: textElements.length,
      failures: entries.filter((entry) => entry.ratio < entry.required).slice(0, 80),
    };
  }, { theme });
}

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext();
  const report = [];
  try {
    for (const route of ["compendium", "builder"]) {
      const page = await context.newPage();
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height });
        await page.goto(`${baseUrl}/#/${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(350);
        for (const theme of ["dark", "light"]) {
          const audit = await auditPage(page, theme);
          report.push({ route, width, height, theme, examined: audit.examined, visible: audit.visible, candidates: audit.candidates, failures: audit.failures });
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  const failures = report.flatMap((entry) => entry.failures.map((failure) => ({ ...entry, failure })));
  console.log(JSON.stringify({ runs: report.length, examined: report.reduce((total, entry) => total + entry.examined, 0), visible: report.reduce((total, entry) => total + entry.visible, 0), candidates: report.reduce((total, entry) => total + entry.candidates, 0), failureCount: failures.length, failures: failures.slice(0, 80) }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
