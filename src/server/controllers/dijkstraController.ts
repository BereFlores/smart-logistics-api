import type { Request, Response } from "express";
import { dijkstra } from "../../graph/dijkstra.js";
import type { Graph, Edge } from "../../graph/graph.model.js";

// Helper to convert JSON object to Map
function parseGraph(rawGraph: Record<string, { node: string; cost: number }[]>): Graph {
  const graphMap: Graph = new Map();
  for (const node in rawGraph) {
    if (rawGraph[node]) {
      graphMap.set(node, rawGraph[node].map(e => ({ to: e.node, weight: e.cost })));
    }
  }
  return graphMap;
}

export const getShortestPath = (req: Request, res: Response) => {
  const { graph, startNode, endNode } = req.body;

  if (!graph || !startNode || !endNode) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  try {
    const graphMap = parseGraph(graph);
    const result = dijkstra(graphMap, startNode, endNode);

    if (!result) {
      return res.status(404).json({ error: "No path found between the specified nodes." });
    }

    // Calculate total cost from path
    let totalCost = 0;
    const path = result.path;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      if (from && to) {
        const edge = graphMap.get(from)?.find(e => e.to === to);
        if (edge) totalCost += edge.weight;
      }
    }

    return res.status(200).json({ shortestPath: result.path, totalCost });
  } catch (err) {
    console.error("Error in getShortestPath:", err);
    return res.status(500).json({ error: "An error occurred while calculating the shortest path." });
  }
};
