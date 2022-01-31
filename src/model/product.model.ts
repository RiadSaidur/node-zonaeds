import { model, Schema } from "mongoose";
import { ProductDocument } from "../interfaces/model.interface";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    variants: {
      colors: [
        {
          type: String,
          required: true
        }
      ],
      sizes: {
        lg: {
          type: Number,
          required: true
        },
        md: {
          type: Number,
          required: true
        },
        sm: {
          type: Number,
          required: true
        }
      }
    },
    prices: {
      lg: {
        type: Number,
        required: true
      },
      md: {
        type: Number,
        required: true
      },
      sm: {
        type: Number,
        required: true
      }
    },
    categories: {
      type: [String],
      required: true
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      default: []
    }
  },
  { timestamps: true }
)

export const Product = model<ProductDocument>('Product', ProductSchema)