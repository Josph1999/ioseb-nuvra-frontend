"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useContext, createContext } from "react";
import roTexts from "../langs/ro/translations.json";
import enTexts from "../langs/en/translations.json";

export enum Language {
  RO = "ro",
  ENG = "en",
}

export interface Translation {
  home: string;
  about: string;
  language: string;
  hello: string;
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  localizedRoute: (path: string) => string;
  renderLanguage: (text: keyof Translation) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  let defaultLang;

  if (typeof window !== "undefined") {
    defaultLang = localStorage.getItem("language") as Language | null;
  }

  const [language, setLanguage] = useState<Language>(
    defaultLang ? defaultLang : Language.RO
  );
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);

    const newPath = `${
      newLanguage === Language.RO ? "/ro" : "/en"
    }${pathname.replace(/^\/(en|ro)/, "")}`;

    router.push(newPath);
  };

  const localizedRoute = (path: string) => `/${language}${path}`;

  const renderLanguage = (text: keyof Translation): string => {
    if (language === Language.RO) {
      return roTexts[text];
    }
    if (language === Language.ENG) {
      return enTexts[text];
    }
    return roTexts[text];
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, localizedRoute, renderLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
