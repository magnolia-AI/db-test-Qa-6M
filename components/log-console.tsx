'use client';

import { useState } from 'react';
import { createLogEntry } from '@/app/actions/logs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export default function LogConsole() {
  const [event, setEvent] = useState('');
  const [details, setDetails] = useState('');
  const [severity, setSeverity] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !details) return;

    setIsSubmitting(true);
    const result = await createLogEntry(event, details, severity);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('System event logged successfully');
      setEvent('');
      setDetails('');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 font-mono">
      <div className="flex items-center gap-2 mb-6 text-zinc-400">
        <Terminal size={18} />
        <span className="text-sm uppercase tracking-widest">Initialization Console</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            placeholder="SYSTEM_EVENT_TYPE" 
            value={event}
            onChange={(e) => setEvent(e.target.value.toUpperCase())}
            className="bg-zinc-900 border-zinc-800 text-blue-400 placeholder:text-zinc-600 focus-visible:ring-blue-500"
          />
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300">
              <SelectValue placeholder="SEVERITY" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
              <SelectItem value="low">LOW_PRIORITY</SelectItem>
              <SelectItem value="info">INFO_LEVEL</SelectItem>
              <SelectItem value="warning">WARNING_STATE</SelectItem>
              <SelectItem value="critical">CRITICAL_FAILURE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Input 
          placeholder="EVENT_DETAILS_PAYLOAD" 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-blue-500"
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          {isSubmitting ? 'INITIALIZING...' : 'DEPLOY_LOG_ENTRY'}
        </Button>
      </form>
    </div>
  );
}

