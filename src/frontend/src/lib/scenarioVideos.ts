/**
 * Static mapping of scenario IDs to their corresponding YouTube video URLs.
 * Videos are loaded from YouTube as external content.
 * Returns undefined for unknown scenario IDs to allow graceful fallback.
 */

export const scenarioVideos: Record<string, string | undefined> = {
  'low-risk': 'https://www.youtube.com/watch?v=inWWhr5tnEA',
  'medium-risk': 'https://www.youtube.com/watch?v=hqF7MkR0iP8',
  'high-risk': 'https://www.youtube.com/watch?v=5K7aY-6YxfQ',
  'password-pattern': 'https://www.youtube.com/watch?v=7U-RbOKanYs',
  'rapid-typing': 'https://www.youtube.com/watch?v=opRMrEfAIiI',
  'sensitive-keywords': 'https://www.youtube.com/watch?v=aHR07bfDSCA',
  'long-input': 'https://www.youtube.com/watch?v=08Khh7KwY28',
  'false-positive': 'https://www.youtube.com/watch?v=fCn8zs912OE',
  'auto-block-trigger': 'https://www.youtube.com/watch?v=34Na4j8AVgA',
  'mixed-patterns': 'https://www.youtube.com/watch?v=zFE9C4HeZYw',
};

/**
 * Get the YouTube video URL for a given scenario ID.
 * Returns undefined if no video is mapped for the scenario.
 */
export function getScenarioVideo(scenarioId: string): string | undefined {
  return scenarioVideos[scenarioId];
}

/**
 * Convert a YouTube URL or video ID to an embeddable iframe URL.
 * Supports both full URLs and video IDs.
 * Returns undefined if the input is invalid or undefined.
 */
export function getYouTubeEmbedUrl(urlOrId: string | undefined): string | undefined {
  if (!urlOrId) return undefined;

  try {
    // If it's already a video ID (11 characters, alphanumeric with - and _)
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
      return `https://www.youtube.com/embed/${urlOrId}?autoplay=1&rel=0`;
    }

    // Parse as URL
    const url = new URL(urlOrId);
    let videoId: string | null = null;

    // Handle youtube.com/watch?v=VIDEO_ID
    if (url.hostname.includes('youtube.com') && url.pathname === '/watch') {
      videoId = url.searchParams.get('v');
    }
    // Handle youtu.be/VIDEO_ID
    else if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1);
    }
    // Handle youtube.com/embed/VIDEO_ID
    else if (url.hostname.includes('youtube.com') && url.pathname.startsWith('/embed/')) {
      videoId = url.pathname.split('/')[2];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    return undefined;
  } catch {
    // If URL parsing fails, return undefined
    return undefined;
  }
}
