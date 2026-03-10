
import React, { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';

// Singleton highlighter to avoid re-initializing on every render
let highlighterInstance = null;
let highlighterPromise = null;

const getHighlighter = async () => {
  if (highlighterInstance) return highlighterInstance;
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript', 'jsx', 'typescript', 'tsx', 'java', 'sql', 'plaintext'],
  }).then(h => {
    highlighterInstance = h;
    return h;
  });

  return highlighterPromise;
};

const CodeBlock = ({ code, language = 'javascript' }) => {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function highlight() {
      setLoading(true);
      try {
        const highlighter = await getHighlighter();
        
        if (!isMounted) return;

        const highlightedCode = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'vitesse-dark',
        });

        setHtml(highlightedCode);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, language]);

  if (loading) {
    return <div className="code-loading">Cargando código...</div>;
  }

  return (
    <div 
      className="code-block-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeBlock;
