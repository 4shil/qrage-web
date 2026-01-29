import { useEffect, useRef } from 'react';
import { QRType } from '../types/qr';
import gsap from 'gsap';

interface TypeSelectorProps {
  selected: QRType;
  onChange: (type: QRType) => void;
}

const TYPES: { value: QRType; label: string }[] = [
  { value: 'url', label: 'Website' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'social', label: 'Social' },
];

export function TypeSelector({ selected, onChange }: TypeSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const buttons = containerRef.current.querySelectorAll('button');
    gsap.fromTo(
      buttons,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  const handleClick = (type: QRType, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    // Ripple effect
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
        });
      },
    });

    onChange(type);
  };

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-3">
      {TYPES.map((type) => (
        <button
          key={type.value}
          onClick={(e) => handleClick(type.value, e)}
          className={`p-4 border-2 border-[#1a1a1a] font-bold uppercase text-sm transition-all rounded-sm ${
            selected === type.value
              ? 'bg-[#c8e64a] shadow-none translate-x-[2px] translate-y-[2px]'
              : 'bg-white shadow-[3px_3px_0px_0px_#1a1a1a] hover:shadow-[1px_1px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px]'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
