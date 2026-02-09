
import React, { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';

const CodeBlock = ({ code, language = 'javascript' }) => {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let highlighter;
    
    async function highlight() {
      setLoading(true);
      try {
        highlighter = await createHighlighter({
          themes: ['vitesse-dark'],
          langs: ['javascript', 'jsx', 'typescript', 'tsx', 'java', 'sql'],
        });

        const highlightedCode = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'vitesse-dark',
        });

        setHtml(highlightedCode);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setLoading(false);
      }
    }

    highlight();

    return () => {
      if (highlighter) {
        highlighter.dispose();
      }
    };
  }, [code, language]);

  if (loading) {
    return <div className="code-loading">Loading code...</div>;
  }

  return (
    <div 
      className="code-block-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeBlock;
