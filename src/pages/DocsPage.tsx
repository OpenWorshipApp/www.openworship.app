import { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/modern-footer.scss';

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

interface DocsPageProps {
  onNavigate?: (page: string) => void;
}

const DocsPage = ({ onNavigate }: DocsPageProps) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems: NavItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      children: [
        { id: 'overview', title: 'Overview' },
        { id: 'installation', title: 'Installation' },
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'system-requirements', title: 'System Requirements' }
      ]
    },
    {
      id: 'user-guide',
      title: 'User Guide',
      children: [
        { id: 'basic-usage', title: 'Basic Usage' },
        { id: 'worship-sets', title: 'Creating Worship Sets' },
        { id: 'bible-display', title: 'Bible & Scripture' },
        { id: 'presentation-mode', title: 'Presentation Mode' },
        { id: 'slide-editor', title: 'Slide Editor' }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      children: [
        { id: 'song-management', title: 'Song Management' },
        { id: 'bible-search', title: 'Bible Search' },
        { id: 'live-presentation', title: 'Live Presentation' },
        { id: 'multi-screen', title: 'Multi-Screen Support' },
        { id: 'background-media', title: 'Background & Media' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      children: [
        { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts' },
        { id: 'troubleshooting', title: 'Troubleshooting' },
        { id: 'contributing', title: 'Contributing' },
        { id: 'tech-stack', title: 'Tech Stack' }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const filteredNavItems = navigationItems.map(section => ({
    ...section,
    children: section.children?.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => 
    section.children && section.children.length > 0
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const htmlElement = section as HTMLElement;
        const sectionTop = htmlElement.offsetTop;
        const sectionHeight = htmlElement.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div style={{ 
        minHeight: '200vh', 
        backgroundColor: '#0a0a0a',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Advanced Background Effects */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01) 0%, transparent 80%)',
          zIndex: 1
        }}></div>
        
        {/* Animated Grid Background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 1
        }}></div>

        {/* Christian Cross Pattern Overlay */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          {/* Decorative Crosses */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              opacity: 0.025,
              transform: `rotate(${Math.random() * 360}deg)`
            }}>
              <div style={{
                width: '2px',
                height: '35px',
                background: 'linear-gradient(to bottom, transparent, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.5), transparent)',
                margin: '0 auto'
              }}></div>
              <div style={{
                width: '25px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.5), transparent)',
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}></div>
            </div>
          ))}
        </div>

        {/* Light Rays from Above */}
        <div style={{
          position: 'fixed',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200%',
          height: '100%',
          background: 'radial-gradient(ellipse at top, rgba(233, 30, 99, 0.04) 0%, rgba(156, 39, 176, 0.05) 40%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'flex', position: 'relative', zIndex: 10, paddingTop: '72px' }}>
          {/* Sidebar */}
          <nav style={{
            width: '280px',
            height: 'calc(100vh - 72px)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'fixed',
            top: '72px',
            overflowY: 'auto',
            padding: '20px 0',
            zIndex: 999,
            backdropFilter: 'blur(10px)',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          className="hide-scrollbar"
          >
            {/* Search Box */}
            <div style={{
              padding: '0 20px 20px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '20px'
            }}>
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>

            {/* Navigation Sections */}
            {filteredNavItems.map(section => (
              <div key={section.id} style={{ marginBottom: '30px' }}>
                <div style={{
                  color: '#a1a1aa',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '0 20px',
                  marginBottom: '10px'
                }}>
                  {section.title}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {section.children?.map(item => (
                    <li key={item.id} style={{ marginBottom: '2px' }}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          display: 'block',
                          width: '100%',
                          color: activeSection === item.id ? '#e91e63' : '#cccccc',
                          backgroundColor: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          padding: '8px 20px',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                          borderLeft: activeSection === item.id ? '3px solid #e91e63' : '3px solid transparent',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#cccccc';
                          }
                        }}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Main Content */}
          <main style={{
            marginLeft: '280px',
            padding: '40px',
            paddingTop: '20px',
            maxWidth: '1200px',
            minHeight: 'calc(100vh - 72px)',
            flex: 1
          }}>
            <div style={{ maxWidth: '800px' }}>
              {/* Overview Section */}
              <section id="overview">
                <h1 style={{
                  fontSize: 'clamp(42px, 7vw, 64px)',
                  fontWeight: '800',
                  marginBottom: '24px',
                  lineHeight: '1.1',
                  background: 'linear-gradient(90deg, #ff6b9d 0%, #e91e63 25%, #c2185b 40%, #9c27b0 70%, #7b1fa2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Open Worship Documentation
                </h1>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  Welcome to Open Worship - a powerful, free, and open-source worship presentation software designed specifically for churches and worship teams.
                </p>

                {/* Inspirational Bible Verse */}
                <div style={{
                  maxWidth: '100%',
                  margin: '24px 0',
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.06), rgba(156, 39, 176, 0.08))',
                  borderLeft: '3px solid',
                  borderImage: 'linear-gradient(to bottom, #e91e63, #9c27b0) 1',
                  borderRadius: '6px'
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: '#ce93d8',
                    fontStyle: 'italic',
                    lineHeight: '1.7',
                    marginBottom: '8px'
                  }}>
                    "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God."
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#888',
                    textAlign: 'right',
                    fontWeight: '600',
                    marginBottom: 0
                  }}>
                    — Colossians 3:16
                  </p>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(156, 39, 176, 0.1))',
                  border: '1px solid rgba(233, 30, 99, 0.3)',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '20px 0',
                  color: '#ffffff'
                }}>
                  <span style={{ color: '#f48fb1', marginRight: '8px' }}>✝️</span>
                  <strong>New to Open Worship?</strong> Start with our <button 
                    onClick={() => scrollToSection('quick-start')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e91e63',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Quick Start Guide
                  </button> to get up and running in minutes.
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px',
                  margin: '40px 0'
                }}>
                  {[
                    { icon: '🎵', title: 'Worship Song Management', desc: 'Organize worship sets, hymns, and lyrics to lead your congregation in joyful praise.' },
                    { icon: '✝️', title: 'Scripture Display', desc: "Display God's Word with multiple Bible translations, search functionality, and verse lookup." },
                    { icon: '🕊️', title: 'Live Presentation', desc: 'Spirit-led presentation mode with multi-screen support and real-time control for worship services.' },
                    { icon: '⛪', title: 'Church Customization', desc: 'Beautiful themes, backgrounds, and layouts designed to honor God and serve your ministry.' }
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '32px 28px',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(20px)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(233, 30, 99, 0.06), rgba(156, 39, 176, 0.08))';
                        e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(233, 30, 99, 0.2), 0 10px 20px rgba(156, 39, 176, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.03) 0%, rgba(156, 39, 176, 0.04) 50%, rgba(103, 58, 183, 0.03) 100%)',
                        borderRadius: '20px',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          fontSize: '48px', 
                          marginBottom: '20px',
                          filter: 'drop-shadow(0 4px 10px rgba(233, 30, 99, 0.25)) drop-shadow(0 2px 6px rgba(156, 39, 176, 0.2))'
                        }}>
                          {feature.icon}
                        </div>
                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '20px',
                          fontWeight: '600',
                          marginBottom: '16px',
                          lineHeight: '1.3'
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          color: '#aaa',
                          fontSize: '15px',
                          marginBottom: '0',
                          lineHeight: '1.5'
                        }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.3)) 1',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e91e63', opacity: 0.7, fontSize: '24px' }}>📥</span>
                  Installation
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  Get Open Worship installed on your system with our easy-to-use installers.
                </p>

                <h3 style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '500',
                  margin: '30px 0 15px 0'
                }}>
                  Download Options
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Windows:</strong> Download the .exe installer for automatic setup</li>
                  <li style={{ marginBottom: '8px' }}><strong>macOS:</strong> Download the .dmg file for drag-and-drop installation</li>
                  <li style={{ marginBottom: '8px' }}><strong>Linux:</strong> Download the .deb package or AppImage for portable use</li>
                </ul>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(156, 39, 176, 0.1))',
                  border: '1px solid rgba(233, 30, 99, 0.3)',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '20px 0',
                  color: '#ffffff'
                }}>
                  <span style={{ color: '#f48fb1', marginRight: '8px' }}>🙏</span>
                  Visit our <button 
                    onClick={() => onNavigate?.('download')}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#e91e63', 
                      textDecoration: 'underline', 
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    Download Page
                  </button> to get the latest version for your platform.
                </div>
              </section>

              {/* Quick Start Section */}
              <section id="quick-start">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.3)) 1',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e91e63', opacity: 0.7, fontSize: '24px' }}>🚀</span>
                  Quick Start Guide
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  Follow these steps to start using Open Worship for your first worship service:
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  1. Launch the Application
                </h3>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  After installation, launch Open Worship from your applications menu or desktop shortcut.
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  2. Create Your First Worship Set
                </h3>
                <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}>Click on <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>Song Management</code> in the main menu</li>
                  <li style={{ marginBottom: '8px' }}>Add songs to your library using the <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>Add Song</code> button</li>
                  <li style={{ marginBottom: '8px' }}>Create a new worship set and arrange your songs</li>
                </ol>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  3. Add Scripture Readings
                </h3>
                <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}>Navigate to <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>Bible & Scripture</code></li>
                  <li style={{ marginBottom: '8px' }}>Search for verses using the built-in search</li>
                  <li style={{ marginBottom: '8px' }}>Add selected verses to your worship set</li>
                </ol>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  4. Start Presentation Mode
                </h3>
                <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}>Click <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>Presentation Mode</code> to begin</li>
                  <li style={{ marginBottom: '8px' }}>Use arrow keys or mouse to navigate slides</li>
                  <li style={{ marginBottom: '8px' }}>Press <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>F11</code> for fullscreen mode</li>
                </ol>
              </section>

              {/* System Requirements Section */}
              <section id="system-requirements">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.3)) 1',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e91e63', opacity: 0.7, fontSize: '24px' }}>💻</span>
                  System Requirements
                </h2>
                
                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  Minimum Requirements
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Operating System:</strong> Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)</li>
                  <li style={{ marginBottom: '8px' }}><strong>RAM:</strong> 4GB minimum, 8GB recommended</li>
                  <li style={{ marginBottom: '8px' }}><strong>Storage:</strong> 500MB available space</li>
                  <li style={{ marginBottom: '8px' }}><strong>Display:</strong> 1024x768 minimum resolution</li>
                </ul>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  For Development
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Node.js:</strong> v22 or higher</li>
                  <li style={{ marginBottom: '8px' }}><strong>.NET:</strong> 8.0 SDK</li>
                  <li style={{ marginBottom: '8px' }}><strong>Git:</strong> For version control and Cygwin on Windows</li>
                </ul>
              </section>

              {/* Basic Usage Section */}
              <section id="basic-usage">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.3)) 1',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e91e63', opacity: 0.7, fontSize: '24px' }}>📚</span>
                  Basic Usage
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  Learn the fundamentals of using Open Worship for your worship services.
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  Main Interface
                </h3>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  The Open Worship interface consists of several key areas:
                </p>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Editor:</strong> Create and edit slides, songs, and presentations</li>
                  <li style={{ marginBottom: '8px' }}><strong>Presenter:</strong> Control live presentations during worship</li>
                  <li style={{ marginBottom: '8px' }}><strong>Reader:</strong> View and manage your content library</li>
                  <li style={{ marginBottom: '8px' }}><strong>Finder:</strong> Search across all your worship content</li>
                </ul>
              </section>

              {/* Creating Worship Sets Section */}
              <section id="worship-sets">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.3)) 1',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: '#e91e63', opacity: 0.7, fontSize: '24px' }}>🎵</span>
                  Creating Worship Sets
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  Organize your worship content into cohesive sets for seamless services.
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  Adding Songs
                </h3>
                <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  <li style={{ marginBottom: '8px' }}>Navigate to the Song Management section</li>
                  <li style={{ marginBottom: '8px' }}>Click <code style={{
                    backgroundColor: '#252526',
                    color: '#ff6b35',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, monospace',
                    fontSize: '14px'
                  }}>Add New Song</code></li>
                  <li style={{ marginBottom: '8px' }}>Enter song title, lyrics, and metadata</li>
                  <li style={{ marginBottom: '8px' }}>Save to your song library</li>
                </ol>
              </section>
            </div>

          </main>

          <ScrollToTopButton />
        </div>

        {/* Footer positioned after sidebar, full width */}
        <footer className="modern-footer" style={{
          marginLeft: '280px',
          marginTop: '0',
          borderTop: '2px solid',
          borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.4), rgba(103, 58, 183, 0.3)) 1',
          padding: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="footer-content">
            <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#ce93d8', opacity: 0.8 }}>✝️</span>
              Open Worship
            </div>
            <div className="footer-links">
              <a href="#" onClick={() => onNavigate?.('home')}>Home</a>
              <a href="#" onClick={() => onNavigate?.('download')}>Download</a>
              <a href="#" onClick={() => onNavigate?.('about')}>About</a>
            </div>
            <div className="footer-socials">
              <a href="https://github.com/OpenWorshipApp/open-worship-app-dt" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; 2025 Open Worship. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default DocsPage;
