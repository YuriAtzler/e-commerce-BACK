import { Request, Response, Router } from "express";
import { ICategory } from "../interfaces/categoryInterface";
import categoryService from "../services/categoryService";

const categoryController = Router();

categoryController.get(
  "/find",
  async (req: Request, res: Response): Promise<Response> => {
    const name: string = req.query.name as string;
    if (name) {
      const category = await categoryService.find(name);
      return res.status(200).json(category);
    } else {
      const categories = await categoryService.find();
      return res.status(200).json(categories);
    }
  }
);

categoryController.post(
  "/create-category",
  async (req: Request, res: Response): Promise<Response> => {
    const category: ICategory = req.body;
    await categoryService.createCategory(category);
    return res.status(200).json({ message: "Categoria cadastrada!" });
  }
);

categoryController.delete(
  "/delete-category/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    return res.status(200).json("Categoria deletada!");
  }
);

export default categoryController;
