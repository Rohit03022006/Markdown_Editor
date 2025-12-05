import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { 
  FaEdit, 
  FaEye, 
  FaCopy, 
  FaCheck, 
  FaFileDownload,
  FaEyeSlash
} from 'react-icons/fa';
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";

const MarkdownPreviewer = () => {
  const defaultMarkdown = `# Markdown Full Example

## 1. Headers

# H1 Header
## H2 Header
### H3 Header

---

## 2. Text Formatting

**Bold text** *Italic text* ***Bold and italic*** ~~Strikethrough~~ 

---

## 3. Lists

### Unordered List
- Item 1
  - Subitem 1
- Item 2

### Ordered List
1. First
2. Second
   1. Sub-second
3. Third

---

## 4. Links & Images

[OpenAI Website](https://www.openai.com) 
![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png)

---

## 5. Code

### Inline Code
Use \`printf()\` to display output.

### Code Block

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
greet("World")
\`\`\`

---

## 6. Blockquotes

> This is a blockquote. 
> It can span multiple lines.

---

## 7. Tables

| Name     | Age | Profession  |
|----------|-----|-------------|
| Alice    | 30  | Engineer    |
| Bob      | 25  | Designer    |
| Charlie  | 28  | Developer   |

---

## 8. Task Lists

- [x] Learn Markdown
- [ ] Practice regularly
- [ ] Create a project using it
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const exportAsHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Markdown</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; background: #f8fafc; }
          h1, h2, h3 { color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
          pre { background: #1e293b; color: #e2e8f0; padding: 1.25em; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
          code { background: #f1f5f9; padding: 0.2em 0.4em; border-radius: 4px; font-family: 'Fira Code', monospace; }
          blockquote { border-left: 4px solid #06b6d4; background: rgba(6, 182, 212, 0.1); padding: 1em; margin: 1.5em 0; color: #475569; border-radius: 0 8px 8px 0; }
          table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; }
          th, td { border: 1px solid #cbd5e1; padding: 0.75em; text-align: left; }
          th { background-color: #f1f5f9; font-weight: 600; }
          img { max-width: 100%; border-radius: 8px; }
        </style>
      </head>
      <body>
        ${marked(markdown)}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <style>{`
        :root {
          --editor-bg: #ffffff;
          --editor-text: #333333;
          --editor-header: #f8fafc;
          --preview-bg: #1e293b;
          --preview-text: #f1f5f9;
          --preview-header: #0f172a;
          --accent-color: #06b6d4;
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
          --rounded-lg: 12px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }

        .panels-wrapper {
          display: flex;
          gap: 24px;
          margin: 0 24px 48px 24px;
          position: relative;
          align-items: stretch;
        }

        .editor-container, .preview-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: var(--rounded-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0,0,0,0.08);
          min-height: 600px;
        }

        .panel-header {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          height: 64px;
        }

        .editor-header { 
          background: var(--editor-header); 
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .preview-header { 
          background: var(--preview-header); 
          color: var(--preview-text); 
          border-bottom: 1px solid rgba(255,255,255,0.1); 
        }

        .panel-title { 
          font-size: 1.125rem; 
          font-weight: 600; 
          display: flex; 
          align-items: center; 
          gap: 10px; 
        }

        #editor {
          width: 100%; 
          flex-grow: 1; 
          padding: 24px; 
          border: none; 
          resize: none;
          font-family: "Fira Code", "SF Mono", Monaco, Consolas, monospace; 
          font-size: 16px; 
          line-height: 1.7;
          color: var(--editor-text); 
          background: var(--editor-bg);
        }
        
        #editor:focus { 
          outline: none; 
          box-shadow: inset 0 0 0 2px rgba(6, 182, 212, 0.1);
        }

        #preview {
          padding: 24px; 
          flex-grow: 1; 
          overflow-y: auto;
          color: var(--preview-text); 
          background: var(--preview-bg);
          font-size: 16px; 
          line-height: 1.7;
        }
        
        /* Markdown Styling */
        #preview h1 { 
          font-size: 2.25rem; 
          margin-bottom: 1.5rem; 
          padding-bottom: 0.5rem; 
          border-bottom: 2px solid #334155; 
          font-weight: 700; 
          color: #ffffff; 
        }
        
        #preview h2 { 
          font-size: 1.75rem; 
          margin-top: 2rem; 
          margin-bottom: 1rem; 
          padding-bottom: 0.5rem; 
          border-bottom: 1px solid #334155; 
          font-weight: 600; 
          color: #f8fafc; 
        }
        
        #preview h3 { 
          font-size: 1.5rem; 
          margin-top: 1.5rem; 
          margin-bottom: 0.75rem; 
          font-weight: 600; 
          color: #f1f5f9; 
        }
        
        #preview p { 
          margin-bottom: 1.25rem; 
          line-height: 1.8;
        }
        
        #preview a { 
          color: var(--accent-color); 
          text-decoration: none; 
          font-weight: 500;
          border-bottom: 1px dotted rgba(6, 182, 212, 0.3);
        }
        
        #preview a:hover { 
          color: #22d3ee; 
          border-bottom: 1px solid rgba(6, 182, 212, 0.5);
        }
        
        #preview code { 
          background: #0f172a; 
          color: #bae6fd; 
          padding: 0.2em 0.4em; 
          border-radius: 4px; 
          font-family: "Fira Code", monospace; 
          font-size: 0.9em; 
        }
        
        #preview pre { 
          background: #0f172a; 
          padding: 1.5em; 
          border-radius: 8px; 
          overflow-x: auto; 
          margin: 1.75rem 0; 
          border: 1px solid #334155;
        }
        
        #preview pre code { 
          background: transparent; 
          padding: 0; 
          color: #e2e8f0; 
        }
        
        #preview blockquote { 
          border-left: 4px solid var(--accent-color); 
          background: rgba(6, 182, 212, 0.1); 
          padding: 1.25em; 
          margin: 2em 0; 
          color: #cbd5e1; 
          border-radius: 0 12px 12px 0;
          font-style: italic;
        }
        
        #preview ul, #preview ol { 
          margin-bottom: 1.5rem; 
          padding-left: 2rem; 
        }
        
        #preview li { 
          margin-bottom: 0.5rem; 
          line-height: 1.7;
        }
        
        #preview img { 
          max-width: 100%; 
          margin: 1.5rem 0; 
          border-radius: 12px; 
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
        }
        
        #preview table { 
          border-collapse: collapse; 
          width: 100%; 
          margin: 2rem 0; 
          border-radius: 8px;
          overflow: hidden;
        }
        
        #preview th, #preview td { 
          border: 1px solid #475569; 
          padding: 1em; 
          text-align: left; 
        }
        
        #preview th { 
          background-color: #334155; 
          font-weight: 600; 
          color: #f1f5f9;
        }
        
        #preview tr:nth-child(even) { 
          background-color: rgba(255,255,255,0.02); 
        }

        .preview-actions { 
          display: flex; 
          gap: 12px; 
        }
        
        .action-button, .toggle-button { 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          padding: 0.625rem 1.25rem; 
          border: none; 
          border-radius: 8px; 
          font-size: 0.875rem; 
          font-weight: 500; 
          cursor: pointer; 
          transition: all 0.2s ease; 
        }
        
        .toggle-button { 
          background: #e0f2fe; 
          color: #0284c7; 
          border: 1px solid #bae6fd;
        }
        
        .toggle-button:hover { 
          background: #bae6fd; 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
        }
        
        .action-button { 
          background: rgba(255,255,255,0.1); 
          color: #e2e8f0; 
          border: 1px solid rgba(255,255,255,0.15); 
        }
        
        .action-button:hover { 
          background: rgba(255,255,255,0.2); 
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.3);
        }

        @media (max-width: 768px) {
          .panels-wrapper { 
            flex-direction: column; 
            margin: 0 16px 32px 16px;
          }
          
          .editor-container, .preview-container { 
            min-height: 500px; 
            width: 100%; 
          }
          
          #preview { 
            height: auto; 
            max-height: 500px; 
          }
          
          #preview h1 { font-size: 1.875rem; }
          #preview h2 { font-size: 1.5rem; }
          #preview h3 { font-size: 1.25rem; }
        }
      `}</style>
      
      <Header />
      <Hero />
      
      <div className="panels-wrapper">
        {/* Editor Panel */}
        <div className="editor-container">
          <div className="panel-header editor-header">
            <h2 className="panel-title text-slate-800">
              <FaEdit className="w-5 h-5 text-slate-600" />
              Editor
            </h2>
            <button 
              className="toggle-button"
              onClick={togglePreview}
              aria-label={showPreview ? "Hide Preview" : "Show Preview"}
            >
              {showPreview ? (
                <>
                  <FaEyeSlash className="w-4 h-4" /> 
                  <span className="hidden sm:inline">Hide Preview</span>
                </>
              ) : (
                <>
                  <FaEye className="w-4 h-4" /> 
                  <span className="hidden sm:inline">Show Preview</span>
                </>
              )}
            </button>
          </div>
          <textarea
            id="editor"
            value={markdown}
            onChange={handleChange}
            placeholder="Start typing your markdown here..."
            spellCheck="false"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="preview-container">
            <div className="panel-header preview-header">
              <h2 className="panel-title text-slate-200">
                <FaEye className="w-5 h-5 text-cyan-400" />
                Live Preview
              </h2>
              <div className="preview-actions">
                <button 
                  onClick={copyToClipboard} 
                  className="action-button copy-button"
                  aria-label="Copy markdown"
                >
                  {copied ? (
                    <>
                      <FaCheck className="w-4 h-4 text-green-400" /> 
                      <span className="text-green-400 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={exportAsHTML} 
                  className="action-button export-button"
                  aria-label="Export as HTML"
                >
                  {exported ? (
                    <>
                      <FaCheck className="w-4 h-4 text-cyan-400" /> 
                      <span className="text-cyan-400 hidden sm:inline">Exported!</span>
                    </>
                  ) : (
                    <>
                      <FaFileDownload className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Export HTML</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div
              id="preview"
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MarkdownPreviewer;