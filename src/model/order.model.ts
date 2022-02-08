import { model, Schema } from "mongoose";
import { OrderDocument, ProductDocument } from "../interfaces/model.interface";
import { Product } from "./product.model";

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
    total: {
      type: Number,
      default: 0
    },
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

OrderSchema.pre('save', async function (next) {
  const order = await this.populate('products.pid') as OrderDocument
  const total = order.products.reduce((currentTotal, product) => {
    const currentProduct = product.pid as unknown as ProductDocument
    const size = product.sizes as keyof typeof currentProduct.prices
    return currentTotal + currentProduct.prices[size] * product.qty
  }, 0)
  order.total = total
  next()
})

export const Order = model<OrderDocument>('Order', OrderSchema)