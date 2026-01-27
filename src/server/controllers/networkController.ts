import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";
import type { Graph, Edge } from "../../graph/graph.model.js";
import { saveGraph, getNodes } from "../store/graphStore.js";

type StoredGraph = { id: string; edges: Array<{ from: string; to: string; cost: number }>; graphMap: Graph };

const graphs: Map<string, StoredGraph> = new Map();

export const uploadGraph = (req: Request, res: Response) => {
  const { edges } = req.body;
  if (!edges || !Array.isArray(edges)) return res.status(400).json({ error: "Missing edges array" });

  const graphId = saveGraph(edges);
  res.status(201).json({ graphId });
};

export const getNodesHandler = (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  if (!id) return res.status(400).json({ error: "Missing graph ID" });

  const nodes = getNodes(id);
  if (!nodes) return res.status(404).json({ error: "Graph not found" });

  return res.json({ nodes });
};

// Export in-memory for routeController
export { graphs};
