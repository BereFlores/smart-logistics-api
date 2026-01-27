
//Graph imports type and dijkstra function to test
import { dijkstra } from "./dijkstra.js";
import type { Graph } from "./graph.model.ts";

test("Dijkstra's algorithm finds the shortest path in a graph", () => {
  const graph: Graph = new Map([
    ["A", [{ to: "B", weight: 1 }, { to: "C", weight: 4 }]],
    ["B", [{ to: "A", weight: 1 }, { to: "C", weight: 2 }, { to: "D", weight: 5 }]],
    ["C", [{ to: "A", weight: 4 }, { to: "B", weight: 2 }, { to: "D", weight: 1 }]],
    ["D", [{ to: "B", weight: 5 }, { to: "C", weight: 1 }]],
  ]);

  const result = dijkstra(graph, "A", "D");
  if (result === null) {
    throw new Error("Expected a path but got null");
  }
  const { distance, path } = result;

  if (distance !== 4) {
    throw new Error(`Expected distance 4 but got ${distance}`);
  }
  const expectedPath = ["A", "B", "C", "D"];
  if (path.length !== expectedPath.length || !path.every((node, index) => node === expectedPath[index])) {
    throw new Error(`Expected path ${expectedPath.join("->")} but got ${path.join("->")}`);
  }
});

test("Dijkstra's algorithm returns null when no path exists", () => {
  const graph: Graph = new Map([
    ["A", [{ to: "B", weight: 1 }]],
    ["B", [{ to: "A", weight: 1 }]],
    ["C", [{ to: "D", weight: 1 }]],
    ["D", [{ to: "C", weight: 1 }]],
  ]);

  const result = dijkstra(graph, "A", "D");
  if (result !== null) {
    throw new Error(`Expected null but got a path`);
  }
});     
