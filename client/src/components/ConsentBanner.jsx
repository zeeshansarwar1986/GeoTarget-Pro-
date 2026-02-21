import { useState } from 'react'

export default function ConsentBanner() {
    const [visible, setVisible] = useState(() => !localStorage.getItem('geotarget_consent'))
    const [showCustom, setShowCustom] = useState(false)
    const [consents, setConsents] = useState({ location: true, analytics: true, demographics: false, marketing: true })

    if (!visible) return null

    const accept = () => {
        localStorage.setItem('geotarget_consent', JSON.stringify({ ...consents, location: true, analytics: true, demographics: true, marketing: true, date: new Date().toISOString() }))
        setVisible(false)
    }
    const save = () => {
        localStorage.setItem('geotarget_consent', JSON.stringify({ ...consents, date: new Date().toISOString() }))
        setVisible(false)
    }
    const reject = () => {
        localStorage.setItem('geotarget_consent', JSON.stringify({ location: false, analytics: false, demographics: false, marketing: false, date: new Date().toISOString() }))
        setVisible(false)
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-slide-up">
            <div className="max-w-4xl mx-auto glass-card p-6 border border-primary/30 shadow-2xl">
                <div className="flex items-start gap-4">
                    <span className="text-3xl">🔒</span>
                    <div className="flex-1">
                        <h3 className="text-primary-text font-bold mb-1">Privacy & Cookie Settings</h3>
                        <p className="text-sm text-secondary-text mb-4">We use cookies and location data to provide geofencing services. Your data is anonymized and encrypted. GDPR & CCPA compliant.</p>
                        {showCustom && (
                            <div className="grid grid-cols-2 gap-3 mb-4 p-4 rounded-2xl bg-dark-700/30 border border-border-main">
                                {Object.entries({ location: 'Location Sharing', analytics: 'Visit Analytics', demographics: 'Demographics', marketing: 'Marketing' }).map(([k, label]) => (
                                    <label key={k} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-text cursor-pointer transition-colors">
                                        <input type="checkbox" checked={consents[k]} onChange={e => setConsents(p => ({ ...p, [k]: e.target.checked }))} className="accent-primary w-4 h-4" />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            <button onClick={accept} className="btn-primary text-xs !px-6 !py-2.5">Accept All</button>
                            {showCustom ? (
                                <button onClick={save} className="btn-secondary text-xs !px-6 !py-2.5">Save Preferences</button>
                            ) : (
                                <button onClick={() => setShowCustom(true)} className="btn-secondary text-xs !px-6 !py-2.5">Customize</button>
                            )}
                            <button onClick={reject} className="text-xs text-secondary-text hover:text-danger px-4 py-2 transition-colors font-medium">Reject All</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
