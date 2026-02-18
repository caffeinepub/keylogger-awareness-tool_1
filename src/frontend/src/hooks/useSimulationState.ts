import { create } from 'zustand';
import { sanitizeKeystroke, isValidKeystrokeInput } from '@/lib/inputSanitizer';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type AVStatus = 'idle' | 'scanning' | 'detected' | 'quarantined' | 'removed';

interface KeystrokeEvent {
  key: string;
  timestamp: number;
}

interface SimulationSettings {
  autoBlockingEnabled: boolean;
  avScanDuration: number;
  transmissionAnimationEnabled: boolean;
  riskThresholds: {
    mediumThreshold: number;
    highThreshold: number;
  };
}

const DEFAULT_SETTINGS: SimulationSettings = {
  autoBlockingEnabled: true,
  avScanDuration: 2000,
  transmissionAnimationEnabled: true,
  riskThresholds: {
    mediumThreshold: 30,
    highThreshold: 60,
  },
};

interface SimulationState {
  demoInput: string;
  capturedStream: KeystrokeEvent[];
  adminDemoModeEnabled: boolean;
  riskLevel: RiskLevel;
  typingSpeed: number;
  patternScore: number;
  avStatus: AVStatus;
  isBlocked: boolean;
  timelineStage: number;
  peakRisk: RiskLevel;
  scanCount: number;
  blockCount: number;
  settings: SimulationSettings;
  
  setDemoInput: (input: string) => void;
  addKeystroke: (key: string) => void;
  toggleAdminMode: () => void;
  startAVScan: () => void;
  quarantineThreat: () => void;
  removeThreat: () => void;
  resetSimulation: () => void;
  unblock: () => void;
  updateSettings: (settings: Partial<SimulationSettings>) => void;
  resetSettings: () => void;
}

// Validation helpers
function validateRiskLevel(level: number): number {
  const validated = Math.max(0, Math.min(100, level));
  if (validated !== level) {
    console.error('Invalid risk level, clamped to 0-100:', level);
  }
  return validated;
}

function validateCount(count: number): number {
  const validated = Math.max(0, Math.floor(count));
  if (validated !== count) {
    console.error('Invalid count, must be non-negative integer:', count);
  }
  return validated;
}

function validateThreshold(threshold: number): number {
  const validated = Math.max(0, Math.min(100, threshold));
  if (validated !== threshold) {
    console.error('Invalid threshold, clamped to 0-100:', threshold);
  }
  return validated;
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

    // Validate and sanitize input
    if (typeof input !== 'string') {
      console.error('Invalid demo input type');
      return;
    }

    if (!isValidKeystrokeInput(input)) {
      console.warn('Potentially dangerous input detected and rejected');
      return;
    }

    const sanitized = sanitizeKeystroke(input);
    const now = Date.now();
    const newChar = sanitized.slice(-1);
    
    if (newChar && sanitized.length > state.demoInput.length) {
      const newStream = [...state.capturedStream, { key: newChar, timestamp: now }];
      
      const recentKeys = newStream.filter(k => now - k.timestamp < 5000);
      const typingSpeed = recentKeys.length / 5;
      
      let patternScore = 0;
      if (sanitized.length > 8 && /[A-Z]/.test(sanitized) && /[0-9]/.test(sanitized) && /[!@#$%^&*]/.test(sanitized)) {
        patternScore += 30;
      }
      if (typingSpeed > 3) {
        patternScore += 20;
      }
      if (sanitized.toLowerCase().includes('password') || sanitized.toLowerCase().includes('admin')) {
        patternScore += 40;
      }
      if (sanitized.length > 20) {
        patternScore += 10;
      }
      
      const { mediumThreshold, highThreshold } = state.settings.riskThresholds;
      let riskLevel: RiskLevel = 'Low';
      if (patternScore > highThreshold || typingSpeed > 5) {
        riskLevel = 'High';
      } else if (patternScore > mediumThreshold || typingSpeed > 3) {
        riskLevel = 'Medium';
      }
      
      const riskValues = { Low: 1, Medium: 2, High: 3 };
      const currentPeakValue = riskValues[state.peakRisk];
      const newRiskValue = riskValues[riskLevel];
      const peakRisk = newRiskValue > currentPeakValue ? riskLevel : state.peakRisk;
      
      const shouldBlock = state.settings.autoBlockingEnabled && riskLevel === 'High' && !state.isBlocked;
      
      set({
        demoInput: sanitized,
        capturedStream: newStream,
        typingSpeed: validateCount(typingSpeed),
        patternScore: validateCount(patternScore),
        riskLevel,
        peakRisk,
        isBlocked: shouldBlock,
        blockCount: validateCount(state.blockCount + (shouldBlock ? 1 : 0)),
        timelineStage: Math.min(sanitized.length > 0 ? 2 : 0, 5),
      });
    } else {
      set({ demoInput: sanitized });
    }
  },

  addKeystroke: (key: string) => {
    const state = get();
    if (state.isBlocked) return;
    
    if (!key || typeof key !== 'string') {
      console.error('Invalid keystroke input');
      return;
    }
    
    if (!isValidKeystrokeInput(key)) {
      console.error('Potentially dangerous keystroke input rejected');
      return;
    }
    
    const sanitized = sanitizeKeystroke(key);
    
    set({
      capturedStream: [...state.capturedStream, { key: sanitized, timestamp: Date.now() }],
    });
  },

  toggleAdminMode: () => set(state => ({ adminDemoModeEnabled: !state.adminDemoModeEnabled })),

  startAVScan: () => {
    const state = get();
    const scanDuration = state.settings.avScanDuration;
    
    set({ avStatus: 'scanning', scanCount: validateCount(state.scanCount + 1), timelineStage: 3 });
    setTimeout(() => {
      set({ avStatus: 'detected', timelineStage: 4 });
    }, scanDuration);
  },

  quarantineThreat: () => set({ avStatus: 'quarantined' }),

  removeThreat: () => set({ avStatus: 'removed', timelineStage: 5 }),

  resetSimulation: () => {
    set({
      demoInput: '',
      capturedStream: [],
      riskLevel: 'Low',
      typingSpeed: 0,
      patternScore: 0,
      avStatus: 'idle',
      isBlocked: false,
      timelineStage: 0,
    });
  },

  unblock: () => set({ isBlocked: false }),

  updateSettings: (newSettings: Partial<SimulationSettings>) => {
    set(state => {
      const validated: SimulationSettings = {
        autoBlockingEnabled: newSettings.autoBlockingEnabled ?? state.settings.autoBlockingEnabled,
        avScanDuration: newSettings.avScanDuration !== undefined
          ? Math.max(1000, newSettings.avScanDuration)
          : state.settings.avScanDuration,
        transmissionAnimationEnabled: newSettings.transmissionAnimationEnabled ?? state.settings.transmissionAnimationEnabled,
        riskThresholds: {
          mediumThreshold: newSettings.riskThresholds?.mediumThreshold !== undefined
            ? validateThreshold(newSettings.riskThresholds.mediumThreshold)
            : state.settings.riskThresholds.mediumThreshold,
          highThreshold: newSettings.riskThresholds?.highThreshold !== undefined
            ? validateThreshold(newSettings.riskThresholds.highThreshold)
            : state.settings.riskThresholds.highThreshold,
        },
      };
      
      return { settings: validated };
    });
  },

  resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
}));
