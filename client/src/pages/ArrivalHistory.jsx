import { useEffect, useState } from 'react';
import HistoryTable from '../components/HistoryTable';
import { historyService } from '../services/historyService';

function ArrivalHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    historyService
      .list()
      .then((response) => setLogs(response.logs))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load history.'));
  }, []);

  return (
    <div className="space-y-4">
      {error ? <div className="glass-panel rounded-3xl p-4 text-sm text-rose-300">{error}</div> : null}
      <HistoryTable items={logs} />
    </div>
  );
}

export default ArrivalHistoryPage;
