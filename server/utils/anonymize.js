import crypto from 'crypto'

const SALT = process.env.ANONYMIZE_SALT || 'geotarget-anonymize-salt-2026'

/** Hash a device ID with SHA-256 + salt */
export function anonymizeDeviceId(deviceId) {
    return crypto.createHash('sha256').update(deviceId + SALT).digest('hex')
}

/** Round coordinates to 3 decimal places (~111m precision) */
export function roundCoordinates(coord) {
    return Math.round(coord * 1000) / 1000
}

/** Anonymize IP address (keep first two octets) */
export function anonymizeIP(ip) {
    if (!ip) return 'unknown'
    const parts = ip.split('.')
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.0.0`
    return 'anonymized'
}

/** Remove PII from an object */
export function stripPII(data) {
    const piiFields = ['name', 'email', 'phone', 'address', 'ssn', 'creditCard']
    const cleaned = { ...data }
    piiFields.forEach(field => { if (cleaned[field]) delete cleaned[field] })
    return cleaned
}
