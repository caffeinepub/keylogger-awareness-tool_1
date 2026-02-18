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
import HelpTooltip from '../components/HelpTooltip';
import DashboardHeroIntro from '../components/DashboardHeroIntro';
import { useSimulationState } from '../hooks/useSimulationState';
import { useOnboarding } from '../hooks/useOnboarding';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function DashboardPage() {
  const { adminDemoModeEnabled, resetSimulation } = useSimulationState();
  const { isOnboardingOpen, isInitializing, dismissOnboarding, openOnboarding } = useOnboarding();

  if (isInitializing) {
    return null;
  }

  return (
    <>
      <OnboardingOverlay isOpen={isOnboardingOpen} onDismiss={dismissOnboarding} />
      
      <div className="dashboard-container" data-testid="dashboard-page">
        <DashboardHeroIntro />

        <div className="dashboard-section">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="dashboard-section-title">Interactive Dashboard</h2>
              <p className="dashboard-section-description">
                Experience how keyloggers work in a safe, controlled environment
              </p>
            </div>
            <div className="flex items-center gap-3">
              <HelpTooltip content="Open the guided tour to learn about this educational simulation and how to use the dashboard safely.">
                <button
                  onClick={openOnboarding}
                  className="interactive-button flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-all"
                  aria-label="Show onboarding guide"
                  data-testid="help-button"
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
                  className="interactive-button flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-all"
                  data-testid="reset-button"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="font-medium">Reset</span>
                </button>
              </HelpTooltip>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <SimulatedCounters />
        </div>

        <div className="dashboard-section">
          <AutoBlockingAlert />
        </div>

        <div className="dashboard-section">
          <ErrorBoundary>
            <RotatingDashboardCard>
              <AttackSimulationTimeline />
            </RotatingDashboardCard>
          </ErrorBoundary>
        </div>

        <div className="dashboard-section">
          <div className="grid lg:grid-cols-2 gap-6">
            <ErrorBoundary>
              <RotatingDashboardCard>
                <SimulatedKeyloggerModule />
              </RotatingDashboardCard>
            </ErrorBoundary>

            {adminDemoModeEnabled && (
              <ErrorBoundary>
                <RotatingDashboardCard>
                  <AttackerDashboardPanel />
                </RotatingDashboardCard>
              </ErrorBoundary>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <ErrorBoundary>
            <RotatingDashboardCard>
              <AIRiskDetectorPanel />
            </RotatingDashboardCard>
          </ErrorBoundary>
        </div>

        <div className="dashboard-section">
          <ErrorBoundary>
            <RotatingDashboardCard>
              <SimulatedAntivirusScanner />
            </RotatingDashboardCard>
          </ErrorBoundary>
        </div>

        <div className="dashboard-section">
          <ErrorBoundary>
            <TestScenariosPanel />
          </ErrorBoundary>
        </div>

        <div className="hidden lg:block">
          <ErrorBoundary>
            <ThreeSceneAccent />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
