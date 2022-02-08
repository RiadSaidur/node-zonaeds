import { Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  makeAdmin(): boolean;
}

export interface ProductDocument extends Document {
  name: string;
  description: string;
  images: string[];
  qty: number;
  variants: {
    colors: string[];
    sizes: {
      lg: number;
      md: number;
      sm: number;
    }
  };
  prices: {
    lg: number;
    md: number;
    sm: number;
  };
  categories: string[];
  reviews: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewDocument extends Document {
  uid: ObjectId;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDocument extends Document {
  uid: ObjectId;
  products: {
    pid: ObjectId;
    qty: number;
    sizes: string;
  }[];
  total: number;
  status: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  updateStatus(status: string): boolean;
}