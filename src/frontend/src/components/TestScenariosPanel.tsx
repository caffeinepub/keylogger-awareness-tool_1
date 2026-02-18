import { useState } from 'react';
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
      {/* Ensure panel container doesn't interfere with button clicks */}
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

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {TEST_SCENARIOS.map((scenario) => {
            const content = getScenarioContent(scenario.id);
            const isExpanded = expandedContent[scenario.id];

            return (
              <div
                key={scenario.id}
                className="scenario-card p-4 bg-background/50 border border-border rounded-xl hover:border-cyber-accent/50 transition-all group relative"
                data-testid={`scenario-card-${scenario.id}`}
              >
                <div className="space-y-3">
                  {/* Scenario Header */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base">{scenario.name}</h4>
                      {scenario.recommended && (
                        <Badge variant="secondary" className="bg-cyber-accent/10 text-cyber-accent border-cyber-accent/30 text-xs">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1.5">{scenario.description}</p>
                    <p className="text-xs text-cyber-accent font-medium">Expected: {scenario.expected}</p>
                  </div>

                  {/* Learning Content */}
                  {content && (
                    <Collapsible open={isExpanded} onOpenChange={() => toggleContent(scenario.id)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between text-xs h-9 hover:bg-accent/50"
                        >
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {content.title}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
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

                  {/* Action Buttons - ensure they're above any background layers */}
                  <div className="flex gap-2 pt-3 border-t border-border/50 relative z-10">
                    <Button
                      onClick={() => handleTakeTest(scenario.id, scenario.name)}
                      size="sm"
                      className="flex-1 h-9 text-xs interactive-button"
                      variant="default"
                      data-testid={`take-test-${scenario.id}`}
                    >
                      <GraduationCap className="w-4 h-4 mr-1.5" />
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
