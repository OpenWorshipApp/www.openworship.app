import { useEffect, useState, useRef, memo } from 'react';

interface VideoCardProps {
  filename: string;
  videoUrl: string;
  isDownloading: boolean;
  onVideoClick: () => void;
  onDownload: () => void;
}

export const VideoCard = memo(({
  filename,
  videoUrl,
  isDownloading,
  onVideoClick,
  onDownload
}: VideoCardProps) => {
  const thumbnailRef = useRef<HTMLVideoElement>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver for lazy loading video thumbnails
  useEffect(() => {
    const video = thumbnailRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(video);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="col-md-6 col-lg-4">
      <div className="modern-card feature-card" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <div 
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            background: '#000',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          onClick={() => {
            console.log('🎬 Video card clicked:', filename);
            onVideoClick();
          }}
          role="button"
          aria-label={`Play video: ${filename}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              console.log('⌨️ Video card activated via keyboard:', filename);
              onVideoClick();
            }
          }}
        >
          {/* Loading skeleton */}
          {!thumbnailLoaded && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(156, 39, 176, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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

          {/* Video thumbnail with lazy loading */}
          <video
            ref={thumbnailRef}
            src={isInView ? videoUrl : undefined}
            preload="metadata"
            muted
            playsInline
            disablePictureInPicture
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#000',
              opacity: thumbnailLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.currentTime = 1;
            }}
            onSeeked={() => {
              setThumbnailLoaded(true);
            }}
            onError={() => {
              console.error('Thumbnail failed to load:', filename);
              setThumbnailLoaded(true);
            }}
          />
          
          {/* Play button overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            opacity: 1,
            pointerEvents: 'none'
          }}>
            <div 
              className="video-play-button"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '3px solid rgba(255, 255, 255, 0.9)',
                pointerEvents: 'auto'
              }}
            >
              <i className="bi bi-play-fill" style={{ fontSize: '36px', color: '#fff', marginLeft: '5px' }}></i>
            </div>
          </div>
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
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
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
  );
});

VideoCard.displayName = 'VideoCard';
