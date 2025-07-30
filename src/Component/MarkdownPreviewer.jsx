import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { FaEdit, FaEye, FaExchangeAlt } from "react-icons/fa";
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
          </div>
          <textarea
            id="editor"
            value={markdown}
            onChange={handleChange}
            placeholder="Type your markdown here..."
          />
        </div>
        <div className="toggle-button">
          <button
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
        {showPreview && (
          <div className="preview-container">
            <div className="panel-header preview-header">
              <h2 className="panel-title">
                <FaEye className="panel-icon" />
                Preview
              </h2>
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
