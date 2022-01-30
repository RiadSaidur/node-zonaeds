import { compare } from "bcryptjs";
import { model, Schema } from "mongoose";
import { Role } from "../emuns/auth.enums";
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
    },
    role: {
      type: String,
      default: Role.CUSTOMER
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

UserSchema.methods.makeAdmin = function () {
  const user = this as UserDocument
  try {
    user.role = Role.ADMIN
    return true
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export const User = model<UserDocument>('User', UserSchema)