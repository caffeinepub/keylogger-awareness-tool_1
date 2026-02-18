import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Shield, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import DisclaimerBanner from './DisclaimerBanner';

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Cyber background - non-interactive decoration */}
      <div 
        className="fixed inset-0 z-0 bg-decoration-layer" 
        data-bg-decoration
        aria-hidden="true"
      >
        <img
          src="/assets/generated/cyber-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      {/* Content - positioned above background */}
      <div className="relative z-10">
        <DisclaimerBanner />

        {/* Header */}
        <header className="glass-header border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-accent to-cyber-accent-dark flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold">
                    Keylogger Awareness Tool
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Educational Simulation
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
                <button
                  onClick={() => navigate({ to: '/' })}
                  className={`nav-button flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    currentPath === '/'
                      ? 'bg-cyber-accent text-white'
                      : 'hover:bg-accent text-foreground'
                  }`}
                  aria-current={currentPath === '/' ? 'page' : undefined}
                >
                  <Shield className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => navigate({ to: '/awareness' })}
                  className={`nav-button flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    currentPath === '/awareness'
                      ? 'bg-cyber-accent text-white'
                      : 'hover:bg-accent text-foreground'
                  }`}
                  aria-current={currentPath === '/awareness' ? 'page' : undefined}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Awareness</span>
                </button>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 flex flex-col gap-2 pb-2 border-t border-border/50 pt-4" aria-label="Mobile navigation">
                <button
                  onClick={() => {
                    navigate({ to: '/' });
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-button flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    currentPath === '/'
                      ? 'bg-cyber-accent text-white'
                      : 'hover:bg-accent text-foreground'
                  }`}
                  aria-current={currentPath === '/' ? 'page' : undefined}
                >
                  <Shield className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    navigate({ to: '/awareness' });
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-button flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    currentPath === '/awareness'
                      ? 'bg-cyber-accent text-white'
                      : 'hover:bg-accent text-foreground'
                  }`}
                  aria-current={currentPath === '/awareness' ? 'page' : undefined}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Awareness</span>
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Keylogger Awareness Tool. Educational purposes only.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with <span className="text-red-500">♥</span> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.hostname : 'keylogger-awareness'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-accent hover:underline transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
