import { Eye, Activity } from 'lucide-react';
import InContextWarning from './InContextWarning';
import ModuleInfoPopover from './ModuleInfoPopover';
import TransmissionAnimation from './TransmissionAnimation';
import { useSimulationState } from '../hooks/useSimulationState';
import { sanitizeDisplayText } from '@/lib/inputSanitizer';
import { useMemo } from 'react';

export default function AttackerDashboardPanel() {
  const { capturedStream, demoInput, settings } = useSimulationState();

  const sanitizedKeystrokes = useMemo(
    () => capturedStream.map(event => ({
      ...event,
      key: sanitizeDisplayText(event.key),
    })),
    [capturedStream]
  );

  const sanitizedDemoInput = useMemo(
    () => sanitizeDisplayText(demoInput),
    [demoInput]
  );

  return (
    <div className="glass-panel p-6 rounded-xl border border-[oklch(0.65_0.25_0)]/50 relative overflow-hidden bg-[oklch(0.65_0.25_0)]/5">
      <div className="absolute top-0 left-0 w-32 h-32 bg-[oklch(0.65_0.25_0)]/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[oklch(0.65_0.25_0)]" />
            <h3 className="text-lg font-semibold">Simulated Attacker View</h3>
          </div>
          <ModuleInfoPopover
            title="Attacker Dashboard"
            description="This panel shows what an attacker might see if they had a keylogger installed. The 'transmission' animation is purely visual - no actual data is being sent anywhere."
            tooltipText="The attacker view is a controlled visualization of simulated capture. Any 'transmission' is purely visual—no network sending occurs."
          />
        </div>

        <InContextWarning message="This view simulates what captured data might look like to an attacker. No real data transmission occurs." />

        <div className="mt-4 space-y-4">
          <div className="bg-background/50 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[oklch(0.65_0.25_0)]" />
              <span className="text-sm font-medium">Captured Stream</span>
            </div>
            <div className="h-32 overflow-y-auto bg-black/30 rounded p-3 font-mono text-xs">
              {sanitizedKeystrokes.length === 0 ? (
                <span className="text-muted-foreground">Waiting for input...</span>
              ) : (
                <div className="space-y-1">
                  {sanitizedKeystrokes.slice(-20).map((event, idx) => (
                    <div key={idx} className="text-[oklch(0.7_0.25_145)]">
                      [{new Date(event.timestamp).toLocaleTimeString()}] Key: {event.key}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-background/50 border border-border rounded-lg p-4">
            <span className="text-sm font-medium block mb-2">Reconstructed Text</span>
            <div className="bg-black/30 rounded p-3 font-mono text-sm text-[oklch(0.65_0.25_0)] min-h-[60px]">
              {sanitizedDemoInput || <span className="text-muted-foreground">No data captured yet</span>}
            </div>
          </div>

          {capturedStream.length > 0 && settings.transmissionAnimationEnabled && <TransmissionAnimation />}
        </div>
      </div>
    </div>
  );
}
