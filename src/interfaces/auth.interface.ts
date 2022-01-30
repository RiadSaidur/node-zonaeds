import { Request } from "express";
import { ObjectId } from "mongoose";

export interface AuthenticatedRequest extends Request {
  user: {
    uid: ObjectId;
    email: string;
    role: string;
  }
}

export interface Token {
  uid: ObjectId;
  email: string;
  role: string;
}