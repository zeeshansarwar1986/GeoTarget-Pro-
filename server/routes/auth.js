import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
    try {
        const { name, email, password, business } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already registered' })
        }

        const user = await User.create({ name, email, password, business })
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        res.status(201).json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email, business: user.business, plan: user.plan, token }
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' })
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        res.json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email, business: user.business, plan: user.plan, token }
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ success: false, error: 'Not authorized' })
    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) return res.status(404).json({ success: false, error: 'User not found' })
        res.json({ success: true, data: user })
    } catch (err) {
        res.status(401).json({ success: false, error: 'Token invalid' })
    }
})

export default router
