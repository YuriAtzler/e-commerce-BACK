import { ICategory } from "../interfaces/categoryInterface";
import categoryModel from "../models/categoryModel";
import HttpException from "../utils/httpException";

const find = async (name?: string) => {
  if (name) return await categoryModel.find(name);
  else return categoryModel.find();
};

const createCategory = async (category: ICategory) => {
  return await categoryModel.createCategory(category);
};

const deleteCategory = async (id: string) => {
  const wasDeleted = await categoryModel.deleteCategory(id);
  if (wasDeleted) return "ok";
  else throw new HttpException(404, "Erro ao deletar categoria!");
};

export default { find, createCategory, deleteCategory };
