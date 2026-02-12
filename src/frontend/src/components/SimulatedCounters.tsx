import { Activity, Eye, AlertTriangle } from 'lucide-react';
import { useSimulationState } from '../hooks/useSimulationState';

export default function SimulatedCounters() {
  const { capturedStream, scanCount, blockCount } = useSimulationState();

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="glass-panel p-4 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-[oklch(0.7_0.25_145)]" />
          <span className="text-xs text-muted-foreground">Keystrokes</span>
        </div>
        <p className="text-2xl font-bold">{capturedStream.length}</p>
      </div>

      <div className="glass-panel p-4 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-[oklch(0.75_0.20_85)]" />
          <span className="text-xs text-muted-foreground">Scans</span>
        </div>
        <p className="text-2xl font-bold">{scanCount}</p>
      </div>

      <div className="glass-panel p-4 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-[oklch(0.65_0.25_0)]" />
          <span className="text-xs text-muted-foreground">Blocks</span>
        </div>
        <p className="text-2xl font-bold">{blockCount}</p>
      </div>
    </div>
  );
}
