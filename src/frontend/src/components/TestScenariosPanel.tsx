import { useState, useRef } from 'react';
import { RotateCcw, BookOpen, GraduationCap, ChevronDown, ChevronUp, Star } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import ScenarioQuizModal from './ScenarioQuizModal';
import { useSimulationState } from '../hooks/useSimulationState';
import { getScenarioContent } from '../lib/scenarioLearningContent';
import { TEST_SCENARIOS } from '../lib/scenarios';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';

export default function TestScenariosPanel() {
  const { resetSimulation } = useSimulationState();
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<{ id: string; name: string } | null>(null);
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});
  const [focusedScenarioIndex, setFocusedScenarioIndex] = useState<number>(-1);
  const scenarioRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, index: number, scenarioId: string) => {
    const totalScenarios = TEST_SCENARIOS.length;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalScenarios;
        setFocusedScenarioIndex(nextIndex);
        scenarioRefs.current[nextIndex]?.focus();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalScenarios) % totalScenarios;
        setFocusedScenarioIndex(prevIndex);
        scenarioRefs.current[prevIndex]?.focus();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleContent(scenarioId);
        break;

      case 'Escape':
        e.preventDefault();
        if (expandedContent[scenarioId]) {
          toggleContent(scenarioId);
        }
        break;
    }
  };

  return (
    <>
      <div className="glass-panel p-6 rounded-xl border border-border/50 relative z-auto" data-testid="test-scenarios-panel">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Test Scenarios</h3>
            <ModuleInfoPopover
              title="Test Scenarios"
              description="Prebuilt scenarios that demonstrate different risk levels and detection behaviors. Each scenario includes educational content about keylogger threats and a quiz to test your knowledge. All scenarios run locally in your browser without storing any input."
              tooltipText="Educational scenarios with learning content and quizzes. Simulations run locally, no input storage."
            />
          </div>
          <button
            onClick={resetSimulation}
            className="interactive-button flex items-center gap-2 px-3 py-1.5 text-sm bg-accent hover:bg-accent/80 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {TEST_SCENARIOS.map((scenario, index) => {
            const content = getScenarioContent(scenario.id);
            const isExpanded = expandedContent[scenario.id];

            return (
              <div
                key={scenario.id}
                ref={(el) => {
                  scenarioRefs.current[index] = el;
                }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, index, scenario.id)}
                className="glass-panel p-4 rounded-lg border border-border/50 hover:border-[oklch(0.7_0.25_145)]/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.25_145)] focus:ring-offset-2 focus:ring-offset-background"
                data-testid={`scenario-card-${scenario.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{scenario.name}</h4>
                      {scenario.recommended && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{scenario.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="px-2 py-0.5 bg-accent rounded">
                    Expected: {scenario.expected}
                  </span>
                </div>

                {content && (
                  <Collapsible open={isExpanded} onOpenChange={() => toggleContent(scenario.id)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between text-xs mb-2"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Hide' : 'Show'} learning content for ${scenario.name}`}
                      >
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Learning Content
                        </span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mb-3">
                      <div className="text-xs bg-accent/30 p-2 rounded">
                        <p className="font-medium mb-1">{content.title}</p>
                        <p className="text-muted-foreground">{content.content}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                <Button
                  onClick={() => handleTakeTest(scenario.id, scenario.name)}
                  size="sm"
                  className="w-full text-xs"
                  data-testid={`take-test-${scenario.id}`}
                  aria-label={`Take quiz for ${scenario.name}`}
                >
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Take Test
                </Button>
              </div>
            );
          })}
        </div>
      </div>

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
