import { dijkstra } from "../graph/dijkstra.js";

describe("Dijkstra algorithm", () => {

  test("shortest path A -> C (default: shortest)", () => {
    const graph = new Map([
      ["A", [
        { to: "B", weight: 5 },
        { to: "C", weight: 10 }
      ]],
      ["B", [{ to: "C", weight: 3 }]],
      ["C", []]
    ]);

    const result = dijkstra(graph, "A", "C");

    expect(result?.path).toEqual(["A", "B", "C"]);
    expect(result?.distance).toBe(8);
  });

  test("fastest path A -> C uses time instead of weight", () => {
    const graph = new Map([
      ["A", [
        { to: "B", weight: 10, time: 2 },
        { to: "C", weight: 5, time: 8 }
      ]],
      ["B", [{ to: "C", weight: 3, time: 2 }]],
      ["C", []]
    ]);

    const result = dijkstra(graph, "A", "C", {
      preference: "fastest"
    });

    expect(result?.path).toEqual(["A", "B", "C"]);
    expect(result?.distance).toBe(4); // 2 + 2
  });

  test("avoidHighways constraint forces alternative route", () => {
    const graph = new Map([
      ["A", [
        { to: "B", weight: 1, type: "highway" },
        { to: "C", weight: 5 }
      ]],
      ["B", [{ to: "D", weight: 1 }]],
      ["C", [{ to: "D", weight: 1 }]],
      ["D", []]
    ]);

    const result = dijkstra(graph, "A", "D", {
      constraints: { avoidHighways: true }
    });

    expect(result?.path).toEqual(["A", "C", "D"]);
    expect(result?.distance).toBe(6);
  });

  test("returns null when destination is unreachable", () => {
    const graph = new Map([
      ["A", [{ to: "B", weight: 5 }]],
      ["B", []],
      ["C", []]
    ]);

    const result = dijkstra(graph, "A", "C");

    expect(result).toBeNull();
  });

  test("path from node to itself", () => {
    const graph = new Map([
      ["A", [{ to: "B", weight: 1 }]],
      ["B", []]
    ]);

    const result = dijkstra(graph, "A", "A");

    expect(result?.path).toEqual(["A"]);
    expect(result?.distance).toBe(0);
  });

});
