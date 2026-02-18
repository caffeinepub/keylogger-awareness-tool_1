import { Shield, Zap, BookOpen } from 'lucide-react';

export default function DashboardHeroIntro() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 mb-8">
      {/* Hero Background with Image - explicitly non-interactive to preserve button clicks */}
      <div className="absolute inset-0 z-0 bg-decoration-layer" aria-hidden="true">
        <img
          src="/assets/generated/dashboard-hero.dim_1600x600.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: 'url(/assets/generated/glass-grain.dim_1024x1024.png)',
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      {/* Content - positioned above background with interactive elements */}
      <div className="relative z-10 glass-panel-hero p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 mb-6">
            <Shield className="w-4 h-4 text-cyber-accent" />
            <span className="text-sm font-medium text-cyber-accent">Educational Security Simulation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Learn Cybersecurity Through
            <span className="block text-cyber-accent mt-1">Safe, Interactive Simulation</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            This educational tool demonstrates how keyloggers work in a completely safe, local environment. 
            All simulations run in your browser—no data is stored or transmitted. 
            Build awareness and learn defensive security practices.
          </p>

          {/* Quick Start Hint */}
          <div className="glass-card-subtle p-6 rounded-xl border border-border/50 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-cyber-accent" />
              <h3 className="text-lg font-semibold">Quick Start</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyber-accent font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Type in the Keylogger Module</p>
                  <p className="text-muted-foreground text-xs">Watch how keystrokes are captured in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyber-accent font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Monitor Risk Detection</p>
                  <p className="text-muted-foreground text-xs">See AI-powered threat analysis in action</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyber-accent font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Try Test Scenarios</p>
                  <p className="text-muted-foreground text-xs">Run prebuilt scenarios to explore different risk levels</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyber-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-cyber-accent" />
                </div>
                <div>
                  <p className="font-medium mb-1">Learn & Test Knowledge</p>
                  <p className="text-muted-foreground text-xs">Take quizzes to reinforce security concepts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
