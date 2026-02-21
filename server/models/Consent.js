import mongoose from 'mongoose'

const consentSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Can be hashed device ID or user ObjectId
    consents: {
        location: { type: Boolean, default: false },
        analytics: { type: Boolean, default: false },
        demographics: { type: Boolean, default: false },
        marketing: { type: Boolean, default: false },
    },
    method: { type: String, enum: ['banner-click', 'settings', 'api'], default: 'banner-click' },
    ipAddress: { type: String }, // Anonymized
    policyVersion: { type: String, default: '1.0' },
    revokedAt: { type: Date },
}, { timestamps: true })

consentSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.model('Consent', consentSchema)
