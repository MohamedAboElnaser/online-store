import { Router } from "express";
import { OrdersController } from "../../controllers";

const ordersRouter = Router();

ordersRouter.route("/").post(OrdersController.createOrder);

export default ordersRouter;
export { ordersRouter };
