import { ProductUpdate } from "../interfaces/product.interface"
import { Product } from "../model/product.model"

export const updateProductById = async (pid: string, updatedFields: ProductUpdate) => {
  try {
    const product = await Product.findById(pid)
    if(!product) return false

    await product.updateOne(updatedFields).exec()
    return product
  } catch (error) {
    console.log(error)
    return false
  }
}