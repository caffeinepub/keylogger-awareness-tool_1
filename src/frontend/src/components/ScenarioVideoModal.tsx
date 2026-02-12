import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../lib/scenarioVideos';

interface ScenarioVideoModalProps {
  isOpen: boolean;
  videoSrc: string | undefined;
  scenarioName: string;
  onClose: () => void;
}

export default function ScenarioVideoModal({
  isOpen,
  videoSrc,
  scenarioName,
  onClose,
}: ScenarioVideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);

  // Convert video source to YouTube embed URL
  useEffect(() => {
    if (videoSrc) {
      const url = getYouTubeEmbedUrl(videoSrc);
      setEmbedUrl(url);
      setLoadError(!url);
    } else {
      setEmbedUrl(undefined);
      setLoadError(false);
    }
  }, [videoSrc]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Move focus to the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-background/95 border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="video-modal-title" className="text-lg font-semibold">
            {scenarioName} - Demo Video
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Content */}
        <div className="relative bg-black aspect-video">
          {embedUrl && !loadError ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${scenarioName} demonstration video`}
              onError={() => setLoadError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-8">
                <p className="text-lg mb-2">
                  {!videoSrc
                    ? 'Video not available for this scenario.'
                    : !embedUrl
                    ? 'Invalid video URL or ID.'
                    : 'Video failed to load.'}
                </p>
                <p className="text-sm">
                  {!videoSrc
                    ? 'No video has been configured for this scenario.'
                    : !embedUrl
                    ? 'The provided URL or video ID could not be converted to a valid YouTube embed link. Please check the format and try again.'
                    : 'The video may be unavailable, restricted, or removed. Please verify the link and try again later.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-background/50">
          <p className="text-sm text-muted-foreground">
            This video demonstrates the expected behavior for the <strong>{scenarioName}</strong> test scenario.
            The simulation is running in parallel. Video content is loaded from YouTube.
          </p>
        </div>
      </div>
    </div>
  );
}
