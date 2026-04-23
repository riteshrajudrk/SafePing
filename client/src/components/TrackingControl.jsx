import { Crosshair, PauseCircle, Radio, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

function TrackingControl({ isTracking, onStart, onStop, error, lastEvent }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
            <Radio className="mr-2 h-3.5 w-3.5" />
            Live geofence watcher
          </div>

          <div>
            <h3 className="mt-1 text-xl font-semibold">
              {isTracking ? 'Tracking active' : 'Tracking paused'}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-[hsl(var(--muted-foreground))]">
              SafePing uses your browser location to check when you enter a saved zone and then calls the backend to send the SMS.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Status</p>
              <p className="mt-1 text-sm font-medium">{isTracking ? 'Monitoring now' : 'Waiting to start'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Last delivery</p>
              <p className="mt-1 text-sm font-medium capitalize">{lastEvent?.deliveryStatus || 'None yet'}</p>
            </div>
          </div>
        </div>

        <Button onClick={isTracking ? onStop : onStart} variant={isTracking ? 'destructive' : 'default'} className="w-full lg:w-auto">
          {isTracking ? <PauseCircle className="mr-2 h-4 w-4" /> : <Crosshair className="mr-2 h-4 w-4" />}
          {isTracking ? 'Stop tracking' : 'Start tracking'}
        </Button>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      {lastEvent ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          <Shield className="mt-0.5 h-4 w-4" />
          <p>
            Latest arrival confirmed for <span className="font-medium">{lastEvent.location?.name}</span> and message delivery was{' '}
            <span className="font-medium capitalize">{lastEvent.deliveryStatus}</span>.
          </p>
        </div>
      ) : null}
    </Card>
  );
}

export default TrackingControl;
