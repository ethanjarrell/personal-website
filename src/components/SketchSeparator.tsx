import React from 'react';
import './SketchSeparator.css';

interface SketchSeparatorProps {
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
}

const SketchSeparator: React.FC<SketchSeparatorProps> = ({
  width = '100%',
  height = '10%',
  margin = '2rem auto',
  color = '#5dade2',
}) => {
  return (
    <div
      className="sketch-separator"
      style={{ width, height, margin, borderColor: color }}
    />
  );
};

export default SketchSeparator;
