
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon_name: string;
  color: string;
  is_pro: boolean;
  is_new: boolean;
  url: string;
  external_url: string;
  features: string[];
  pricing: string;
  rating: number;
}

export const fetchAllAITools = async (): Promise<AITool[]> => {
  try {
    const { data, error } = await supabase.from("ai_tools").select("*");
    
    if (error) {
      throw error;
    }
    
    return data as AITool[];
  } catch (error) {
    console.error("Error fetching AI tools:", error);
    toast.error("Failed to load AI tools");
    return [];
  }
};

export const fetchToolsByCategory = async (category: string): Promise<AITool[]> => {
  try {
    const { data, error } = await supabase
      .from("ai_tools")
      .select("*")
      .eq("category", category);
    
    if (error) {
      throw error;
    }
    
    return data as AITool[];
  } catch (error) {
    console.error(`Error fetching ${category} tools:`, error);
    toast.error(`Failed to load ${category} tools`);
    return [];
  }
};

export const fetchToolById = async (id: string): Promise<AITool | null> => {
  try {
    const { data, error } = await supabase
      .from("ai_tools")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as AITool;
  } catch (error) {
    console.error(`Error fetching tool with ID ${id}:`, error);
    toast.error("Failed to load tool details");
    return null;
  }
};

export const trackToolUsage = async (toolId: string): Promise<void> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      // User not logged in, don't track usage
      return;
    }
    
    const { data: existingRecord, error: fetchError } = await supabase
      .from("user_tools")
      .select("*")
      .eq("user_id", user.user.id)
      .eq("tool_id", toolId)
      .single();
    
    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw fetchError;
    }
    
    if (existingRecord) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("user_tools")
        .update({
          last_used: new Date().toISOString(),
          use_count: existingRecord.use_count + 1
        })
        .eq("id", existingRecord.id);
      
      if (updateError) {
        throw updateError;
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from("user_tools")
        .insert({
          user_id: user.user.id,
          tool_id: toolId,
          last_used: new Date().toISOString(),
          use_count: 1
        });
      
      if (insertError) {
        throw insertError;
      }
    }
  } catch (error) {
    console.error("Error tracking tool usage:", error);
    // Don't show a toast here as it's not critical for the user experience
  }
};

export const fetchRecentlyUsedTools = async (limit: number = 4): Promise<AITool[]> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from("user_tools")
      .select("tool_id, last_used")
      .eq("user_id", user.user.id)
      .order("last_used", { ascending: false })
      .limit(limit);
    
    if (error) {
      throw error;
    }
    
    if (data.length === 0) {
      return [];
    }
    
    const toolIds = data.map(item => item.tool_id);
    
    const { data: tools, error: toolsError } = await supabase
      .from("ai_tools")
      .select("*")
      .in("id", toolIds);
    
    if (toolsError) {
      throw toolsError;
    }
    
    // Sort tools in the same order as the user_tools records
    const sortedTools = toolIds.map(id => 
      tools.find(tool => tool.id === id)
    ).filter(Boolean) as AITool[];
    
    return sortedTools;
  } catch (error) {
    console.error("Error fetching recently used tools:", error);
    toast.error("Failed to load your recent tools");
    return [];
  }
};
