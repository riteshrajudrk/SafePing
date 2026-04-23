import { createContext, useContext, useMemo, useState } from 'react';

const TrackingContext = createContext(null);

export function TrackingProvider({ children }) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [lastEvent, setLastEvent] = useState(null);

  const value = useMemo(
    () => ({
      isTracking,
      setIsTracking,
      currentPosition,
      setCurrentPosition,
      lastEvent,
      setLastEvent,
    }),
    [currentPosition, isTracking, lastEvent],
  );

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}

export function useTrackingStore() {
  const context = useContext(TrackingContext);

  if (!context) {
    throw new Error('useTrackingStore must be used within TrackingProvider');
  }

  return context;
}
