
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategorySection from "@/components/dashboard/CategorySection";
import FeaturedTools from "@/components/dashboard/FeaturedTools";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentlyUsedTools } from "@/services/aiToolsService";
import AICard from "@/components/dashboard/AICard";
import useIconMapping from "@/hooks/useIconMapping";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getIconByName } = useIconMapping();
  
  const { data: recentTools, isLoading: isLoadingRecentTools } = useQuery({
    queryKey: ['recentTools'],
    queryFn: () => fetchRecentlyUsedTools(4),
    enabled: !!user // Only fetch if user is logged in
  });
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 p-6 lg:p-10">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-futuristic-grid bg-[length:50px_50px] opacity-10"></div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full transform translate-x-1/4 translate-y-1/4 blur-2xl"></div>
            <div className="absolute left-20 top-10 w-32 h-32 bg-gradient-radial from-white/10 to-transparent rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Welcome back, {user?.name?.split(" ")[0] || "User"}
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-6">
              Discover and use the most powerful AI tools all in one place. 
              What would you like to create today?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search AI tools..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
                />
              </div>
              <Button className="bg-white text-primary hover:bg-white/90">
                Explore All Tools
              </Button>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <CategorySection />
        </section>
        
        {/* Featured Tools */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Featured AI Tools</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <FeaturedTools />
        </section>
        
        {/* Recent Tools */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Recent Tools</h2>
            <Button variant="outline" size="sm">View History</Button>
          </div>
          {isLoadingRecentTools ? (
            <div className="flex items-center justify-center h-40 bg-card border border-border/50 rounded-xl">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span>Loading your recent tools...</span>
            </div>
          ) : recentTools && recentTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recentTools.map((tool) => (
                <AICard
                  key={tool.id}
                  id={tool.id}
                  name={tool.name}
                  description={tool.description}
                  icon={getIconByName(tool.icon_name)}
                  color={tool.color}
                  category={tool.category}
                  isNew={tool.is_new}
                  isPro={tool.is_pro}
                  url={tool.url}
                />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-xl p-6 text-center">
              <p className="text-muted-foreground">You haven't used any tools recently</p>
              <Button variant="link" className="mt-2">Explore tools</Button>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
