import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    geofenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Geofence' },
    name: { type: String, required: true },
    type: { type: String, enum: ['push_notification', 'email', 'sms', 'webhook'], default: 'push_notification' },
    message: { type: String, required: true },
    subject: { type: String }, // for email
    webhookUrl: { type: String },
    sent: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Notification', notificationSchema)
