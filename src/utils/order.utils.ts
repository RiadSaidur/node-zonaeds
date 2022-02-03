import { OrderDocument } from "../interfaces/model.interface";

export const getUpatableFields = ({ qty, sizes }: OrderDocument) => {
  return { qty, sizes }
}