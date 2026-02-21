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

    const login = (userData) => {
        const data = { ...userData, token: 'jwt-demo-token-' + Date.now() }
        setUser(data)
        localStorage.setItem('geotarget_user', JSON.stringify(data))
        return true
    }

    const signup = (userData) => {
        const data = {
            ...userData,
            id: 'user-' + Date.now(),
            token: 'jwt-demo-token-' + Date.now(),
            plan: 'free',
            createdAt: new Date().toISOString()
        }
        setUser(data)
        localStorage.setItem('geotarget_user', JSON.stringify(data))
        return true
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
