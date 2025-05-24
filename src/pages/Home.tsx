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
  label?: React.ReactNode;
  labelAlignment?: string;
  onClick?: () => void;
  delay?: number;
  ref?: React.RefObject<HTMLDivElement | null>;
  drawSpeed?: number;
  lineSpacing?: number;
}

const Home = () => {
  let currentDelay = useRef(0);
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
  const green = '#7dcea0';
  const blue = '#5dade2';
  const [labelVisibility, setLabelVisibility] = useState<boolean[]>([]);
  const [dropdownOneLabelVisibility, setDropdownOneLabelVisibility] = useState<boolean[]>([]);
  const [dropdownTwoLabelVisibility, setDropdownTwoLabelVisibility] = useState<boolean[]>([]);

function getLetterFloat(min = 5, max = 80): number {
  return Math.random() * (max - min) + min;
}

  const aboutAnimated = "About_Me".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

const portfolioAnimated = "Projects/Portfolio".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

const youtubeAnimated = "Youtube".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

const bioAnimated = "Bio".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

const donwloadResumeAnimated = "Download_Resume".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

const virusSimulationAnimated = "Virus_Simulation".split("").map((char, i) => (
  <span key={i} className="letter" style={{ animationDelay: `${i * getLetterFloat()}ms` }}>
    {char}
  </span>
));

function getRandomFloat(min = 0.05, max = 0.2): number {
  return Math.random() * (max - min) + min;
}

function getDelayFloat(min = 0.05, max = 0.2): number {
  return Math.random() * (max - min) + min;
}

  useEffect(() => {
  if (lines.length === 0) return;

  const timeouts = lines.map((line, i) =>
    setTimeout(() => {
      setLabelVisibility(prev => {
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
    }, (line.delay ?? 0) + (line.delay ?? 0) + 300)
  );

  return () => timeouts.forEach(clearTimeout);
}, [lines]);

useEffect(() => {
  if (dropdownOneLines.length === 0) return;

  const timeouts = dropdownOneLines.map((line, i) =>
    setTimeout(() => {
      setDropdownOneLabelVisibility(prev => {
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
    }, (line.delay ?? 0) + 300)
  );

  return () => timeouts.forEach(clearTimeout);
}, [dropdownOneLines]);

useEffect(() => {
  if (dropdownTwoLines.length === 0) return;

  const timeouts = dropdownTwoLines.map((line, i) =>
    setTimeout(() => {
      setDropdownTwoLabelVisibility(prev => {
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
    }, (line.delay ?? 0) + 300)
  );

  return () => timeouts.forEach(clearTimeout);
}, [dropdownTwoLines]);

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
        currentDelay.current = 0;
        const startX = logoBox.left + logoBox.width / 2;
        const startY = logoBox.top + containerBox.height * 0.02;
        const endY = containerBox.height * 0.2;
        const logoCenterX = logoBox.left + logoBox.width / 2 - containerBox.left;
        const logoCenterY = logoBox.top + logoBox.height / 2 - containerBox.top;
        const steps = [
          { 
            x1: startX, 
            y1: startY, 
            x2: startX, 
            y2: endY, 
            color: blue,
            endLine: false
           },
          { 
            x1: startX, 
            y1: endY, 
            x2: startX + containerBox.width * 0.2, 
            y2: endY, 
            color: blue,
            endLine: false
          },
          { 
            x1: startX + containerBox.width * 0.2, 
            y1: endY, 
            x2: startX + containerBox.width * 0.2, 
            y2: containerBox.height * 0.4, 
            color: blue,
            endLine: false
          },
          { 
            x1: startX + containerBox.width * 0.2, 
            y1: containerBox.height * 0.4,
            x2: startX + containerBox.width * 0.25, 
            y2: containerBox.height * 0.4, 
            color: blue,
            endLine: true,
            label: aboutAnimated,
            labelAlignment: 'right',
            onClick: () => handleAboutMeClick(),
            ref: aboutMeLabelRef
          },
          {
            x1: logoCenterX - containerBox.width * 0.075,
            y1: logoCenterY,
            x2: logoCenterX - containerBox.width * 0.175,
            y2: logoCenterY,
            color: green,
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.175,
            y1: logoCenterY,
            x2: logoCenterX - containerBox.width * 0.175,
            y2: endY - containerBox.height * 0.08,
            color: green,
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.175,
            y1: endY - containerBox.height * 0.08,
            x2: logoCenterX - containerBox.width * 0.250,
            y2: endY - containerBox.height * 0.08,
            color: green,
            endLine: true,
            label: portfolioAnimated,
            labelAlignment: 'left',
            onClick: () => handleProjectsClick(),
            ref: projectLabelRef
          },
          {
            x1: logoCenterX - containerBox.width * 0.03,
            y1: logoCenterY + containerBox.height * 0.04,
            x2: logoCenterX - containerBox.width * 0.03,
            y2: logoCenterY + containerBox.height * 0.2,
            color: green,
            endLine: false
          },
          {
            x1: logoCenterX - containerBox.width * 0.03,
            y1: logoCenterY + containerBox.height * 0.2,
            x2: logoCenterX + containerBox.width * 0.2,
            y2: logoCenterY + containerBox.height * 0.2,
            color: green,
            endLine: true,
            label: youtubeAnimated,
            labelAlignment: 'bottom',
            onClick: () => handleYoutubeClick(),
            ref: youtubeLabelRef
          }
        ];
        steps.forEach(step => {
          const drawSpeed = getRandomFloat(); 
          const delay = getDelayFloat();
          currentDelay.current += (delay + drawSpeed) * 1000; 
          lines.push({
            ...step,
            delay: currentDelay.current,
            drawSpeed,
          });
        });
        setLines(lines);
      }
    };
  
    calculateLines(); // run on first mount
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
          color: blue,
          delay: 100,
          lineSpacing: 0,
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: blue,
          delay: 300,
          lineSpacing: 0,
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: blue,
          endLine: true,
          label: bioAnimated,
          labelAlignment: 'right',
          onClick: () => navigate('/about'),
          delay: 500,
          lineSpacing: 18,
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.15,
          color: blue,
          delay: 700,
          lineSpacing: 0,
        },
        {
          x1: x + containerBox.width * 0.03,
          y1: y + containerBox.height * 0.15,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.15,
          color: blue,
          endLine: true,
          label: donwloadResumeAnimated,
          labelAlignment: 'right',
          onClick: () => window.open('/resume.pdf', '_blank'),
          delay: 900,
          lineSpacing: 15,
        },
      ];
    
      setDropdownTwoLines(dropdownLines);
    };
    
  
    updateDropdownLines();
  
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
          color: green,
          delay: 100,
        },
        {
          x1: x - containerBox.width * 0.03,
          y1: y,
          x2: x - containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: green,
          delay: 300,
        },
        {
          x1: x - containerBox.width * 0.03,
          y1: y + containerBox.height * 0.1,
          x2: x + containerBox.width * 0.03,
          y2: y + containerBox.height * 0.1,
          color: green,
          endLine: true,
          label: virusSimulationAnimated,
          labelAlignment: 'right',
          onClick: () => navigate('/virus'),
          delay: 500,
        },
      ];
    
      setDropdownOneLines(dropdownLines);
    };
    
  
    updateDropdownLines();
  
  }, [showProjectDropdown]);
  
  
  return (
    <div ref={containerRef} className="mainbody">
      <img ref={logoRef} className="logo" src={logo1} alt="Logo" />

      {lines.map((line, i) => (
        <React.Fragment key={i}>
          <SketchLine {...line} mode="screen"/>
          {line.endLine && line.label && labelVisibility[i] && (
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
    <SketchLine {...line} mode="screen"/>
    {line.endLine && line.label && dropdownOneLabelVisibility[i] && (
      <div
        className="menu-label"
        style={{
          position: 'absolute',
          left:
            line.labelAlignment === 'right'
              ? line.x2 + 40 
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
    <SketchLine {...line} mode="screen"/>
    {line.endLine && line.label && dropdownTwoLabelVisibility[i] && (
      <div
        className="menu-label"
        style={{
          position: 'absolute',
          left:
            line.labelAlignment === 'right'
              ? line.x2 - line.label.toString().length 
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