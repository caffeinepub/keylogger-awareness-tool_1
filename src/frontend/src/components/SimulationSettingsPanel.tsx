import { Settings, RotateCcw, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import InContextWarning from './InContextWarning';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useSimulationState } from '../hooks/useSimulationState';

export default function SimulationSettingsPanel() {
  const { settings, updateSettings, resetSettings } = useSimulationState();

  return (
    <div className="glass-panel p-6 rounded-xl border border-[oklch(0.7_0.25_145)]/50 relative overflow-hidden bg-[oklch(0.7_0.25_145)]/5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[oklch(0.7_0.25_145)]/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
            <h3 className="text-lg font-semibold">Simulation Settings</h3>
          </div>
          <ModuleInfoPopover
            title="Simulation Settings"
            description="Adjust how the simulation behaves. All changes apply immediately and affect only the demo behavior - no data is stored or transmitted."
            tooltipText="Settings affect only the simulation behavior locally. They are not stored or transmitted anywhere."
          />
        </div>

        <div className="mb-4">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30">
            <Info className="w-4 h-4 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All controls below change the simulation only. No data is transmitted or stored.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Auto-blocking Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-blocking" className="text-sm font-medium">
                Auto-blocking
              </Label>
              <p className="text-xs text-muted-foreground">
                Block input when high-risk behavior is detected
              </p>
            </div>
            <Switch
              id="auto-blocking"
              checked={settings.autoBlockingEnabled}
              onCheckedChange={(checked) => updateSettings({ autoBlockingEnabled: checked })}
            />
          </div>

          {/* Transmission Animation Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transmission-animation" className="text-sm font-medium">
                Transmission Animation
              </Label>
              <p className="text-xs text-muted-foreground">
                Show visual animation in attacker view
              </p>
            </div>
            <Switch
              id="transmission-animation"
              checked={settings.transmissionAnimationEnabled}
              onCheckedChange={(checked) => updateSettings({ transmissionAnimationEnabled: checked })}
            />
          </div>

          {/* AV Scan Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="av-scan-duration" className="text-sm font-medium">
                AV Scan Duration
              </Label>
              <span className="text-xs text-muted-foreground">
                {settings.avScanDuration}ms
              </span>
            </div>
            <Slider
              id="av-scan-duration"
              min={500}
              max={5000}
              step={100}
              value={[settings.avScanDuration]}
              onValueChange={([value]) => updateSettings({ avScanDuration: value })}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Time spent in "scanning" state before detection
            </p>
          </div>

          {/* Scenario Playback Speed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="playback-speed" className="text-sm font-medium">
                Scenario Playback Speed
              </Label>
              <span className="text-xs text-muted-foreground">
                {settings.scenarioPlaybackSpeed}ms/char
              </span>
            </div>
            <Slider
              id="playback-speed"
              min={50}
              max={500}
              step={10}
              value={[settings.scenarioPlaybackSpeed]}
              onValueChange={([value]) => updateSettings({ scenarioPlaybackSpeed: value })}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Typing speed for test scenarios (lower = faster)
            </p>
          </div>

          {/* Risk Thresholds */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h4 className="text-sm font-medium">Risk Detection Thresholds</h4>
            
            {/* Medium Risk Threshold */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="medium-threshold" className="text-sm font-medium">
                  Medium Risk Threshold
                </Label>
                <span className="text-xs text-muted-foreground">
                  {settings.riskThresholds.mediumThreshold}
                </span>
              </div>
              <Slider
                id="medium-threshold"
                min={10}
                max={50}
                step={5}
                value={[settings.riskThresholds.mediumThreshold]}
                onValueChange={([value]) => 
                  updateSettings({ 
                    riskThresholds: { 
                      ...settings.riskThresholds, 
                      mediumThreshold: value 
                    } 
                  })
                }
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Pattern score needed to trigger Medium risk
              </p>
            </div>

            {/* High Risk Threshold */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-threshold" className="text-sm font-medium">
                  High Risk Threshold
                </Label>
                <span className="text-xs text-muted-foreground">
                  {settings.riskThresholds.highThreshold}
                </span>
              </div>
              <Slider
                id="high-threshold"
                min={40}
                max={100}
                step={5}
                value={[settings.riskThresholds.highThreshold]}
                onValueChange={([value]) => 
                  updateSettings({ 
                    riskThresholds: { 
                      ...settings.riskThresholds, 
                      highThreshold: value 
                    } 
                  })
                }
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Pattern score needed to trigger High risk
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium">Reset to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
