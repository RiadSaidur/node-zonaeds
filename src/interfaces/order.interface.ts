import { ObjectId } from "mongoose";

export interface OrderUpdate {
  qty?: number;
  sizes?: string;
  status?: string;
}