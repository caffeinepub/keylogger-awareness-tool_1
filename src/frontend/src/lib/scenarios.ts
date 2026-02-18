// Single source of truth for all test scenarios
// Used by UI, simulation playback, learning content, and quizzes

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  expected: string;
  recommended?: boolean;
  simulatedText: string;
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'low-risk',
    name: 'Low Risk',
    description: 'Normal typing behavior',
    expected: 'Low risk level',
    simulatedText: 'Hello world',
  },
  {
    id: 'medium-risk',
    name: 'Medium Risk',
    description: 'Moderate typing with numbers',
    expected: 'Medium risk level',
    simulatedText: 'This is a longer text with some numbers 123',
  },
  {
    id: 'high-risk',
    name: 'High Risk',
    description: 'Password-like patterns',
    expected: 'High risk level',
    simulatedText: 'MyPassword123!@# AdminAccess',
  },
  {
    id: 'password-pattern',
    name: 'Password Pattern',
    description: 'Strong password format',
    expected: 'High risk, auto-block',
    simulatedText: 'P@ssw0rd123!',
  },
  {
    id: 'rapid-typing',
    name: 'Rapid Typing',
    description: 'Very fast input speed',
    expected: 'Medium-High risk',
    simulatedText: 'QuickTypingTestForRapidDetection',
  },
  {
    id: 'sensitive-keywords',
    name: 'Sensitive Keywords',
    description: 'Admin/password terms',
    expected: 'High risk',
    simulatedText: 'admin password login credentials',
  },
  {
    id: 'long-input',
    name: 'Long Input',
    description: 'Extended text entry',
    expected: 'Medium risk',
    simulatedText: 'This is a very long input that simulates someone typing a lot of text continuously without stopping for a while',
  },
  {
    id: 'false-positive',
    name: 'False Positive',
    description: 'Normal text flagged',
    expected: 'Low risk (safe)',
    simulatedText: 'Normal text',
  },
  {
    id: 'auto-block-trigger',
    name: 'Auto-Block Trigger',
    description: 'Immediate blocking',
    expected: 'Auto-block activated',
    simulatedText: 'AdminPassword123!@#$%',
  },
  {
    id: 'mixed-patterns',
    name: 'Mixed Patterns',
    description: 'Multiple risk factors',
    expected: 'High risk, detection',
    simulatedText: 'User123 password admin P@ssw0rd',
  },
  {
    id: 'public-shared-computer-login',
    name: 'Public Computer Login',
    description: 'Library/cafe login scenario',
    expected: 'High risk, auto-block',
    recommended: true,
    simulatedText: 'username: john.doe@email.com password: MySecureP@ss2024!',
  },
];

// Helper to get scenario by ID
export function getScenarioById(id: string): TestScenario | undefined {
  return TEST_SCENARIOS.find(s => s.id === id);
}

// Helper to get simulated text for a scenario
export function getScenarioText(id: string): string {
  const scenario = getScenarioById(id);
  return scenario?.simulatedText || '';
}
