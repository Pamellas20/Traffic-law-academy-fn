import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface Language {
    code: string
    name: string
    nativeName: string
    flag: string
}

const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "rw", name: "Kinyarwanda", nativeName: "Ikinyarwanda", flag: "🇷🇼" },
]

interface LanguageSelectorProps {
    variant?: "button" | "icon"
    className?: string
}

export function LanguageSelector({ variant = "button", className }: LanguageSelectorProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en")

    const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0]

    const handleLanguageChange = (languageCode: string) => {
        setSelectedLanguage(languageCode)
        console.log(`Language changed to: ${languageCode}`)
    }

    if (variant === "icon") {
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full transition-colors duration-200 hover:bg-accent/50 ${className}`}
                    >
                        <span className="text-sm font-semibold text-primary">{currentLanguage.code.toUpperCase()}</span>
                        <span className="sr-only">Select language</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-56 bg-background/95 backdrop-blur-md border border-border shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                    sideOffset={8}
                    style={{ zIndex: 999999 }}
                >
                    <DropdownMenuSeparator />
                    {languages.map((language) => (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`cursor-pointer transition-colors duration-150 hover:bg-accent/80 ${selectedLanguage === language.code ? 'bg-accent/50' : ''
                                }`}
                        >
                            <span className="mr-2 text-base">{language.flag}</span>
                            <span className="font-medium">{language.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={`gap-2 transition-all duration-200 hover:bg-accent/50 hover:border-primary/50 ${className}`}
                >
                    <span className="text-base">{currentLanguage.flag}</span>
                    <span className="hidden sm:inline">{currentLanguage.name}</span>
                    <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
                    <ChevronDown className="w-4 h-4 chevron-down" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56 bg-background/95 backdrop-blur-md border border-border shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                sideOffset={8}
                style={{ zIndex: 999999 }}
            >
                <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`cursor-pointer transition-colors duration-150 hover:bg-accent/80 ${selectedLanguage === language.code ? 'bg-accent/50' : ''
                            }`}
                    >
                        <span className="mr-2 text-base">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}