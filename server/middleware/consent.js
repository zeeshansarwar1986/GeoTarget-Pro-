/** Middleware to verify user has given consent for specific data types */
export const requireConsent = (dataType) => {
    return (req, res, next) => {
        const consent = req.body?.consent || req.headers['x-consent']
        if (!consent) {
            return res.status(403).json({
                success: false,
                error: `Consent required for ${dataType} data collection. Please provide consent.`,
                consentRequired: dataType
            })
        }
        next()
    }
}
