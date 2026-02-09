
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { Copy, FileJson, FileType } from 'lucide-react';

const TabbedCodeBlock = ({ codeJs, codeTs, language = 'javascript' }) => {
  const [activeTab, setActiveTab] = useState('javascript');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // If there is no TS code, force JS tab (for JS manual compatibility)
  const hasTs = !!codeTs;
  const currentTab = hasTs ? activeTab : 'javascript';
  
  const currentCode = currentTab === 'typescript' 
    ? (codeTs || '// TypeScript version pending...') 
    : (codeJs || '// No code available');

  // Determine display label
  const getLanguageLabel = () => {
    if (hasTs) return currentTab === 'typescript' ? 'TypeScript' : 'JavaScript';
    if (language === 'typescript') return 'TypeScript';
    if (language === 'java') return 'Java';
    if (language === 'sql') return 'SQL';
    if (language === 'plaintext') return 'PSeInt';
    return 'JavaScript';
  };

  // Determine highlighter language ID
  const getLanguageId = () => {
    if (hasTs) return currentTab === 'typescript' ? 'tsx' : 'javascript';
    if (language === 'typescript') return 'tsx';
    if (language === 'java') return 'java';
    if (language === 'sql') return 'sql';
    return 'javascript';
  };

  return (
    <div className="tabbed-code-block">
      {/* Only show tabs if TS is available */}
      {hasTs && (
        <div className="syntax-tabs">
          <button 
            className={`tab-btn ${currentTab === 'javascript' ? 'active' : ''}`}
            onClick={() => setActiveTab('javascript')}
          >
            <FileJson size={16} />
            JavaScript
          </button>
          <button 
            className={`tab-btn ${currentTab === 'typescript' ? 'active' : ''}`}
            onClick={() => setActiveTab('typescript')}
          >
            <FileType size={16} />
            TypeScript
          </button>
        </div>
      )}

      <section className="code-section" style={!hasTs ? { borderRadius: '8px', borderTopLeftRadius: '8px' } : {}}>
        <div className="code-header">
          <span className="lang-tag">
            {getLanguageLabel()}
          </span>
          <button 
            className="copy-btn" 
            onClick={() => handleCopy(currentCode)} 
            title="Copy code"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
        <div className="shiki-container">
          <CodeBlock 
            code={currentCode} 
            language={getLanguageId()} 
          />
        </div>
      </section>
    </div>
  );
};

export default TabbedCodeBlock;
