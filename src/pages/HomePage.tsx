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
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.03,
            transform: `rotate(${Math.random() * 360}deg)`
          }}>
            <div style={{
              width: '2px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(233, 30, 99, 0.5), transparent)',
              margin: '0 auto'
            }}></div>
            <div style={{
              width: '30px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(233, 30, 99, 0.5), transparent)',
              position: 'absolute',
              top: '12px',
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
        background: 'radial-gradient(ellipse at top, rgba(233, 30, 99, 0.08) 0%, transparent 50%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* Top Navigation Links */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        flexWrap: 'wrap'
      }}>
        <a
          href="https://github.com/OpenWorshipApp/open-worship-app-dt"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#5b7cff',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(91, 124, 255, 0.1)';
            e.currentTarget.style.borderColor = '#5b7cff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <i className="bi bi-github" style={{ fontSize: '18px' }}></i>
          Fork me on Github
        </a>

        <a
          href="https://www.youtube.com/@owf2025"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#5b7cff',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(91, 124, 255, 0.1)';
            e.currentTarget.style.borderColor = '#5b7cff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <i className="bi bi-youtube" style={{ fontSize: '18px', color: '#ff0000' }}></i>
          Youtube
        </a>
      </div>

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
          {/* Cross behind logo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -2,
            opacity: 0.1
          }}>
            <div style={{
              width: '4px',
              height: '120px',
              background: 'linear-gradient(to bottom, transparent, rgba(233, 30, 99, 0.8), transparent)',
              margin: '0 auto'
            }}></div>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, transparent, rgba(233, 30, 99, 0.8), transparent)',
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}></div>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            background: 'radial-gradient(circle, rgba(233, 30, 99, 0.3) 0%, rgba(156, 39, 176, 0.2) 50%, transparent 70%)',
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
              filter: 'drop-shadow(0 0 20px rgba(233, 30, 99, 0.6)) drop-shadow(0 0 40px rgba(156, 39, 176, 0.3))'
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
          textShadow: '0 0 40px rgba(233, 30, 99, 0.3)',
          position: 'relative'
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
          marginBottom: '30px',
          fontStyle: 'italic'
        }}>
          Free • Open Source • Powerful
        </p>

        {/* Bible Verse */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto 60px',
          padding: '24px 32px',
          background: 'rgba(233, 30, 99, 0.05)',
          borderLeft: '3px solid rgba(233, 30, 99, 0.6)',
          borderRadius: '8px'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#e91e63',
            fontStyle: 'italic',
            lineHeight: '1.8',
            marginBottom: '8px'
          }}>
            "Make a joyful noise unto the Lord, all ye lands. Serve the Lord with gladness: come before his presence with singing."
          </p>
          <p style={{
            fontSize: '14px',
            color: '#888',
            textAlign: 'right',
            fontWeight: '600'
          }}>
            — Psalm 100:1-2
          </p>
        </div>

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
            background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '20px'
          }}>
            Equipped for Ministry
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#888',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Powerful features designed to glorify God through worship and service
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
              title: 'Worship Song Management',
              description: 'Organize hymns, worship sets, lyrics, and chord charts to lead your congregation in joyful praise',
              color: '#e91e63'
            },
            {
              icon: '✝️',
              title: 'Scripture Display',
              description: "Display God's Word with multiple Bible translations, search functionality, and beautiful typography",
              color: '#9c27b0'
            },
            {
              icon: '🕊️',
              title: 'Live Presentation',
              description: 'Seamless presentation with dual-screen support, smooth transitions, and Spirit-led flexibility',
              color: '#673ab7'
            },
            {
              icon: '🌟',
              title: 'Sacred Themes',
              description: 'Create reverent presentations with faith-inspired themes, backgrounds, and typography',
              color: '#3f51b5'
            },
            {
              icon: '🙏',
              title: 'Remote Ministry',
              description: 'Enable worship leaders to control presentations from anywhere in the sanctuary',
              color: '#2196f3'
            },
            {
              icon: '⛪',
              title: 'Church Network',
              description: 'Share and sync worship content across multiple services and church campuses',
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
              e.currentTarget.style.background = 'rgba(233, 30, 99, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.6)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(233, 30, 99, 0.3), inset 0 0 20px rgba(233, 30, 99, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                fontSize: '64px', 
                marginBottom: '24px',
                filter: 'drop-shadow(0 0 12px rgba(233, 30, 99, 0.4))'
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
          background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.03) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(156, 39, 176, 0.03) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(233, 30, 99, 0.2)',
          boxShadow: '0 4px 20px rgba(233, 30, 99, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative cross accent */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            opacity: 0.05,
            fontSize: '80px'
          }}>✝️</div>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '40px',
            opacity: 0.05,
            fontSize: '80px'
          }}>✝️</div>
          
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2
          }}>
            Open Source • Free Forever • For His Glory
          </h3>
          <p style={{
            fontSize: '18px',
            color: '#888',
            marginBottom: '32px',
            maxWidth: '550px',
            margin: '0 auto 32px',
            position: 'relative',
            zIndex: 2
          }}>
            Join our community of faithful developers and worship leaders building technology to serve the Church worldwide
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
              border: '1px solid rgba(233, 30, 99, 0.3)',
              position: 'relative',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2c3237';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.8)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(233, 30, 99, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#24292e';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
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
