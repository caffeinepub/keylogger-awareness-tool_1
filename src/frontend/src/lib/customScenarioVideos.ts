/**
 * Local-only persistence and validation utility for per-scenario custom YouTube links.
 * Uses localStorage to save/load/clear custom video URLs without backend interaction.
 * Validates URLs using existing getYouTubeEmbedUrl rules.
 */

import { getYouTubeEmbedUrl } from './scenarioVideos';

const STORAGE_KEY = 'keylogger-awareness-custom-videos';

interface CustomVideoMap {
  [scenarioId: string]: string;
}

/**
 * Load all custom video links from localStorage.
 */
export function loadCustomVideos(): CustomVideoMap {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as CustomVideoMap;
  } catch {
    return {};
  }
}

/**
 * Save a custom video link for a specific scenario.
 * Returns true if valid and saved, false if invalid.
 */
export function saveCustomVideo(scenarioId: string, urlOrId: string): boolean {
  // Validate the URL/ID using existing embed parsing rules
  const embedUrl = getYouTubeEmbedUrl(urlOrId);
  if (!embedUrl) {
    return false;
  }

  try {
    const current = loadCustomVideos();
    current[scenarioId] = urlOrId;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear the custom video link for a specific scenario.
 */
export function clearCustomVideo(scenarioId: string): void {
  try {
    const current = loadCustomVideos();
    delete current[scenarioId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Get the custom video link for a specific scenario.
 * Returns undefined if no custom link is set.
 */
export function getCustomVideo(scenarioId: string): string | undefined {
  const videos = loadCustomVideos();
  return videos[scenarioId];
}

/**
 * Validate a YouTube URL or video ID without saving.
 * Returns true if the URL/ID can be converted to a valid embed URL.
 */
export function validateYouTubeUrl(urlOrId: string): boolean {
  return !!getYouTubeEmbedUrl(urlOrId);
}
