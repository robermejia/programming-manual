
import React from 'react';
import TabbedCodeBlock from './TabbedCodeBlock';
import { Lightbulb, CheckCircle2, Brain, AlertTriangle, CheckCircle, Briefcase, Code } from 'lucide-react';

const TopicViewer = ({ topic, language }) => {
  if (!topic) {
    return (
      <div className="empty-state">
        <h2>Select a topic to begin learning</h2>
      </div>
    );
  }

  // Helper to extract main syntax code safely
  const mainJs = topic.codeJs || topic.syntax?.js || topic.code;
  const mainTs = topic.codeTs || topic.syntax?.ts;

  return (
    <main className="topic-viewer">
      <div className="topic-content-wrapper">
        <header className="topic-header">
          <h1>{topic.title}</h1>
        </header>
        
        {/* Video Tutorial Section */}
        {/* Video Tutorial Section */}
        {(topic.videoUrl || (topic.videos && topic.videos.length > 0)) && (
          <div className="video-section" style={{ marginBottom: '2rem', marginTop: '1rem' }}>
            {topic.videoUrl && (
               <div className="video-container" style={{ marginBottom: '1rem', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <iframe 
                  width="100%" 
                  height="450" 
                  src={topic.videoUrl.replace("watch?v=", "embed/")} 
                  title="Video tutorial"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                >
                </iframe>
              </div>
            )}
            
            {topic.videos && topic.videos.map((video, idx) => (
              <div key={idx} className="video-container" style={{ marginBottom: '1.5rem', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                {video.title && <h4 style={{ padding: '0.5rem 0', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{video.title}</h4>}
                <iframe 
                  width="100%" 
                  height="400" 
                  src={video.url.replace("watch?v=", "embed/")} 
                  title={video.title || `Video tutorial ${idx + 1}`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                >
                </iframe>
              </div>
            ))}
          </div>
        )}

        {/* Structured Content Cards */}
        {topic.content && topic.content.length > 0 && (
          <div className="content-section-simple" style={{ marginBottom: '2rem' }}>
            {topic.content.map((item, idx) => (
              <div key={idx} className="content-item-simple" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  color: 'var(--accent-color)', 
                  fontSize: '1.25rem', 
                  marginBottom: '0.5rem',
                  fontWeight: 600
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7',
                  color: 'var(--text-primary)',
                  marginBottom: 0
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Fallback for legacy details string */}
        {topic.details && !topic.content && (
          <div className="topic-details">
            {topic.details.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}
        
        {/* Main Syntax Block */}
        {(mainJs || mainTs) && (
          <section className="use-cases-section" style={{ marginTop: '2rem', borderTop: 'none', paddingTop: 0 }}>
             <h2 style={{ marginBottom: '0.5rem' }}>
               <Code className="section-icon" />
               Sintaxis
             </h2>
             {topic.syntaxDescription && (
               <p style={{ 
                 fontSize: '1rem', 
                 lineHeight: '1.6', 
                 color: 'var(--text-secondary)', 
                 marginBottom: '1.5rem',
                 marginTop: 0 
               }}>
                 {topic.syntaxDescription}
               </p>
             )}
             <TabbedCodeBlock codeJs={mainJs} codeTs={mainTs} language={language} />
          </section>
        )}

        {/* Tips Section */}
        {topic.tips && topic.tips.length > 0 && (
          <div className="content-grid tips-grid-container">
            {topic.tips.map((tip, idx) => {
              let Icon = Lightbulb;
              let tipTypeClass = "tip-item-default";
              let cardBorderClass = "border-l-4 border-yellow-500"; 
              
              switch(tip.type) {
                case 'idea':
                  Icon = Brain;
                  tipTypeClass = "tip-item-idea";
                  cardBorderClass = "border-l-4 border-purple-500";
                  break;
                case 'error':
                  Icon = AlertTriangle;
                  tipTypeClass = "tip-item-error";
                  cardBorderClass = "border-l-4 border-red-500";
                  break;
                case 'goodPractice':
                  Icon = CheckCircle;
                  tipTypeClass = "tip-item-good";
                  cardBorderClass = "border-l-4 border-green-500";
                  break;
                case 'recommendation':
                  Icon = Briefcase;
                  tipTypeClass = "tip-item-pro";
                  cardBorderClass = "border-l-4 border-blue-500";
                  break;
              }

              return (
                <div key={idx} className={`use-case-item content-card ${cardBorderClass} ${tipTypeClass}`}>
                  <header className="use-case-header tip-header-flex">
                    <Icon className="tip-icon" size={24} />
                    <h3>{tip.title}</h3>
                  </header>
                  <p>{tip.content}</p>
                  {tip.code && (
                     <div className="mt-4">
                       <TabbedCodeBlock 
                         codeJs={tip.code} 
                         language={language}
                       />
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="topic-explanation">
          <div className="explanation-icon">
            <Lightbulb size={24} className="text-accent" />
          </div>
          <p>{topic.description}</p>
        </div>

        {/* Use Cases Section */}
        {topic.useCases && topic.useCases.length > 0 && (
          <section className="use-cases-section">
            <h2>
              <CheckCircle2 className="section-icon" />
              Casos de Uso
            </h2>
            <div className="use-cases-grid">
              {topic.useCases.map((useCase, idx) => (
                <div key={idx} className="use-case-item">
                  <header className="use-case-header">
                     <h3>{useCase.title}</h3>
                  </header>
                  <p>{useCase.description}</p>
                  <TabbedCodeBlock 
                    codeJs={useCase.codeJs || useCase.code} 
                    codeTs={useCase.codeTs} 
                    language={language}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Premium Flashcards Section */}
        {topic.cards && topic.cards.length > 0 && (
          <section className="flashcards-section" style={{ marginTop: '3rem' }}>
            <div className="flashcards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
              perspective: '1000px'
            }}>
              {topic.cards.map((card, idx) => (
                <div key={idx} className="flashcard-container" style={{
                  height: '220px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.6s',
                  transformStyle: 'preserve-3d',
                }}
                onClick={(e) => {
                  const cardInner = e.currentTarget;
                  cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
                }}>
                  {/* Front Side */}
                  <div className="flashcard-front" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1.5rem', 
                      fontSize: '0.8rem', 
                      opacity: 0.5,
                      fontWeight: 'bold',
                      color: 'var(--accent-color)'
                    }}>#{idx + 1}</span>
                    <Brain className="text-secondary" size={40} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: '1rem' }} />
                    <p style={{ 
                      textAlign: 'center', 
                      fontSize: '1.05rem', 
                      fontWeight: 500,
                      lineHeight: 1.5
                    }}>{card.q}</p>
                    <span style={{ 
                      marginTop: '1rem', 
                      fontSize: '0.75rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em',
                      opacity: 0.4
                    }}>Haz clic para revelar</span>
                  </div>

                  {/* Back Side */}
                  <div className="flashcard-back" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, var(--accent-color) 0%, #6366f1 100%)',
                    borderRadius: '1.5rem',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  }}>
                    <CheckCircle2 className="text-white" size={32} style={{ marginBottom: '1rem' }} />
                    <p style={{ 
                      textAlign: 'center', 
                      fontSize: '1.1rem', 
                      color: 'white',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}>{card.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              .flashcard-container:hover {
                box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.3);
              }
              .flashcards-grid {
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
              }
            `}} />
          </section>
        )}
      </div>
    </main>
  );
};

export default TopicViewer;
