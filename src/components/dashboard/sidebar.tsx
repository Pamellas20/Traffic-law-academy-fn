import { Link, useLocation } from "react-router-dom"
import { Home, Book, Award, BarChart2, Settings, LogOut } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

interface SidebarProps {
  mobile?: boolean;
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Book, label: "Courses", href: "/dashboard/courses" },
  { icon: BarChart2, label: "Tests", href: "/dashboard/tests" },
  { icon: Award, label: "Certifications", href: "/dashboard/certifications" },
]

const bottomMenuItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: LogOut, label: "Logout", href: "/logout" },
]

export const Sidebar = ({ mobile }: SidebarProps) => {
  const location = useLocation()

  return (
    <aside className={cn(
      "flex flex-col h-full transition-all duration-300 ease-in-out",
      mobile && "animate-in slide-in-from-left"
    )}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 ">
        <div className="w-10 h-10 rounded-xl bg-brand-gradient-logo flex items-center justify-center shadow-lg dark:shadow-primary/10">
          <span className="text-2xl">🚦</span>
        </div>
        <span className="text-xl font-bold text-foreground">TrafficAcademy</span>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === "/dashboard" && location.pathname === "/dashboard")
          return (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start gap-3",
                isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-border/50 mt-auto">
        <div className="space-y-2">
          {bottomMenuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className="w-full justify-start gap-3 hover:bg-accent/10 dark:text-muted-foreground dark:hover:text-foreground"
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}