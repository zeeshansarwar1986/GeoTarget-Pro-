import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import Notification from '../models/Notification.js'

const router = express.Router()

// GET /api/notifications
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifs = await Notification.find({ user: req.user.id }).sort('-createdAt')
        res.json({ success: true, count: notifs.length, data: notifs })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/notifications
router.post('/', authMiddleware, async (req, res) => {
    try {
        const notif = await Notification.create({ ...req.body, user: req.user.id })
        res.status(201).json({ success: true, data: notif })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// PUT /api/notifications/:id
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const notif = await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true })
        if (!notif) return res.status(404).json({ success: false, error: 'Notification not found' })
        res.json({ success: true, data: notif })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// DELETE /api/notifications/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        res.json({ success: true, data: {} })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default router
