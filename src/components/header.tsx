import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { LanguageSelector } from "./language-selector"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient-logo flex items-center justify-center shadow-lg">
              <span className="text-2xl">🚦</span>
            </div>
            <span className="text-xl font-bold text-foreground">TrafficAcademy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/learn" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/quiz" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector variant="icon" />
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector variant="icon" />
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <Link to="/" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
              Home
            </Link>
            <Link to="/quiz" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
              About
            </Link>
            <Link to="/roadmap" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button asChild className="w-full rounded-full">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
