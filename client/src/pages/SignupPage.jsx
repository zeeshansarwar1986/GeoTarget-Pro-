import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', business: '' })
    const [error, setError] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.password) return setError('Please fill in all required fields')
        if (form.password.length < 6) return setError('Password must be at least 6 characters')
        signup({ name: form.name, email: form.email, business: form.business })
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
                            <h1 className="text-2xl font-bold text-white">Create Account</h1>
                            <p className="text-slate-400 text-sm mt-1">Start with the free plan — no credit card needed</p>
                        </div>

                        {error && <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl p-3 mb-4">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
                                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-field" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Business Name</label>
                                <input type="text" value={form.business} onChange={e => setForm(p => ({ ...p, business: e.target.value }))} className="input-field" placeholder="Your Business (optional)" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" placeholder="you@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Password *</label>
                                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input-field" placeholder="Min 6 characters" />
                            </div>
                            <label className="flex items-start gap-2 text-xs text-slate-400">
                                <input type="checkbox" className="accent-primary mt-0.5" defaultChecked />
                                <span>I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>. Data collected is GDPR/CCPA compliant.</span>
                            </label>
                            <button type="submit" className="btn-primary w-full !py-3">Create Free Account</button>
                        </form>

                        <p className="text-center text-sm text-slate-400 mt-6">
                            Already have an account? <Link to="/login" className="text-primary hover:text-primary-light font-medium">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
