import mongoose from 'mongoose'

const geofenceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Geofence name is required'], trim: true },
    type: { type: String, enum: ['circle', 'polygon', 'rectangle'], default: 'circle' },
    geometry: {
        type: { type: String, enum: ['Point', 'Polygon'], default: 'Point' },
        coordinates: { type: [Number], required: true }, // [lng, lat] for Point
    },
    radius: { type: Number, default: 500 }, // meters, for circle type
    color: { type: String, default: '#6366F1' },
    trigger: { type: String, enum: ['enter', 'exit', 'both', 'dwell'], default: 'enter' },
    action: { type: String, enum: ['push_notification', 'email', 'sms', 'webhook'], default: 'push_notification' },
    message: { type: String, default: '' },
    webhookUrl: { type: String },
    active: { type: Boolean, default: true },
    // Analytics
    visitors: { type: Number, default: 0 },
    notifications: { type: Number, default: 0 },
    avgDwell: { type: Number, default: 0 }, // minutes
    metadata: {
        category: { type: String },
        tags: [String],
        schedule: {
            startTime: { type: String },
            endTime: { type: String },
            days: [String],
        }
    }
}, { timestamps: true })

geofenceSchema.index({ geometry: '2dsphere' })
geofenceSchema.index({ user: 1, active: 1 })

export default mongoose.model('Geofence', geofenceSchema)
