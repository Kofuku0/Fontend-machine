'use client';

import Image from 'next/image';

type ResponsibleCardProps = {
  title?: string;
  image: string;
  isFav?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function ResponsibleCard({
  title = 'Game Title',
  image,
  isFav = false,
  className = '',
  onClick,
}: ResponsibleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border border-white/15
        bg-white/5 shadow-sm backdrop-blur-sm
        transition-transform duration-200 active:scale-[0.98]
        ${className}
      `}
      style={{
        width: 'clamp(96px, 22vw, 140px)', // ✅ responsive width
        aspectRatio: '128 / 145', // ✅ keeps design proportion
      }}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 140px"
        className="object-cover"
        priority={false}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      {/* Fav badge */}
      {isFav && (
        <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
          FAV
        </div>
      )}

      {/* Title */}
      <div className="absolute bottom-2 left-2 right-2">
        <p className="line-clamp-1 text-left text-[12px] font-semibold text-white sm:text-[13px]">
          {title}
        </p>
      </div>
    </button>
  );
}
