import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}

export function useSketchLineFromRef(
  ref: RefObject<HTMLElement>,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  offset: { x?: number; y?: number } = {}
): LineProps | null {
  
  const [line, setLine] = useState<LineProps | null>(null);

  useEffect(() => {
     if (!ref.current) return;
    const box = ref.current?.getBoundingClientRect();

    if (box) {
      const { x, y, width, height } = box;

      if (direction === 'horizontal') {
        setLine({
          x1: x,
          y1: y + height / 2 + (offset.y ?? 0),
          x2: x + width,
          y2: y + height / 2 + (offset.y ?? 0),
        });
      } else {
        setLine({
          x1: x + width / 2 + (offset.x ?? 0),
          y1: y,
          x2: x + width / 2 + (offset.x ?? 0),
          y2: y + height,
        });
      }
    }
  }, [ref, direction, offset.x, offset.y]);

  return line;
}
