import React, {useState, useEffect} from 'react';
import './Header.css';
import SketchLine from '../pages/sketchLine';
import { useSketchLineFromRef } from '../hooks/useSketchLineFromRef';
import { useRef } from 'react';
  

const Header: React.FC<{ currentPath: string[] }> = ({ currentPath }) => {
  const horizontalLineContainerRef1 = useRef<HTMLDivElement>(null);
  const horizontalLine1 = useSketchLineFromRef(horizontalLineContainerRef1, 'horizontal');
  const containerRef = useRef<HTMLDivElement>(null);
  const [breadcrumbLines, setBreadcrumbLines] = useState<LineProps[]>([]);

  interface LineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color?: string;
    endLine?: boolean;
    beginningLine?: boolean;
    label?: string;
    labelAlignment?: string;
    onClick?: () => void;
    delay?: number;
    ref?: React.RefObject<HTMLDivElement | null>;
    drawSpeed?: number;
    lineSpacing?: number;
  }

  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const labelSpacing = 100; 
  const startX = 100;
  const y = 30;

  const lines: LineProps[] = [];

  lines.push({
    x1: startX,
    y1: y,
    x2: startX,
    y2: y,
    beginningLine: true,
    color: '#7dcea0',
    label: 'Home',
    labelAlignment: 'top',
    delay: 700,
    onClick: () => {
      window.location.href = '/';
    },
  });

  currentPath.forEach((label, i) => {
    const segmentStartX = startX + (i + 1) * labelSpacing;

    // draw the line segment *before* this label if it's not the first
    if (i >= 0) {
      lines.push({
        x1: segmentStartX - labelSpacing,
        y1: y,
        x2: segmentStartX,
        y2: y,
        color: '#7dcea0',
        delay: i * 600,
        drawSpeed: 0.3,
      });
    }

    // label at the end of the segment
    lines.push({
      x1: segmentStartX,
      y1: y,
      x2: segmentStartX,
      y2: y,
      beginningLine: true,
      color: '#7dcea0',
      label,
      labelAlignment: 'top',
      delay: i * 300,
      onClick: () => {
        const to = '/' + currentPath.slice(0, i + 1).join('/').toLowerCase();
        window.location.href = to;
      },
    });
  });

  setBreadcrumbLines(lines);
}, [currentPath]);


function getRandomFloat(min = 0.3, max = 3.5): number {
  return Math.random() * (max - min) + min;
}

  const blue = '#5dade2';
  return (
    <header className="header-container">
      <div ref={containerRef} className="breadcrumb-sketch-container">
        {breadcrumbLines.map((line: LineProps, idx: number) => (
  <React.Fragment key={idx}>
    <SketchLine {...line} mode="screen"/>
    {line.label && (
      <div
        className=" breadcrumb-label bio-animated" 
        style={{
          position: 'absolute',
          left: line.x1 - 20,
          top: line.y1 - 30,
          color: line.color,
          fontSize: '1rem',
          fontFamily: 'Good Brush, sans-serif',
          cursor: 'pointer',
          animationDelay: `${line.delay}ms`,
        }}
        onClick={line.onClick}
      >
        {line.label}
      </div>
    )}
  </React.Fragment>
))}
      </div>
      <div className="horizontal-line-container" ref={horizontalLineContainerRef1}>
            {horizontalLine1 && <SketchLine {...horizontalLine1} color={blue} position='relative' mode="container" delay={100} drawSpeed={getRandomFloat()}/>}      
          </div>
    </header>
  );
};

export default Header;
