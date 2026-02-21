import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Map View', path: '/map', icon: '🗺️' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Notifications', path: '/notifications', icon: '🔔' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 glass-card !rounded-none !border-t-0 !border-l-0 lg:block hidden z-40">
            <div className="flex flex-col h-full p-4">
                <nav className="space-y-1">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'btn-primary !shadow-primary/10' : 'text-secondary-text hover:bg-dark-700/50 hover:text-primary-text'}`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span className="font-medium text-sm">{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto p-4 glass-card !rounded-2xl border-primary/20 bg-primary/5">
                    <p className="text-xs text-secondary-text font-bold uppercase tracking-wider mb-2">Current Plan</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary-text capitalize">{user?.plan || 'Free'}</span>
                        <Link to="/settings" className="text-xs text-primary font-bold hover:underline transition-all">Upgrade</Link>
                    </div>
                </div>
            </div>
        </aside>
    )
}
