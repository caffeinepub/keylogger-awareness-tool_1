import { Info } from 'lucide-react';
import { useState } from 'react';
import HelpTooltip from './HelpTooltip';

interface ModuleInfoPopoverProps {
  title: string;
  description: string;
  tooltipText?: string;
}

export default function ModuleInfoPopover({ title, description, tooltipText }: ModuleInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const infoButton = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="p-1.5 hover:bg-accent rounded-lg transition-colors"
      aria-label="More information"
    >
      <Info className="w-4 h-4 text-muted-foreground" />
    </button>
  );

  return (
    <div className="relative">
      {tooltipText ? (
        <HelpTooltip content={tooltipText} side="left">
          {infoButton}
        </HelpTooltip>
      ) : (
        infoButton
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 p-4 bg-popover border border-border rounded-lg shadow-lg z-50">
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </>
      )}
    </div>
  );
}
