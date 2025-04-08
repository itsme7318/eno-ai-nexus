
import React from "react";
import { Loader2, AlertCircle } from "lucide-react";
import AICard from "@/components/dashboard/AICard";
import { AITool, fetchAllAITools } from "@/services/aiToolsService";
import { useQuery } from "@tanstack/react-query";
import useIconMapping from "@/hooks/useIconMapping";

const FeaturedTools: React.FC = () => {
  const { getIconByName } = useIconMapping();
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['featuredTools'],
    queryFn: fetchAllAITools
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading AI tools...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-6 rounded-lg flex items-center">
        <AlertCircle className="h-6 w-6 text-destructive mr-2" />
        <p>Failed to load AI tools. Please try again later.</p>
      </div>
    );
  }

  if (!tools || tools.length === 0) {
    return <p className="text-muted-foreground">No AI tools available.</p>;
  }

  // Limit to 8 tools for the featured section
  const featuredTools = tools.slice(0, 8);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {featuredTools.map((tool) => (
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
          external_url={tool.external_url}
        />
      ))}
    </div>
  );
};

export default FeaturedTools;
