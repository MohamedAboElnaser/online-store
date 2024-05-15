import { Router } from "express";
import { CartItemsController } from "../../controllers";

const CartItemsRouter = Router();

CartItemsRouter.route("/")
    .post(CartItemsController.addItem)
    .get(CartItemsController.fetchItems)
    .delete(CartItemsController.deleteItems);

CartItemsRouter.route("/:id").patch(CartItemsController.updateItem);

export { CartItemsRouter };
