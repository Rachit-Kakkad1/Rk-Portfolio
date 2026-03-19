import React, { useRef, useState, useEffect } from 'react';
import styles from './CursorRevealImage.module.css';

interface CursorRevealImageProps {
  base: string;
  reveal: string;
  radius?: number;
  hoverRadius?: number;
  alt?: string;
  className?: string; // Allow custom styling from parent
}

export const CursorRevealImage: React.FC<CursorRevealImageProps> = ({
  base,
  reveal,
  radius = 120,
  hoverRadius = 160,
  alt = "Portfolio Hero",
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Target position for the mask
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Current position for smooth lerping
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Ref to hold the dynamically updated radius for smooth transition
  const currentRadius = useRef(radius);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Trigger fade-in on mount
    setIsVisible(true);
    
    // Set initial position to center of container
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetX.current = rect.width / 2;
        targetY.current = rect.height / 2;
        currentX.current = targetX.current;
        currentY.current = targetY.current;
        
        containerRef.current.style.setProperty('--x', `${currentX.current}px`);
        containerRef.current.style.setProperty('--y', `${currentY.current}px`);
        containerRef.current.style.setProperty('--radius', `${radius}px`);
    }

    const animate = () => {
      // Linear interpolation (lerp) for smooth cursor following
      currentX.current += (targetX.current - currentX.current) * 0.15;
      currentY.current += (targetY.current - currentY.current) * 0.15;
      
      // Lerp for smooth radius change on hover
      const targetRadius = isHovered ? hoverRadius : radius;
      currentRadius.current += (targetRadius - currentRadius.current) * 0.1;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${currentX.current}px`);
        containerRef.current.style.setProperty('--y', `${currentY.current}px`);
        containerRef.current.style.setProperty('--radius', `${currentRadius.current}px`);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, radius, hoverRadius]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Update target position based on cursor within the container
    targetX.current = e.clientX - rect.left;
    targetY.current = e.clientY - rect.top;
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${isVisible ? styles.visible : ''} ${isHovered ? styles.hovered : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={base} alt={`Base - ${alt}`} className={styles.baseImage} />
      <div className={styles.revealWrapper}>
        <img src={reveal} alt={`Reveal - ${alt}`} className={styles.revealImage} />
      </div>
    </div>
  );
};
