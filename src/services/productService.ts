import HttpException from "../utils/httpException";
import productModel from "../models/productModel";

const findAll = async (size: number, page: number) => {
  return await productModel.findAll(size, page);
};

export default { findAll };
