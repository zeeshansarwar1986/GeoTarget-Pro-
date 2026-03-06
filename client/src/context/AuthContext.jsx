import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('geotarget_user')
        if (saved) {
            try { setUser(JSON.parse(saved)) } catch (e) { }
        }
        setLoading(false)
    }, [])

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })
            const result = await response.json()
            if (result.success) {
                setUser(result.data)
                localStorage.setItem('geotarget_user', JSON.stringify(result.data))
                return { success: true }
            }
            return { success: false, error: result.error }
        } catch (error) {
            return { success: false, error: 'Server connection failed' }
        }
    }

    const signup = async (userData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            const result = await response.json()
            if (result.success) {
                setUser(result.data)
                localStorage.setItem('geotarget_user', JSON.stringify(result.data))
                return { success: true }
            }
            return { success: false, error: result.error }
        } catch (error) {
            return { success: false, error: 'Server connection failed' }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('geotarget_user')
    }

    const updatePlan = (plan) => {
        const updated = { ...user, plan }
        setUser(updated)
        localStorage.setItem('geotarget_user', JSON.stringify(updated))
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updatePlan }}>
            {children}
        </AuthContext.Provider>
    )
}
