import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import Geofence from '../models/Geofence.js'

const router = express.Router()

// GET /api/geofences — list user's geofences
router.get('/', authMiddleware, async (req, res) => {
    try {
        const geofences = await Geofence.find({ user: req.user.id }).sort('-createdAt')
        res.json({ success: true, count: geofences.length, data: geofences })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// GET /api/geofences/:id
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const geofence = await Geofence.findOne({ _id: req.params.id, user: req.user.id })
        if (!geofence) return res.status(404).json({ success: false, error: 'Geofence not found' })
        res.json({ success: true, data: geofence })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/geofences — create geofence
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, type, center, radius, color, trigger, action, message } = req.body
        const geofence = await Geofence.create({
            user: req.user.id, name, type: type || 'circle',
            geometry: { type: 'Point', coordinates: center ? [center[1], center[0]] : [0, 0] },
            radius: radius || 500, color, trigger, action, message
        })
        res.status(201).json({ success: true, data: geofence })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// PUT /api/geofences/:id — update
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const geofence = await Geofence.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true }
        )
        if (!geofence) return res.status(404).json({ success: false, error: 'Geofence not found' })
        res.json({ success: true, data: geofence })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// DELETE /api/geofences/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const geofence = await Geofence.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        if (!geofence) return res.status(404).json({ success: false, error: 'Geofence not found' })
        res.json({ success: true, data: {} })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

// POST /api/geofences/:id/check — check if point is inside geofence
router.post('/:id/check', async (req, res) => {
    try {
        const { lat, lng } = req.body
        const geofence = await Geofence.findById(req.params.id)
        if (!geofence) return res.status(404).json({ success: false, error: 'Geofence not found' })

        const [fenceLng, fenceLat] = geofence.geometry.coordinates
        const R = 6371e3
        const toRad = d => d * Math.PI / 180
        const dLat = toRad(lat - fenceLat)
        const dLng2 = toRad(lng - fenceLng)
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(fenceLat)) * Math.cos(toRad(lat)) * Math.sin(dLng2 / 2) ** 2
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        res.json({ success: true, data: { inside: distance <= geofence.radius, distance: Math.round(distance) } })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

export default router
