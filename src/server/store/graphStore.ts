// src/server/store/graphStore.ts
import type { Graph, Edge } from "../../graph/graph.model.js";
import { v4 as uuidv4 } from "uuid";

// Map of graph ID to StoredGraph
const graphs: Map<string, { id: string; edges: { from: string; to: string; cost: number }[]; graphMap: Graph }> = new Map();

// Limit the number of stored graphs to last 5
function pruneGraphs() {
  if (graphs.size > 5) {
    const oldestKey = graphs.keys().next().value;
    if (oldestKey !== undefined) {
      graphs.delete(oldestKey);
    }
  }
}

// EDGES a GRAPH MAP
export function buildGraphMap(edges: { from: string; to: string; cost: number }[]): Graph {
  const map: Graph = new Map();
  edges.forEach(edge => {
    if (!map.has(edge.from)) map.set(edge.from, []);
    map.get(edge.from)?.push({ to: edge.to, weight: edge.cost });
    if (!map.has(edge.to)) map.set(edge.to, []); // asegura nodo destino
  });
  return map;
}

// Save a graph and return its ID
export function saveGraph(edges: { from: string; to: string; cost: number }[]) {
  const id = uuidv4();
  const graphMap = buildGraphMap(edges);
  graphs.set(id, { id, edges, graphMap });
  pruneGraphs();
  return id;
}

// get a graph by ID
export function getGraph(id: string) {
  return graphs.get(id);
}

// get nodes of a graph by ID
export function getNodes(id: string) {
  const g = getGraph(id);
  if (!g) return undefined;
  return Array.from(g.graphMap.keys());
}
