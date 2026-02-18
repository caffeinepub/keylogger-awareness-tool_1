import { Palette, Minimize2, Maximize2, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import ModuleInfoPopover from './ModuleInfoPopover';
import { useAppearancePreferences } from '../hooks/useAppearancePreferences';

export default function AppearanceExperiencePanel() {
  const { theme, setTheme } = useTheme();
  const { preferences, toggleReducedMotion, setDensity } = useAppearancePreferences();

  return (
    <div className="glass-panel p-6 rounded-xl border border-cyber-accent/30 relative overflow-hidden bg-cyber-accent/5">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyber-accent" />
            <h3 className="text-lg font-semibold">Appearance & Experience</h3>
          </div>
          <ModuleInfoPopover
            title="Appearance & Experience"
            description="Customize how the interface looks and feels. All preferences are saved locally in your browser and affect only visual presentation."
            tooltipText="Personalize your experience with theme, motion, and layout preferences."
          />
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="theme-toggle" className="text-sm font-medium flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyber-accent" />
                Dark Mode
              </Label>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion" className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyber-accent" />
                Reduced Motion
              </Label>
              <p className="text-xs text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={preferences.reducedMotion}
              onCheckedChange={toggleReducedMotion}
            />
          </div>

          {/* Density Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              {preferences.density === 'comfortable' ? (
                <Maximize2 className="w-4 h-4 text-cyber-accent" />
              ) : (
                <Minimize2 className="w-4 h-4 text-cyber-accent" />
              )}
              Layout Density
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDensity('comfortable')}
                className={`
                  px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium
                  ${preferences.density === 'comfortable'
                    ? 'border-cyber-accent bg-cyber-accent/10 text-cyber-accent'
                    : 'border-border hover:border-cyber-accent/50 hover:bg-cyber-accent/5'
                  }
                `}
              >
                <Maximize2 className="w-4 h-4 mx-auto mb-1" />
                Comfortable
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`
                  px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium
                  ${preferences.density === 'compact'
                    ? 'border-cyber-accent bg-cyber-accent/10 text-cyber-accent'
                    : 'border-border hover:border-cyber-accent/50 hover:bg-cyber-accent/5'
                  }
                `}
              >
                <Minimize2 className="w-4 h-4 mx-auto mb-1" />
                Compact
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Adjust spacing and padding throughout the interface
            </p>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-cyber-accent/10 border border-cyber-accent/30 mt-4">
            <Palette className="w-4 h-4 text-cyber-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All appearance settings are stored locally and apply instantly. They don't affect simulation behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
