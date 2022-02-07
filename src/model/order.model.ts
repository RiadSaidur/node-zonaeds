import { model, Schema } from "mongoose";
import { OrderDocument } from "../interfaces/model.interface";

const OrderSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    products: [{
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
      }
    }],
    status: {
      type: String,
      default: 'pending'
    },
    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

OrderSchema.methods.updateStatus = function (status: string) {
  try {
    const order = this as OrderDocument
    order.status = status
    order.save()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const Order = model<OrderDocument>('Order', OrderSchema)