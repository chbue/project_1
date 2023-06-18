import express from 'express';
import {ordersController} from '../controller/orders-controller.js';

const router = express.Router();

router.get("/", ordersController.getOrders);
router.post("/", ordersController.createPizza);
router.get("/:id/", ordersController.showOrder);
router.delete("/:id/", ordersController.deleteOrder);

export const orderRoutes = router;
