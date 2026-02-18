import { useEffect, useState } from 'react';

export interface AppearancePreferences {
  reducedMotion: boolean;
  density: 'comfortable' | 'compact';
}

const STORAGE_KEY = 'appearance-preferences';

const DEFAULT_PREFERENCES: AppearancePreferences = {
  reducedMotion: false,
  density: 'comfortable',
};

function isValidDensity(value: unknown): value is 'comfortable' | 'compact' {
  return value === 'comfortable' || value === 'compact';
}

function isValidBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function loadPreferences(): AppearancePreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Validate stored data
      const validated: AppearancePreferences = {
        reducedMotion: isValidBoolean(parsed.reducedMotion) ? parsed.reducedMotion : DEFAULT_PREFERENCES.reducedMotion,
        density: isValidDensity(parsed.density) ? parsed.density : DEFAULT_PREFERENCES.density,
      };
      
      return validated;
    }
  } catch (error) {
    console.warn('Failed to load appearance preferences:', error);
  }
  return DEFAULT_PREFERENCES;
}

function savePreferences(preferences: AppearancePreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save appearance preferences:', error);
  }
}

function applyPreferences(preferences: AppearancePreferences): void {
  if (preferences.reducedMotion) {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  } else {
    document.documentElement.removeAttribute('data-reduced-motion');
  }

  document.documentElement.setAttribute('data-density', preferences.density);
}

export function useAppearancePreferences() {
  const [preferences, setPreferences] = useState<AppearancePreferences>(loadPreferences);

  useEffect(() => {
    applyPreferences(preferences);
    savePreferences(preferences);
  }, [preferences]);

  const updatePreferences = (updates: Partial<AppearancePreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      
      // Validate updates
      if (updates.reducedMotion !== undefined && !isValidBoolean(updates.reducedMotion)) {
        console.error('Invalid reducedMotion value');
        return prev;
      }
      
      if (updates.density !== undefined && !isValidDensity(updates.density)) {
        console.error('Invalid density value');
        return prev;
      }
      
      return updated;
    });
  };

  const toggleReducedMotion = () => {
    setPreferences((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const setDensity = (density: 'comfortable' | 'compact') => {
    if (!isValidDensity(density)) {
      console.error('Invalid density value');
      return;
    }
    setPreferences((prev) => ({ ...prev, density }));
  };

  return {
    preferences,
    updatePreferences,
    toggleReducedMotion,
    setDensity,
  };
}
