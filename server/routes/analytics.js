import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import AudienceData from '../models/AudienceData.js'
import Geofence from '../models/Geofence.js'

const router = express.Router()

// GET /api/analytics/overview — dashboard stats
router.get('/overview', authMiddleware, async (req, res) => {
    try {
        const geofences = await Geofence.find({ user: req.user.id })
        const totalVisitors = geofences.reduce((s, f) => s + f.visitors, 0)
        const totalNotifications = geofences.reduce((s, f) => s + f.notifications, 0)
        const avgDwell = geofences.length ? Math.round(geofences.reduce((s, f) => s + f.avgDwell, 0) / geofences.length) : 0

        res.json({
            success: true,
            data: {
                totalGeofences: geofences.length,
                activeGeofences: geofences.filter(f => f.active).length,
                totalVisitors, totalNotifications, avgDwell,
                conversionRate: totalNotifications ? ((totalVisitors * 0.048) / totalNotifications * 100).toFixed(1) + '%' : '0%'
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// GET /api/analytics/visitors — visitor data for charts
router.get('/visitors', authMiddleware, async (req, res) => {
    try {
        // Demo data for charts
        res.json({
            success: true,
            data: {
                weekly: [420, 580, 760, 640, 890, 1200, 980],
                monthly: [2400, 3100, 4200, 3800, 5100, 6200],
                labels: { weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/analytics/event — record audience event (with consent)
router.post('/event', async (req, res) => {
    try {
        const { geofenceId, deviceId, event, location, deviceType, platform, consent } = req.body
        if (!consent) {
            return res.status(403).json({ success: false, error: 'User consent required for data collection' })
        }

        const data = await AudienceData.create({
            geofenceId, deviceHash: deviceId, event,
            location: location ? { lat: location.lat, lng: location.lng } : undefined,
            deviceType, platform, consentGiven: true
        })

        // Update geofence stats
        if (event === 'enter') {
            await Geofence.findByIdAndUpdate(geofenceId, { $inc: { visitors: 1 } })
        }

        res.status(201).json({ success: true, data: { id: data._id, event: data.event } })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default router
