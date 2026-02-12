import { Eye, EyeOff } from 'lucide-react';
import HelpTooltip from './HelpTooltip';
import { useSimulationState } from '../hooks/useSimulationState';

export default function AdminDemoModeToggle() {
  const { adminDemoModeEnabled, toggleAdminMode } = useSimulationState();

  return (
    <HelpTooltip content="Toggle the attacker dashboard view. This is a demo-only visualization showing what captured data might look like. Everything stays local in your browser.">
      <button
        onClick={toggleAdminMode}
        className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
      >
        {adminDemoModeEnabled ? (
          <>
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Attacker View: ON</span>
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4" />
            <span className="text-sm font-medium">Attacker View: OFF</span>
          </>
        )}
      </button>
    </HelpTooltip>
  );
}
