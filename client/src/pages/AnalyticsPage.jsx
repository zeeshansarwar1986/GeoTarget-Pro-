import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGeofences } from '../context/GeofenceContext'
import { useTheme } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function AnalyticsPage() {
    const { user } = useAuth()
    const { geofences, stats } = useGeofences()
    const { theme } = useTheme()
    const navigate = useNavigate()

    if (!user) { navigate('/login'); return null }

    const isLight = theme === 'white' || theme === 'half-white'
    const textColor = isLight ? '#475569' : '#94A3B8'
    const gridColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'

    const chartOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: textColor, font: { family: 'Inter', weight: '600', size: 11 } } }
        },
        scales: {
            x: { ticks: { color: textColor, font: { size: 10, weight: '500' } }, grid: { color: gridColor } },
            y: { ticks: { color: textColor, font: { size: 10, weight: '500' } }, grid: { color: gridColor } }
        }
    }

    const visitorData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Visitors',
            data: [420, 580, 760, 640, 890, 1200, 980],
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderColor: '#6366F1',
            borderWidth: 2,
            borderRadius: 6,
        }]
    }

    const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            { label: 'Visitors', data: [2400, 3100, 4200, 3800, 5100, 6200], borderColor: '#6366F1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4 },
            { label: 'Notifications', data: [1800, 2200, 3100, 2900, 4200, 5100], borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4 },
        ]
    }

    const doughnutData = {
        labels: geofences.map(f => f.name),
        datasets: [{
            data: geofences.map(f => f.visitors),
            backgroundColor: geofences.map(f => f.color),
            borderWidth: 0,
            hoverOffset: 15,
        }]
    }

    const doughnutOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: textColor, font: { family: 'Inter', size: 10, weight: '600' }, padding: 15 }
            }
        },
        cutout: '70%'
    }

    const dwellData = {
        labels: ['< 5 min', '5-15 min', '15-30 min', '30-60 min', '> 60 min'],
        datasets: [{
            label: 'Users',
            data: [320, 680, 450, 280, 120],
            backgroundColor: ['#6366F1', '#818CF8', '#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 0,
            borderRadius: 6,
        }]
    }

    return (
        <div className="min-h-screen bg-main transition-colors duration-300">
            <Navbar />
            <Sidebar />
            <main className="pt-20 lg:pl-64 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
                            📈 <span className="tracking-tight">Analytics Dashboard</span>
                        </h1>
                        <p className="text-sm text-secondary-text mt-1 font-medium">Track performance trends across your geofencing infrastructure</p>
                    </div>

                    {/* Top Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Visitors', value: stats.totalVisitors, icon: '👥', color: 'bg-primary/10 text-primary' },
                            { label: 'Notifications', value: stats.totalNotifications, icon: '🔔', color: 'bg-secondary/10 text-secondary' },
                            { label: 'Conversion Rate', value: '4.8%', icon: '🎯', color: 'bg-accent/10 text-accent' },
                            { label: 'Avg Dwell', value: `${stats.avgDwellTime}m`, icon: '⏱️', color: 'bg-primary/10 text-primary' },
                        ].map((s, i) => (
                            <div key={i} className="glass-card p-6 border border-border-main group hover:border-primary/30 transition-all duration-300 shadow-lg">
                                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>{s.icon}</div>
                                <p className="text-3xl font-black text-primary-text">{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</p>
                                <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="glass-card p-8 border border-border-main shadow-xl">
                            <h3 className="text-sm font-black text-primary-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" /> Weekly Visitors
                            </h3>
                            <div style={{ height: '320px' }}><Bar data={visitorData} options={chartOpts} /></div>
                        </div>
                        <div className="glass-card p-8 border border-border-main shadow-xl">
                            <h3 className="text-sm font-black text-primary-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary" /> Growth Trend (6 Months)
                            </h3>
                            <div style={{ height: '320px' }}><Line data={trendData} options={chartOpts} /></div>
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass-card p-8 border border-border-main shadow-xl">
                            <h3 className="text-sm font-black text-primary-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent" /> Visitors by Geofence
                            </h3>
                            <div style={{ height: '320px' }}><Doughnut data={doughnutData} options={doughnutOpts} /></div>
                        </div>
                        <div className="glass-card p-8 border border-border-main shadow-xl">
                            <h3 className="text-sm font-black text-primary-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-danger" /> Dwell Time Distribution
                            </h3>
                            <div style={{ height: '320px' }}><Bar data={dwellData} options={{ ...chartOpts, indexAxis: 'y' }} /></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
