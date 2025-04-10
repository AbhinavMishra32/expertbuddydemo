import { MindMapNode } from "@/types";
import { useEffect, useState } from "react";

export const useSelectedNode = (initialNode: MindMapNode | null = null) => {
    const [selectedNodeState, setSelectedNodeState] = useState<MindMapNode | null>(initialNode);
  
    useEffect(() => {
      setSelectedNodeState(initialNode);
    }, [initialNode]);
  
    return selectedNodeState;
  };
  