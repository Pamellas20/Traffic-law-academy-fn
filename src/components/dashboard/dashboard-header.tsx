import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bell, Moon, Sun, User, Settings, LogOut } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export const DashboardHeader = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex items-center gap-2 md:gap-4">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full flex hover:bg-accent/10 dark:hover:text-accent-foreground"
            >
                <Bell className="h-5 w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-accent/10 dark:hover:text-accent-foreground"
            >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/user.png" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border border-border shadow-lg" sideOffset={5}>
                    <div className="flex items-center gap-3 p-3">
                        <Avatar className="h-10 w-10 ring-1 ring-border">
                            <AvatarImage src="/avatars/user.png" />
                            <AvatarFallback className="bg-muted text-muted-foreground">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                            <p className="font-medium leading-none text-foreground">John Doe</p>
                            <p className="text-sm text-muted-foreground">john@example.com</p>
                        </div>
                    </div>
                    <DropdownMenuSeparator className="dark:border-border/50" />
                    <DropdownMenuItem className="cursor-pointer focus:bg-accent/10 dark:focus:bg-accent/20">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer focus:bg-accent/10 dark:focus:bg-accent/20">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="dark:border-border/50" />
                    <DropdownMenuItem className="text-destructive cursor-pointer focus:bg-destructive/10 dark:hover:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}