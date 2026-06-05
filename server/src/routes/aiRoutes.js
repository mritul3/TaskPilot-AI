import { Router } from 'express';
import { breakdown, priority, estimate, generate } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.post('/breakdown', breakdown);
router.post('/priority', priority);
router.post('/estimate', estimate);
router.post('/generate', generate);

export default router;
