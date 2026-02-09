
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopicViewer from '../components/TopicViewer';

const ManualLayout = ({ title, logoColor, themeClass, categories, language }) => {
  const [selectedTopic, setSelectedTopic] = useState(categories?.[0]?.topics?.[0] || null);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Update selected topic if categories change (e.g. switching manuals)
  React.useEffect(() => {
    if (categories && categories.length > 0) {
        setSelectedTopic(categories[0].topics[0]);
    }
  }, [categories]);

  // Handle window resize to automatically close/open sidebar
  React.useEffect(() => {
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

  // Handle closing sidebar on mobile when a topic is selected
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
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
