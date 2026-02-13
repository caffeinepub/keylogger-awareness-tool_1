import { useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { ScenarioQuiz } from '../lib/scenarioQuizzes';

interface ScenarioQuizProps {
  quiz: ScenarioQuiz;
  onRetry: () => void;
}

export default function ScenarioQuiz({ quiz, onRetry }: ScenarioQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelectAnswer = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quiz.questions.length).fill(null));
    setShowExplanation(false);
    setQuizCompleted(false);
    onRetry();
  };

  const calculateScore = (): number => {
    return selectedAnswers.reduce<number>((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctIndex ? 1 : 0);
    }, 0);
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[oklch(0.7_0.25_145)]/20 mb-4">
            <CheckCircle2 className="w-10 h-10 text-[oklch(0.7_0.25_145)]" />
          </div>
          <h3 className="text-2xl font-bold">Quiz Complete!</h3>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-[oklch(0.7_0.25_145)]">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-lg text-muted-foreground">{percentage}% Correct</p>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-background/50 rounded-lg border border-border">
          <h4 className="font-semibold text-sm">Review Your Answers:</h4>
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isQuestionCorrect = userAnswer === question.correctIndex;
            
            return (
              <div key={index} className="flex items-start gap-2 text-sm">
                {isQuestionCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.25_145)] mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-medium">Question {index + 1}</p>
                  <p className="text-muted-foreground text-xs">{question.question}</p>
                  {!isQuestionCorrect && (
                    <p className="text-xs text-destructive mt-1">
                      Correct answer: {question.options[question.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={handleRetry} className="w-full" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span className="font-medium">
            Score: {calculateScore()} / {quiz.questions.length}
          </span>
        </div>
        <div className="h-2 bg-background/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[oklch(0.7_0.25_145)] transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            const showCorrect = showExplanation && isCorrectOption;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]/10'
                    : showIncorrect
                    ? 'border-destructive bg-destructive/10'
                    : isSelected
                    ? 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]/5'
                    : 'border-border hover:border-[oklch(0.7_0.25_145)]/50 hover:bg-background/50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]'
                        : showIncorrect
                        ? 'border-destructive bg-destructive'
                        : isSelected
                        ? 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]'
                        : 'border-border'
                    }`}
                  >
                    {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                    {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                    {isSelected && !showExplanation && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]/10'
                : 'border-destructive bg-destructive/10'
            }`}
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.7_0.25_145)] mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!showExplanation ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1"
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="flex-1" size="lg">
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        )}
      </div>
    </div>
  );
}
