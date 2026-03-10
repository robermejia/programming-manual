import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Hash, Box, ArrowLeft, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ title, logoColor, categories, currentTopicId, onSelectTopic, isOpen, onToggle, manualId }) => {
  const [openCategories, setOpenCategories] = useState({});
  const { userProgress } = useAuth();
  
  const completedTopics = useMemo(() => {
    return userProgress[manualId] || [];
  }, [userProgress, manualId]);

  const progressPercentage = useMemo(() => {
    if (!categories) return 0;
    const allTopics = categories.flatMap(cat => cat.topics);
    if (allTopics.length === 0) return 0;
    return Math.round((completedTopics.length / allTopics.length) * 100);
  }, [categories, completedTopics]);

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

      <div className="progress-container-sidebar" style={{ padding: '0 1.5rem 1rem', marginTop: '1rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span>Progreso</span>
          <span>{progressPercentage}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            background: logoColor, 
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
          }} />
        </div>
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
                {category.topics.map(topic => {
                  const isCompleted = completedTopics.includes(topic.id);
                  return (
                    <li key={topic.id}>
                      <button
                        className={`topic-btn ${currentTopicId === topic.id ? 'active' : ''}`}
                        onClick={() => onSelectTopic(topic)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                          {topic.id === 'variables' ? <Hash size={14} /> : <Box size={14} />}
                          <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.6 : 1 }}>
                            {topic.title}
                          </span>
                        </div>
                        {isCompleted && <Check size={14} style={{ color: logoColor }} />}
                      </button>
                    </li>
                  );
                })}
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
