import { Router } from "express";
import productController from "./controllers/productController";

const routers = Router();

routers.use("/produtos", productController);

export default routers;
