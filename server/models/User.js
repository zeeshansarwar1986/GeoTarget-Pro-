import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
    business: { type: String, trim: true, default: '' },
    plan: { type: String, enum: ['free', 'basic', 'premium', 'enterprise'], default: 'free' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    consent: {
        location: { type: Boolean, default: false },
        analytics: { type: Boolean, default: false },
        demographics: { type: Boolean, default: false },
        marketing: { type: Boolean, default: false },
        consentDate: { type: Date },
        policyVersion: { type: String, default: '1.0' }
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
