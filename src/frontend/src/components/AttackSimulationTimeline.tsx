import { Keyboard, Radio, Send, Shield, Lock } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useSimulationState } from '../hooks/useSimulationState';

export default function AttackSimulationTimeline() {
  const { timelineStage, demoInput, avStatus, isBlocked } = useSimulationState();

  const stages = [
    { icon: Keyboard, label: 'User Types', active: demoInput.length > 0 },
    { icon: Radio, label: 'Keylogger Captures', active: demoInput.length > 0 },
    { icon: Send, label: 'Data Transmitted', active: demoInput.length > 5 },
    { icon: Shield, label: 'Antivirus Detects', active: avStatus !== 'idle' },
    { icon: Lock, label: 'Threat Blocked', active: isBlocked || avStatus === 'removed' },
  ];

  return (
    <div className="glass-panel p-6 rounded-xl border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Attack Simulation Timeline</h3>
        <ModuleInfoPopover
          title="Attack Timeline"
          description="This timeline shows the typical stages of a keylogger attack from initial capture to detection and blocking. All stages are simulated locally."
          tooltipText="The timeline is an educational sequence of typical attack stages in the simulation. Everything is local-only."
        />
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-6 left-0 h-0.5 bg-cyber-accent transition-all duration-500 timeline-progress"
          style={{ width: `${(timelineStage / 5) * 100}%` }}
        />

        {/* Stages */}
        <div className="relative grid grid-cols-5 gap-2">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = stage.active;
            
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 timeline-stage ${
                    isActive
                      ? 'bg-cyber-accent border-cyber-accent text-white scale-110 shadow-glow-accent'
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-xs text-center transition-colors ${
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
