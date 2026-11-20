import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('[data-cursor]') as HTMLElement | null;
      setLabel(interactive?.getAttribute('data-cursor') ?? null);
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);
    const onLeave = () => setPos({ x: -100, y: -100 });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  const hasLabel = Boolean(label);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-150"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: pos.x < 0 ? 0 : 1,
      }}
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-150 ease-out ${
          hasLabel
            ? 'h-16 w-16 bg-[#FF1E2D] text-[#FAFAFA] shadow-lg'
            : 'h-3.5 w-3.5 border border-[#F4F2EE]/80 bg-transparent'
        } ${isPressed ? 'scale-90' : 'scale-100'}`}
      >
        {hasLabel && (
          <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
