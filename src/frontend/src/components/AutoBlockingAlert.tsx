import { ShieldAlert, RefreshCw } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useSimulationState } from '../hooks/useSimulationState';

export default function AutoBlockingAlert() {
  const { isBlocked, unblock } = useSimulationState();

  if (!isBlocked) return null;

  return (
    <div className="glass-panel p-6 rounded-xl border-2 border-[oklch(0.65_0.25_0)] bg-[oklch(0.65_0.25_0)]/10 relative overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.65_0.25_0)]/20 to-transparent" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[oklch(0.65_0.25_0)]" />
            <h3 className="text-lg font-semibold text-[oklch(0.65_0.25_0)]">Auto-Block Activated</h3>
          </div>
          <ModuleInfoPopover
            title="Auto-Blocking"
            description="This simulation automatically blocks the demo input when high-risk behavior is detected. In real systems, auto-blocking would prevent malicious processes from executing."
            tooltipText="Auto-blocking is a simulation safety feature for the demo input. It does not indicate any real system action."
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-background/50 border border-[oklch(0.65_0.25_0)]/30 rounded-lg">
            <p className="font-semibold text-[oklch(0.65_0.25_0)] mb-2">🛡️ Threat Blocked Successfully</p>
            <p className="text-sm text-muted-foreground">
              High-risk activity detected. The simulated keylogger has been automatically disabled to protect your data.
            </p>
          </div>

          <button
            onClick={unblock}
            className="w-full px-4 py-2 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset & Continue Demo
          </button>
        </div>
      </div>
    </div>
  );
}
