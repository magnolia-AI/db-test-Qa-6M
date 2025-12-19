import { getLogs } from '@/app/actions/logs';
import LogConsole from '@/components/log-console';
import { ShieldAlert, Info, AlertTriangle, Terminal as TerminalIcon } from 'lucide-react';
import { format } from 'date-fns';

const SeverityIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'critical': return <ShieldAlert className="text-red-500" size={16} />;
    case 'warning': return <AlertTriangle className="text-yellow-500" size={16} />;
    case 'info': return <Info className="text-blue-500" size={16} />;
    default: return <TerminalIcon className="text-zinc-500" size={16} />;
  }
};

export default async function Home() {
  const result = await getLogs();
  const logs = result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-4 md:p-10 font-mono">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-2 border-b border-zinc-900 pb-8">
          <h1 className="text-4xl font-black tracking-tighter items-center flex gap-3">
            <div className="w-3 h-3 bg-blue-600 animate-pulse rounded-full" />
            CORE_SYSTEM_LOGS
          </h1>
          <p className="text-zinc-500 text-sm">ARCHIVAL_DATA_STREAM // STATUS: OPERATIONAL</p>
        </header>

        <section className="grid grid-cols-1 gap-8">
          <LogConsole />

          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
              <h2 className="text-xs uppercase text-zinc-500 font-bold tracking-[0.2em]">Live Stream Data</h2>
              <span className="text-[10px] text-zinc-700">RETENTION: 50 ENTRIES</span>
            </div>

            <div className="space-y-[1px]">
              {logs?.length === 0 ? (
                <div className="bg-zinc-950/50 border border-zinc-900 p-12 text-center text-zinc-600 italic">
                  NO_LOG_DATA_DETECTED
                </div>
              ) : (
                logs?.map((log) => (
                  <div 
                    key={log.id} 
                    className="grid grid-cols-[100px_1fr_120px] items-center gap-4 bg-zinc-950 p-3 border border-zinc-900 hover:bg-zinc-900/50 transition-colors group"
                  >
                    <div className="text-[10px] text-zinc-500">
                      {format(new Date(log.timestamp), 'HH:mm:ss:SSS')}
                    </div>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <SeverityIcon severity={log.severity} />
                      <span className="font-bold text-zinc-300 whitespace-nowrap">[{log.event}]</span>
                      <span className="text-zinc-500 text-sm truncate">{log.details}</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 text-right uppercase tracking-tighter italic">
                      ID: {log.id.toString().padStart(6, '0')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

