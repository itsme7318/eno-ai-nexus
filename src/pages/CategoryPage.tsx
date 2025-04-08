
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchToolsByCategory } from "@/services/aiToolsService";
import AICard from "@/components/dashboard/AICard";
import useIconMapping from "@/hooks/useIconMapping";

// Helper function to format category name
const formatCategoryName = (categoryId: string): string => {
  // Convert kebab-case to Title Case
  return categoryId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { getIconByName } = useIconMapping();
  
  const categoryName = categoryId ? formatCategoryName(categoryId) : '';
  
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['categoryTools', categoryId],
    queryFn: () => categoryId ? fetchToolsByCategory(categoryName) : Promise.resolve([]),
    enabled: !!categoryId
  });
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryName} Tools</h1>
          <p className="text-muted-foreground">
            Explore the best AI tools for {categoryName.toLowerCase()}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-lg">Loading {categoryName} tools...</span>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 p-6 rounded-lg flex items-center">
            <AlertCircle className="h-6 w-6 text-destructive mr-2" />
            <p>Failed to load tools. Please try again later.</p>
          </div>
        ) : tools && tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tools.map((tool) => (
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
          <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
            <p className="text-xl mb-2">No tools found in this category</p>
            <p className="text-muted-foreground mb-4">We're constantly adding new AI tools to our collection.</p>
            <Button onClick={() => navigate("/")}>Explore Other Categories</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CategoryPage;
