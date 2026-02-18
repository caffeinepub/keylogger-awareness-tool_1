import { Shield, HardDrive, Code, Cpu, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import AwarenessQuiz from '../components/AwarenessQuiz';
import AnimatedInfographics from '../components/AnimatedInfographics';

export default function AwarenessPage() {
  return (
    <div className="space-y-12" data-testid="awareness-page">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 mb-4">
          <Shield className="w-4 h-4 text-cyber-accent" />
          <span className="text-sm font-medium text-cyber-accent">Security Education</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">Keylogger Awareness & Prevention</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Learn about keyloggers, how they work, and most importantly, how to protect yourself from them.
        </p>
      </div>

      {/* What is a Keylogger */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-cyber-accent" />
          <h2 className="text-3xl font-bold">What is a Keylogger?</h2>
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A keylogger is a type of surveillance technology used to monitor and record each keystroke typed on a specific computer's keyboard. 
            While keyloggers can be used for legitimate purposes like parental monitoring or employee oversight, they are often deployed maliciously 
            to steal sensitive information such as passwords, credit card numbers, and personal messages.
          </p>
          <p>
            Keyloggers can be either software-based (installed as programs or malware) or hardware-based (physical devices attached to keyboards). 
            They operate silently in the background, making them difficult to detect without proper security measures.
          </p>
        </div>
      </section>

      {/* Types of Keyloggers */}
      <section className="glass-panel p-8 rounded-xl border border-border/50 relative overflow-hidden">
        <AnimatedInfographics />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-cyber-accent" />
            <h2 className="text-3xl font-bold">Types of Keyloggers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card-subtle p-6 rounded-xl border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-accent/10 flex items-center justify-center">
                  <HardDrive className="w-6 h-6 text-cyber-accent" />
                </div>
                <h3 className="text-xl font-semibold">Hardware Keyloggers</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Physical devices that connect between a keyboard and computer. They can be USB dongles, keyboard overlays, 
                or even modified keyboards. These are harder to detect through software but require physical access to install.
              </p>
            </div>

            <div className="glass-card-subtle p-6 rounded-xl border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-accent/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-cyber-accent" />
                </div>
                <h3 className="text-xl font-semibold">Software Keyloggers</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Programs installed on a computer that monitor keyboard input. They can be standalone applications, 
                browser extensions, or embedded in other malware. These are more common and can be installed remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Protect Yourself */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-cyber-accent" />
          <h2 className="text-3xl font-bold">How to Protect Yourself</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Use Antivirus Software</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your antivirus software updated and run regular scans to detect and remove keyloggers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Enable Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Even if passwords are stolen, 2FA provides an additional layer of security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Use Password Managers</h4>
                <p className="text-sm text-muted-foreground">
                  Password managers can auto-fill credentials, bypassing keyboard input entirely.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Be Cautious on Public Computers</h4>
                <p className="text-sm text-muted-foreground">
                  Avoid entering sensitive information on shared or public computers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Keep Software Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Regular updates patch security vulnerabilities that keyloggers might exploit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-cyber-accent/50 transition-all">
              <CheckCircle className="w-5 h-5 text-cyber-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Monitor System Activity</h4>
                <p className="text-sm text-muted-foreground">
                  Watch for unusual processes, network activity, or system slowdowns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-8 h-8 text-cyber-accent" />
          <h2 className="text-3xl font-bold">Warning Signs</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
            <AlertTriangle className="w-5 h-5 text-[oklch(0.75_0.20_85)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Slow Performance</h4>
              <p className="text-xs text-muted-foreground">
                Unexplained system slowdowns or lag when typing
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
            <AlertTriangle className="w-5 h-5 text-[oklch(0.75_0.20_85)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Unusual Network Activity</h4>
              <p className="text-xs text-muted-foreground">
                Unexpected data transfers or network connections
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
            <AlertTriangle className="w-5 h-5 text-[oklch(0.75_0.20_85)] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Unknown Processes</h4>
              <p className="text-xs text-muted-foreground">
                Unfamiliar programs running in the background
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-cyber-accent" />
          <h2 className="text-3xl font-bold">Test Your Knowledge</h2>
        </div>
        <AwarenessQuiz />
      </section>
    </div>
  );
}
