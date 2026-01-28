import { Router } from "express";
import { uploadGraph, getNodesHandler } from "../controllers/networkController.js";

const router = Router();

/**
 * @openapi
 * /network/upload:
 *   post:
 *     summary: Uploads a new network graph
 *     description: Stores a new network (nodes and edges) and returns a graph ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - edges
 *             properties:
 *               edges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - from
 *                     - to
 *                     - cost
 *                   properties:
 *                     from:
 *                       type: string
 *                       example: A
 *                     to:
 *                       type: string
 *                       example: B
 *                     cost:
 *                       type: number
 *                       example: 10
 *                     time:
 *                       type: number
 *                       example: 5
 *                       description: Optional travel time used when preference is "fastest"
 *                     type:
 *                       type: string
 *                       example: highway
 *                       description: Optional edge type used for constraints (e.g. avoidHighways)
 *     responses:
 *       201:
 *         description: Graph created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphId:
 *                   type: string
 */
router.post("/upload", uploadGraph);

/**
 * @openapi
 * /network/nodes/{id}:
 *   get:
 *     summary: Retrieve all nodes of a graph
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Graph ID
 *     responses:
 *       200:
 *         description: List of nodes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nodes:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Graph not found
 */
router.get("/nodes/:id", getNodesHandler);

export default router;
