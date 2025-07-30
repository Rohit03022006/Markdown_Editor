import React from "react";
import { FaHeart, FaReact, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section made-with">
          Made with <FaHeart className="heart-icon" /> using{" "}
          <FaReact className="react-icon" />
        </div>
        
        <div className="footer-section copyright">
          &copy; {currentYear} Markdown Previewer
        </div>
        
        <div className="footer-section github-link-container">
          <a
            href="https://github.com/Rohit03022006"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View source code on GitHub"
          >
            <FaGithub className="github-icon" />
            <span className="github-text">Source Code</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;