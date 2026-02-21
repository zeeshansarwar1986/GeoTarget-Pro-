import CryptoJS from 'crypto-js'

const SECRET = process.env.ENCRYPTION_KEY || 'geotarget-encryption-key-2026'

/** Encrypt sensitive data with AES-256 */
export function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET).toString()
}

/** Decrypt data */
export function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET)
    return bytes.toString(CryptoJS.enc.Utf8)
}
