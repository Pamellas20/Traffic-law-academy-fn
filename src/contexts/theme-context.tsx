import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem('theme') as Theme
        if (storedTheme) {
            return storedTheme
        }
        // Check system preference on initial load
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return prefersDark ? "dark" : "light"
    })

    useEffect(() => {
        // Apply theme class to document element
        const root = document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
        
        // Store theme in localStorage
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}