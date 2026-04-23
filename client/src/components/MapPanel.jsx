import { useMemo } from 'react';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from './ui/card';

const DEFAULT_CENTER = [12.9716, 77.5946];

function MapPanel({ currentPosition, locations }) {
  const center = useMemo(() => {
    if (currentPosition?.latitude && currentPosition?.longitude) {
      return [currentPosition.latitude, currentPosition.longitude];
    }

    if (locations[0]?.coordinates) {
      return [locations[0].coordinates.latitude, locations[0].coordinates.longitude];
    }

    return DEFAULT_CENTER;
  }, [currentPosition, locations]);

  return (
    <Card className="overflow-hidden p-2">
      <div className="min-h-[360px] overflow-hidden rounded-[1.4rem] sm:min-h-[420px]">
        <MapContainer center={center} zoom={12} scrollWheelZoom className="h-[360px] w-full sm:h-[420px]">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {currentPosition ? (
            <CircleMarker
              center={[currentPosition.latitude, currentPosition.longitude]}
              radius={10}
              pathOptions={{ color: '#fb923c', fillColor: '#fb923c', fillOpacity: 0.85 }}
            >
              <Popup>Your current location</Popup>
            </CircleMarker>
          ) : null}

          {locations.map((location) => (
            <Circle
              key={location._id}
              center={[location.coordinates.latitude, location.coordinates.longitude]}
              radius={location.radius}
              pathOptions={{ color: '#20d3f9', fillColor: '#20d3f9', fillOpacity: 0.16 }}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-medium">{location.name}</p>
                  <p>Radius: {location.radius}m</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}

export default MapPanel;
