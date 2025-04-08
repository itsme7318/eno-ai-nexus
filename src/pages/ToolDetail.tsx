import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Star, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchToolById, trackToolUsage } from "@/services/aiToolsService";
import { toast } from "sonner";
import useIconMapping from "@/hooks/useIconMapping";

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIconByName } = useIconMapping();
  
  const { data: tool, isLoading, error } = useQuery({
    queryKey: ['tool', id],
    queryFn: () => id ? fetchToolById(id) : null,
    enabled: !!id
  });
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
          <span className="text-lg">Loading tool details...</span>
        </div>
      </AppLayout>
    );
  }
  
  if (error || !tool) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
          <p className="text-muted-foreground mb-6">The AI tool you're looking for doesn't exist or couldn't be loaded.</p>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleLaunch = async () => {
    // Track usage when launching the tool
    await trackToolUsage(tool.id);
    
    // If it's an external tool, open in a new tab
    if (tool.external_url) {
      window.open(tool.external_url, "_blank");
    } else if (tool.url) {
      // For internal tools with specific paths
      navigate(tool.url);
    } else {
      // Fallback message if no URL is available
      toast.info(`Launching ${tool.name}...`);
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div 
            className="p-8"
            style={{
              background: `linear-gradient(to right, ${tool.color}30, ${tool.color}10)`,
              borderBottom: `1px solid ${tool.color}30`
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div 
                className="h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${tool.color}30` }}
              >
                {getIconByName(tool.icon_name, 24)}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{tool.name}</h1>
                  <Badge className="bg-muted">{tool.category}</Badge>
                </div>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button onClick={handleLaunch}>
                  Launch Tool
                </Button>
                {tool.external_url && (
                  <Button variant="outline" asChild>
                    <a href={tool.external_url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">About {tool.name}</h2>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">
                        ✓
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="bg-muted/30 rounded-lg p-5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Rating</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{tool.rating}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Pricing</h3>
                    <p className="text-sm text-muted-foreground">{tool.pricing}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <Badge className="bg-muted">{tool.category}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ToolDetail;
