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

export default { findAll, createProduct, deleteProduct };
