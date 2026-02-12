import { useState } from 'react';
import { CheckCircle, XCircle, Award, Home, RotateCcw, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const questions = [
  {
    question: 'What is the primary purpose of a keylogger?',
    options: [
      'To improve typing speed',
      'To monitor and record keystrokes',
      'To clean the keyboard',
      'To enhance keyboard functionality',
    ],
    correct: 1,
    explanation:
      'Keyloggers are designed to monitor and record every keystroke typed on a keyboard, often for surveillance or malicious purposes.',
  },
  {
    question: 'Which type of keylogger requires physical access to install?',
    options: ['Software keylogger', 'Hardware keylogger', 'Kernel-based keylogger', 'Cloud keylogger'],
    correct: 1,
    explanation:
      'Hardware keyloggers are physical devices that must be physically attached to the computer or keyboard, requiring direct access.',
  },
  {
    question: 'What is the best defense against keyloggers?',
    options: [
      'Using only uppercase letters',
      'Typing very fast',
      'Using antivirus software and two-factor authentication',
      'Never using a computer',
    ],
    correct: 2,
    explanation:
      'A combination of reputable antivirus software, two-factor authentication, and safe computing practices provides the best protection.',
  },
  {
    question: 'Where are kernel-based keyloggers installed?',
    options: [
      'On the keyboard hardware',
      'In the browser',
      'At the operating system kernel level',
      'On the monitor',
    ],
    correct: 2,
    explanation:
      'Kernel-based keyloggers operate at the deepest level of the operating system (the kernel), making them very difficult to detect and remove.',
  },
  {
    question: 'What should you do if you suspect a keylogger on a public computer?',
    options: [
      'Continue using it normally',
      'Type faster to confuse it',
      'Avoid entering sensitive information and report it',
      'Turn off the monitor',
    ],
    correct: 2,
    explanation:
      'If you suspect a keylogger, avoid entering any sensitive information and report the issue to the appropriate authorities or IT staff.',
  },
];

export default function AwarenessQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (index: number) => {
    if (showExplanation) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  const handleGoToDashboard = () => {
    navigate({ to: '/' });
  };

  if (completed) {
    const percentage = (score / questions.length) * 100;
    return (
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="text-center space-y-6">
          <Award className="w-16 h-16 text-[oklch(0.7_0.25_145)] mx-auto" />
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-[oklch(0.7_0.25_145)]">
              {score} / {questions.length}
            </p>
            <p className="text-muted-foreground">
              You scored {percentage.toFixed(0)}%
            </p>
          </div>
          <div className="max-w-md mx-auto">
            {percentage >= 80 ? (
              <p className="text-sm text-muted-foreground">
                Excellent! You have a strong understanding of keylogger threats and prevention.
              </p>
            ) : percentage >= 60 ? (
              <p className="text-sm text-muted-foreground">
                Good job! Review the awareness content to strengthen your knowledge.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keep learning! Review the prevention tips and case studies to improve your cybersecurity awareness.
              </p>
            )}
          </div>

          {/* Quick Recap Section */}
          <div className="mt-8 p-6 rounded-xl border border-border/50 bg-accent/50 backdrop-blur-sm space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
              <h3 className="text-lg font-semibold">Quick Recap</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>What are keyloggers?</strong> Malicious tools that secretly monitor and record every keystroke you type, capturing passwords, messages, and sensitive data.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Hardware keyloggers:</strong> Physical devices plugged between your keyboard and computer, requiring direct access to install.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Software keyloggers:</strong> Programs installed on your system that run in the background, often disguised as legitimate software.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Kernel-based keyloggers:</strong> Advanced threats operating at the operating system's core level, making them extremely difficult to detect.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Prevention tip #1:</strong> Use reputable antivirus software and keep it updated to detect and block keylogger threats.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Prevention tip #2:</strong> Enable two-factor authentication (2FA) on all accounts to add an extra layer of security even if passwords are compromised.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Prevention tip #3:</strong> Keep your operating system and software updated with the latest security patches.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[oklch(0.7_0.25_145)] font-bold">•</span>
                <span><strong>Prevention tip #4:</strong> Be cautious when downloading software—only use trusted sources and avoid suspicious email attachments.</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground italic">
                <strong>Important:</strong> This application is an educational simulation designed to raise awareness about keylogger threats. 
                It must never be used to compromise security, invade privacy, or engage in any malicious activity. 
                Use this knowledge responsibly to protect yourself and others.
              </p>
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="mt-8 p-6 rounded-xl border border-[oklch(0.7_0.25_145)]/30 bg-[oklch(0.7_0.25_145)]/5 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <ArrowRight className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
              <h3 className="text-lg font-semibold">Next Steps</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Remember: This tool is an educational simulation designed to raise awareness about keylogger threats. 
              Use this knowledge to protect yourself and others—never to compromise security or privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleGoToDashboard}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.25_145)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Go to Dashboard"
              >
                <Home className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </button>
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[oklch(0.7_0.25_145)] text-[oklch(0.7_0.25_145)] rounded-lg hover:bg-[oklch(0.7_0.25_145)]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.25_145)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Retake Quiz"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Closing Message Section */}
          <div className="mt-8 p-6 rounded-xl border border-border/50 bg-accent/30 backdrop-blur-sm space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />
              <h3 className="text-lg font-semibold">Closing Message</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Thank you for completing this awareness quiz. You've taken an important step in understanding keylogger threats and how to protect yourself against them.
              </p>
              <p>
                <strong>Remember:</strong> This application is purely an educational simulation. It demonstrates how keyloggers work in a safe, controlled environment where no real data is captured or transmitted. The techniques shown here must never be used to harm others, invade privacy, or compromise security.
              </p>
              <p>
                Apply what you've learned responsibly: keep your software updated, use strong authentication, stay vigilant about suspicious downloads, and help others develop safe, privacy-respecting digital habits. Cybersecurity is everyone's responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="glass-panel p-8 rounded-xl border border-border/50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Test Your Knowledge</h2>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-[oklch(0.7_0.25_145)] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showResult = showExplanation;

            let className = 'p-4 border rounded-lg cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.25_145)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ';
            if (!showResult) {
              className += 'hover:border-[oklch(0.7_0.25_145)] hover:bg-[oklch(0.7_0.25_145)]/10';
            } else if (isCorrect) {
              className += 'border-[oklch(0.7_0.25_145)] bg-[oklch(0.7_0.25_145)]/10';
            } else if (isSelected && !isCorrect) {
              className += 'border-[oklch(0.65_0.25_0)] bg-[oklch(0.65_0.25_0)]/10';
            } else {
              className += 'opacity-50';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={className}
              >
                <div className="flex items-center justify-between">
                  <span className="text-left">{option}</span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)]" />}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[oklch(0.65_0.25_0)]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="p-4 bg-accent rounded-lg">
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full px-6 py-2 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.7_0.25_145)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </section>
  );
}
