import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getContacts); // Add auth middleware later

export default router;