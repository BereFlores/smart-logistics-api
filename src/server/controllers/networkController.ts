import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";
import type { Graph, Edge } from "../../graph/graph.model.js";
import { saveGraph, getNodes } from "../store/graphStore.js";
import type {
  UploadGraphRequest,
  UploadGraphResponse,
  GetNodesResponse,
  ErrorResponse,
  EdgeInput
} from "../dtos/index.js";

type StoredGraph = { id: string; edges: Array<{ from: string; to: string; cost: number }>; graphMap: Graph };

const graphs: Map<string, StoredGraph> = new Map();

/**
 * Upload a new graph to the system
 * @param req Express request with UploadGraphRequest body
 * @param res Express response with UploadGraphResponse or ErrorResponse
 */
export const uploadGraph = (req: Request<{}, UploadGraphResponse | ErrorResponse, UploadGraphRequest>, res: Response<UploadGraphResponse | ErrorResponse>) => {
  const { edges } = req.body;
  if (!edges || !Array.isArray(edges)) return res.status(400).json({ error: "Missing edges array" });

  const graphId = saveGraph(edges);
  res.status(201).json({ graphId });
};

/**
 * Get all nodes from a graph
 * @param req Express request with graph ID parameter
 * @param res Express response with GetNodesResponse or ErrorResponse
 */
export const getNodesHandler = (req: Request<{ id: string }>, res: Response<GetNodesResponse | ErrorResponse>) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  if (!id) return res.status(400).json({ error: "Missing graph ID" });

  const nodes = getNodes(id);
  if (!nodes) return res.status(404).json({ error: "Graph not found" });

  return res.json({ nodes });
};

// Export in-memory for routeController
export { graphs};
