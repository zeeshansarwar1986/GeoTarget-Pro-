import { MapContainer, TileLayer, FeatureGroup, useMap, Circle, Polygon } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { useTheme } from '../context/ThemeContext'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapComponent({ geofences = [], onFenceCreated, selectedFence, onFenceClick }) {
    const { theme } = useTheme();

    const tileUrl = (theme === 'white' || theme === 'half-white')
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    const _onCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'circle') {
            const { lat, lng } = layer.getLatLng();
            const radius = layer.getRadius();
            onFenceCreated({ type: 'circle', center: [lat, lng], radius });
        } else if (layerType === 'polygon' || layerType === 'rectangle') {
            const coordinates = layer.getLatLngs()[0].map(p => [p.lat, p.lng]);
            onFenceCreated({ type: 'polygon', coordinates });
        }
    };

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner bg-dark-800">
            <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={tileUrl}
                />
                <FeatureGroup>
                    <EditControl
                        position='topleft'
                        onCreated={_onCreated}
                        draw={{
                            rectangle: true,
                            polyline: false,
                            marker: false,
                            circlemarker: false,
                            circle: true,
                            polygon: true
                        }}
                    />
                </FeatureGroup>
                {geofences.map(fence => (
                    fence.type === 'circle' ? (
                        <Circle
                            key={fence.id}
                            center={fence.center}
                            radius={fence.radius}
                            pathOptions={{
                                color: fence.color,
                                fillColor: fence.color,
                                fillOpacity: 0.3,
                                dashArray: fence.active ? '' : '5, 10'
                            }}
                            eventHandlers={{ click: () => onFenceClick(fence) }}
                        />
                    ) : (
                        <Polygon
                            key={fence.id}
                            positions={fence.coordinates}
                            pathOptions={{
                                color: fence.color,
                                fillColor: fence.color,
                                fillOpacity: 0.3,
                                dashArray: fence.active ? '' : '5, 10'
                            }}
                            eventHandlers={{ click: () => onFenceClick(fence) }}
                        />
                    )
                ))}
            </MapContainer>
        </div>
    )
}
