import { dijkstra } from "../graph/dijkstra.js";

test("shortest path A -> C", () => {
  const graph = new Map([
    ["A", [{ to: "B", weight: 5 }, { to: "C", weight: 10 }]],
    ["B", [{ to: "C", weight: 3 }]],
    ["C", []]
  ]);
  const result = dijkstra(graph, "A", "C");
  expect(result?.path).toEqual(["A", "B", "C"]);
  expect(result?.distance).toBe(8);
});

test("shortest path A -> D with no path", () => {
  const graph = new Map([
    ["A", [{ to: "B", weight: 5 }]],
    ["B", [{ to: "C", weight: 3 }]],
    ["C", []],
    ["D", []]
  ]);
  const result = dijkstra(graph, "A", "D");
  expect(result).toBeNull();
});

test("shortest path with negative weights (should ignore negative weights)", () => {
  const graph = new Map([
    ["A", [{ to: "B", weight: 2 }, { to: "C", weight: -5 }]],
    ["B", [{ to: "C", weight: 3 }]],
    ["C", []]
  ]);
  const result = dijkstra(graph, "A", "C");
  expect(result?.path).toEqual(["A", "B", "C"]);
  expect(result?.distance).toBe(5);
});

test("shortest path in a larger graph", () => {
  const graph = new Map([
    ["A", [{ to: "B", weight: 1 }, { to: "C", weight: 4 }]],
    ["B", [{ to: "C", weight: 2 }, { to: "D", weight: 5 }]],
    ["C", [{ to: "D", weight: 1 }]],
    ["D", []]
  ]);
  const result = dijkstra(graph, "A", "D");
  expect(result?.path).toEqual(["A", "B", "C", "D"]);
  expect(result?.distance).toBe(4);
});

test("shortest path from a node to itself", () => {
  const graph = new Map([
    ["A", [{ to: "B", weight: 1 }]],
    ["B", [{ to: "C", weight: 2 }]],
    ["C", []]
  ]);
  const result = dijkstra(graph, "A", "A");
  expect(result?.path).toEqual(["A"]);
  expect(result?.distance).toBe(0);
});
