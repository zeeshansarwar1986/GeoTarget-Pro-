import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Palette } from 'lucide-react'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const isLanding = location.pathname === '/'

    const themes = [
        { id: 'dark-blue', label: 'ڈارک بلیو', icon: <Moon size={16} />, class: 'bg-dark-900 border-indigo-500' },
        { id: 'half-white', label: 'ہاف وائٹ', icon: <Palette size={16} />, class: 'bg-slate-100 border-slate-300' },
        { id: 'white', label: 'وائٹ', icon: <Sun size={16} />, class: 'bg-white border-slate-200' },
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLanding ? 'bg-transparent' : 'glass-card !rounded-none !border-t-0 !border-x-0 bg-opacity-95'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <span className="text-xl font-bold text-white">Geo<span className="text-primary">Target</span> Pro</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {isLanding && (
                            <>
                                <a href="#features" className="text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">Features</a>
                                <a href="#pricing" className="text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">Pricing</a>
                                <a href="#about" className="text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">About</a>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Theme Switcher */}
                        <div className="flex items-center gap-1 bg-dark-700/50 p-1 rounded-full border border-border-main">
                            {themes.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleTheme(t.id)}
                                    title={t.label}
                                    className={`p-1.5 rounded-full transition-all ${theme === t.id ? 'bg-primary text-white scale-110 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    {t.icon}
                                </button>
                            ))}
                        </div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/dashboard" className="text-sm text-secondary-text hover:text-primary-text transition-colors font-medium">Dashboard</Link>
                                <div className="flex items-center gap-2 glass-card !rounded-full px-3 py-1.5 !shadow-none">
                                    <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">{user.name?.[0] || 'U'}</span>
                                    </div>
                                    <span className="text-sm text-secondary-text hidden sm:block">{user.name || 'User'}</span>
                                </div>
                                <button onClick={logout} className="text-sm text-slate-400 hover:text-danger transition-colors font-medium">Logout</button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm text-secondary-text hover:text-primary-text transition-colors font-medium px-4 py-2">Log In</Link>
                                <Link to="/signup" className="btn-primary text-sm !px-4 !py-2">Start Free</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
