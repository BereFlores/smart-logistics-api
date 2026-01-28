// Network DTOs - Data Transfer Objects for network-related requests and responses

// Edge data for uploading a graph
export interface EdgeInput {
  from: string;
  to: string;
  cost: number;
  time?: number;
  type?: string;
}

// Request DTO for uploading a new graph
export interface UploadGraphRequest {
  edges: EdgeInput[];
}

// Response DTO for uploading a graph
export interface UploadGraphResponse {
  graphId: string;
}

// Response DTO for getting nodes from a graph
export interface GetNodesResponse {
  nodes: string[];
}

// Error Response DTO
export interface ErrorResponse {
  error: string;
}
