import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export const DraggableDownloadButton: React.FC = () => {
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [positionStyles, setPositionStyles] = useState<React.CSSProperties>({
    right: '20px',
    bottom: '100px'
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPositionStyles({
          left: 'calc(50% - 110px)',
          top: 'calc(50% - 30px)'
        });
      } else {
        setPositionStyles({
          right: '20px',
          bottom: '100px'
        });
      }
    };
    
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]" 
      ref={constraintsRef}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
        className="pointer-events-auto absolute"
        style={{
          ...positionStyles,
          touchAction: 'none'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a 
          href="https://drive.google.com/file/d/1GJtfZDT8pw0X5Hr3w0cPcUGaR80aazHw/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-3 px-6 py-4 w-[220px] bg-[var(--color-primary)] hover:opacity-90 border-2 border-white/20 text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-colors"
          title="Install App"
        >
          <Download size={22} strokeWidth={2.5} />
          <span className="text-[15px] font-bold tracking-wider leading-none mt-0.5">INSTAL APLIKASI</span>
        </a>
      </motion.div>
    </div>
  );
};
