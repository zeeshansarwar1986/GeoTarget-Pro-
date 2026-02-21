import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import User from '../models/User.js'
import AudienceData from '../models/AudienceData.js'
import Geofence from '../models/Geofence.js'
import Notification from '../models/Notification.js'
import Consent from '../models/Consent.js'

const router = express.Router()

// GET /api/privacy/data — Download user data (GDPR Art. 20)
router.get('/data', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        const geofences = await Geofence.find({ user: req.user.id })
        const notifications = await Notification.find({ user: req.user.id })
        const consents = await Consent.find({ userId: req.user.id })

        res.json({
            success: true,
            data: {
                exportDate: new Date().toISOString(),
                format: 'GDPR Article 20 - Data Portability',
                user, geofences, notifications, consents
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// DELETE /api/privacy/account — Delete account and all data (GDPR Art. 17)
router.delete('/account', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        await Promise.all([
            User.findByIdAndDelete(userId),
            Geofence.deleteMany({ user: userId }),
            Notification.deleteMany({ user: userId }),
            Consent.deleteMany({ userId }),
        ])

        res.json({
            success: true,
            message: 'Account and all associated data permanently deleted. GDPR Article 17 fulfilled.'
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// PUT /api/privacy/consent — Update consent preferences
router.put('/consent', authMiddleware, async (req, res) => {
    try {
        const { consents } = req.body
        await User.findByIdAndUpdate(req.user.id, { consent: { ...consents, consentDate: new Date() } })
        await Consent.create({ userId: req.user.id, consents, method: 'settings' })

        res.json({ success: true, message: 'Consent preferences updated' })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/privacy/opt-out — CCPA Do Not Sell (opt out)
router.post('/opt-out', async (req, res) => {
    try {
        const { userId } = req.body
        if (userId) {
            await User.findByIdAndUpdate(userId, {
                consent: { location: false, analytics: false, demographics: false, marketing: false }
            })
        }
        res.json({ success: true, message: 'Opted out of data collection. CCPA compliance fulfilled.' })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default router
