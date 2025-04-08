
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Search, 
  Sparkles, 
  Code, 
  MessageSquare, 
  ImageIcon, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const categories = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Search", icon: <Search size={20} />, path: "/search" },
    { name: "AI Assistants", icon: <Sparkles size={20} />, path: "/assistants" },
    { name: "Coding", icon: <Code size={20} />, path: "/coding" },
    { name: "Chat", icon: <MessageSquare size={20} />, path: "/chat" },
    { name: "Image Generation", icon: <ImageIcon size={20} />, path: "/image-generation" },
    { name: "Writing", icon: <FileText size={20} />, path: "/writing" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">
            Eno AI
          </span>
        </div>
        <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="mb-2 px-3">
          <h2 className="text-xs font-semibold text-muted-foreground px-2 py-1">
            Navigation
          </h2>
        </div>
        
        <nav className="grid gap-1 px-2">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={category.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <span className={`text-foreground/70`}>{category.icon}</span>
              <span>{category.name}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive"
              onClick={logout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
