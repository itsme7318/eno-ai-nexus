
import React, { useState } from "react";
import {
  Bell,
  Search,
  UserCircle,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // For demo purposes only - we'd normally use a theme provider
  };

  return (
    <header className="border-b border-border h-14 flex items-center px-4 gap-4">
      <SidebarTrigger className="lg:hidden" />
      
      <div className="relative flex-1 max-w-xl hidden sm:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search for AI tools..."
          className="pl-10 bg-muted/40 border-none focus-visible:ring-primary/20"
        />
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          {theme === "dark" ? (
            <Sun size={20} onClick={toggleTheme} />
          ) : (
            <Moon size={20} onClick={toggleTheme} />
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
