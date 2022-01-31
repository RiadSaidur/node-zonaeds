import Express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { userRoutes } from './routes/private/user.routes'
import { authRoutes } from './routes/public/auth.routes'
import { auth_required } from './middleware/auth.middleware'
import { adminRoutes } from './routes/private/admin.routes'
import { admin_only } from './middleware/role.middleware'
import { productRoutes } from './routes/public/product.routes'

const app = Express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(Express.json())

// Public Routes
app.use('/', productRoutes)
app.use('/auth', authRoutes)
// Private Routes
app.use('/user', auth_required, userRoutes)
// Admin Routes
app.use('/admin', auth_required, admin_only, adminRoutes)

// MongoDB connection
const mongodbURI = process.env.MONGODB_URI

mongoose.connect(mongodbURI)

mongoose.connection.on('connected', () => {
  console.log('connceted to DB')
})

// Start server
app.listen(PORT, () => console.log(`server stated on ${PORT}`))