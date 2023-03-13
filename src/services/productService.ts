import { IProduct } from "./../interfaces/productInterface";
import HttpException from "../utils/httpException";
import productModel from "../models/productModel";

const findAll = async (size: number, page: number) => {
  return await productModel.findAll(size, page);
};

const createProduct = async (product: IProduct) => {
  product.name = product.name.toLowerCase();
  return await productModel.createProduct(product);
};

const deleteProduct = async (id: string) => {
  const wasDeleted: number = await productModel.deleteProduct(id);
  if (wasDeleted) {
    return "ok";
  } else {
    throw new HttpException(404, "Produto não foi deletado!");
  }
};

const toAddDiscount = async (id: string, discount: number) => {
  const wasUpdated = await productModel.toAddDiscount(id, discount);
  if (wasUpdated) return "ok";
  else throw new HttpException(404, "Erro ao adicionar desconto!");
};

const toRemoveDiscount = async (id: string) => {
  const wasUpdated = await productModel.toRemoveDiscount(id);
  if (wasUpdated) return "ok";
  else throw new HttpException(404, "Erro ao remover desconto!");
};

export default {
  findAll,
  createProduct,
  deleteProduct,
  toAddDiscount,
  toRemoveDiscount,
};
