
// Constraints for route optimization
export interface RouteConstraints {
  maxCost?: number;
  blockedNodes?: string[];
  avoidTypes?: string[];
}

// Request DTO for optimizing a route
export interface OptimizeRouteRequest {
  originNodeId: string;
  destinationNodeId: string;
  preference?: "shortest" | "fastest";
  constraints?: RouteConstraints;
}

// Response DTO for route optimization
export interface OptimizeRouteResponse {
  graphId: string;
  path: string[];
  totalCost: number;
  durationMs: number;
}

// Error Response DTO
export interface ErrorResponse {
  error: string;
}
