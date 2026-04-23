import { useEffect, useRef, useState } from 'react';
import { locationService } from '../services/locationService';
import { calculateDistanceMeters } from '../utils/geo';
import { useTrackingStore } from '../store/TrackingContext';

export function useGeolocationTracking(locations = []) {
  const watcherRef = useRef(null);
  const triggeredRef = useRef(new Set());
  const [error, setError] = useState('');
  const { isTracking, setIsTracking, setCurrentPosition, setLastEvent } = useTrackingStore();

  const stop = () => {
    if (watcherRef.current != null) {
      navigator.geolocation.clearWatch(watcherRef.current);
      watcherRef.current = null;
    }

    triggeredRef.current = new Set();
    setIsTracking(false);
  };

  useEffect(() => () => stop(), []);

  const start = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.');
      return;
    }

    if (watcherRef.current != null) {
      return;
    }

    setError('');
    setIsTracking(true);

    watcherRef.current = navigator.geolocation.watchPosition(
      async ({ coords }) => {
        const point = { latitude: coords.latitude, longitude: coords.longitude };
        setCurrentPosition(point);

        const nearbyLocation = locations.find((location) => {
          const distance = calculateDistanceMeters(point, location.coordinates);
          return distance <= location.radius;
        });

        if (!nearbyLocation || triggeredRef.current.has(nearbyLocation._id)) {
          return;
        }

        triggeredRef.current.add(nearbyLocation._id);

        try {
          const response = await locationService.checkArrival(point);
          if (response.log) {
            setLastEvent(response.log);
          }
        } catch (requestError) {
          triggeredRef.current.delete(nearbyLocation._id);
          setError(requestError.response?.data?.message || 'Unable to verify arrival.');
        }
      },
      (positionError) => {
        setError(positionError.message || 'Unable to retrieve your location.');
        stop();
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      },
    );
  };

  return { isTracking, start, stop, error };
}
