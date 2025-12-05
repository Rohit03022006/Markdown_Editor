import React, { useState, useEffect } from "react";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaBars, 
  FaTimes, 
  FaBookOpen 
} from 'react-icons/fa';
import { SiMarkdown } from 'react-icons/si';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-slate-900/90 backdrop-blur-md border-slate-700/50 py-3 shadow-lg shadow-cyan-900/5" 
            : "bg-slate-900 border-slate-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
         
            <div 
              className="flex items-center gap-3 group cursor-pointer" 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-slate-700 group-hover:border-cyan-500/50 transition-all duration-300">
                <SiMarkdown className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-100 tracking-tight">
                Markdown Previewer
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              <a 
                href="https://www.markdownguide.org/basic-syntax/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <FaBookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Documentation</span>
              </a>
              <a 
                href="https://github.com/Rohit03022006" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
                <FaExternalLinkAlt className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-slate-950/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6">
          <a 
            href="https://www.markdownguide.org/basic-syntax/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-4 text-slate-300 text-lg font-medium p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaBookOpen className="w-6 h-6 text-cyan-400" />
            Documentation
          </a>
          <a 
            href="https://github.com/Rohit03022006" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-4 text-slate-300 text-lg font-medium p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaGithub className="w-6 h-6 text-cyan-400" />
            GitHub
            <FaExternalLinkAlt className="w-4 h-4 opacity-50 ml-auto" />
          </a>
        </div>
      )}
    </>
  );
};

export default Header;