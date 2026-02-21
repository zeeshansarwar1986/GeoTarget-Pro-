import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGeofences } from '../context/GeofenceContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MapComponent from '../components/MapComponent'
import GeofenceCard from '../components/GeofenceCard'

export default function MapPage() {
    const { user } = useAuth()
    const { geofences, selectedFence, setSelectedFence, addGeofence, toggleGeofence, deleteGeofence } = useGeofences()
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [newFence, setNewFence] = useState({ name: '', trigger: 'enter', action: 'push_notification', message: '', color: '#6366F1' })

    if (!user) { navigate('/login'); return null }

    const handleFenceCreated = (data) => {
        setNewFence(p => ({ ...p, ...data }))
        setShowForm(true)
    }

    const handleSave = () => {
        if (!newFence.name) return
        addGeofence({ ...newFence, active: true })
        setShowForm(false)
        setNewFence({ name: '', trigger: 'enter', action: 'push_notification', message: '', color: '#6366F1' })
    }

    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <Sidebar />
            <main className="pt-20 lg:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
                                🗺️ <span className="tracking-tight">Geofence Manager</span>
                            </h1>
                            <p className="text-sm text-secondary-text mt-1 font-medium">Draw, manage, and monitor your physical boundaries</p>
                        </div>
                        <div className="flex items-center gap-3 bg-dark-700/10 px-4 py-2 rounded-full border border-border-main">
                            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">{geofences.filter(f => f.active).length} Active</span>
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Map Container */}
                        <div className="lg:col-span-2 glass-card p-2 overflow-hidden border border-border-main shadow-2xl" style={{ minHeight: '600px' }}>
                            <MapComponent
                                geofences={geofences}
                                onFenceCreated={handleFenceCreated}
                                selectedFence={selectedFence}
                                onFenceClick={setSelectedFence}
                            />
                        </div>

                        {/* Control Panel */}
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {showForm && (
                                <div className="glass-card p-6 border-2 border-primary/40 animate-slide-up shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                    <h3 className="text-sm font-black text-primary-text mb-4 uppercase tracking-widest">✨ New Geofence</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Name</label>
                                            <input value={newFence.name} onChange={e => setNewFence(p => ({ ...p, name: e.target.value }))} className="input-field text-sm" placeholder="e.g., Downtown Store" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Trigger</label>
                                                <select value={newFence.trigger} onChange={e => setNewFence(p => ({ ...p, trigger: e.target.value }))} className="input-field text-sm cursor-pointer">
                                                    <option value="enter">On Enter</option>
                                                    <option value="exit">On Exit</option>
                                                    <option value="both">Both</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Action</label>
                                                <select value={newFence.action} onChange={e => setNewFence(p => ({ ...p, action: e.target.value }))} className="input-field text-sm cursor-pointer">
                                                    <option value="push_notification">Push</option>
                                                    <option value="email">Email</option>
                                                    <option value="sms">SMS</option>
                                                    <option value="webhook">Webhook</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Message</label>
                                            <textarea value={newFence.message} onChange={e => setNewFence(p => ({ ...p, message: e.target.value }))} className="input-field text-sm resize-none" rows={2} placeholder="Welcome to GeoTarget Pro!" />
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-dark-700/20 rounded-xl border border-border-main">
                                            <label className="text-[10px] font-bold text-secondary-text uppercase ml-1">Visual Theme</label>
                                            <input type="color" value={newFence.color} onChange={e => setNewFence(p => ({ ...p, color: e.target.value }))} className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent" />
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button onClick={handleSave} className="btn-primary text-xs flex-1 !py-3 font-bold border-none">Save Geofence</button>
                                            <button onClick={() => setShowForm(false)} className="btn-secondary text-xs !py-3 !px-4 font-bold">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-xs font-black text-secondary-text uppercase tracking-widest">Saved Fences ({geofences.length})</h3>
                            </div>

                            <div className="space-y-3">
                                {geofences.map(fence => (
                                    <GeofenceCard
                                        key={fence.id}
                                        fence={fence}
                                        onSelect={setSelectedFence}
                                        onToggle={toggleGeofence}
                                        onDelete={deleteGeofence}
                                    />
                                ))}

                                {geofences.length === 0 && (
                                    <div className="glass-card p-12 text-center border-dashed border-2 border-border-main">
                                        <span className="text-5xl mb-4 block">📍</span>
                                        <p className="text-sm text-secondary-text font-medium">No geofences yet.<br />Use the draw tools on the map to start.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
