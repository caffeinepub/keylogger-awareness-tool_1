import { Brain, TrendingUp } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import ThreatMeter3D from './ThreatMeter3D';
import { useSimulationState } from '../hooks/useSimulationState';

export default function AIRiskDetectorPanel() {
  const { riskLevel, typingSpeed, patternScore } = useSimulationState();

  const riskColors = {
    Low: 'oklch(0.7_0.25_145)',
    Medium: 'oklch(0.75_0.20_85)',
    High: 'oklch(0.65_0.25_0)',
  };

  const riskPercentage = {
    Low: 25,
    Medium: 60,
    High: 95,
  };

  return (
    <div className="glass-panel p-6 rounded-xl border border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.75_0.20_85)]/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[oklch(0.75_0.20_85)]" />
            <h3 className="text-lg font-semibold">AI Risk Detector</h3>
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
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${riskColors[riskLevel]}/20`, color: riskColors[riskLevel] }}
                >
                  {riskLevel}
                </span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
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
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-[oklch(0.7_0.25_145)] transition-all duration-300"
                  style={{ width: `${Math.min((typingSpeed / 10) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pattern Score</span>
                <span className="text-sm text-muted-foreground">{patternScore}/100</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-[oklch(0.75_0.20_85)] transition-all duration-300"
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
