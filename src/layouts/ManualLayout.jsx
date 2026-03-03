import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopicViewer from '../components/TopicViewer';

const ManualLayout = ({ title, logoColor, themeClass, categories, language }) => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Derive selected topic from URL param or default to first topic
  useEffect(() => {
    if (categories && categories.length > 0) {
      let foundTopic = null;
      
      if (topicId) {
        // Find topic by ID across all categories
        for (const cat of categories) {
          foundTopic = cat.topics.find(t => t.id === topicId);
          if (foundTopic) break;
        }
      }

      // If not found or no topicId, use first one
      if (!foundTopic) {
        foundTopic = categories[0].topics[0];
      }
      
      setSelectedTopic(foundTopic);
    }
  }, [categories, topicId]);

  // Handle window resize to automatically close/open sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle topic selection by updating the URL
  const handleSelectTopic = (topic) => {
    // Get the base path (e.g., /js, /react)
    const basePath = location.pathname.split('/')[1];
    navigate(`/${basePath}/${topic.id}`);
    
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app-container ${themeClass} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar 
        title={title}
        logoColor={logoColor}
        categories={categories}
        currentTopicId={selectedTopic?.id}
        onSelectTopic={handleSelectTopic}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <main className="main-content">
        {!isSidebarOpen && (
          <button className="sidebar-toggle-btn floating" onClick={toggleSidebar} aria-label="Abrir menú">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        )}
        <TopicViewer topic={selectedTopic} language={language} />
      </main>
    </div>
  );
};

export default ManualLayout;
