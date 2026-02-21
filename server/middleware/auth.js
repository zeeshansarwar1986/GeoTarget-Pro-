import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Not authorized. No token provided.' })
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'geotarget-pro-super-secret-jwt-key-change-in-production-2026')
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Not authorized. Invalid token.' })
    }
}
