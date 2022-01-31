import { Document, NumericTypes, ObjectId } from "mongoose";

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
  qty: number;
  variants: {
    color: string[];
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