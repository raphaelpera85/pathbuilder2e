import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useI18n } from "./i18n";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "pathbuilder_theme";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // ignore localStorage errors
  }
  return "dark";
}

export function applyThemeToDOM(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.remove("theme-dark", "theme-light");
  document.documentElement.classList.add(`theme-${theme}`);
  if (document.body) {
    document.body.setAttribute("data-theme", theme);
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
    applyThemeToDOM(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark",
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  const isDark = theme === "dark";
  const label = isDark ? (t("themeLight") || "Tema Claro") : (t("themeDark") || "Tema Escuro");
  const title = `${t("theme") || "Tema"}: ${isDark ? (t("themeDark") || "Tema Escuro") : (t("themeLight") || "Tema Claro")}`;

  return (
    <div className="theme-switcher" title={title}>
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleTheme}
        title={title}
        aria-label={label}
      >
        <span className="theme-icon" aria-hidden="true">
          {isDark ? "🌙" : "☀️"}
        </span>
        <span className="theme-toggle-text">{isDark ? "Escuro" : "Claro"}</span>
      </button>
    </div>
  );
}
