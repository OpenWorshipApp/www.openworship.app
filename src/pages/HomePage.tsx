import ScrollToTopButton from '../components/ScrollToTopButton';

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
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

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '76px 40px 0 40px',
        textAlign: 'center'
      }}>
        {/* Logo with Glow Effect */}
        <div style={{
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.3), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            zIndex: -1
          }}></div>
          <img 
            src="/icon.png" 
            alt="Open Worship Logo" 
            style={{
              width: '96px',
              height: '96px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(233, 30, 99, 0.5))'
            }}
          />
        </div>
        
        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 84px)',
          fontWeight: '800',
          marginBottom: '24px',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 40px rgba(233, 30, 99, 0.3)'
        }}>
          Open Worship
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(18px, 3vw, 28px)',
          color: '#b8b8b8',
          marginBottom: '20px',
          maxWidth: '800px',
          lineHeight: '1.5',
          fontWeight: '300'
        }}>
          Professional worship presentation software that empowers churches worldwide
        </p>
        
        {/* Tagline */}
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '60px',
          fontStyle: 'italic'
        }}>
          Free • Open Source • Powerful
        </p>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: '80px'
        }}>
          <button 
            onClick={() => onNavigate?.('download')}
            style={{
              background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: '600',
              padding: '20px 40px',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 32px rgba(233, 30, 99, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(233, 30, 99, 0.6), 0 0 0 1px rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(233, 30, 99, 0.4), 0 0 0 1px rgba(255,255,255,0.1)';
            }}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Now
          </button>
          
          <button 
            onClick={() => onNavigate?.('docs')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: '600',
              padding: '20px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '120px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '20px'
          }}>
            Everything You Need
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#888',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Powerful features designed specifically for worship teams and church services
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          {/* Feature Cards */}
          {[
            {
              icon: '🎵',
              title: 'Song Management',
              description: 'Organize worship sets, lyrics, and chord charts with powerful search and tagging features',
              color: '#e91e63'
            },
            {
              icon: '📖',
              title: 'Scripture Display',
              description: 'Display Bible verses with multiple translations, search functionality, and beautiful typography',
              color: '#9c27b0'
            },
            {
              icon: '⚡',
              title: 'Live Presentation',
              description: 'Seamless live presentation with dual-screen support, transitions, and real-time editing',
              color: '#673ab7'
            },
            {
              icon: '🎨',
              title: 'Custom Themes',
              description: 'Create beautiful presentations with customizable themes, backgrounds, and fonts',
              color: '#3f51b5'
            },
            {
              icon: '📱',
              title: 'Remote Control',
              description: 'Control presentations remotely from any device with our mobile-friendly interface',
              color: '#2196f3'
            },
            {
              icon: '🔄',
              title: 'Auto-Sync',
              description: 'Automatically sync your content across devices and backup to cloud storage',
              color: '#00bcd4'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = feature.color + '40';
              e.currentTarget.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '24px',
                filter: 'drop-shadow(0 0 10px rgba(233, 30, 99, 0.3))'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                color: feature.color, 
                fontSize: '24px', 
                fontWeight: '700', 
                marginBottom: '16px' 
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: '#aaa', 
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{
          textAlign: 'center',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Open Source & Free Forever
          </h3>
          <p style={{
            fontSize: '18px',
            color: '#888',
            marginBottom: '32px',
            maxWidth: '500px',
            margin: '0 auto 32px'
          }}>
            Join our community of developers and worship leaders building the future of church technology
          </p>
          <a 
            href="https://github.com/OpenWorshipApp/open-worship-app-dt" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#24292e',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2c3237';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#24292e';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
      
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
