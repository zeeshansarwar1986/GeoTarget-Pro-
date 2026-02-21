/** Check if a point is inside a circle geofence */
export function isPointInCircle(point, center, radiusMeters) {
    const R = 6371e3 // Earth radius in meters
    const toRad = (deg) => deg * Math.PI / 180

    const lat1 = toRad(center[0])
    const lat2 = toRad(point[0])
    const dLat = toRad(point[0] - center[0])
    const dLng = toRad(point[1] - center[1])

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance <= radiusMeters
}

/** Calculate distance between two points in meters (Haversine) */
export function calculateDistance(point1, point2) {
    const R = 6371e3
    const toRad = (deg) => deg * Math.PI / 180

    const dLat = toRad(point2[0] - point1[0])
    const dLng = toRad(point2[1] - point1[1])

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(point1[0])) * Math.cos(toRad(point2[0])) * Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Check if point is inside a polygon (Ray Casting algorithm) */
export function isPointInPolygon(point, polygon) {
    let inside = false
    const [x, y] = point
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside
        }
    }
    return inside
}
