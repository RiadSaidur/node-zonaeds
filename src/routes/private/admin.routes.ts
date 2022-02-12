import { Router } from "express";
import { addNewProducts, deleteProduct, deleteProductImage, getAllOrders, getProductList, getTotalOrderPrice, updateOrderStatus, updateProduct, uploadProductImage } from "../../controller/admin.controller";
import { upload } from "../../services/images.services";

export const adminRoutes = Router()

adminRoutes.get('/products', getProductList)
adminRoutes.post('/products', addNewProducts)

adminRoutes.delete('/products/:pid', deleteProduct)
adminRoutes.patch('/products/:pid', updateProduct)

adminRoutes.post('/products/images/:pid', upload.array('product-image', 5), uploadProductImage)
adminRoutes.delete('/products/images/:pid', deleteProductImage)

adminRoutes.get('/orders', getAllOrders)
adminRoutes.patch('/orders/:oid', updateOrderStatus)
adminRoutes.get('/orders/total/', getTotalOrderPrice)
