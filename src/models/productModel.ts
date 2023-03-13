import { IProduct } from "./../interfaces/productInterface";
import { connection } from "./connection";
import { ObjectId } from "mongodb";

const productCollection = async () => {
  const db = await connection();
  return db.collection("product");
};

const findAll = async (size: number, page: number) => {
  const db = await productCollection();
  const totalItems = await db.countDocuments();
  let totalPages = totalItems / size;
  totalPages = totalPages < 1 ? 1 : Math.ceil(totalPages);
  const items = await db
    .find()
    .skip(page * size)
    .limit(size)
    .toArray();
  return { totalItems, totalPages, size, page, items };
};

const createProduct = async (product: IProduct) => {
  const db = await productCollection();
  return await db.insertOne(product);
};

const deleteProduct = async (id: string) => {
  const db = await productCollection();
  const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};

export default { findAll, createProduct, deleteProduct };
