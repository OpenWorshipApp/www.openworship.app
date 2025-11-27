import { memo } from 'react';

interface ImageCardProps {
  filename: string;
  imageUrl: string;
  isLoading: boolean;
  hasError: boolean;
  isDownloading: boolean;
  onImageLoad: () => void;
  onImageError: () => void;
  onDownload: () => void;
}

export const ImageCard = memo(({ 
  filename, 
  imageUrl, 
  isLoading, 
  hasError, 
  isDownloading,
  onImageLoad, 
  onImageError, 
  onDownload 
}: ImageCardProps) => (
  <div className="col-md-6 col-lg-4">
    <div className="modern-card feature-card" style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.3)'
      }}>
        {isLoading && !hasError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              borderTop: '3px solid #e91e63',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}
        {hasError ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <i className="bi bi-image" style={{ fontSize: '48px', marginBottom: '10px' }}></i>
            <span style={{ fontSize: '14px' }}>Image not available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={filename}
            loading="lazy"
            decoding="async"
            crossOrigin="anonymous"
            onLoad={onImageLoad}
            onError={onImageError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
      </div>
      
      <div style={{ padding: '20px' }}>
        <h4 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '15px',
          wordBreak: 'break-word'
        }}>
          {filename}
        </h4>
        
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="btn btn-primary w-100"
          style={{
            background: isDownloading 
              ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
              : 'linear-gradient(135deg, #e91e63 0%, #9c27b0 60%, #673ab7 100%)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            cursor: isDownloading ? 'not-allowed' : 'pointer',
            opacity: isDownloading ? 0.8 : 1
          }}
          onMouseEnter={(e) => {
            if (!isDownloading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(233, 30, 99, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isDownloading ? (
            <>
              <i className="bi bi-check-circle-fill"></i>
              Downloaded
            </>
          ) : (
            <>
              <i className="bi bi-download"></i>
              Download
            </>
          )}
        </button>
      </div>
    </div>
  </div>
));

ImageCard.displayName = 'ImageCard';
