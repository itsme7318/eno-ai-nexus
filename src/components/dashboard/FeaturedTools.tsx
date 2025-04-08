
import React from "react";
import { 
  Code, 
  MessagesSquare, 
  Brush, 
  FileText, 
  Presentation, 
  Brain, 
  PenTool, 
  Mail
} from "lucide-react";
import AICard from "@/components/dashboard/AICard";

const featuredTools = [
  {
    id: "lovable-ai",
    name: "Lovable AI",
    description: "Build React web applications through simple conversations.",
    icon: <Code size={20} />,
    color: "#8B5CF6",
    category: "Development",
    isPro: true,
    url: "/tool/lovable-ai"
  },
  {
    id: "gamma-ai",
    name: "Gamma AI",
    description: "Create beautiful presentations in seconds using AI.",
    icon: <Presentation size={20} />,
    color: "#F59E0B",
    category: "Presentation",
    url: "/tool/gamma-ai"
  },
  {
    id: "claude-ai",
    name: "Claude AI",
    description: "Advanced AI assistant with reasoning and coding abilities.",
    icon: <Brain size={20} />,
    color: "#10B981",
    category: "Assistant",
    isNew: true,
    url: "/tool/claude-ai"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's chatbot for conversation and content creation.",
    icon: <MessagesSquare size={20} />,
    color: "#6366F1",
    category: "Chat",
    url: "/tool/chatgpt"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Generate stunning art and images from text descriptions.",
    icon: <Brush size={20} />,
    color: "#EC4899",
    category: "Image Generation",
    isPro: true,
    url: "/tool/midjourney"
  },
  {
    id: "jasper-ai",
    name: "Jasper AI",
    description: "Create marketing copy, blog posts and social media content.",
    icon: <PenTool size={20} />,
    color: "#0EA5E9",
    category: "Writing",
    url: "/tool/jasper-ai"
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    description: "AI search engine with comprehensive, accurate answers.",
    icon: <FileText size={20} />,
    color: "#14B8A6",
    category: "Research",
    isNew: true,
    url: "/tool/perplexity"
  },
  {
    id: "rye",
    name: "Rye",
    description: "Generate personalized cold emails for your outreach campaigns.",
    icon: <Mail size={20} />,
    color: "#F43F5E",
    category: "Marketing",
    url: "/tool/rye"
  }
];

const FeaturedTools: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {featuredTools.map((tool) => (
        <AICard
          key={tool.id}
          id={tool.id}
          name={tool.name}
          description={tool.description}
          icon={tool.icon}
          color={tool.color}
          category={tool.category}
          isNew={tool.isNew}
          isPro={tool.isPro}
          url={tool.url}
        />
      ))}
    </div>
  );
};

export default FeaturedTools;
