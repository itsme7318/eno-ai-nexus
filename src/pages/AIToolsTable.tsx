
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCategory {
  name: string;
  emoji: string;
  tools: string[];
  uses: string[];
}

const AIToolsTable: React.FC = () => {
  const categories: ToolCategory[] = [
    {
      name: "Medical & Healthcare",
      emoji: "🧠",
      tools: ["PathAI", "Aidoc", "IBM Watson Health", "BioGPT", "Glass AI"],
      uses: ["Diagnosis support", "Medical imaging", "Drug discovery", "Health chatbots", "Research summaries"]
    },
    {
      name: "Scientific Research",
      emoji: "🧪",
      tools: ["Semantic Scholar", "Elicit", "Scite.ai", "Galactica", "ResearchRabbit"],
      uses: ["AI research assistant", "Paper summaries", "Citation tracking", "Question answering"]
    },
    {
      name: "UI/UX Design",
      emoji: "🎨",
      tools: ["Uizard", "Galileo AI", "Magician for Figma", "Visily", "Framer AI"],
      uses: ["UI generation from text", "Wireframing", "Prototype creation", "User journey design"]
    },
    {
      name: "Presentation Creation",
      emoji: "🧑‍🏫",
      tools: ["Gamma", "Tome", "Beautiful.ai", "Canva", "SlidesAI"],
      uses: ["Auto-generated slides", "Design", "Storytelling", "Visuals", "Pitch creation"]
    },
    {
      name: "Image Generation",
      emoji: "🎨",
      tools: ["Midjourney", "DALL·E", "Adobe Firefly", "Leonardo.ai", "Stable Diffusion"],
      uses: ["Visual assets", "Illustrations", "Logos", "Diagrams", "Art", "Social content"]
    },
    {
      name: "Video Creation",
      emoji: "🎥",
      tools: ["Synthesia", "HeyGen", "Runway ML", "Pictory", "Lumen5"],
      uses: ["AI avatars", "Text-to-video", "Explainer videos", "Content repurposing"]
    },
    {
      name: "Writing & Copy",
      emoji: "✍️",
      tools: ["ChatGPT", "Jasper", "Copy.ai", "Writesonic", "Grammarly"],
      uses: ["Blog writing", "Ad copy", "Product descriptions", "SEO content", "Grammar fixing"]
    },
    {
      name: "Marketing & Branding",
      emoji: "📢",
      tools: ["Copy.ai", "Ocoya", "Predis.ai", "AdCreative.ai", "Brandmark.io"],
      uses: ["Social post generation", "Ad creatives", "Slogans", "Branding", "Logo generation"]
    },
    {
      name: "Data Analysis",
      emoji: "📊",
      tools: ["ChatGPT Code Interpreter", "Tableau + GPT", "MonkeyLearn", "Akkio"],
      uses: ["Data cleaning", "Visualizations", "Dashboards", "Natural language queries"]
    },
    {
      name: "Software Development",
      emoji: "👨‍💻",
      tools: ["GitHub Copilot", "Amazon CodeWhisperer", "Tabnine", "Cody", "Replit Ghostwriter"],
      uses: ["Code generation", "Debugging", "Refactoring", "Test writing"]
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Tools Master Table</h1>
          <p className="text-muted-foreground">
            A comprehensive collection of AI tools organized by category with their key use cases
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Category / Use Case</TableHead>
                  <TableHead>AI Tools</TableHead>
                  <TableHead>Sub-Uses / Features</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.emoji}</span>
                        <span>{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {category.tools.map((tool) => (
                          <Badge 
                            key={tool} 
                            variant="outline"
                            className="bg-primary/5 hover:bg-primary/10"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {category.uses.map((use) => (
                          <span 
                            key={use} 
                            className="inline-block text-sm text-muted-foreground px-2 py-1 rounded-md bg-muted"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AIToolsTable;
