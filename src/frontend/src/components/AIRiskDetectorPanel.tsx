import { Brain, TrendingUp } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import ThreatMeter3D from './ThreatMeter3D';
import { useSimulationState } from '../hooks/useSimulationState';
import { useEffect, useRef } from 'react';

export default function AIRiskDetectorPanel() {
  const { riskLevel, typingSpeed, patternScore } = useSimulationState();
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const previousRiskLevel = useRef<string>(riskLevel);

  const riskColors = {
    Low: 'oklch(0.7 0.25 145)',
    Medium: 'oklch(0.75 0.20 85)',
    High: 'oklch(0.65 0.25 0)',
  };

  const riskPercentage = {
    Low: 25,
    Medium: 60,
    High: 95,
  };

  // Announce significant risk level changes to screen readers
  useEffect(() => {
    if (!liveRegionRef.current) return;

    if (riskLevel !== previousRiskLevel.current) {
      liveRegionRef.current.textContent = `Risk level: ${riskLevel}`;
      previousRiskLevel.current = riskLevel;
    }
  }, [riskLevel]);

  return (
    <div className="glass-panel p-6 rounded-xl border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.75_0.20_85)]/10 rounded-full blur-3xl" />
      
      {/* Screen reader announcements for risk level changes */}
      <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
      />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[oklch(0.75_0.20_85)]" />
            <h3 className="text-xl font-semibold">AI Risk Detector</h3>
          </div>
          <ModuleInfoPopover
            title="AI Risk Detection"
            description="This simulation uses simple heuristics to analyze typing patterns. Real AI systems use sophisticated behavioral analysis, machine learning models, and contextual understanding to detect threats."
            tooltipText="The risk meter is a simplified educational heuristic. It analyzes typing patterns locally and does not transmit data off-device."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ThreatMeter3D level={riskLevel} percentage={riskPercentage[riskLevel]} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Risk Level</span>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full risk-badge"
                  style={{ backgroundColor: `${riskColors[riskLevel]}/20`, color: riskColors[riskLevel] }}
                  aria-label={`Current risk level: ${riskLevel}`}
                >
                  {riskLevel}
                </span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden" role="progressbar" aria-valuenow={riskPercentage[riskLevel]} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full transition-all duration-500 progress-bar"
                  style={{
                    width: `${riskPercentage[riskLevel]}%`,
                    backgroundColor: riskColors[riskLevel],
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Typing Speed</span>
                <span className="text-sm text-muted-foreground">{typingSpeed.toFixed(1)} chars/sec</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.min((typingSpeed / 10) * 100, 100)} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full bg-cyber-accent transition-all duration-300 progress-bar"
                  style={{ width: `${Math.min((typingSpeed / 10) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pattern Score</span>
                <span className="text-sm text-muted-foreground">{patternScore}/100</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden" role="progressbar" aria-valuenow={patternScore} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full bg-[oklch(0.75_0.20_85)] transition-all duration-300 progress-bar"
                  style={{ width: `${patternScore}%` }}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg mt-4">
              <TrendingUp className="w-4 h-4 text-[oklch(0.75_0.20_85)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Analysis based on typing speed, pattern complexity, and sensitive keyword detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
