import { Request, Response, Router } from "express";
import productService from "../services/productService";

const productController = Router();

productController.get(
  "/listar",
  async (req: Request, res: Response): Promise<Response> => {
    const page: string = req.query.page as string;
    const size: string = req.query.size as string;
    if (!page || !size)
      return res.status(404).json({ message: "Nada encontrado!" });
    else {
      const products = await productService.findAll(
        parseInt(size),
        parseInt(page)
      );
      return res.status(200).json(products);
    }
  }
);

export default productController;
