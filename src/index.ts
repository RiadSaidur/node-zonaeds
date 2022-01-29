import Express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { userRoutes } from './routes/private/user.routes'
import { authRoutes } from './routes/public/auth.routes'
import { auth_required } from './middleware/auth.middleware'

const app = Express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(Express.json())

// Routes
app.use('/user', auth_required, userRoutes)
app.use('/auth', authRoutes)

// MongoDB connection
const mongodbURI = process.env.MONGODB_URI

mongoose.connect(mongodbURI)

mongoose.connection.on('connected', () => {
  console.log('connceted to DB')
})

// Start server
app.listen(PORT, () => console.log(`server stated on ${PORT}`))