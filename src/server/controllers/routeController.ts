import type { Request, Response } from "express";
import { dijkstra } from "../../graph/dijkstra.js";
import { getGraph } from "../store/graphStore.js";

// Optimize route controller
export const optimizeRoute = (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
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
    const result = dijkstra(
      graph.graphMap,
      originNodeId,
      destinationNodeId,
      { preference, constraints }
    );

    if (!result) {
      return res.status(404).json({ error: "No path found" });
    }

    const durationMs = Math.round(performance.now() - startTime);

    res.json({
      graphId: id,
      path: result.path,
      totalCost: result.distance,
      durationMs
    });
  } catch (err) {
    console.error("Optimize error:", err);
    res.status(500).json({ error: "Error calculating route" });
  }
};
