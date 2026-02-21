import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import geofenceRoutes from './routes/geofences.js'
import analyticsRoutes from './routes/analytics.js'
import notificationRoutes from './routes/notifications.js'
import privacyRoutes from './routes/privacy.js'
import { rateLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))
app.use(rateLimiter)

// Connect to MongoDB
connectDB()

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/geofences', geofenceRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/privacy', privacyRoutes)

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'GeoTarget Pro API', version: '1.0.0', time: new Date().toISOString() })
})

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message)
    res.status(err.statusCode || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    })
})

app.listen(PORT, () => {
    console.log(`\n🚀 GeoTarget Pro API running on port ${PORT}`)
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`)
})

export default app
