import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo2.svg'; // Your profile image path here
import SketchSeparator from './SketchSeparator';

const Header: React.FC<{ currentPath: string[] }> = ({ currentPath }) => {
  return (
    <header className="header-container">
      <Link to="/" className="logoImgLink"><img src={logo} alt="Ethan Jarrell" className="logoImg"/></Link>
      <nav className="breadcrumb">
        {currentPath.map((path, idx) => (
          <span key={idx}>
            {path}
            {idx < currentPath.length - 1 && <span className="breadcrumb-separator"> → </span>}
          </span>
        ))}
      </nav>
      <SketchSeparator width="95%" color="#7dcea0" margin="1rem 0 0 0"/>
    </header>
  );
};

export default Header;
