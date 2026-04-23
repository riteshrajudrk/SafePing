import { Card } from './ui/card';
import { formatDateTime } from '../utils/format';

function HistoryTable({ items }) {
  return (
    <Card className="overflow-hidden">
      <div className="mb-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Arrival history</p>
        <h3 className="text-xl font-semibold">Every automated check-in</h3>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-black/10 p-6 text-center">
          <h3 className="text-lg font-semibold">No arrival history yet</h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Start tracking and enter one of your safe zones to see delivery logs here.
          </p>
        </div>
      ) : null}

      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <div key={item._id} className="rounded-2xl border border-white/10 bg-black/10 p-4 shadow-lg shadow-black/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{item.location?.name || 'Unknown location'}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  {formatDateTime(item.sentAt)}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium capitalize">
                {item.deliveryStatus}
              </span>
            </div>

            <p className="mt-3 break-words text-sm text-[hsl(var(--muted-foreground))]">
              {item.contactSnapshots?.length
                ? item.contactSnapshots.map((contact) => contact.name || contact.phone).join(', ')
                : '--'}
            </p>
            <p className="mt-3 break-words text-sm leading-6">{item.message}</p>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[hsl(var(--muted-foreground))]">
            <tr>
              <th className="pb-3 pr-4 font-medium">Location</th>
              <th className="pb-3 pr-4 font-medium">Contact</th>
              <th className="pb-3 pr-4 font-medium">Delivery</th>
              <th className="pb-3 pr-4 font-medium">Sent At</th>
              <th className="pb-3 font-medium">Message</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-white/10">
                <td className="py-3 pr-4">{item.location?.name || 'Unknown location'}</td>
                <td className="py-3 pr-4">
                  {item.contactSnapshots?.length
                    ? item.contactSnapshots.map((contact) => contact.name || contact.phone).join(', ')
                    : '--'}
                </td>
                <td className="py-3 pr-4 capitalize">{item.deliveryStatus}</td>
                <td className="py-3 pr-4">{formatDateTime(item.sentAt)}</td>
                <td className="max-w-xs py-3">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default HistoryTable;
