import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email || !form.password) return setError('Please fill in all fields')
        login({ name: form.email.split('@')[0], email: form.email })
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 pt-16">
                <div className="w-full max-w-md">
                    <div className="glass-card p-8 animate-slide-up">
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">G</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                            <p className="text-slate-400 text-sm mt-1">Log in to your GeoTarget Pro account</p>
                        </div>

                        {error && <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl p-3 mb-4">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" placeholder="you@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input-field" placeholder="••••••••" />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-slate-400"><input type="checkbox" className="accent-primary" /> Remember me</label>
                                <a href="#" className="text-primary hover:text-primary-light">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn-primary w-full !py-3">Log In</button>
                        </form>

                        <p className="text-center text-sm text-slate-400 mt-6">
                            Don't have an account? <Link to="/signup" className="text-primary hover:text-primary-light font-medium">Sign up free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
