import { useEffect, useMemo, useState } from 'react';
import { Compass, MapPin, Shield } from 'lucide-react';
import MapPanel from '../components/MapPanel';
import TrackingControl from '../components/TrackingControl';
import { Card } from '../components/ui/card';
import { locationService } from '../services/locationService';
import { useGeolocationTracking } from '../hooks/useGeolocationTracking';
import { useTrackingStore } from '../store/TrackingContext';

function MapTrackingPage() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const { currentPosition, lastEvent } = useTrackingStore();
  const { isTracking, start, stop, error: trackingError } = useGeolocationTracking(locations);

  const positionText = useMemo(() => {
    if (!currentPosition) {
      return 'Waiting for location';
    }

    return `${currentPosition.latitude.toFixed(5)}, ${currentPosition.longitude.toFixed(5)}`;
  }, [currentPosition]);

  useEffect(() => {
    locationService
      .list()
      .then((response) => setLocations(response.locations))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load locations.'));
  }, []);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
      <MapPanel currentPosition={currentPosition} locations={locations} />
      <div className="space-y-4">
        <TrackingControl
          isTracking={isTracking}
          onStart={start}
          onStop={stop}
          error={trackingError || error}
          lastEvent={lastEvent}
        />
        <Card className="space-y-4">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Current position</p>
            <h3 className="mt-2 text-xl font-semibold">{positionText}</h3>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Keep this page open to visualize your current location, nearby safe zones, and the latest delivery event.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <MapPin className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Geofences</span>
              </div>
              <p className="mt-2 text-lg font-semibold">{locations.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <div className="flex items-center gap-2 text-cyan-300">
                <Compass className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Tracker</span>
              </div>
              <p className="mt-2 text-lg font-semibold">{isTracking ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          {lastEvent ? (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Latest arrival event</span>
              </div>
              <p className="mt-2">
                {lastEvent.location?.name} was triggered and delivery finished with status{' '}
                <span className="font-medium capitalize">{lastEvent.deliveryStatus}</span>.
              </p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

export default MapTrackingPage;
