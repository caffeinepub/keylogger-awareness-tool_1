import { create } from 'zustand';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type AVStatus = 'idle' | 'scanning' | 'detected' | 'quarantined' | 'removed';

interface KeystrokeEvent {
  key: string;
  timestamp: number;
}

interface SimulationSettings {
  autoBlockingEnabled: boolean;
  avScanDuration: number; // milliseconds
  scenarioPlaybackSpeed: number; // milliseconds per character
  transmissionAnimationEnabled: boolean;
  riskThresholds: {
    mediumThreshold: number; // pattern score threshold for Medium risk
    highThreshold: number; // pattern score threshold for High risk
  };
}

const DEFAULT_SETTINGS: SimulationSettings = {
  autoBlockingEnabled: true,
  avScanDuration: 2000,
  scenarioPlaybackSpeed: 100,
  transmissionAnimationEnabled: true,
  riskThresholds: {
    mediumThreshold: 30,
    highThreshold: 60,
  },
};

interface SimulationState {
  // Demo input
  demoInput: string;
  capturedStream: KeystrokeEvent[];
  
  // Admin mode
  adminDemoModeEnabled: boolean;
  
  // Risk detection
  riskLevel: RiskLevel;
  typingSpeed: number;
  patternScore: number;
  
  // Antivirus
  avStatus: AVStatus;
  
  // Auto-blocking
  isBlocked: boolean;
  
  // Timeline stage
  timelineStage: number;
  
  // Run summary for report
  peakRisk: RiskLevel;
  scanCount: number;
  blockCount: number;
  
  // Settings
  settings: SimulationSettings;
  
  // Actions
  setDemoInput: (input: string) => void;
  addKeystroke: (key: string) => void;
  toggleAdminMode: () => void;
  startAVScan: () => void;
  quarantineThreat: () => void;
  removeThreat: () => void;
  resetSimulation: () => void;
  unblock: () => void;
  runScenario: (scenario: string) => void;
  updateSettings: (settings: Partial<SimulationSettings>) => void;
  resetSettings: () => void;
}

export const useSimulationState = create<SimulationState>((set, get) => ({
  demoInput: '',
  capturedStream: [],
  adminDemoModeEnabled: true,
  riskLevel: 'Low',
  typingSpeed: 0,
  patternScore: 0,
  avStatus: 'idle',
  isBlocked: false,
  timelineStage: 0,
  peakRisk: 'Low',
  scanCount: 0,
  blockCount: 0,
  settings: DEFAULT_SETTINGS,

  setDemoInput: (input: string) => {
    const state = get();
    if (state.isBlocked) return;

    const now = Date.now();
    const newChar = input.slice(-1);
    
    if (newChar && input.length > state.demoInput.length) {
      const newStream = [...state.capturedStream, { key: newChar, timestamp: now }];
      
      // Calculate typing speed (chars per second over last 5 seconds)
      const recentKeys = newStream.filter(k => now - k.timestamp < 5000);
      const typingSpeed = recentKeys.length / 5;
      
      // Calculate pattern score (simple heuristics)
      let patternScore = 0;
      if (input.length > 8 && /[A-Z]/.test(input) && /[0-9]/.test(input) && /[!@#$%^&*]/.test(input)) {
        patternScore += 30; // Password-like pattern
      }
      if (typingSpeed > 3) {
        patternScore += 20; // Fast typing
      }
      if (input.toLowerCase().includes('password') || input.toLowerCase().includes('admin')) {
        patternScore += 40; // Sensitive keywords
      }
      if (input.length > 20) {
        patternScore += 10; // Long input
      }
      
      // Determine risk level using configurable thresholds
      const { mediumThreshold, highThreshold } = state.settings.riskThresholds;
      let riskLevel: RiskLevel = 'Low';
      if (patternScore > highThreshold || typingSpeed > 5) {
        riskLevel = 'High';
      } else if (patternScore > mediumThreshold || typingSpeed > 3) {
        riskLevel = 'Medium';
      }
      
      // Update peak risk
      const riskValues = { Low: 1, Medium: 2, High: 3 };
      const currentPeakValue = riskValues[state.peakRisk];
      const newRiskValue = riskValues[riskLevel];
      const peakRisk = newRiskValue > currentPeakValue ? riskLevel : state.peakRisk;
      
      // Auto-block on High risk (only if enabled in settings)
      const shouldBlock = state.settings.autoBlockingEnabled && riskLevel === 'High' && !state.isBlocked;
      
      set({
        demoInput: input,
        capturedStream: newStream,
        typingSpeed,
        patternScore,
        riskLevel,
        peakRisk,
        isBlocked: shouldBlock,
        blockCount: state.blockCount + (shouldBlock ? 1 : 0),
        timelineStage: Math.min(input.length > 0 ? 2 : 0, 5),
      });
    } else {
      set({ demoInput: input });
    }
  },

  addKeystroke: (key: string) => {
    const state = get();
    if (state.isBlocked) return;
    
    set({
      capturedStream: [...state.capturedStream, { key, timestamp: Date.now() }],
    });
  },

  toggleAdminMode: () => set(state => ({ adminDemoModeEnabled: !state.adminDemoModeEnabled })),

  startAVScan: () => {
    const state = get();
    const scanDuration = state.settings.avScanDuration;
    
    set({ avStatus: 'scanning', scanCount: state.scanCount + 1, timelineStage: 3 });
    setTimeout(() => {
      set({ avStatus: 'detected', timelineStage: 4 });
    }, scanDuration);
  },

  quarantineThreat: () => set({ avStatus: 'quarantined' }),

  removeThreat: () => set({ avStatus: 'removed', timelineStage: 5 }),

  resetSimulation: () => set({
    demoInput: '',
    capturedStream: [],
    riskLevel: 'Low',
    typingSpeed: 0,
    patternScore: 0,
    avStatus: 'idle',
    isBlocked: false,
    timelineStage: 0,
  }),

  unblock: () => set({ isBlocked: false }),

  runScenario: (scenario: string) => {
    const scenarios: Record<string, string> = {
      'low-risk': 'Hello world',
      'medium-risk': 'This is a longer text with some numbers 123',
      'high-risk': 'MyPassword123!@# AdminAccess',
      'password-pattern': 'P@ssw0rd123!',
      'rapid-typing': 'QuickTypingTestForRapidDetection',
      'sensitive-keywords': 'admin password login credentials',
      'long-input': 'This is a very long input that simulates someone typing a lot of text continuously without stopping for a while',
      'false-positive': 'Normal text',
      'auto-block-trigger': 'AdminPassword123!@#$%',
      'mixed-patterns': 'User123 password admin P@ssw0rd',
    };
    
    const text = scenarios[scenario] || scenario;
    set({ demoInput: '', capturedStream: [], riskLevel: 'Low', isBlocked: false });
    
    // Simulate typing with configurable speed
    const state = get();
    const speed = state.settings.scenarioPlaybackSpeed;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        get().setDemoInput(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  },

  updateSettings: (newSettings: Partial<SimulationSettings>) => {
    set(state => ({
      settings: {
        ...state.settings,
        ...newSettings,
        riskThresholds: {
          ...state.settings.riskThresholds,
          ...(newSettings.riskThresholds || {}),
        },
      },
    }));
  },

  resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
}));
