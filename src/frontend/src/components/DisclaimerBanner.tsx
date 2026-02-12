import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-gradient-to-r from-[oklch(0.7_0.25_145)] to-[oklch(0.6_0.25_145)] text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1">Educational Simulation Only</p>
          <p className="text-xs opacity-90">
            This tool is for cybersecurity awareness and educational purposes only. The simulation runs entirely in your browser and does NOT capture keystrokes outside the demo input box, does NOT store your typed input, and does NOT transmit any real data. Demo videos are loaded from YouTube when played. All other simulations are visual demonstrations running locally.
          </p>
        </div>
      </div>
    </div>
  );
}
