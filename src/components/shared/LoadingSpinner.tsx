export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }}>
      <style>{`
        @keyframes ios-spinner-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ios-spinner-fade {
          0% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            position: 'relative',
            margin: '0 auto'
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '16px',
                background: `linear-gradient(135deg, #e91e63, #9c27b0, #673ab7)`,
                borderRadius: '2px',
                top: '0',
                left: '50%',
                marginLeft: '-2px',
                transformOrigin: '2px 30px',
                transform: `rotate(${i * 30}deg)`,
                animation: `ios-spinner-fade 1.2s linear infinite`,
                animationDelay: `${-i * 0.1}s`
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '30px' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
