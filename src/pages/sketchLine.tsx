import React, { useEffect, useRef } from 'react';
import rough from 'roughjs/bin/rough';

interface SketchLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    endLine?: boolean;
    stroke?: string;
    strokeWidth?: number;
    roughness?: number;
    color?: string;
    label?: string;
    labelAlignment?: string;
}

const SketchLine = ({ x1, y1, x2, y2, color = 'black', endLine = false }: SketchLineProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
  
    useEffect(() => {
      const rc = rough.svg(svgRef.current!);
      const node = rc.line(x1, y1, x2, y2, {
        stroke: color,
        strokeWidth: 3,
        roughness: 3,
      });
  
      svgRef.current!.innerHTML = '';
      svgRef.current!.appendChild(node);

      if (endLine) {
      const circle = rc.circle(x2, y2, 20, {
        stroke: color,
        strokeWidth: 2,
        fill: 'white',
        fillStyle: 'solid',
        roughness: 1,
      });
      svgRef.current!.appendChild(circle);
    }
    }, [x1, y1, x2, y2, color, endLine]);

    return (
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
    );
  };
  

export default SketchLine;
