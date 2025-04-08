
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";

// This is a placeholder - in a real app, you'd fetch this data from an API
const toolsData: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: JSX.Element;
  color: string;
  features: string[];
  pricing: string;
  externalUrl: string;
  rating: number;
}> = {
  "lovable-ai": {
    name: "Lovable AI",
    description: "Build React web applications through simple conversations.",
    longDescription: "Lovable AI is a revolutionary platform that allows you to create React web applications simply by having a conversation. Describe what you want to build, and Lovable AI will generate the code for you, making web development accessible to everyone.",
    category: "Development",
    icon: <span className="text-2xl">🚀</span>,
    color: "#8B5CF6",
    features: [
      "Build React apps through conversation",
      "Generate code automatically",
      "Preview in real-time",
      "Easy deployment",
      "Responsive design"
    ],
    pricing: "Free tier available, Pro plans from $20/month",
    externalUrl: "https://lovable.dev",
    rating: 4.8
  },
  "gamma-ai": {
    name: "Gamma AI",
    description: "Create beautiful presentations in seconds using AI.",
    longDescription: "Gamma AI transforms how presentations are created. Say goodbye to hours spent designing slides. With Gamma AI, you can create stunning presentations in seconds using AI. Simply describe your content, and Gamma AI will generate professional slides with perfect layouts and visuals.",
    category: "Presentation",
    icon: <span className="text-2xl">🎯</span>,
    color: "#F59E0B",
    features: [
      "AI-generated presentation slides",
      "Beautiful templates",
      "Smart content formatting",
      "Automatic visualization of data",
      "One-click export to PowerPoint"
    ],
    pricing: "Free for basic features, $8/month for Pro",
    externalUrl: "https://gamma.app",
    rating: 4.7
  }
};

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const tool = id ? toolsData[id] : null;
  
  if (!tool) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
          <p className="text-muted-foreground mb-6">The AI tool you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }
  
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
                {tool.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{tool.name}</h1>
                  <Badge className="bg-muted">{tool.category}</Badge>
                </div>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button>
                  Launch Tool
                </Button>
                <Button variant="outline" asChild>
                  <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">About {tool.name}</h2>
                <p className="text-muted-foreground mb-6">{tool.longDescription}</p>
                
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
