import { Request, Response, Router } from "express";
import { IProduct } from "../interfaces/productInterface";
import productService from "../services/productService";
import imageMiddleware from "../middlewares/imageMiddleware";

const productController = Router();

productController.get(
  "/find",
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

productController.put(
  "/to-add-discount/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { discount } = req.body;
    await productService.toAddDiscount(id, discount);
    return res.status(200).json({ message: "Desconto adicionado!" });
  }
);

productController.put(
  "/to-remove-discount/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await productService.toRemoveDiscount(id);
    return res.status(200).json({ message: "Desconto removido!" });
  }
);

export default productController;
