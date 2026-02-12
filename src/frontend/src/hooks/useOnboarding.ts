import { useState, useEffect } from 'react';

const ONBOARDING_STORAGE_KEY = 'keylogger-awareness-onboarding-dismissed';

export function useOnboarding() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if onboarding has been dismissed before
    const dismissed = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!dismissed) {
      setIsOnboardingOpen(true);
    }
    setIsInitializing(false);
  }, []);

  const dismissOnboarding = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setIsOnboardingOpen(false);
  };

  const openOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    setIsOnboardingOpen(true);
  };

  return {
    isOnboardingOpen,
    isInitializing,
    dismissOnboarding,
    openOnboarding,
    resetOnboarding,
  };
}
