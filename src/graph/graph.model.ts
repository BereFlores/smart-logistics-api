//Represents a connection between nodes in a graph
export interface Edge {
  to: string; //destination
  weight: number; // cost
}

export type Graph = Map<string, Edge[]>

//Temporal storage for graph nodes
export interface GraphNode {
  id: string;
  edges: {from: string; to: string; cost: number }[];
  graph: Graph;
}