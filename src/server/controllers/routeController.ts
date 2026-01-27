// src/server/controllers/routeController.ts
import type { Request, Response } from "express";
import { getGraph } from "../store/graphStore.js";
import { dijkstra } from "../../graph/dijkstra.js";
import { performance } from "perf_hooks";

export const optimizeRoute = (req: Request, res: Response) => {
  const { id } = req.params;
  const { originNodeId, destinationNodeId } = req.body;

  if (!id || !originNodeId || !destinationNodeId)
    return res.status(400).json({ error: "Missing id, origin or destination" });

  const graphId = Array.isArray(id) ? id[0] : id;
  const g = getGraph(graphId as string);             
  if (!g) return res.status(404).json({ error: "Graph not found" });

  try {
    const startTime = performance.now(); // Beginning of calculation
    const result = dijkstra(g.graphMap, originNodeId, destinationNodeId);
    const endTime = performance.now();   // End of calculation

    if (!result) return res.status(404).json({ error: "No path found" });

    let totalCost = 0;
    for (let i = 0; i < result.path.length - 1; i++) {
      const from = result.path[i];
      const to = result.path[i + 1];
      if (from && to) {
        const edge = g.graphMap.get(from)?.find(e => e.to === to);
        if (edge) totalCost += edge.weight;
      }
    }

    res.json({
      graphId: id,
      path: result.path,
      totalCost,
      durationMs: Math.round(endTime - startTime) // ms taken for calculation
    });
  } catch {
    res.status(500).json({ error: "Error calculating shortest path" });
  }
};
