import React, { useState } from "react";
import { 
  FaGithub, 
  FaHeart, 
  FaAtom,
  FaReact,
  FaCode
} from 'react-icons/fa';
import { SiMarkdown, SiTailwindcss } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHoveringReact, setIsHoveringReact] = useState(false);

  return (
    <footer className="w-full border-t border-slate-700/50 bg-slate-900 text-slate-400 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3 text-sm bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
          <span className="text-slate-300">Built with</span>
          <FaHeart className="w-4 h-4 text-rose-500 fill-rose-500/20 animate-pulse" />
          <span>using</span>
          <div 
            className="relative flex items-center gap-2 cursor-help"
            onMouseEnter={() => setIsHoveringReact(true)}
            onMouseLeave={() => setIsHoveringReact(false)}
          >
            <FaReact className={`w-4 h-4 text-cyan-400 ${isHoveringReact ? 'animate-spin' : ''}`} />
            <span className={isHoveringReact ? 'text-cyan-300' : 'text-slate-300'}>React</span>
          </div>
          <span>&</span>
          <SiTailwindcss className="w-4 h-4 text-cyan-500" />
          <SiMarkdown className="w-4 h-4 text-blue-500" />
        </div>

        <div className="text-sm font-medium text-slate-300">
          &copy; {currentYear} Markdown Previewer • All rights reserved
        </div>

        <a
          href="https://github.com/Rohit03022006"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm">View Source</span>
          <FaCode className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;