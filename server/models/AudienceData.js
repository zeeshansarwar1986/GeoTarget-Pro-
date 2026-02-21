import mongoose from 'mongoose'
import { anonymizeDeviceId, roundCoordinates } from '../utils/anonymize.js'

const audienceDataSchema = new mongoose.Schema({
    geofenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Geofence', required: true },
    deviceHash: { type: String, required: true }, // SHA-256 hashed device ID
    event: { type: String, enum: ['enter', 'exit', 'dwell'], required: true },
    location: {
        lat: { type: Number }, // Rounded to 3 decimals
        lng: { type: Number },
    },
    dwellTime: { type: Number, default: 0 }, // minutes
    deviceType: { type: String, enum: ['mobile', 'tablet', 'desktop', 'unknown'], default: 'unknown' },
    platform: { type: String }, // iOS, Android, Web
    visitCount: { type: Number, default: 1 },
    demographics: {
        ageRange: { type: String }, // e.g., '25-34'
        interests: [String],
    },
    timestamp: { type: Date, default: Date.now },
    consentGiven: { type: Boolean, required: true, default: false },
}, { timestamps: true })

// Auto-anonymize before saving
audienceDataSchema.pre('save', function (next) {
    if (this.isNew) {
        if (this.deviceHash) this.deviceHash = anonymizeDeviceId(this.deviceHash)
        if (this.location) {
            this.location.lat = roundCoordinates(this.location.lat)
            this.location.lng = roundCoordinates(this.location.lng)
        }
    }
    next()
})

audienceDataSchema.index({ geofenceId: 1, timestamp: -1 })
audienceDataSchema.index({ deviceHash: 1 })

export default mongoose.model('AudienceData', audienceDataSchema)
