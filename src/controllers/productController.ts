import { Request, Response, Router } from "express";
import { IProduct } from "../interfaces/productInterface";
import productService from "../services/productService";
import imageMiddleware from "../middlewares/imageMiddleware";

const productController = Router();

productController.get(
  "/find-all",
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

productController.post(
  "/create-product",
  imageMiddleware.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    const product: IProduct = JSON.parse(req.body.data);
    const image: Express.Multer.File | undefined = req.file;
    if (image) {
      product.image =
        "data:image/png;base64," + new Buffer(image?.buffer).toString("base64");
      await productService.createProduct(product);
      return res.status(200).json({ message: "Produto cadastrado!" });
    } else {
      return res.status(404).json({ message: "Imagem é obrigatória!" });
    }
  }
);

productController.delete(
  "/delete-product/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(200).json({ message: "Produto deletado!" });
  }
);

export default productController;
