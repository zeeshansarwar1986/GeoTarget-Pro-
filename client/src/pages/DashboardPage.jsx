import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGeofences } from '../context/GeofenceContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'

const recentActivity = [
    { time: '2 min ago', event: 'User entered "Downtown Store" geofence', type: 'enter', color: 'text-secondary' },
    { time: '5 min ago', event: 'Push notification sent to 42 users', type: 'notification', color: 'text-primary' },
    { time: '12 min ago', event: 'User exited "Shopping Mall" geofence', type: 'exit', color: 'text-accent' },
    { time: '18 min ago', event: 'New geofence "Restaurant Zone" activated', type: 'create', color: 'text-secondary' },
    { time: '25 min ago', event: 'Analytics report generated', type: 'report', color: 'text-primary' },
    { time: '1 hour ago', event: '128 visitors in "Airport Terminal"', type: 'visitors', color: 'text-accent' },
]

export default function DashboardPage() {
    const { user } = useAuth()
    const { stats, geofences } = useGeofences()
    const navigate = useNavigate()

    if (!user) { navigate('/login'); return null }

    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <Sidebar />
            <main className="pt-20 lg:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-black text-primary-text tracking-tight">Welcome back, <span className="gradient-text">{user.name}</span> 👋</h1>
                        <p className="text-secondary-text mt-1 font-medium">Here's what's happening with your geofences today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatsCard icon="📍" label="Active Geofences" value={stats.activeFences} change={12} color="primary" />
                        <StatsCard icon="👥" label="Total Visitors" value={stats.totalVisitors} change={18} color="secondary" />
                        <StatsCard icon="🔔" label="Notifications Sent" value={stats.totalNotifications} change={8} color="accent" />
                        <StatsCard icon="⏱️" label="Avg Dwell Time" value={`${stats.avgDwellTime} min`} change={5} color="primary" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 glass-card p-6 border border-border-main">
                            <h2 className="text-lg font-bold text-primary-text mb-6 flex items-center gap-2">
                                📋 <span className="tracking-tight">Recent Activity</span>
                            </h2>
                            <div className="space-y-4">
                                {recentActivity.map((a, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-dark-700/10 transition-colors group">
                                        <div className={`w-2.5 h-2.5 rounded-full ${a.color === 'text-secondary' ? 'bg-secondary' : a.color === 'text-accent' ? 'bg-accent' : 'bg-primary'} animate-pulse`} />
                                        <div className="flex-1">
                                            <p className="text-sm text-primary-text font-medium">{a.event}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-secondary-text opacity-60 uppercase">{a.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col gap-6">
                            <div className="glass-card p-6 border border-border-main">
                                <h2 className="text-lg font-bold text-primary-text mb-6">⚡ Quick Actions</h2>
                                <div className="space-y-3">
                                    <button onClick={() => navigate('/map')} className="w-full p-4 rounded-xl bg-primary/5 border border-primary/20 text-left hover:bg-primary/10 transition-all group flex items-center gap-3">
                                        <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
                                        <span className="text-sm font-bold text-primary-text">Create Geofence</span>
                                    </button>
                                    <button onClick={() => navigate('/analytics')} className="w-full p-4 rounded-xl bg-secondary/5 border border-secondary/20 text-left hover:bg-secondary/10 transition-all group flex items-center gap-3">
                                        <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
                                        <span className="text-sm font-bold text-primary-text">View Analytics</span>
                                    </button>
                                    <button onClick={() => navigate('/notifications')} className="w-full p-4 rounded-xl bg-accent/5 border border-accent/20 text-left hover:bg-accent/10 transition-all group flex items-center gap-3">
                                        <span className="text-2xl group-hover:scale-110 transition-transform">🔔</span>
                                        <span className="text-sm font-bold text-primary-text">Campaigns</span>
                                    </button>
                                </div>
                            </div>

                            <div className="glass-card p-6 border border-border-main">
                                <h2 className="text-sm font-black text-secondary-text uppercase tracking-widest mb-6">Top Performing</h2>
                                <div className="space-y-4">
                                    {geofences.slice(0, 3).sort((a, b) => b.visitors - a.visitors).map(f => (
                                        <div key={f.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-700/10 cursor-pointer transition-colors" onClick={() => navigate('/map')}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: f.color }} />
                                                <span className="text-sm font-bold text-primary-text">{f.name}</span>
                                            </div>
                                            <span className="text-xs font-medium text-secondary-text">{f.visitors.toLocaleString()} visits</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
