import { RefreshCw, HelpCircle } from 'lucide-react';
import SimulatedKeyloggerModule from '../components/SimulatedKeyloggerModule';
import AttackerDashboardPanel from '../components/AttackerDashboardPanel';
import AIRiskDetectorPanel from '../components/AIRiskDetectorPanel';
import SimulatedAntivirusScanner from '../components/SimulatedAntivirusScanner';
import AutoBlockingAlert from '../components/AutoBlockingAlert';
import AttackSimulationTimeline from '../components/AttackSimulationTimeline';
import AdminDemoModeToggle from '../components/AdminDemoModeToggle';
import TestScenariosPanel from '../components/TestScenariosPanel';
import ReportGeneratorButton from '../components/ReportGeneratorButton';
import SimulatedCounters from '../components/SimulatedCounters';
import RotatingDashboardCard from '../components/RotatingDashboardCard';
import ThreeSceneAccent from '../components/ThreeSceneAccent';
import OnboardingOverlay from '../components/OnboardingOverlay';
import SimulationSettingsPanel from '../components/SimulationSettingsPanel';
import HelpTooltip from '../components/HelpTooltip';
import { useSimulationState } from '../hooks/useSimulationState';
import { useOnboarding } from '../hooks/useOnboarding';

export default function DashboardPage() {
  const { adminDemoModeEnabled, resetSimulation } = useSimulationState();
  const { isOnboardingOpen, isInitializing, dismissOnboarding, openOnboarding } = useOnboarding();

  if (isInitializing) {
    return null; // Prevent flash of content before onboarding check
  }

  return (
    <>
      <OnboardingOverlay isOpen={isOnboardingOpen} onDismiss={dismissOnboarding} />
      
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Interactive Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Experience how keyloggers work in a safe, controlled environment
            </p>
          </div>
          <div className="flex items-center gap-3">
            <HelpTooltip content="Open the guided tour to learn about this educational simulation and how to use the dashboard safely.">
              <button
                onClick={openOnboarding}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                aria-label="Show onboarding guide"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium">Help</span>
              </button>
            </HelpTooltip>
            <AdminDemoModeToggle />
            <ReportGeneratorButton />
            <HelpTooltip content="Reset all simulation state including captured keystrokes, risk levels, and antivirus status. This is a local-only action.">
              <button
                onClick={resetSimulation}
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="font-medium">Reset</span>
              </button>
            </HelpTooltip>
          </div>
        </div>

        {/* Counters */}
        <SimulatedCounters />

        {/* Auto-blocking Alert */}
        <AutoBlockingAlert />

        {/* Timeline */}
        <RotatingDashboardCard>
          <AttackSimulationTimeline />
        </RotatingDashboardCard>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RotatingDashboardCard>
            <SimulatedKeyloggerModule />
          </RotatingDashboardCard>

          {adminDemoModeEnabled && (
            <RotatingDashboardCard>
              <AttackerDashboardPanel />
            </RotatingDashboardCard>
          )}
        </div>

        {/* Risk Detector */}
        <RotatingDashboardCard>
          <AIRiskDetectorPanel />
        </RotatingDashboardCard>

        {/* Antivirus Scanner */}
        <RotatingDashboardCard>
          <SimulatedAntivirusScanner />
        </RotatingDashboardCard>

        {/* Settings Panel */}
        <RotatingDashboardCard>
          <SimulationSettingsPanel />
        </RotatingDashboardCard>

        {/* Test Scenarios */}
        <TestScenariosPanel />

        {/* 3D Accent */}
        <div className="hidden lg:block">
          <ThreeSceneAccent />
        </div>
      </div>
    </>
  );
}
