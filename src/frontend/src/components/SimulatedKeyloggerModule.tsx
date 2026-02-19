import { Keyboard } from 'lucide-react';
import InContextWarning from './InContextWarning';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useSimulationState } from '../hooks/useSimulationState';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function SimulatedKeyloggerModule() {
  const { demoInput, setDemoInput, isBlocked, rateLimitExceeded } = useSimulationState();

  return (
    <div className="glass-panel p-6 rounded-xl border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.7_0.25_145)]/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
            <h3 className="text-lg font-semibold">Demo Input Area</h3>
          </div>
          <ModuleInfoPopover
            title="Simulated Keylogger"
            description="This module captures keystrokes ONLY from this input box. No global keyboard capture is performed. All data stays in your browser and is never transmitted to any server."
            tooltipText="The demo input area is the only capture zone. Everything you type here stays in your browser for educational purposes."
          />
        </div>

        <InContextWarning message="This is a simulation for educational purposes only. Type in the box below to see how a keylogger might capture input." />

        {rateLimitExceeded && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Rate limit exceeded. Typing is being throttled for security demonstration purposes. Please slow down your typing speed.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2" htmlFor="demo-input">
            Type here to simulate capture:
          </label>
          <textarea
            id="demo-input"
            value={demoInput}
            onChange={(e) => setDemoInput(e.target.value)}
            disabled={isBlocked}
            placeholder="Start typing to see the simulation in action..."
            className="w-full h-32 px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.25_145)] disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            aria-describedby="input-warning"
          />
          <p id="input-warning" className="sr-only">
            This is a simulation. Your input is processed locally and never sent to any server.
          </p>
          {isBlocked && (
            <p className="mt-2 text-sm text-[oklch(0.65_0.25_0)] font-medium" role="alert">
              ⚠️ Input blocked due to high-risk detection
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-[oklch(0.7_0.25_145)] animate-pulse" />
          <span>Monitoring active (demo only)</span>
        </div>
      </div>
    </div>
  );
}
