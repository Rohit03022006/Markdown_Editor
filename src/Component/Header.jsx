import React from "react";
import { FaMarkdown, FaBook } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import './Header.css'
const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <FaMarkdown className="logo-icon" />
          <h1 className="logo-text">Markdown Previewer</h1>
        </div>
        <nav className="header-nav">
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            aria-label="Markdown Documentation"
          >
            <FaBook className="nav-icon" />
            <span className="nav-text">Documentation</span>
          </a>
          <a
            href="https://github.com/Rohit03022006"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            aria-label="View on GitHub"
          >
            <FiGithub className="nav-icon" />
            <span className="nav-text">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;