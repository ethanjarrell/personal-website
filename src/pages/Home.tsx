import React, { useRef, useState, useEffect} from 'react';
import logo1 from '../assets/logo1.svg';
import './Home.css';
import SketchLine from './sketchLine';
import { useNavigate } from 'react-router-dom';

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  endLine?: boolean;
  label?: string;
  labelAlignment?: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const Home = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLImageElement>(null);
  const [lines, setLines] = useState<Array<LineProps>>([]);
  const [dropdownOneLines, setDropdownOneLines] = useState<Array<LineProps>>([]);
  const [dropdownTwoLines, setDropdownTwoLines] = useState<Array<LineProps>>([]);
  const [dropdownThreeLines, setDropdownThreeLines] = useState<Array<LineProps>>([]);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showAboutMeDropdown, setShowAboutMeDropdown] = useState(false);
  const [showYoutubeDropdown, setShowYoutubeDropdown] = useState(false);
  const projectLabelRef = useRef<HTMLDivElement>(null);
  const aboutMeLabelRef = useRef<HTMLDivElement>(null);
  const youtubeLabelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectLabelBox, setProjectLabelBox] = useState<DOMRect | null>(null);
  const [aboutMeLabelBox, setAboutMeLabelBox] = useState<DOMRect | null>(null);
  const [youtubeLabelBox, setYoutubeLabelBox] = useState<DOMRect | null>(null);

  const handleProjectsClick = () => {
    const box = projectLabelRef.current?.getBoundingClientRect();
    if (box) {
      setShowProjectDropdown(prev => !prev);
      setProjectLabelBox(box);
    }
  };

  const handleAboutMeClick = () => {
    const box = aboutMeLabelRef.current?.getBoundingClientRect();
    if (box) {
      setShowAboutMeDropdown(prev => !prev);
      setAboutMeLabelBox(box);
    }
  };

  const handleYoutubeClick = () => {
    const box = youtubeLabelRef.current?.getBoundingClientRect();
    if (box) {
      setShowYoutubeDropdown(prev => !prev);
      setYoutubeLabelBox(box);
    }
  };

  useEffect(() => {
    
    const calculateLines = () => {
      const containerBox = containerRef.current?.getBoundingClientRect();
      const logoBox = logoRef.current?.getBoundingClientRect();
  
      if (containerBox && logoBox) {
        const startX = logoBox.left + logoBox.width / 2;
        const startY = logoBox.top + containerBox.height * 0.02;
        const endY = containerBox.height * 0.2;
        const logoCenterX = logoBox.left + logoBox.width / 2 - containerBox.left;
        const logoCenterY = logoBox.top + logoBox.height / 2 - containerBox.top;
        setLines([
          { 
            x1: startX, 
            y1: startY, 
            x2: startX, 
            y2: endY, 
            color: '#5dade2  ',
            endLine: false
           },
          { 
            x1: startX, 
            y1: endY, 
            x2: startX + containerBox.width * 0.2, 
            y2: endY, 
            color: '#5dade2 ',
            endLine: false
          },
          { 
            x1: startX + containerBox.width * 0.2, 
            y1: endY, 
            x2: startX + containerBox.width * 0.2, 
            y2: containerBox.height * 0.4, 
            color: '#5dade2 ',
            endLine: false
          },
          { 
            x1: startX + containerBox.width * 0.2, 
            y1: containerBox.height * 0.4,
            x2: startX + containerBox.width * 0.25, 
            y2: containerBox.height * 0.4, 
            color: '#5dade2',
            endLine: true,
            label: 'About Me',
            labelAlignment: 'right',
            onClick: () => handleAboutMeClick(),
            ref: aboutMeLabelRef,
          },
          {
            x1: logoCenterX - containerBox.width * 0.075,
            y1: logoCenterY,
            x2: logoCenterX - containerBox.width * 0.175,
            y2: logoCenterY,
            color: '#7dcea0',
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.175,
            y1: logoCenterY,
            x2: logoCenterX - containerBox.width * 0.175,
            y2: endY - containerBox.height * 0.08,
            color: '#7dcea0',
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.175,
            y1: endY - containerBox.height * 0.08,
            x2: logoCenterX - containerBox.width * 0.250,
            y2: endY - containerBox.height * 0.08,
            color: '#7dcea0',
            endLine: true,
            label: 'Projects/Portfolio',
            labelAlignment: 'left',
            onClick: () => handleProjectsClick(),
            ref: projectLabelRef,
          },
          {
            x1: logoCenterX - containerBox.width * 0.03,
            y1: logoCenterY + containerBox.height * 0.04,
            x2: logoCenterX - containerBox.width * 0.03,
            y2: logoCenterY + containerBox.height * 0.2,
            color: '#7dcea0',
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.03,
            y1: logoCenterY + containerBox.height * 0.2,
            x2: logoCenterX + containerBox.width * 0.2,
            y2: logoCenterY + containerBox.height * 0.2,
            color: '#7dcea0',
            endLine: true,
            label: 'Youtube',
            labelAlignment: 'bottom',
            onClick: () => handleYoutubeClick(),
            ref: youtubeLabelRef,
          }
        ]);
      }
    };
  
    calculateLines(); // run on first mount
    window.addEventListener('resize', calculateLines);
    console.log(window.innerWidth);
    return () => window.removeEventListener('resize', calculateLines);
  }, []);

  useEffect(() => {
    const updateDropdownLines = () => {
      if (!showAboutMeDropdown || !aboutMeLabelRef.current || !containerRef.current) return;
    
      const box = aboutMeLabelRef.current.getBoundingClientRect(); // 🔁 Fresh box
      setProjectLabelBox(box); // Optional, if you want to keep it in state
    
      const containerBox = containerRef.current.getBoundingClientRect();
      const x = box.right + containerBox.width * 0.005;
      const y = box.top + box.height / 2;
    
      const dropdownLines: LineProps[] = [
        {
          x1: x,
          y1: y,
          x2: x + containerBox.width * 0.03,
          y2: y,
          color: '#5dade2',
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: '#5dade2',
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: '#5dade2',
          endLine: true,
          label: 'Bio',
          labelAlignment: 'left',
          onClick: () => navigate('/about'),
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.15,
          color: '#5dade2',
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.15,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.15,
          color: '#5dade2',
          endLine: true,
          label: 'Download Resume',
          labelAlignment: 'left',
          onClick: () => navigate('/resumedownload'),
        },
      ];
    
      setDropdownTwoLines(dropdownLines);
      window.addEventListener('resize', updateDropdownLines);
      return () => window.removeEventListener('resize', updateDropdownLines);
    };
    
  
    updateDropdownLines();
    window.addEventListener('resize', updateDropdownLines);
  
    return () => {
      window.removeEventListener('resize', updateDropdownLines);
    };
  }, [showAboutMeDropdown, aboutMeLabelBox]);

  useEffect(() => {
    const updateDropdownLines = () => {
      if (!showProjectDropdown || !projectLabelRef.current || !containerRef.current) return;
    
      const box = projectLabelRef.current.getBoundingClientRect(); // 🔁 Fresh box
      setProjectLabelBox(box); // Optional, if you want to keep it in state
    
      const containerBox = containerRef.current.getBoundingClientRect();
      const x = box.left - containerBox.width * 0.005;
      const y = box.top + box.height / 2;
    
      const dropdownLines: LineProps[] = [
        {
          x1: x,
          y1: y,
          x2: x - containerBox.width * 0.03,
          y2: y,
          color: '#7dcea0',
        },
        {
          x1: x - containerBox.width * 0.03,
          y1: y,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: '#7dcea0',
        },
        {
          x1: x - containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: '#7dcea0',
          endLine: true,
          label: 'Virus Simulation',
          labelAlignment: 'right',
          onClick: () => navigate('/virus'),
        },
      ];
    
      setDropdownOneLines(dropdownLines);
      window.addEventListener('resize', updateDropdownLines);
      return () => window.removeEventListener('resize', updateDropdownLines);
    };
    
  
    updateDropdownLines();
    window.addEventListener('resize', updateDropdownLines);
  
    return () => {
      window.removeEventListener('resize', updateDropdownLines);
    };
  }, [showProjectDropdown]);
  
  
  return (
    <div ref={containerRef} className="mainbody">
      <img ref={logoRef} className="logo" src={logo1} alt="Logo" />

      {lines.map((line, i) => (
        <React.Fragment key={i}>
          <SketchLine {...line} />
          {line.endLine && line.label && (
            <div
              className="menu-label"
              style={{
                position: 'absolute',
                left: line.labelAlignment == "right" ? line.x2 + 30 : line.labelAlignment == "left" ? line.x2 - 250 : line.x2 - 30,
                top: line.labelAlignment == "bottom" ? line.y2 + 20 : line.y2 - 15,
                color: line.color,
                fontSize: '1.5rem',
                fontFamily: 'Good Brush, sans-serif',
                cursor: 'pointer',
              }}
              onClick={line.onClick}
              ref={line.ref}
            >
              {line.label}
            </div>
          )}
        </React.Fragment>
      ))}
{dropdownOneLines.map((line, i) => (
  <React.Fragment key={`dropdown-line-${i}`}>
    <SketchLine {...line} />
    {line.endLine && line.label && (
      <div
        className="menu-label"
        style={{
          position: 'absolute',
          left:
            line.labelAlignment === 'right'
              ? line.x2 + 30
              : line.labelAlignment === 'left'
              ? line.x2 - 250
              : line.x2 - 30,
          top: line.labelAlignment === 'bottom' ? line.y2 + 20 : line.y2 - 15,
          color: line.color,
          fontSize: '1.5rem',
          fontFamily: 'Good Brush, sans-serif',
          cursor: 'pointer',
        }}
        onClick={line.onClick}
        ref={line.ref}
      >
        {line.label}
      </div>
    )}
  </React.Fragment>
))}

{dropdownTwoLines.map((line, i) => (
  <React.Fragment key={`dropdown-line-${i}`}>
    <SketchLine {...line} />
    {line.endLine && line.label && (
      <div
        className="menu-label"
        style={{
          position: 'absolute',
          left:
            line.labelAlignment === 'right'
              ? line.x2 + 30
              : line.labelAlignment === 'left'
              ? line.x2 - 250
              : line.x2 - 30,
          top: line.labelAlignment === 'bottom' ? line.y2 + 20 : line.y2 - 15,
          color: line.color,
          fontSize: '1.5rem',
          fontFamily: 'Good Brush, sans-serif',
          cursor: 'pointer',
        }}
        onClick={line.onClick}
        ref={line.ref}
      >
        {line.label}
      </div>
    )}
  </React.Fragment>
))}

    </div>
  );
};


export default Home;