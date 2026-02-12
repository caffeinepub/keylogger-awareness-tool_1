import { Send } from 'lucide-react';

export default function TransmissionAnimation() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[oklch(0.65_0.25_0)]/10 border border-[oklch(0.65_0.25_0)]/30 rounded-lg">
      <Send className="w-4 h-4 text-[oklch(0.65_0.25_0)] animate-pulse" />
      <div className="flex-1">
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-[oklch(0.65_0.25_0)] animate-pulse w-3/4" />
        </div>
      </div>
      <span className="text-xs text-muted-foreground">Simulated transmission</span>
    </div>
  );
}
