interface DistortedTextProps {
  text: string;
  className?: string;
  accentDot?: boolean;
}

export function DistortedText({ text, className = '', accentDot = false }: DistortedTextProps) {
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.26em] last:mr-0" aria-hidden="true">
          {word.split('').map((char, cIdx) => (
            <span key={`${char}-${cIdx}`} className="kinetic-glyph">
              {char}
            </span>
          ))}
        </span>
      ))}
      {accentDot && (
        <span className="kinetic-glyph text-[#FF1E2D]" aria-hidden="true">
          .
        </span>
      )}
    </span>
  );
}
