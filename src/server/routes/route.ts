import { Router } from "express";
import { optimizeRoute } from "../controllers/routeController.js";

const router = Router();

/**
 * @openapi
 * /route/optimize/{id}:
 *   post:
 *     summary: Calculates the optimal route between two nodes
 *     description: >
 *       Returns the optimized route for a given graph using the selected strategy
 *       (shortest or fastest) and optional constraints.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Graph ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originNodeId
 *               - destinationNodeId
 *               - strategy
 *             properties:
 *               originNodeId:
 *                 type: string
 *                 example: A
 *               destinationNodeId:
 *                 type: string
 *                 example: D
 *               strategy:
 *                 type: string
 *                 enum: [shortest, fastest]
 *                 description: Optimization strategy
 *                 example: shortest
 *               constraints:
 *                 type: object
 *                 description: Optional optimization constraints
 *                 properties:
 *                   maxCost:
 *                     type: number
 *                     example: 100
 *                   blockedNodes:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["C"]
 *                   blockedEdges:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         from:
 *                           type: string
 *                         to:
 *                           type: string
 *                     example:
 *                       - from: B
 *                         to: C
 *     responses:
 *       200:
 *         description: Optimized route found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphId:
 *                   type: string
 *                 strategy:
 *                   type: string
 *                   enum: [shortest, fastest]
 *                 path:
 *                   type: array
 *                   items:
 *                     type: string
 *                 totalCost:
 *                   type: number
 *                 durationMs:
 *                   type: number
 *       400:
 *         description: Invalid input or missing parameters
 *       404:
 *         description: Graph or path not found
 */
router.post("/optimize/:id", optimizeRoute);

export default router;
