import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function SettingsPage() {
    const { user, logout, updatePlan } = useAuth()
    const navigate = useNavigate()
    const [privacy, setPrivacy] = useState({ location: true, analytics: true, demographics: false, marketing: true })
    const [saved, setSaved] = useState(false)

    if (!user) { navigate('/login'); return null }

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <Sidebar />
            <main className="pt-20 lg:pl-64 p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-black text-primary-text mb-8 tracking-tight flex items-center gap-3">
                        ⚙️ <span className="tracking-tight">Settings</span>
                    </h1>

                    {saved && (
                        <div className="bg-secondary/10 border border-secondary/30 text-secondary text-sm font-bold rounded-2xl p-4 mb-6 animate-slide-up flex items-center gap-2">
                            <span>✅</span> Settings saved successfully!
                        </div>
                    )}

                    {/* Profile */}
                    <div className="glass-card p-8 mb-8 border border-border-main shadow-xl">
                        <h2 className="text-lg font-bold text-primary-text mb-6 flex items-center gap-2">
                            👤 <span className="tracking-tight">Profile & Account</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Full Name</label>
                                <input className="input-field text-sm font-medium" defaultValue={user.name} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Email Address</label>
                                <input className="input-field text-sm font-medium" defaultValue={user.email} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Business Name</label>
                                <input className="input-field text-sm font-medium" defaultValue={user.business || ''} placeholder="Your Business" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Active Plan</label>
                                <div className="input-field bg-primary/5 border-primary/20 text-primary font-bold text-sm capitalize flex items-center justify-between">
                                    {user.plan || 'Free'} Tier
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSave} className="btn-primary mt-8 text-xs !px-10 font-bold border-none shadow-lg">Save Changes</button>
                    </div>

                    {/* Privacy Controls - GDPR/CCPA */}
                    <div className="glass-card p-8 mb-8 border border-border-main shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="text-6xl">🔒</span>
                        </div>
                        <h2 className="text-lg font-bold text-primary-text mb-2">🛡️ Data Privacy Controls</h2>
                        <p className="text-xs text-secondary-text font-bold uppercase tracking-widest mb-8 opacity-60">GDPR & CCPA Compliant Security</p>

                        <div className="space-y-4">
                            {[
                                { key: 'location', label: 'Location Sharing', desc: 'Allow collection of location data within geofences' },
                                { key: 'analytics', label: 'Visit Analytics', desc: 'Track visit frequency and dwell time' },
                                { key: 'demographics', label: 'Demographics', desc: 'Collect age range and interest data (optional)' },
                                { key: 'marketing', label: 'Marketing Notifications', desc: 'Receive targeted marketing messages' },
                            ].map(item => (
                                <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-dark-700/5 border border-border-main hover:bg-dark-700/10 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold text-primary-text">{item.label}</p>
                                        <p className="text-[10px] font-medium text-secondary-text opacity-70">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${privacy[item.key] ? 'bg-primary' : 'bg-dark-700/20 border border-border-main'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${privacy[item.key] ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8 border-t border-border-main pt-8">
                            <button className="btn-secondary text-xs !px-6 !py-3 font-bold shadow-sm">📥 Download Data Export</button>
                            <button className="text-xs px-6 py-3 rounded-2xl border-2 border-danger/30 text-danger hover:bg-danger/5 transition-all font-bold">🗑️ Permanently Delete Account</button>
                        </div>
                        <p className="text-[10px] text-secondary-text font-medium mt-6 leading-relaxed">
                            Your data is anonymized with SHA-256 and encrypted with AES-256.
                            Questions? View our <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
                        </p>
                    </div>

                    {/* Subscription */}
                    <div className="glass-card p-8 border border-border-main shadow-xl">
                        <h2 className="text-lg font-bold text-primary-text mb-6">💳 Billing & Subscription</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['free', 'basic', 'premium', 'enterprise'].map(plan => (
                                <button
                                    key={plan}
                                    onClick={() => updatePlan(plan)}
                                    className={`p-5 rounded-2xl text-center transition-all duration-300 flex flex-col items-center gap-1 ${user.plan === plan
                                            ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/10'
                                            : 'bg-dark-700/5 border border-border-main hover:border-primary/50'
                                        }`}
                                >
                                    <p className="text-sm font-black text-primary-text capitalize tracking-tight">{plan}</p>
                                    <p className="text-[10px] font-bold text-secondary-text opacity-70">
                                        {plan === 'free' ? '$0' : plan === 'basic' ? '$19' : plan === 'premium' ? '$49' : '$99+'}/mo
                                    </p>
                                    {user.plan === plan && <span className="text-[10px] font-black text-primary mt-2 flex items-center gap-1 uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
                                    </span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
