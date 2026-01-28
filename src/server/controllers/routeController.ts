import type { Request, Response } from "express";
import { performance } from "node:perf_hooks";

import { dijkstra } from "../../graph/dijkstra.js";
import { getGraph } from "../store/graphStore.js";

interface OptimizeRouteRequest {
  originNodeId: string;
  destinationNodeId: string;
  preference?: unknown;
  constraints?: unknown;
}

interface OptimizeRouteResponse {
  graphId: string;
  path: string[];
  totalCost: number;
  durationMs: number;
}

/**
 * Optimize route between two nodes in a graph
 */
export const optimizeRoute = (
  req: Request<{ id: string }, OptimizeRouteResponse | { error: string }, OptimizeRouteRequest>,
  res: Response
) => {
  const { id } = req.params;
  const { originNodeId, destinationNodeId, preference, constraints } = req.body;

  if (!id || !originNodeId || !destinationNodeId) {
    return res.status(400).json({
      error: "Missing graph id, originNodeId or destinationNodeId"
    });
  }

  const graph = getGraph(id);
  if (!graph) {
    return res.status(404).json({ error: "Graph not found" });
  }

  const startTime = performance.now();

  try {
    const options: Record<string, unknown> = {};
    if (preference !== undefined) options.preference = preference;
    if (constraints !== undefined) options.constraints = constraints;

    const result = dijkstra(
      graph.graphMap,
      originNodeId,
      destinationNodeId,
      options as any
    );

    if (!result) {
      return res.status(404).json({ error: "No path found" });
    }

    const durationMs = Math.round(performance.now() - startTime);

    return res.json({
      graphId: id,
      path: result.path,
      totalCost: result.distance,
      durationMs
    });
  } catch (err) {
    console.error("Optimize error:", err);
    return res.status(500).json({ error: "Error calculating route" });
  }
};
