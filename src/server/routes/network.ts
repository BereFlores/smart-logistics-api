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
 *             properties:
 *               edges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                     to:
 *                       type: string
 *                     cost:
 *                       type: number
 *             required:
 *               - edges
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
 *         schema:
 *           type: string
 *         required: true
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
