import { compare } from "bcryptjs";
import { model, Schema } from "mongoose";
import { UserDocument } from "../interfaces/model.interface";

const UserSchema = new Schema(
  {
    name: { 
      type : String,
      required : true
    }, 
    email: { 
        type : String, 
        required : true,
        unique: true
    },
    password: {
      type: String,
      required: true
    }
  }, 
  { timestamps: true }
)

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const user = this as UserDocument
  try {
    const isAccepted = await compare(password, user.password)
    return isAccepted
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export const User = model<UserDocument>('User', UserSchema)