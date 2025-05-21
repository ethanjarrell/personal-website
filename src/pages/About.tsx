import React from 'react';
import './About.css';
import Header from '../components/Header';
import profileImg from '../assets/profile.png'; // Your profile image path here
import SketchSeparator from '../components/sketchSeparator';

const About: React.FC = () => {
  return (
    <div className="about-page">
    <Header currentPath={['About']} />
    <div className="about-container">
      <div className="about-sidebar">
        <img src={profileImg} alt="Ethan Jarrell" className="profile-img"/>
        <div className="contact-info">
          <h3>Contact</h3>
          <p>Email: youremail@example.com</p>
          <p><a href="https://linkedin.com">LinkedIn</a></p>
          <p><a href="https://github.com">GitHub</a></p>
          <p><a href="https://yourblog.com">Blog</a></p>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <ul>
            <li>Node.js, React, Angular</li>
            <li>SQL & Database Optimization</li>
            <li>Creative Problem Solving</li>
            <li>Technical Writing & Teaching</li>
            <li>Data Visualization & Processing</li>
          </ul>
        </div>
      </div>
      <SketchSeparator width="0%" height="80%" color="#7dcea0" margin="2rem auto" />
      <div className="about-main">
        <h1 className="main-title">Ethan Jarrell</h1>
        <h2 className="sub-title">Software Engineer • Designer • Creative Problem Solver</h2>

        <blockquote className="personal-quote">
          "Whether it's design or code, creativity is simply solving problems with elegance."
        </blockquote>

        <section className="bio-section">
          <h3>My Journey</h3>
          <p>
            Ever since I could hold a pencil, art has been my passion. I began with figure drawing, dreaming of becoming an animator for movies or video games. But somewhere along the way, reality nudged me onto a different path—graphic design.
          </p>
          <p>
            <strong>Designing jerseys for special events like "Star Wars night"</strong> at baseball games was thrilling at first, but after five years, I felt stuck. I recall telling a coworker, <em>"If I don’t make a change, I'll be doing this same job for the next 15 years."</em> Their reply—<em>"Isn’t that type of job security amazing?"</em>—was my wake-up call. I knew then I had to take the leap.
          </p>
        </section>
        <SketchSeparator width="80%" color="#7dcea0" margin="2rem auto" />
        <section className="bio-section">
          <h3>Learning & Growth</h3>
          <p>
            I quit, dove into a 12-week coding bootcamp, and discovered something unexpected: <strong>programming was just creative problem-solving with new tools.</strong> Clients used to come with jersey designs—now they brought me bugs and features to build. I loved finding elegant solutions.
          </p>
          <p>
            My bootcamp journey sparked another passion: teaching. Blogging about complex coding concepts reinforced my own learning and inadvertently led to my first engineering job.
          </p>
        </section>
        <SketchSeparator width="80%" color="#7dcea0" margin="2rem auto" />
        <section className="bio-section">
          <h3>Projects & Passions</h3>
          <p>
            At <strong>AT&T</strong> and <strong>Genesys</strong>, I mastered new technologies fearlessly—from Perl and vanilla JavaScript to Angular. At <strong>Avalara</strong>, I focused heavily on backend development, SQL optimizations, and Node.js.
          </p>
          <ul>
            <li>Built a zombie-outbreak simulator enjoyed by local students.</li>
            <li>Created a custom LLM engine analyzing complex textual data.</li>
            <li>Regularly write blogs and technical articles for Hacker Noon.</li>
          </ul>
          <p>
            When not coding, you'll find me buried in books—my goal this year is to finish 100 books, favorites include <em>Just Mercy</em>, <em>Nothing to Envy</em>, and <em>The Better Angels of our Nature</em>.
          </p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default About;
