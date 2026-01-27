import type { Graph } from './graph.model.ts';  

export function dijkstra(graph: Graph, start: string, end: string) {
  const distances: Map<string, number> = new Map();
  const previous: Map<string, string | null> = new Map();
  const queue: Set<string> = new Set();

  // Initialize distances and queue
  graph.forEach((_, node) => {
    distances.set(node, Infinity);
    previous.set(node, null);
    queue.add(node);
  });
  distances.set(start, 0);

  while (queue.size > 0) {
    // Get the node with the smallest distance
    let currentNode: string | null = null;
    let smallestDistance = Infinity;
    queue.forEach(node => {
      const dist = distances.get(node)!;
      if (dist < smallestDistance) {
        smallestDistance = dist;
        currentNode = node;
      }
    });

    if (currentNode === null) break; // All remaining nodes are inaccessible

    // If we reached the end node, build the path
    if (currentNode === end) {
      const path: string[] = [];
      let step: string | null = end;
      while (step) {
        path.unshift(step);
        step = previous.get(step)!;
      }
      return {distance: distances.get(end)!, path};
    }

    queue.delete(currentNode);

    // Update distances to neighbors
    const edges = graph.get(currentNode)!;
    for (const edge of edges) {
      const alt = distances.get(currentNode)! + edge.weight;
      if (alt < distances.get(edge.to)!) {
        distances.set(edge.to, alt);
        previous.set(edge.to, currentNode);
      }
    }
  }

  return null; // No path found
}