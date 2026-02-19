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
  rateLimitExceeded: boolean;
  keystrokeTimestamps: number[];
  
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

// Rate limiting configuration
const MAX_KEYSTROKES_PER_SECOND = 50;
const RATE_LIMIT_WINDOW_MS = 1000;
const MAX_CAPTURED_TEXT_LENGTH = 10000;

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

function validateTypingSpeed(speed: number): number {
  const validated = Math.max(0, speed);
  if (validated !== speed) {
    console.error('Invalid typing speed, must be non-negative:', speed);
  }
  return validated;
}

function validateTextLength(text: string): string {
  if (text.length > MAX_CAPTURED_TEXT_LENGTH) {
    console.warn(`Text length exceeds maximum (${MAX_CAPTURED_TEXT_LENGTH}), truncating`);
    return text.substring(0, MAX_CAPTURED_TEXT_LENGTH);
  }
  return text;
}

// State validation function
function validateState(state: Partial<SimulationState>): boolean {
  let isValid = true;

  if (state.riskLevel !== undefined) {
    const riskValues = { Low: 1, Medium: 2, High: 3 };
    if (!riskValues[state.riskLevel]) {
      console.error('Invalid risk level:', state.riskLevel);
      isValid = false;
    }
  }

  if (state.typingSpeed !== undefined && (state.typingSpeed < 0 || !isFinite(state.typingSpeed))) {
    console.error('Invalid typing speed:', state.typingSpeed);
    isValid = false;
  }

  if (state.patternScore !== undefined && (state.patternScore < 0 || state.patternScore > 100)) {
    console.error('Invalid pattern score:', state.patternScore);
    isValid = false;
  }

  if (state.scanCount !== undefined && (state.scanCount < 0 || !Number.isInteger(state.scanCount))) {
    console.error('Invalid scan count:', state.scanCount);
    isValid = false;
  }

  if (state.blockCount !== undefined && (state.blockCount < 0 || !Number.isInteger(state.blockCount))) {
    console.error('Invalid block count:', state.blockCount);
    isValid = false;
  }

  if (state.demoInput !== undefined && state.demoInput.length > MAX_CAPTURED_TEXT_LENGTH) {
    console.error('Demo input exceeds maximum length');
    isValid = false;
  }

  return isValid;
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
  rateLimitExceeded: false,
  keystrokeTimestamps: [],

  setDemoInput: (input: string) => {
    const state = get();
    if (state.isBlocked) return;

    // Validate input type
    if (typeof input !== 'string') {
      console.error('Invalid demo input type');
      return;
    }

    // Validate against XSS
    if (!isValidKeystrokeInput(input)) {
      console.warn('Potentially dangerous input detected and rejected');
      return;
    }

    // Sanitize input
    const sanitized = sanitizeKeystroke(input);
    
    // Validate length
    const validatedInput = validateTextLength(sanitized);
    
    const now = Date.now();
    const newChar = validatedInput.slice(-1);
    
    if (newChar && validatedInput.length > state.demoInput.length) {
      // Rate limiting check
      const recentTimestamps = state.keystrokeTimestamps.filter(
        ts => now - ts < RATE_LIMIT_WINDOW_MS
      );
      
      if (recentTimestamps.length >= MAX_KEYSTROKES_PER_SECOND) {
        console.warn('Rate limit exceeded, keystroke discarded');
        set({ rateLimitExceeded: true });
        return;
      }
      
      const newTimestamps = [...recentTimestamps, now];
      const newStream = [...state.capturedStream, { key: newChar, timestamp: now }];
      
      const recentKeys = newStream.filter(k => now - k.timestamp < 5000);
      const typingSpeed = recentKeys.length / 5;
      
      let patternScore = 0;
      if (validatedInput.length > 8 && /[A-Z]/.test(validatedInput) && /[0-9]/.test(validatedInput) && /[!@#$%^&*]/.test(validatedInput)) {
        patternScore += 30;
      }
      if (typingSpeed > 3) {
        patternScore += 20;
      }
      if (validatedInput.toLowerCase().includes('password') || validatedInput.toLowerCase().includes('admin')) {
        patternScore += 40;
      }
      if (validatedInput.length > 20) {
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
      
      const newState = {
        demoInput: validatedInput,
        capturedStream: newStream,
        typingSpeed: validateTypingSpeed(typingSpeed),
        patternScore: validateCount(patternScore),
        riskLevel,
        peakRisk,
        isBlocked: shouldBlock,
        blockCount: validateCount(state.blockCount + (shouldBlock ? 1 : 0)),
        timelineStage: Math.min(validatedInput.length > 0 ? 2 : 0, 5),
        rateLimitExceeded: false,
        keystrokeTimestamps: newTimestamps,
      };
      
      // Validate state before setting
      if (validateState(newState)) {
        set(newState);
      }
    } else {
      set({ demoInput: validatedInput, rateLimitExceeded: false });
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
      rateLimitExceeded: false,
      keystrokeTimestamps: [],
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
