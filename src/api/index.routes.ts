import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './auth.routes';
import clientRoutes from './client.routes';

const router = express.Router();

// endpoints
router.use('/auth', authRoutes);
router.use('/', clientRoutes);

export default router;
