import ScrollToTopButton from '../components/ScrollToTopButton';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

const AboutPage = ({ onNavigate }: AboutPageProps) => {
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

      {/* Main content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '156px 20px 80px 20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 72px)',
          fontWeight: '800',
          marginBottom: '24px',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          About Open Worship
        </h1>
        
        {/* Hero Features Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '60px 40px',
          marginBottom: '50px',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          
          <h2 style={{ 
            color: '#ffffff', 
            fontSize: '36px', 
            fontWeight: '700',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Everything You Need for Worship
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '40px'
          }}>
            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '15px'
              }}>🎵</div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Worship Sets
              </h3>
              <p style={{ color: '#aaa', fontSize: '14px' }}>
                Seamless song management
              </p>
            </div>
            
            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '15px'
              }}>📖</div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Bible & Scripture
              </h3>
              <p style={{ color: '#aaa', fontSize: '14px' }}>
                Multiple translations
              </p>
            </div>
            
            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '15px'
              }}>📅</div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Service Planning
              </h3>
              <p style={{ color: '#aaa', fontSize: '14px' }}>
                Complete flow control
              </p>
            </div>
          </div>
        </div>

        <div style={{
          fontSize: '18px',
          color: '#cccccc',
          lineHeight: '1.6',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          <p style={{ marginBottom: '20px' }}>
            Open Worship is a free, open-source worship presentation software designed specifically 
            for churches, worship teams, and religious organizations.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            Our software provides all the tools you need to create engaging, professional worship 
            experiences - from displaying song lyrics and Bible verses to managing your entire 
            worship service from one intuitive interface.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            Built by the community, for the community. Open Worship is developed by volunteers 
            who understand the needs of modern worship services.
          </p>
          
          <p>
            Best of all, Open Worship is completely free and open-source, meaning you can use it 
            without any licensing fees and even contribute to its development.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate?.('download');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '500',
              padding: '16px 32px',
              borderRadius: '12px',
              border: '2px solid rgba(233, 30, 99, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.4s ease',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(233, 30, 99, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(233, 30, 99, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Now
          </button>
          
          <a 
            href="https://github.com/OpenWorshipApp/open-worship-app-dt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#aaa',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '400',
              padding: '16px 32px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              backdropFilter: 'blur(20px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.color = '#aaa';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Fork on GitHub
          </a>
        </div>

        {/* Interactive Stats Section */}
        <div style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>100%</div>
            <p style={{ color: '#aaa', fontSize: '16px' }}>Free & Open Source</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>∞</div>
            <p style={{ color: '#aaa', fontSize: '16px' }}>No License Fees</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px'
            }}>24/7</div>
            <p style={{ color: '#aaa', fontSize: '16px' }}>Community Support</p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '50px 40px',
          textAlign: 'center',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          
          <h2 style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            Ready to Transform Your Worship Experience?
          </h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            Join thousands of churches worldwide using Open Worship to create meaningful, engaging worship services.
          </p>
        </div>
      </div>
      
      <ScrollToTopButton />
    </div>
  );
};

export default AboutPage;
