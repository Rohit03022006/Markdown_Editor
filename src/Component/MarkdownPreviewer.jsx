import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { FaEdit, FaEye, FaCopy, FaCheck, FaFileExport } from "react-icons/fa";
import "./MarkdownPreviewer.css";
import Footer from "./Footer";
import Header from "./Header";

const MarkdownPreviewer = () => {
    const defaultMarkdown = `# Markdown Full Example

## 1. Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

---

## 2. Text Formatting

**Bold text**  
*Italic text*  
***Bold and italic***  
~~Strikethrough~~  
<sub>Subscript</sub>  
<sup>Superscript</sup>

---

## 3. Lists

### Unordered List
- Item 1
  - Subitem 1
  - Subitem 2
- Item 2

### Ordered List
1. First
2. Second
   1. Sub-second
   2. Sub-third
3. Third

---

## 4. Links

[OpenAI Website](https://www.openai.com)  
[GitHub](https://github.com) (Auto-link)

---

## 5. Images

![Markdown Logo](https://github.com/Rohit03022006)

---

## 6. Code

### Inline Code
Use \`printf()\` to display output.

### Code Block

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
greet("World")
\`\`\`

---

## 7. Blockquotes

> This is a blockquote.  
> It can span multiple lines.

---

## 8. Tables

| Name     | Age | Profession  |
|----------|-----|-------------|
| Alice    | 30  | Engineer    |
| Bob      | 25  | Designer    |
| Charlie  | 28  | Developer   |

---

## 9. Task Lists

- [x] Learn Markdown
- [ ] Practice regularly
- [ ] Create a project using it

---

## 10. Horizontal Line

---

## 11. HTML in Markdown

You can mix **HTML**:

<div style="color: blue;">
  This is a custom colored text using HTML.
</div>

---

## 12. Emoji

Markdown supports emojis via Unicode:

👍 💡 🎯 ✅ 🔥
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(false);
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
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
          }
          pre {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
          }
          code {
            background: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
          }
          blockquote {
            border-left: 4px solid #ddd;
            padding-left: 15px;
            color: #666;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f4f4f4;
          }
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
    <div className="app-container">
      <Header />
      <div className="panels-wrapper">
        <div className="editor-container">
          <div className="panel-header editor-header">
            <h2 className="panel-title">
              <FaEdit className="panel-icon" />
              Editor
            </h2>
            <button 
            className="button"
            onClick={togglePreview}
            aria-label={showPreview ? "Show editor" : "Show preview"}
          >
            {showPreview ? (
              <>
                <FaEdit className="button-icon" /> Editor
              </>
            ) : (
              <>
                <FaEye className="button-icon" /> Preview
              </>
            )}
          </button>
          </div>
          <textarea
            id="editor"
            value={markdown}
            onChange={handleChange}
            placeholder="Type your markdown here..."
          />
        </div>
        <div className="toggle-button">
          
        </div>
        {showPreview && (
          <div className="preview-container">
            <div className="panel-header preview-header">
              <h2 className="panel-title">
                <FaEye className="panel-icon" />
                Preview
              </h2>
              <div className="preview-actions">
                <button 
                  onClick={copyToClipboard} 
                  className="action-button copy-button"
                  aria-label="Copy markdown"
                >
                  {copied ? (
                    <>
                      <FaCheck className="button-icon" /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="button-icon" /> Copy
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
                      <FaCheck className="button-icon" /> Exported!
                    </>
                  ) : (
                    <>
                      <FaFileExport className="button-icon" /> Export HTML
                    </>
                  )}
                </button>
              </div>
            </div>
            <div
              id="preview"
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