import { ObjectId } from "mongoose";

export interface OrderUpdate {
  qty?: number;
  sizes?: string;
  status?: string;
}

export interface OrderQuery {
  sort?: string;
  status?: string;
  pid?: ObjectId;
}

export interface OrderQueryOptions {
  status?: string;
  pid?: ObjectId;
}