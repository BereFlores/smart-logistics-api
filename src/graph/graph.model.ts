//Represents a connection between nodes in a graph
export interface Edge {
  to: string; //destination
  weight: number; // cost
}

export type Graph = Map<string, Edge[]>