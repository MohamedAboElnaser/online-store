import { Router } from "express";
import { ProductsController } from "../../controllers";

const productsRouter = Router();

productsRouter.route("/").post(ProductsController.createOne);

productsRouter
    .route("/:productId")
    .get(ProductsController.getOne) //TODO - Add rate limiting middleware to this route
    .patch(ProductsController.updateOne)
    .delete(ProductsController.deleteOne);

export default productsRouter;
export { productsRouter };
