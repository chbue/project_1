import express from 'express';
import { indexController } from '../controller/authentication-controller.js';

const router = express.Router();

router.post('/login', indexController.login);

// eslint-disable-next-line import/prefer-default-export
export const indexRoutes = router;
