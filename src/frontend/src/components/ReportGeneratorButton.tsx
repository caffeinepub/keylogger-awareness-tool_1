import { FileDown } from 'lucide-react';
import HelpTooltip from './HelpTooltip';
import { useSimulationState } from '../hooks/useSimulationState';
import { generateReport } from '../lib/reportGenerator';
import { toast } from 'sonner';

export default function ReportGeneratorButton() {
  const state = useSimulationState();

  const handleGenerateReport = () => {
    try {
      generateReport({
        peakRisk: state.peakRisk,
        scanCount: state.scanCount,
        blockCount: state.blockCount,
        capturedStream: state.capturedStream,
        reconstructedText: state.demoInput,
      });
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate report');
      console.error(error);
    }
  };

  return (
    <HelpTooltip content="Generate a local report summarizing the current simulation state, including the reconstructed text from the demo input. The report is created in your browser and downloaded to your device. No data is sent anywhere or stored.">
      <button
        onClick={handleGenerateReport}
        className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.7_0.25_145)] text-white rounded-lg hover:bg-[oklch(0.6_0.25_145)] transition-colors"
      >
        <FileDown className="w-4 h-4" />
        <span className="font-medium">Generate Report</span>
      </button>
    </HelpTooltip>
  );
}
