import { ICategory } from "../interfaces/categoryInterface";
import { connection } from "./connection";
import { ObjectId } from "mongodb";

const categoryCollection = async () => {
  const db = await connection();
  return db.collection("category");
};

const find = async (name?: string) => {
  const db = await categoryCollection();
  if (name) {
    return await db.findOne({ name });
  } else {
    return db.find().toArray();
  }
};

const createCategory = async (category: ICategory) => {
  const db = await categoryCollection();
  return await db.insertOne(category);
};

const deleteCategory = async (id: string) => {
  const db = await categoryCollection();
  const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};

export default { find, createCategory, deleteCategory };
