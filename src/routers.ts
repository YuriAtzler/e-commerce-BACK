import { Router } from "express";
import productController from "./controllers/productController";
import categoryController from "./controllers/categoryController";

const routers = Router();

routers.use("/products", productController);
routers.use("/categories", categoryController);

export default routers;
