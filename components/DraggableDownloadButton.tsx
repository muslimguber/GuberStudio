import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export const DraggableDownloadButton: React.FC = () => {
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

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
          right: '20px',
          bottom: '100px',
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
          className="flex flex-col items-center justify-center w-[60px] h-[60px] bg-[var(--color-primary)] hover:opacity-90 border-2 border-white/20 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-colors"
          title="Install App"
        >
          <Download size={24} className="mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider leading-none">APK</span>
        </a>
      </motion.div>
    </div>
  );
};
