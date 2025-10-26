import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useLocation } from "react-router-dom"
import { GridBackground } from "../grid-background"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const location = useLocation()

    // Get the current page title
    const getPageTitle = () => {
        const path = location.pathname
        if (path === "/dashboard") return "Dashboard"
        if (path === "/dashboard/courses") return "Courses"
        if (path === "/dashboard/tests") return "Tests"
        if (path === "/dashboard/certifications") return "Certifications"
        return "Dashboard"
    }

    return (
        <div className="min-h-screen  transition-colors duration-200 relative">
            <GridBackground />

            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 border-r border-border/40 bg-card/50 dark:bg-card/20 backdrop-blur-sm z-30 shadow-sm dark:shadow-none">
                <Sidebar />
            </div>

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50  backdrop-blur-xl border-b border-border/40 h-16 flex items-center px-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-4 hover:bg-accent/10 dark:hover:bg-accent/5 md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="p-0 w-64 border-r border-border/40 bg-card/95 dark:bg-card/80 backdrop-blur-sm"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                            >
                                <Sidebar mobile />
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-xl font-bold text-foreground dark:text-foreground/90">{getPageTitle()}</h1>
                    </div>
                    <DashboardHeader />
                </div>
            </div>

            {/* Main Content */}
            <main className="md:pl-64 pt-16 min-h-screen min-w-[320px] relative z-10">
                <div className="container mx-auto px-4 py-6">
                    {children}
                </div>
            </main>
        </div>
    )
}