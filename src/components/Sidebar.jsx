
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Hash, Box, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ title, logoColor, categories, currentTopicId, onSelectTopic, isOpen, onToggle }) => {
  const [openCategories, setOpenCategories] = useState({});

  // Initialize/Update state when categories change
  React.useEffect(() => {
    if (categories) {
        setOpenCategories(categories.reduce((acc, cat, idx) => ({ ...acc, [idx]: true }), {}));
    }
  }, [categories]);

  const toggleCategory = (index) => {
    setOpenCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onToggle} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-area">
              <Link to="/" className="back-home-btn" title="Volver al inicio" style={{
                  marginRight: '8px',
                  padding: '8px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: 'var(--text-primary)'
              }}>
                  <ArrowLeft size={20} strokeWidth={3} />
              </Link>
              <div className="logo">
              <span style={{ color: logoColor, fontWeight: 700, fontSize: '1rem' }}>{title}</span>
              <h1 style={{ fontSize: '1rem' }}>Manual</h1>
              </div>
          </div>
          <button className="sidebar-close-btn" onClick={onToggle} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>
      
      <nav className="sidebar-nav">
        {categories.map((category, idx) => (
          <div key={idx} className="category-group">
            <button 
              className="category-header" 
              onClick={() => toggleCategory(idx)}
            >
              <span className="category-title">{category.title}</span>
              {openCategories[idx] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {openCategories[idx] && (
              <ul className="topic-list">
                {category.topics.map(topic => (
                  <li key={topic.id}>
                    <button
                      className={`topic-btn ${currentTopicId === topic.id ? 'active' : ''}`}
                      onClick={() => onSelectTopic(topic)}
                    >
                      {topic.id === 'variables' ? <Hash size={14} /> : <Box size={14} />}
                      <span>{topic.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
