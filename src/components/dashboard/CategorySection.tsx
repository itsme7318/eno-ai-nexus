
import React from "react";
import { 
  Code, 
  FileText, 
  Presentation, 
  ImageIcon, 
  MessageSquare, 
  Lightbulb, 
  BarChart3, 
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Development",
    icon: <Code size={24} />,
    description: "AI tools for coding and development",
    color: "#8B5CF6",
    path: "/category/development"
  },
  {
    name: "Writing",
    icon: <FileText size={24} />,
    description: "Content creation and editing tools",
    color: "#10B981",
    path: "/category/writing"
  },
  {
    name: "Presentation",
    icon: <Presentation size={24} />,
    description: "Create stunning presentations with AI",
    color: "#F59E0B",
    path: "/category/presentation"
  },
  {
    name: "Image Generation",
    icon: <ImageIcon size={24} />,
    description: "AI-powered image creation tools",
    color: "#EC4899",
    path: "/category/image-generation"
  },
  {
    name: "Chat & Assistants",
    icon: <MessageSquare size={24} />,
    description: "AI chatbots and personal assistants",
    color: "#3B82F6",
    path: "/category/chat-assistants"
  },
  {
    name: "Ideation",
    icon: <Lightbulb size={24} />,
    description: "Brainstorming and idea generation",
    color: "#14B8A6",
    path: "/category/ideation"
  },
  {
    name: "Data Analysis",
    icon: <BarChart3 size={24} />,
    description: "Data processing and visualization",
    color: "#6366F1",
    path: "/category/data-analysis"
  },
  {
    name: "Research",
    icon: <Globe size={24} />,
    description: "Research and information gathering",
    color: "#F43F5E",
    path: "/category/research"
  }
];

const CategorySection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.name} 
          to={category.path}
          className="rounded-xl p-4 hover:bg-card/70 transition-all duration-200 border border-border/50 hover:border-border/80 group"
        >
          <div 
            className="h-10 w-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110" 
            style={{ backgroundColor: `${category.color}20` }}
          >
            <span style={{ color: category.color }}>{category.icon}</span>
          </div>
          <h3 className="font-medium mb-1">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategorySection;
