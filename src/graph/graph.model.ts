//Represents a connection between nodes in a graph
export interface Edge {
  to: string; //destination
  weight: number; // cost
  time?: number; // optional time attribute
  type?: string; // type of constraint
}

export type Graph = Map<string, Edge[]>

//Temporal storage for graph nodes
export interface GraphNode {
  id: string;
  edges: {from: string; to: string; cost: number; time?: number; type?: string}[];
  graph: Graph;
}