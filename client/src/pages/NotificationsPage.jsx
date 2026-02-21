import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGeofences } from '../context/GeofenceContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const demoNotifications = [
    { id: 1, name: 'Welcome Offer', geofence: 'Downtown Store', type: 'push_notification', message: '🎉 Welcome! Enjoy 20% off your first purchase!', sent: 856, opened: 342, ctr: '39.9%', active: true },
    { id: 2, name: 'Lunch Special', geofence: 'Restaurant Zone', type: 'sms', message: '🍕 Hungry? 15% off lunch specials inside!', sent: 389, opened: 201, ctr: '51.7%', active: true },
    { id: 3, name: 'Mall Deals', geofence: 'Shopping Mall', type: 'email', message: '🛍️ Exclusive deals waiting for you at the mall!', sent: 2101, opened: 756, ctr: '36.0%', active: true },
    { id: 4, name: 'Travel Deals', geofence: 'Airport Terminal', type: 'push_notification', message: '✈️ Safe travels! Pre-order duty free items now.', sent: 4210, opened: 1263, ctr: '30.0%', active: false },
]

export default function NotificationsPage() {
    const { user } = useAuth()
    const { geofences } = useGeofences()
    const navigate = useNavigate()
    const [notifs, setNotifs] = useState(demoNotifications)
    const [showCreate, setShowCreate] = useState(false)
    const [form, setForm] = useState({ name: '', geofence: '', type: 'push_notification', message: '' })

    if (!user) { navigate('/login'); return null }

    const handleCreate = () => {
        if (!form.name || !form.message) return
        setNotifs(p => [{ ...form, id: Date.now(), sent: 0, opened: 0, ctr: '0%', active: true }, ...p])
        setShowCreate(false)
        setForm({ name: '', geofence: '', type: 'push_notification', message: '' })
    }

    const typeStyles = {
        push_notification: 'bg-primary/10 text-primary border-primary/20',
        email: 'bg-secondary/10 text-secondary border-secondary/20',
        sms: 'bg-accent/10 text-accent border-accent/20',
        webhook: 'bg-dark-700/20 text-secondary-text border-border-main'
    }
    const typeLabels = { push_notification: 'Push', email: 'Email', sms: 'SMS', webhook: 'Webhook' }

    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <Sidebar />
            <main className="pt-20 lg:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
                                🔔 <span className="tracking-tight">Notifications</span>
                            </h1>
                            <p className="text-sm text-secondary-text mt-1 font-medium">Manage your notification templates and campaign performance</p>
                        </div>
                        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-xs !px-6 !py-3 font-bold border-none shadow-lg shadow-primary/20">
                            + New Campaign
                        </button>
                    </div>

                    {showCreate && (
                        <div className="glass-card p-8 mb-8 border-2 border-primary/30 animate-slide-up shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                            <h3 className="text-sm font-black text-primary-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Create Notification Template
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Template Name</label>
                                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-field text-sm font-medium" placeholder="Welcome Promo 2024" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Target Geofence</label>
                                    <select value={form.geofence} onChange={e => setForm(p => ({ ...p, geofence: e.target.value }))} className="input-field text-sm font-medium cursor-pointer">
                                        <option value="">Select Geofence</option>
                                        {geofences.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Delivery Channel</label>
                                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="input-field text-sm font-medium cursor-pointer">
                                        <option value="push_notification">Push Notification</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="webhook">Webhook Integration</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Message Content</label>
                                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="input-field text-sm font-medium resize-none" rows={1} placeholder="Hello from GeoTarget Pro! Enjoy..." />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button onClick={handleCreate} className="btn-primary text-xs !px-8 !py-3 font-bold border-none">Create Template</button>
                                <button onClick={() => setShowCreate(false)} className="btn-secondary text-xs !px-8 !py-3 font-bold shadow-sm">Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Notification List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1 mb-2">
                            <h3 className="text-xs font-black text-secondary-text uppercase tracking-widest">Active Campaigns ({notifs.filter(n => n.active).length})</h3>
                        </div>
                        {notifs.map(n => (
                            <div key={n.id} className={`glass-card p-6 border transition-all duration-300 group ${!n.active ? 'opacity-40 grayscale border-border-main' : 'border-border-main hover:border-primary/40 shadow-lg'
                                }`}>
                                <div className="flex flex-col md:flex-row md:items-center gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-primary-text tracking-tight">{n.name}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeStyles[n.type]}`}>{typeLabels[n.type]}</span>
                                        </div>
                                        <p className="text-sm text-secondary-text font-medium mb-3">{n.message}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider bg-dark-700/10 px-2 py-1 rounded-md border border-border-main">
                                                📍 {n.geofence}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-10 text-center min-w-[300px]">
                                        <div><p className="text-2xl font-black text-primary-text">{n.sent.toLocaleString()}</p><p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mt-1 opacity-60">Sent</p></div>
                                        <div><p className="text-2xl font-black text-primary-text">{n.opened.toLocaleString()}</p><p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mt-1 opacity-60">Opened</p></div>
                                        <div><p className="text-2xl font-black text-secondary">{n.ctr}</p><p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mt-1 opacity-60">CTR</p></div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setNotifs(p => p.map(x => x.id === n.id ? { ...x, active: !x.active } : x))}
                                            className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner ${n.active ? 'bg-primary' : 'bg-dark-700/20 border border-border-main'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${n.active ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
