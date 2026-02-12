import { Info } from 'lucide-react';

interface InContextWarningProps {
  message: string;
}

export default function InContextWarning({ message }: InContextWarningProps) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30">
      <Info className="w-4 h-4 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
      <p className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}
