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

export default { findAll };
