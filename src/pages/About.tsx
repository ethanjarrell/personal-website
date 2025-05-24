import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import profileImg from '../assets/profile.png';
import logoLong from '../assets/logoLong.svg';
import SketchLine from '../pages/sketchLine';
import './About.css';
import { useSketchLineFromRef } from '../hooks/useSketchLineFromRef';


const About: React.FC = () => {
  const blue = '#5dade2';
  const green = '#7dcea0';
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const horizontalLineContainerRef1 = useRef<HTMLDivElement>(null);
  const horizontalLineContainerRef2 = useRef<HTMLDivElement>(null);
  const verticalLineContainerRef1 = useRef<HTMLDivElement>(null);
  const horizontalLine1 = useSketchLineFromRef(horizontalLineContainerRef1, 'horizontal');
  const horizontalLine2 = useSketchLineFromRef(horizontalLineContainerRef2, 'horizontal');
  const verticalLine1 = useSketchLineFromRef(verticalLineContainerRef1, 'vertical');
   
function getRandomFloat(min = 0.3, max = 3.5): number {
  return Math.random() * (max - min) + min;
}

  return (
    <div className="about-page">
      <Header currentPath={['About']} />
      <div className="about-container">
        <div className="about-sidebar">
          <img src={profileImg} alt="Ethan Jarrell" className="profile-img bio-animated" style={{ animationDelay: "300ms" }}/>
          <div className="horizontal-line-container1" ref={horizontalLineContainerRef2}>
            {horizontalLine2 && <SketchLine {...horizontalLine2} color={blue} position='relative' mode="container" delay={900} beginningLine={true} drawSpeed={getRandomFloat()}/>}      
          </div>
          <div className="contact-info">
            <h3 className="bio-animated" style={{ animationDelay: "400ms" }}>Contact</h3>
            <div className="project-block2 bio-animated" style={{ animationDelay: "300ms" }}>
            <p className="bio-animated" style={{ animationDelay: "600ms" }} ><a href="mailto:ethan.jarrell@gmail.com">ethan.jarrell@gmail.com</a></p>
            <p className="bio-animated" style={{ animationDelay: "800ms" }} ><a href="https://www.linkedin.com/in/ethanjarrell">LinkedIn</a></p>
            <p className="bio-animated" style={{ animationDelay: "1000ms" }}><a href="https://github.com/ethanjarrell">GitHub</a></p>
            <p className="bio-animated" style={{ animationDelay: "1200ms" }}><a href="https://medium.com/@ethan.jarrell">Blog</a></p>
            </div>
          </div>
          <div className="horizontal-line-container1" ref={horizontalLineContainerRef2}>
            {horizontalLine2 && <SketchLine {...horizontalLine2} color={blue} position='relative' mode="container" delay={900} beginningLine={true} drawSpeed={getRandomFloat()}/>}      
          </div>
          <div className="skills">
            <h3 className="bio-animated" style={{ animationDelay: "1600ms" }}>Skills</h3>
            <div className="project-block2 bio-animated" style={{ animationDelay: "900ms" }}>
            <ul>
              <li className="bio-animated" style={{ animationDelay: "1800ms" }}>Node.js, React, Angular</li>
              <li className="bio-animated" style={{ animationDelay: "1900ms" }}>SQL & Database Optimization</li>
              <li className="bio-animated" style={{ animationDelay: "2100ms" }}>Creative Problem Solving</li>
              <li className="bio-animated" style={{ animationDelay: "2300ms" }}>Technical Writing & Teaching</li>
              <li className="bio-animated" style={{ animationDelay: "2400ms" }}>Data Visualization & Processing</li>
            </ul>
            </div>
          </div>
        </div>
        <div className="vertical-line-container1" ref={verticalLineContainerRef1}>
          {verticalLine1 && <SketchLine {...verticalLine1} color={blue} position='relative' mode="container" delay={300}/>}
        </div>
        <div className="about-main" ref={mainRef}>
          <h1 className="main-title" style={{ animationDelay: `100ms` }}><img src={logoLong} alt="Ethan Jarrell" className="name-img bio-animated"/></h1>
          <a href="/resume.pdf" download="Ethan_Jarrell_Resume.pdf" className="download-link bio-animated" style={{ animationDelay: `1000ms` }}>
            Download Resume
          </a>
          <div className="horizontal-line-container3" ref={horizontalLineContainerRef1}>
            {horizontalLine1 && <SketchLine {...horizontalLine1} color={blue} position='relative' mode="container" delay={500} endLine={true} drawSpeed={getRandomFloat()}/>}      
          </div>
          <h2 className="sub-title bio-animated" style={{ animationDelay: "1400ms" }} >Software Engineer • Designer • Creative Problem Solver</h2>
          
          <blockquote className="personal-quote bio-animated" style={{ animationDelay: "1600ms" }} >
            "Whether it's design or code, creativity is simply solving problems with elegance."
          </blockquote>
          
          <section className="bio-section">
            <div className="project-block bio-animated" style={{ animationDelay: "2300ms" }}>
              <p className="bio-animated" style={{ animationDelay: "2800ms" }}>
                Ethan Jarrell is a software engineer with a deep appreciation for creativity, continuous learning, and thoughtful exploration of complex ideas. Initially drawn to art, Ethan began his journey aiming for a career in animation before shifting to graphic design, crafting visually engaging experiences including specialized sports jerseys for events. Seeking new challenges and inspired by his passion for problem-solving, Ethan pivoted toward software engineering, enrolling in an intensive coding bootcamp where he discovered a love for programming that resonated with his artistic background. Over his 7+ years in software engineering, Ethan has become adept in full-stack JavaScript development, particularly excelling in technologies like Node.js, React, Angular, and Python. His professional experiences at Avalara, Genesys, and AT&T highlight his strengths in performance optimization, interactive UI design, and creating automated solutions to complex problems. Ethan is also passionate about mentoring and sharing knowledge, having authored widely-read technical articles and mentored new developers through bootcamp workshops. Beyond his technical pursuits, Ethan remains deeply committed to intellectual curiosity, aiming to read 100 books this year, with favorite titles spanning narrative nonfiction, philosophy, history, and thoughtful explorations of faith, doubt, and compassion. Always eager to integrate creativity with technical expertise, Ethan continues to engage in personal projects, including simulations driven by real-world data and experiments with machine learning. Whether building impactful software solutions or diving into a compelling book, Ethan’s goal remains consistent: to approach challenges thoughtfully, creatively, and with genuine enthusiasm for learning.
              </p>
            </div>
          </section>

        </div>
      </div>
      </div>
      )};
export default About;
