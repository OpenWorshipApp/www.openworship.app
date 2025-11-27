import ScrollToTopButton from '../components/ScrollToTopButton';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

const ContactPage = ({ onNavigate }: ContactPageProps) => {
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
          Get in Touch
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#888',
          maxWidth: '600px',
          margin: '0 auto 20px'
        }}>
          Have questions? Need support? Want to contribute? We'd love to hear from you!
        </p>

        {/* Email Contact */}
        <div style={{
          background: 'rgba(233, 30, 99, 0.1)',
          border: '1px solid rgba(233, 30, 99, 0.3)',
          borderRadius: '12px',
          padding: '20px 30px',
          marginBottom: '40px',
          display: 'inline-block'
        }}>
          <p style={{
            color: '#ffffff',
            fontSize: '18px',
            margin: 0
          }}>
            For assistance, please contact us at{' '}
            <a
              href="mailto:owf2025@gmail.com"
              style={{
                color: '#e91e63',
                textDecoration: 'none',
                fontWeight: '600',
                borderBottom: '2px solid #e91e63'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff4081';
                e.currentTarget.style.borderBottomColor = '#ff4081';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#e91e63';
                e.currentTarget.style.borderBottomColor = '#e91e63';
              }}
            >
              owf2025@gmail.com
            </a>
          </p>
        </div>

        {/* Contact Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          width: '100%',
          marginBottom: '60px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '40px 30px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
            <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Community Support
            </h3>
            <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '20px' }}>
              Join our community discussions and get help from other users
            </p>
            <a 
              href="https://github.com/OpenWorshipApp/open-worship-app-dt/discussions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#e91e63',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              Visit Discussions →
            </a>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '40px 30px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐛</div>
            <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Report Issues
            </h3>
            <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '20px' }}>
              Found a bug? Report it on our GitHub issues page
            </p>
            <a 
              href="https://github.com/OpenWorshipApp/open-worship-app-dt/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#e91e63',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              Report Issue →
            </a>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '40px 30px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(233, 30, 99, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤝</div>
            <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Contribute
            </h3>
            <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '20px' }}>
              Want to help improve Open Worship? Contributions are welcome!
            </p>
            <a 
              href="https://github.com/OpenWorshipApp/open-worship-app-dt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#e91e63',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              View Repository →
            </a>
          </div>
        </div>

        {/* Quick Actions */}
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
            Ready to Get Started?
          </h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            marginBottom: '30px',
            maxWidth: '500px',
            margin: '0 auto 30px'
          }}>
            Download Open Worship today and transform your worship experience.
          </p>
          
          <button 
            onClick={() => onNavigate?.('download')}
            style={{
              background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(233, 30, 99, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Now
          </button>
        </div>
      </div>
      
      <ScrollToTopButton />
    </div>
  );
};

export default ContactPage;
