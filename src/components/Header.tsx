import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Releases', id: 'releases' },
    { label: 'Visuals', id: 'visuals' },
    { label: 'The Story', id: 'story' },
    { label: 'Connect', id: 'connect' },
  ];

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="font-display text-xl font-extrabold tracking-tight text-[#F4F2EE] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1E2D] rounded-sm"
        >
          YABI®
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className="relative py-1 text-sm font-medium text-[#B8BDC7] transition-colors duration-150 hover:text-[#F4F2EE] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#FF1E2D] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1E2D] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('connect')}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#FF1E2D] px-4 py-2 text-xs font-semibold text-[#FAFAFA] transition-colors duration-150 hover:bg-[#E01524] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F2EE] min-h-[40px]"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden items-center justify-center rounded-md border border-white/15 p-2 text-[#F4F2EE] hover:border-white/30 min-h-[44px] min-w-[44px] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Compact mobile navigation drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#050505] px-6 py-5 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="py-2 text-base font-medium text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('connect')}
              className="mt-2 w-full rounded-md bg-[#FF1E2D] px-4 py-3 text-sm font-semibold text-[#FAFAFA] min-h-[44px]"
            >
              Get in Touch
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
