import { model, Schema } from "mongoose";
import { ReviewDocument } from "../interfaces/model.interface";

const ReviewSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [
      {
        type: String,
        default: []
      }
    ],
    rating: {
      type: Number,
      required: function () { return this.score > 0 && this.score < 5 }
    }
  },
  { timestamps: true }
)

export const Review = model<ReviewDocument>('Review', ReviewSchema)