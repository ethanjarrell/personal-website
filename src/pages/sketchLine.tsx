import React, { useEffect, useRef } from 'react';
import rough from 'roughjs/bin/rough';
import './SketchLine.css';

interface SketchLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  endLine?: boolean;
  beginningLine?: boolean;
  stroke?: string;
  strokeWidth?: number;
  roughness?: number;
  color?: string;
  label?: string | React.ReactNode | null;
  labelAlignment?: string;
  position?: 'absolute' | 'relative';
  mode?: 'screen' | 'container';
  delay?: number;
  drawSpeed?: number;
}

const SketchLine = ({
  x1, y1, x2, y2,
  color = 'black',
  strokeWidth = 3,
  roughness = 3,
  endLine = false,
  beginningLine = false,
  position = 'absolute',
  mode = 'screen',
  drawSpeed = 0.5,
  delay = 0,
}: SketchLineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = Math.abs(x2 - x1) || 1;
  const height = Math.abs(y2 - y1) || 1;

  const localX1 = mode === 'container' ? 0 : x1;
  const localY1 = mode === 'container' ? 0 : y1;
  const localX2 = mode === 'container' ? x2 - x1 : x2;
  const localY2 = mode === 'container' ? y2 - y1 : y2;

  useEffect(() => {
    const rc = rough.svg(svgRef.current!);
    const node = rc.line(localX1, localY1, localX2, localY2, {
      stroke: color,
      strokeWidth,
      roughness,
    });
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    node.setAttribute('stroke-dasharray', `${length}`);
    node.setAttribute('stroke-dashoffset', `${length}`);
    node.setAttribute('style', `animation: drawLine ${drawSpeed}s alternate forwards cubic-bezier(0.42, 0, 0.58, 1); animation-delay: ${delay}ms`);
    svgRef.current!.innerHTML = '';
    svgRef.current!.appendChild(node);

    if (endLine) {
      const circle = rc.circle(localX2, localY2, 20, {
        stroke: color,
        strokeWidth: 2,
        fill: 'white',
        fillStyle: 'solid',
        roughness: 1,
      });
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      circle.setAttribute('stroke-dasharray', `${length}`);
      circle.setAttribute('stroke-dashoffset', `${length}`);
      circle.setAttribute('style', `animation: drawLine .5s alternate forwards cubic-bezier(0.42, 0, 0.58, 1); animation-delay: ${delay+200}ms`);
      svgRef.current!.appendChild(circle);
    }
    if (beginningLine) {
  const circle = rc.circle(localX1, localY1, 20, {
    stroke: color,
    strokeWidth: 2,
    fill: 'white',
    fillStyle: 'solid',
    roughness: 1,
  });
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  circle.setAttribute('stroke-dasharray', `${length}`);
  circle.setAttribute('stroke-dashoffset', `${length}`);
  circle.setAttribute('style', `animation: drawLine .5s alternate forwards cubic-bezier(0.42, 0, 0.58, 1); animation-delay: ${delay + 200}ms`);
  svgRef.current!.appendChild(circle); // append is fine here too
}
    
  }, [localX1, localY1, localX2, localY2, color, strokeWidth, roughness, endLine]);

  return (
    <svg
      ref={svgRef}
      width={mode === 'container' ? width : '100%'}
      height={mode === 'container' ? height : '100%'}
      style={{
        position,
        top: mode === 'container' ? 0 : 0,
        left: mode === 'container' ? 0 : 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible',
      }}
    />
  );
};



export default SketchLine;
