"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime"

interface SmartTextProps {
  children: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function SmartText({ children, className, as: Component = "span" }: SmartTextProps) {
  const { language, t } = useLanguage()
  const [translatedText, setTranslatedText] = useState(children)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  if (language === "en") {
    setTranslatedText(children)
    return
  }

  setIsLoading(true)
  t(children)
    .then((translated: string) => {
      setTranslatedText(translated)
      setIsLoading(false)
    })
    .catch(() => {
      setTranslatedText(children)
      setIsLoading(false)
    })
}, [children, language, t])


  return (
    <Component className={className}>
      {isLoading ? <span className="opacity-70">{children}</span> : translatedText}
    </Component>
  )
}