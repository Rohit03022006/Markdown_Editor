import React from 'react';
import { 
  FaGithub, 
  FaArrowRight, 
  FaBookOpen,
  FaLightbulb,
  FaCode,
  FaEye,
  FaDownload,
  FaRocket,
  FaMagic
} from 'react-icons/fa';
import { 
  SiMarkdown,
  SiReact,
  SiTailwindcss,
  SiJavascript 
} from 'react-icons/si';
import { FiZap, FiLayers, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const scrollToEditor = () => {
    document.querySelector('.panels-wrapper')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <FiZap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Preview",
      desc: "Experience zero-latency rendering. Your preview updates instantly as you type, formatted perfectly."
    },
    {
      icon: <FaGithub className="w-6 h-6 text-slate-700" />,
      title: "GFM Supported",
      desc: "Full compatibility with GitHub Flavored Markdown including tables, task lists, and code highlighting."
    },
    {
      icon: <FiLayers className="w-6 h-6 text-cyan-500" />,
      title: "Export Ready",
      desc: "One-click export to clean, semantic HTML files ready for your blog, documentation, or website."
    }
  ];

  return (
    <div className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[-10%] w-[35rem] h-[35rem] bg-purple-400/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm text-slate-700 text-sm font-medium mb-8 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <SiReact className="w-4 h-4 text-cyan-500" />
              <SiTailwindcss className="w-4 h-4 text-cyan-600" />
              <SiJavascript className="w-4 h-4 text-yellow-500" />
            </div>
            <span>Built with Modern Stack</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            Master Markdown <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
              In Real-Time
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The professional browser-based editor for developers. Write, preview, and export GitHub Flavored Markdown instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={scrollToEditor}
              className="group px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:-translate-y-1 flex items-center gap-3"
            >
              <FaRocket className="w-5 h-5" />
              <span>Start Writing Now</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://www.markdownguide.org/cheat-sheet/" 
              target="_blank" 
              rel="noreferrer"
              className="group px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
            >
              <FaBookOpen className="w-5 h-5" />
              <span>View Cheat Sheet</span>
              <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;