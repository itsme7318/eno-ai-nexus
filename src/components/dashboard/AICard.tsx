
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AICardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  isNew?: boolean;
  isPro?: boolean;
  url?: string;
}

const AICard: React.FC<AICardProps> = ({
  id,
  name,
  description,
  icon,
  color,
  category,
  isNew = false,
  isPro = false,
  url,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);
    } else {
      navigate(`/tool/${id}`);
    }
  };

  return (
    <Card
      className={`ai-card cursor-pointer h-full`}
      style={{ 
        backgroundColor: `${color}15`,
        borderColor: `${color}30`
      }}
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}30` }}
          >
            <div className="text-foreground">{icon}</div>
          </div>
          <div className="flex gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
                New
              </Badge>
            )}
            {isPro && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30">
                Pro
              </Badge>
            )}
          </div>
        </div>
        <h3 className="text-lg font-medium mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4">
          <Badge variant="outline" className="text-xs bg-background/50">
            {category}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default AICard;
