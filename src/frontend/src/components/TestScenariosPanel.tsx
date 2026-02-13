import { useState } from 'react';
import { Play, RotateCcw, BookOpen, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import ScenarioQuizModal from './ScenarioQuizModal';
import { useSimulationState } from '../hooks/useSimulationState';
import { getScenarioContent } from '../lib/scenarioLearningContent';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const scenarios = [
  { id: 'low-risk', name: 'Low Risk', description: 'Normal typing behavior', expected: 'Low risk level' },
  { id: 'medium-risk', name: 'Medium Risk', description: 'Moderate typing with numbers', expected: 'Medium risk level' },
  { id: 'high-risk', name: 'High Risk', description: 'Password-like patterns', expected: 'High risk level' },
  { id: 'password-pattern', name: 'Password Pattern', description: 'Strong password format', expected: 'High risk, auto-block' },
  { id: 'rapid-typing', name: 'Rapid Typing', description: 'Very fast input speed', expected: 'Medium-High risk' },
  { id: 'sensitive-keywords', name: 'Sensitive Keywords', description: 'Admin/password terms', expected: 'High risk' },
  { id: 'long-input', name: 'Long Input', description: 'Extended text entry', expected: 'Medium risk' },
  { id: 'false-positive', name: 'False Positive', description: 'Normal text flagged', expected: 'Low risk (safe)' },
  { id: 'auto-block-trigger', name: 'Auto-Block Trigger', description: 'Immediate blocking', expected: 'Auto-block activated' },
  { id: 'mixed-patterns', name: 'Mixed Patterns', description: 'Multiple risk factors', expected: 'High risk, detection' },
  { id: 'public-shared-computer-login', name: 'Public Computer Login', description: 'Library/cafe login scenario', expected: 'High risk, auto-block' },
];

export default function TestScenariosPanel() {
  const { runScenario, resetSimulation } = useSimulationState();
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<{ id: string; name: string } | null>(null);
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});

  const handleRunScenario = (scenarioId: string) => {
    runScenario(scenarioId);
  };

  const handleTakeTest = (scenarioId: string, scenarioName: string) => {
    setActiveScenario({ id: scenarioId, name: scenarioName });
    setIsQuizModalOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizModalOpen(false);
  };

  const toggleContent = (scenarioId: string) => {
    setExpandedContent((prev) => ({
      ...prev,
      [scenarioId]: !prev[scenarioId],
    }));
  };

  return (
    <>
      <div className="glass-panel p-6 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Test Scenarios</h3>
            <ModuleInfoPopover
              title="Test Scenarios"
              description="Prebuilt scenarios that demonstrate different risk levels and detection behaviors. Each scenario includes educational content about keylogger threats and a quiz to test your knowledge. All scenarios run locally in your browser without storing any input."
              tooltipText="Educational scenarios with learning content and quizzes. Simulations run locally, no input storage."
            />
          </div>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-accent hover:bg-accent/80 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {scenarios.map((scenario) => {
            const content = getScenarioContent(scenario.id);
            const isExpanded = expandedContent[scenario.id];

            return (
              <div
                key={scenario.id}
                className="p-4 bg-background/50 border border-border rounded-lg hover:border-[oklch(0.7_0.25_145)]/50 transition-colors"
              >
                <div className="space-y-3">
                  {/* Scenario Header */}
                  <div>
                    <h4 className="font-medium text-sm mb-1">{scenario.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{scenario.description}</p>
                    <p className="text-xs text-[oklch(0.7_0.25_145)]">Expected: {scenario.expected}</p>
                  </div>

                  {/* Learning Content */}
                  {content && (
                    <Collapsible open={isExpanded} onOpenChange={() => toggleContent(scenario.id)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between text-xs h-8"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {content.title}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="p-3 bg-background/80 rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {content.content}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    <Button
                      onClick={() => handleRunScenario(scenario.id)}
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      variant="default"
                    >
                      <Play className="w-3.5 h-3.5 mr-1.5" />
                      Run Scenario
                    </Button>
                    <Button
                      onClick={() => handleTakeTest(scenario.id, scenario.name)}
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      variant="outline"
                    >
                      <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                      Take Test
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeScenario && (
        <ScenarioQuizModal
          isOpen={isQuizModalOpen}
          onClose={handleCloseQuiz}
          scenarioId={activeScenario.id}
          scenarioName={activeScenario.name}
        />
      )}
    </>
  );
}
