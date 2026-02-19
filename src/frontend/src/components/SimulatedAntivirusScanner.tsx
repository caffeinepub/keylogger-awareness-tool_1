import { Shield, Search, AlertTriangle, Trash2 } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useSimulationState } from '../hooks/useSimulationState';
import { useEffect, useRef } from 'react';

export default function SimulatedAntivirusScanner() {
  const { avStatus, startAVScan, quarantineThreat, removeThreat } = useSimulationState();
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Announce status changes to screen readers
  useEffect(() => {
    if (!liveRegionRef.current) return;

    let announcement = '';
    switch (avStatus) {
      case 'scanning':
        announcement = 'Scanning for threats';
        break;
      case 'detected':
        announcement = 'Threat detected';
        break;
      case 'quarantined':
        announcement = 'Threat quarantined';
        break;
      case 'removed':
        announcement = 'Threat removed successfully';
        break;
    }

    if (announcement) {
      liveRegionRef.current.textContent = announcement;
    }
  }, [avStatus]);

  return (
    <div className="glass-panel p-6 rounded-xl border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-[oklch(0.7_0.25_145)]/10 rounded-full blur-3xl" />
      
      {/* Screen reader announcements */}
      <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
            <h3 className="text-lg font-semibold">Antivirus Scanner</h3>
          </div>
          <ModuleInfoPopover
            title="Simulated Antivirus"
            description="This is a visual simulation of antivirus scanning. No real malware detection is performed. The scan, quarantine, and removal actions are purely illustrative."
            tooltipText="Scanning, quarantine, and removal are illustrative simulation actions only. They do not perform real malware detection."
          />
        </div>

        <div className="space-y-4">
          {avStatus === 'idle' && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">Ready to scan for threats</p>
              <button
                onClick={startAVScan}
                className="px-6 py-2 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors"
                aria-label="Start antivirus scan"
              >
                Start Scan
              </button>
            </div>
          )}

          {avStatus === 'scanning' && (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-[oklch(0.7_0.25_145)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium mb-2">Scanning for threats...</p>
              <p className="text-xs text-muted-foreground">Analyzing simulated keylogger activity</p>
            </div>
          )}

          {(avStatus === 'detected' || avStatus === 'quarantined' || avStatus === 'removed') && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-[oklch(0.65_0.25_0)]/10 border border-[oklch(0.65_0.25_0)]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[oklch(0.65_0.25_0)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-[oklch(0.65_0.25_0)] mb-1">Threat Detected</p>
                  <p className="text-sm text-muted-foreground mb-2">Simulated Keylogger Threat</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-[oklch(0.65_0.25_0)]/20 rounded">High Risk</span>
                    <span className="text-muted-foreground">Detected: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {avStatus === 'detected' && (
                <div className="flex gap-2">
                  <button
                    onClick={quarantineThreat}
                    className="flex-1 px-4 py-2 bg-[oklch(0.75_0.20_85)] text-white rounded-lg hover:bg-[oklch(0.65_0.20_85)] transition-colors"
                    aria-label="Quarantine threat"
                  >
                    Quarantine
                  </button>
                  <button
                    onClick={removeThreat}
                    className="flex-1 px-4 py-2 bg-[oklch(0.65_0.25_0)] text-white rounded-lg hover:bg-[oklch(0.55_0.25_0)] transition-colors flex items-center justify-center gap-2"
                    aria-label="Remove threat"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              )}

              {avStatus === 'quarantined' && (
                <div className="p-4 bg-[oklch(0.75_0.20_85)]/10 border border-[oklch(0.75_0.20_85)]/30 rounded-lg text-center">
                  <p className="text-sm font-medium text-[oklch(0.75_0.20_85)]">Threat Quarantined</p>
                  <p className="text-xs text-muted-foreground mt-1">The threat has been isolated</p>
                </div>
              )}

              {avStatus === 'removed' && (
                <div className="p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg text-center">
                  <p className="text-sm font-medium text-[oklch(0.7_0.25_145)]">Threat Removed Successfully</p>
                  <p className="text-xs text-muted-foreground mt-1">Your system is now secure</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
