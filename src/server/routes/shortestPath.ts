import {Router} from 'express';
import { getShortestPath } from '../controllers/dijkstraController.js';

const router = Router();

router.post('/shortest-path', getShortestPath);

export default router;