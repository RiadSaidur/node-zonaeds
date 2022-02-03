import { model, Schema } from "mongoose";
import { OrderDocument } from "../interfaces/model.interface";

const OrderSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    pid: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    sizes: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    }
  },
  { timestamps: true }
)

export const Order = model<OrderDocument>('Order', OrderSchema)