import { useState, useRef } from 'react';
import { Play, RotateCcw, Settings, ExternalLink, Save, X, Eye } from 'lucide-react';
import ModuleInfoPopover from './ModuleInfoPopover';
import ScenarioVideoModal from './ScenarioVideoModal';
import { useSimulationState } from '../hooks/useSimulationState';
import { getScenarioVideo } from '../lib/scenarioVideos';
import {
  getCustomVideo,
  saveCustomVideo,
  clearCustomVideo,
  validateYouTubeUrl,
} from '../lib/customScenarioVideos';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

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
];

export default function TestScenariosPanel() {
  const { runScenario, resetSimulation } = useSimulationState();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<{ id: string; name: string } | null>(null);
  const [previewVideoSrc, setPreviewVideoSrc] = useState<string | undefined>(undefined);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const [customVideoInputs, setCustomVideoInputs] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [customVideos, setCustomVideos] = useState<Record<string, string>>(() => {
    // Load custom videos from localStorage on mount
    const stored = localStorage.getItem('keylogger-awareness-custom-videos');
    return stored ? JSON.parse(stored) : {};
  });
  const playButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const previewButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handlePlayScenario = (scenarioId: string, scenarioName: string) => {
    // Store reference to the play button for focus restoration
    const currentButton = playButtonRefs.current[scenarioId];
    if (currentButton) {
      (currentButton as any)._previousFocus = currentButton;
    }

    // Resolve video source: custom link → default mapping
    const customVideo = getCustomVideo(scenarioId);
    const videoSrc = customVideo || getScenarioVideo(scenarioId);

    // Set active scenario and open video modal
    setActiveScenario({ id: scenarioId, name: scenarioName });
    setPreviewVideoSrc(undefined); // Clear preview mode
    setIsVideoModalOpen(true);

    // Run the scenario simulation
    runScenario(scenarioId);
  };

  const handlePreviewCustomVideo = (scenarioId: string, scenarioName: string) => {
    const input = customVideoInputs[scenarioId]?.trim() || '';
    
    if (!input) {
      setValidationErrors((prev) => ({
        ...prev,
        [scenarioId]: 'Please enter a YouTube URL or video ID to preview.',
      }));
      return;
    }

    if (!validateYouTubeUrl(input)) {
      setValidationErrors((prev) => ({
        ...prev,
        [scenarioId]: 'Invalid YouTube URL or video ID. Please enter a valid link to preview.',
      }));
      return;
    }

    // Store reference to the preview button for focus restoration
    const currentButton = previewButtonRefs.current[scenarioId];
    if (currentButton) {
      (currentButton as any)._previousFocus = currentButton;
    }

    // Clear validation error
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[scenarioId];
      return updated;
    });

    // Open modal with the unsaved input (preview mode)
    setActiveScenario({ id: scenarioId, name: scenarioName });
    setPreviewVideoSrc(input);
    setIsVideoModalOpen(true);
    // Note: We do NOT run the scenario simulation for preview
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
    setPreviewVideoSrc(undefined);
    // Note: We do NOT reset simulation here - user must use Reset button explicitly
  };

  const toggleScenarioConfig = (scenarioId: string) => {
    if (expandedScenario === scenarioId) {
      setExpandedScenario(null);
    } else {
      setExpandedScenario(scenarioId);
      // Initialize input with current custom video if exists
      const current = getCustomVideo(scenarioId);
      if (current) {
        setCustomVideoInputs((prev) => ({ ...prev, [scenarioId]: current }));
      }
    }
  };

  const handleSaveCustomVideo = (scenarioId: string) => {
    const input = customVideoInputs[scenarioId]?.trim() || '';
    
    if (!input) {
      setValidationErrors((prev) => ({
        ...prev,
        [scenarioId]: 'Please enter a YouTube URL or video ID.',
      }));
      return;
    }

    if (!validateYouTubeUrl(input)) {
      setValidationErrors((prev) => ({
        ...prev,
        [scenarioId]: 'Invalid YouTube URL or video ID. Please enter a valid link.',
      }));
      return;
    }

    // Save to localStorage
    const success = saveCustomVideo(scenarioId, input);
    if (success) {
      setCustomVideos((prev) => ({ ...prev, [scenarioId]: input }));
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[scenarioId];
        return updated;
      });
      // Clear input after successful save
      setCustomVideoInputs((prev) => {
        const updated = { ...prev };
        delete updated[scenarioId];
        return updated;
      });
      setExpandedScenario(null);
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [scenarioId]: 'Failed to save custom video. Please try again.',
      }));
    }
  };

  const handleClearCustomVideo = (scenarioId: string) => {
    clearCustomVideo(scenarioId);
    setCustomVideos((prev) => {
      const updated = { ...prev };
      delete updated[scenarioId];
      return updated;
    });
    setCustomVideoInputs((prev) => {
      const updated = { ...prev };
      delete updated[scenarioId];
      return updated;
    });
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[scenarioId];
      return updated;
    });
  };

  const handleSearchYouTube = (scenarioName: string, scenarioDescription: string) => {
    const query = encodeURIComponent(`keylogger ${scenarioName} ${scenarioDescription} cybersecurity`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const resolveVideoSource = (scenarioId: string): string | undefined => {
    // If in preview mode, use the preview source
    if (previewVideoSrc !== undefined) {
      return previewVideoSrc;
    }
    // Otherwise use saved custom video or default
    const customVideo = getCustomVideo(scenarioId);
    return customVideo || getScenarioVideo(scenarioId);
  };

  return (
    <>
      <div className="glass-panel p-6 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Test Scenarios</h3>
            <ModuleInfoPopover
              title="Test Scenarios"
              description="Prebuilt scenarios that demonstrate different risk levels and detection behaviors. Each scenario runs locally in your browser without storing any input. Click Play to watch a demo video (loaded from YouTube, an external service) and run the scenario simulation. You can optionally configure custom YouTube videos for each scenario; custom links are stored locally only."
              tooltipText="Scenarios are prebuilt local demo scripts with video demonstrations from YouTube (external service). Simulation runs locally, no input storage. Custom video links stored locally only."
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

        <div className="grid md:grid-cols-2 gap-3">
          {scenarios.map((scenario) => {
            const hasCustomVideo = !!customVideos[scenario.id];
            const isExpanded = expandedScenario === scenario.id;

            return (
              <div
                key={scenario.id}
                className="p-4 bg-background/50 border border-border rounded-lg hover:border-[oklch(0.7_0.25_145)]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{scenario.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{scenario.description}</p>
                    <p className="text-xs text-[oklch(0.7_0.25_145)]">Expected: {scenario.expected}</p>
                    {hasCustomVideo && (
                      <p className="text-xs text-[oklch(0.7_0.15_280)] mt-1 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[oklch(0.7_0.15_280)]" />
                        Custom video configured
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => toggleScenarioConfig(scenario.id)}
                      className="p-2 bg-background hover:bg-accent rounded-lg transition-colors"
                      aria-label={`Configure custom video for ${scenario.name}`}
                      title="Configure custom video"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      ref={(el) => {
                        playButtonRefs.current[scenario.id] = el;
                      }}
                      onClick={() => handlePlayScenario(scenario.id, scenario.name)}
                      className="p-2 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors"
                      aria-label={`Play ${scenario.name} scenario and watch demo video`}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Custom Video Configuration */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`video-input-${scenario.id}`} className="text-xs font-medium">
                        Custom YouTube Video
                      </Label>
                      <Input
                        id={`video-input-${scenario.id}`}
                        type="text"
                        placeholder="Paste YouTube URL or video ID"
                        value={customVideoInputs[scenario.id] || ''}
                        onChange={(e) => {
                          setCustomVideoInputs((prev) => ({
                            ...prev,
                            [scenario.id]: e.target.value,
                          }));
                          // Clear validation error on input change
                          if (validationErrors[scenario.id]) {
                            setValidationErrors((prev) => {
                              const updated = { ...prev };
                              delete updated[scenario.id];
                              return updated;
                            });
                          }
                        }}
                        className="text-xs h-8"
                      />
                      {validationErrors[scenario.id] && (
                        <p className="text-xs text-destructive">{validationErrors[scenario.id]}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        ref={(el) => {
                          previewButtonRefs.current[scenario.id] = el;
                        }}
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreviewCustomVideo(scenario.id, scenario.name)}
                        className="text-xs h-7 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSaveCustomVideo(scenario.id)}
                        className="text-xs h-7 flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" />
                        Save
                      </Button>
                      {hasCustomVideo && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleClearCustomVideo(scenario.id)}
                          className="text-xs h-7 flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Clear
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSearchYouTube(scenario.name, scenario.description)}
                        className="text-xs h-7 flex items-center gap-1 ml-auto"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Search on YouTube
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Custom video links are stored locally only and will play when you click Play.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      <ScenarioVideoModal
        isOpen={isVideoModalOpen}
        videoSrc={activeScenario ? resolveVideoSource(activeScenario.id) : undefined}
        scenarioName={activeScenario?.name || ''}
        onClose={handleCloseVideo}
      />
    </>
  );
}
