
import React from "react";
import { 
  Code, 
  MessagesSquare, 
  Brush, 
  FileText, 
  Presentation, 
  Brain, 
  PenTool, 
  Mail,
  GitBranch,
  Zap,
  Box,
  Copy,
  Image
} from "lucide-react";

export const useIconMapping = () => {
  const getIconByName = (iconName: string, size: number = 20) => {
    const iconMap: {[key: string]: JSX.Element} = {
      'code': <Code size={size} />,
      'message-square': <MessagesSquare size={size} />,
      'brush': <Brush size={size} />,
      'file-text': <FileText size={size} />,
      'presentation': <Presentation size={size} />,
      'brain': <Brain size={size} />,
      'pen-tool': <PenTool size={size} />,
      'mail': <Mail size={size} />,
      'git-branch': <GitBranch size={size} />,
      'zap': <Zap size={size} />,
      'box': <Box size={size} />,
      'copy': <Copy size={size} />,
      'image': <Image size={size} />
    };
    
    return iconMap[iconName] || <Code size={size} />;
  };

  return { getIconByName };
};

export default useIconMapping;
