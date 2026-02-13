import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import ScenarioQuiz from './ScenarioQuiz';
import { getScenarioQuiz } from '../lib/scenarioQuizzes';

interface ScenarioQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioId: string;
  scenarioName: string;
}

export default function ScenarioQuizModal({
  isOpen,
  onClose,
  scenarioId,
  scenarioName,
}: ScenarioQuizModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quiz = getScenarioQuiz(scenarioId);

  if (!quiz) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-modal-title"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
            <h2 id="quiz-modal-title" className="text-xl font-bold">
              Quiz Not Available
            </h2>
            <Button
              ref={closeButtonRef}
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Close quiz"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground">
              Quiz content for this scenario is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background border-b border-border">
          <h2 id="quiz-modal-title" className="text-xl font-bold">
            {scenarioName} Quiz
          </h2>
          <Button
            ref={closeButtonRef}
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Quiz Content */}
        <div className="p-6">
          <ScenarioQuiz
            quiz={quiz}
            onRetry={() => {
              // Quiz component handles its own retry state
            }}
          />
        </div>
      </div>
    </div>
  );
}
