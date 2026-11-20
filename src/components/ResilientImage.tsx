import { useState } from 'react';
import { Disc3 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  loading = 'eager',
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failedAll, setFailedAll] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setFailedAll(true);
    }
  };

  if (failedAll) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#141417] via-[#0A0A0C] to-[#1A080A] text-[#B8BDC7] p-6 ${className}`}
      >
        <Disc3 className="h-8 w-8 text-[#FF1E2D] mb-3" />
        <span className="font-display text-sm font-semibold text-[#F4F2EE] text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}
