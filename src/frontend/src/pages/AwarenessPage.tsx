import { Shield, HardDrive, Code, Cpu, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import AwarenessQuiz from '../components/AwarenessQuiz';
import AnimatedInfographics from '../components/AnimatedInfographics';

export default function AwarenessPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Keylogger Awareness & Prevention</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn about keyloggers, how they work, and most importantly, how to protect yourself from them.
        </p>
      </div>

      {/* What is a Keylogger */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-[oklch(0.7_0.25_145)]" />
          <h2 className="text-2xl font-bold">What is a Keylogger?</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            A keylogger is a type of surveillance technology used to monitor and record each keystroke typed on a
            specific computer's keyboard. While keyloggers can be used for legitimate purposes like parental monitoring
            or employee oversight, they are often deployed maliciously to steal sensitive information such as passwords,
            credit card numbers, and personal messages.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Keyloggers can be either software-based programs or hardware devices. They operate silently in the
            background, making them difficult to detect without proper security measures.
          </p>
        </div>
      </section>

      {/* Types of Keyloggers */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Types of Keyloggers</h2>
        
        <AnimatedInfographics />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <HardDrive className="w-10 h-10 text-[oklch(0.7_0.25_145)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Hardware Keyloggers</h3>
            <p className="text-sm text-muted-foreground">
              Physical devices attached between the keyboard and computer. They can be USB dongles, keyboard overlays,
              or even modified keyboards. These are harder to detect via software but require physical access.
            </p>
          </div>

          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <Code className="w-10 h-10 text-[oklch(0.75_0.20_85)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Software Keyloggers</h3>
            <p className="text-sm text-muted-foreground">
              Programs installed on the operating system that monitor keyboard input. They can be delivered through
              malware, phishing emails, or malicious downloads. Most common type encountered by users.
            </p>
          </div>

          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <Cpu className="w-10 h-10 text-[oklch(0.65_0.25_0)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Kernel-based Keyloggers</h3>
            <p className="text-sm text-muted-foreground">
              Advanced software that operates at the kernel level of the operating system. These are extremely difficult
              to detect and remove, often requiring specialized security tools or system reinstallation.
            </p>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-[oklch(0.7_0.25_145)]" />
          <h2 className="text-2xl font-bold">How to Prevent Keyloggers</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Use Reputable Antivirus Software</h4>
                <p className="text-sm text-muted-foreground">
                  Install and maintain up-to-date antivirus software with real-time protection enabled.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Enable Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your accounts so stolen passwords alone aren't enough.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Keep Software Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Regularly update your operating system and applications to patch security vulnerabilities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Be Cautious with Downloads</h4>
                <p className="text-sm text-muted-foreground">
                  Only download software from trusted sources and avoid clicking suspicious email attachments.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Use Virtual Keyboards</h4>
                <p className="text-sm text-muted-foreground">
                  For sensitive data entry, consider using on-screen keyboards that bypass physical keystrokes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Monitor System Behavior</h4>
                <p className="text-sm text-muted-foreground">
                  Watch for unusual system slowdowns, unexpected network activity, or unknown processes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Check for Hardware Devices</h4>
                <p className="text-sm text-muted-foreground">
                  Inspect USB ports and keyboard connections, especially on public or shared computers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[oklch(0.7_0.25_145)]/10 border border-[oklch(0.7_0.25_145)]/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[oklch(0.7_0.25_145)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Use Password Managers</h4>
                <p className="text-sm text-muted-foreground">
                  Password managers can auto-fill credentials, reducing the need to type sensitive information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Case Studies */}
      <section className="glass-panel p-8 rounded-xl border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-8 h-8 text-[oklch(0.75_0.20_85)]" />
          <h2 className="text-2xl font-bold">Real-World Case Studies</h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-[oklch(0.65_0.25_0)] flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-semibold">Corporate Espionage (2019)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              A major corporation discovered keyloggers installed on executive computers, capturing sensitive business
              strategies and financial data. The breach went undetected for months, resulting in significant
              competitive disadvantage and financial losses.
            </p>
            <p className="text-xs text-[oklch(0.7_0.25_145)]">
              Lesson: Regular security audits and employee training are essential for early detection.
            </p>
          </div>

          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-[oklch(0.65_0.25_0)] flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-semibold">Banking Trojan Campaign (2020)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              A widespread phishing campaign delivered keylogger malware disguised as legitimate software updates.
              Thousands of users had their banking credentials stolen, leading to unauthorized transactions and identity
              theft.
            </p>
            <p className="text-xs text-[oklch(0.7_0.25_145)]">
              Lesson: Always verify software updates through official channels and use two-factor authentication.
            </p>
          </div>

          <div className="p-6 bg-background/50 border border-border rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-[oklch(0.65_0.25_0)] flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-semibold">Public Computer Attack (2021)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Hardware keyloggers were discovered on public library computers, capturing login credentials and personal
              information from unsuspecting users. The devices were small USB adapters easily overlooked.
            </p>
            <p className="text-xs text-[oklch(0.7_0.25_145)]">
              Lesson: Always inspect public computers for suspicious hardware and avoid entering sensitive information.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <AwarenessQuiz />
    </div>
  );
}
