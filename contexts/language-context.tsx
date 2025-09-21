"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "hi" | "od"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (text: string) => Promise<string>
  tSync: (text: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translationCache = new Map<string, string>()

const languageMap: Record<Language, string> = {
  en: "en",
  hi: "hi",
  od: "or", // Odia language code
}

async function translateText(text: string, targetLang: string): Promise<string> {
  // Return original text if target language is English
  if (targetLang === "en") return text

  const cacheKey = `${text}_${targetLang}`

  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    // Using free translation API (MyMemory API)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    )

    if (!response.ok) {
      throw new Error("Translation failed")
    }

    const data = await response.json()
    const translatedText = data.responseData?.translatedText || text

    // Cache the translation
    translationCache.set(cacheKey, translatedText)

    return translatedText
  } catch (error) {
    console.error("Translation error:", error)
    // Return original text if translation fails
    return text
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language | null
    if (savedLanguage && ["en", "hi", "od"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  const t = async (text: string): Promise<string> => {
    if (language === "en") return text
    return await translateText(text, languageMap[language])
  }

  const tSync = (text: string): string => {
    if (language === "en") return text

    const cacheKey = `${text}_${languageMap[language]}`
    return translationCache.get(cacheKey) || text
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tSync }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
