import { createContext, useContext, useState, useEffect } from 'react'

const GeofenceContext = createContext()

export const useGeofences = () => useContext(GeofenceContext)

const DEMO_GEOFENCES = [
    {
        id: 'gf-1',
        name: 'Downtown Store',
        type: 'circle',
        center: [40.7128, -74.0060],
        radius: 500,
        color: '#6366F1',
        trigger: 'enter',
        action: 'push_notification',
        message: '🎉 Welcome! Get 20% off today!',
        active: true,
        visitors: 1284,
        notifications: 856,
        avgDwell: 22,
        createdAt: '2026-01-15'
    },
    {
        id: 'gf-2',
        name: 'Shopping Mall',
        type: 'circle',
        center: [40.7580, -73.9855],
        radius: 800,
        color: '#10B981',
        trigger: 'enter',
        action: 'push_notification',
        message: '🛍️ Check out our mall deals!',
        active: true,
        visitors: 3456,
        notifications: 2101,
        avgDwell: 45,
        createdAt: '2026-01-20'
    },
    {
        id: 'gf-3',
        name: 'Airport Terminal',
        type: 'circle',
        center: [40.6413, -73.7781],
        radius: 1200,
        color: '#F59E0B',
        trigger: 'both',
        action: 'email',
        message: '✈️ Safe travels! Pre-order duty free.',
        active: false,
        visitors: 8920,
        notifications: 4210,
        avgDwell: 120,
        createdAt: '2026-02-01'
    },
    {
        id: 'gf-4',
        name: 'Restaurant Zone',
        type: 'circle',
        center: [40.7484, -73.9857],
        radius: 300,
        color: '#EF4444',
        trigger: 'enter',
        action: 'sms',
        message: '🍕 Hungry? 15% lunch special inside!',
        active: true,
        visitors: 567,
        notifications: 389,
        avgDwell: 35,
        createdAt: '2026-02-10'
    }
]

export function GeofenceProvider({ children }) {
    const [geofences, setGeofences] = useState([])
    const [selectedFence, setSelectedFence] = useState(null)

    const getHeaders = () => {
        const savedUser = localStorage.getItem('geotarget_user')
        if (!savedUser) return { 'Content-Type': 'application/json' }
        const { token } = JSON.parse(savedUser)
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        const fetchGeofences = async () => {
            try {
                const response = await fetch('/api/geofences', { headers: getHeaders() })
                const result = await response.json()
                if (result.success) setGeofences(result.data)
                else setGeofences(DEMO_GEOFENCES)
            } catch (error) {
                setGeofences(DEMO_GEOFENCES)
            }
        }
        fetchGeofences()
    }, [])

    const saveFences = (fences) => {
        setGeofences(fences)
        localStorage.setItem('geotarget_fences', JSON.stringify(fences))
    }

    const addGeofence = async (fence) => {
        try {
            const response = await fetch('/api/geofences', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(fence)
            })
            const result = await response.json()
            if (result.success) setGeofences([...geofences, result.data])
        } catch (error) {
            console.error('Failed to add geofence:', error)
        }
    }

    const updateGeofence = async (id, updates) => {
        try {
            const response = await fetch(`/api/geofences/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(updates)
            })
            const result = await response.json()
            if (result.success) {
                setGeofences(geofences.map(f => f._id === id ? result.data : f))
            }
        } catch (error) {
            console.error('Failed to update geofence:', error)
        }
    }

    const deleteGeofence = async (id) => {
        try {
            const response = await fetch(`/api/geofences/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            })
            const result = await response.json()
            if (result.success) {
                setGeofences(geofences.filter(f => (f._id || f.id) !== id))
                if (selectedFence?._id === id || selectedFence?.id === id) setSelectedFence(null)
            }
        } catch (error) {
            console.error('Failed to delete geofence:', error)
        }
    }

    const toggleGeofence = async (id) => {
        const fence = geofences.find(f => (f._id || f.id) === id)
        if (fence) {
            updateGeofence(id, { active: !fence.active })
        }
    }

    const stats = {
        totalFences: geofences.length,
        activeFences: geofences.filter(f => f.active).length,
        totalVisitors: geofences.reduce((sum, f) => sum + f.visitors, 0),
        totalNotifications: geofences.reduce((sum, f) => sum + f.notifications, 0),
        avgDwellTime: Math.round(geofences.reduce((sum, f) => sum + f.avgDwell, 0) / (geofences.length || 1))
    }

    return (
        <GeofenceContext.Provider value={{ geofences, selectedFence, setSelectedFence, addGeofence, updateGeofence, deleteGeofence, toggleGeofence, stats }}>
            {children}
        </GeofenceContext.Provider>
    )
}
