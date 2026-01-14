import express from 'express';
import {
  getServices,
  getServiceById,
  createService
} from '../controllers/serviceController.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Protected routes (add auth middleware later)
router.post('/', createService);

export default router;