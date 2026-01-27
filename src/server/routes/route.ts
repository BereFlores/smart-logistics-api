import { Router } from "express";
import { optimizeRoute } from "../controllers/routeController.js";

const router = Router();

/**
 * @openapi
 * /route/optimize/{id}:
 *   post:
 *     summary: Calculates the optimal route between two nodes
 *     description: Returns the shortest path and total cost for a given graph.
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
 *             properties:
 *               originNodeId:
 *                 type: string
 *               destinationNodeId:
 *                 type: string
 *             required:
 *               - originNodeId
 *               - destinationNodeId
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
 *                 path:
 *                   type: array
 *                   items:
 *                     type: string
 *                 totalCost:
 *                   type: number
 *                 durationMs:
 *                   type: number
 *       404:
 *         description: Graph or path not found
 *       400:
 *         description: Missing origin or destination
 */
router.post("/optimize/:id", optimizeRoute);

export default router;
