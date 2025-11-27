import { useEffect, useState, useRef, useCallback } from 'react';
import { sharedService } from '../services/sharedService';
import type { AssetInfo } from '../services/sharedService';
import { ImageCard } from '../components/shared/ImageCard';
import { VideoCard } from '../components/shared/VideoCard';
import { VideoModal } from '../components/shared/VideoModal';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import '../styles/modern-cards.css';

interface SharedPageProps {
  onNavigate?: (page: string) => void;
}

export default function SharedPage({ onNavigate }: SharedPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [assetInfo, setAssetInfo] = useState<AssetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [downloadingAssets, setDownloadingAssets] = useState<Set<string>>(new Set());
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      const data = await sharedService.getAssetInfo();
      setAssetInfo(data);
      setLoading(false);
    };
    
    loadAssets();
  }, []);

  const handleDownload = useCallback(async (filePath: string) => {
    setDownloadingAssets(prev => new Set(prev).add(filePath));
    
    try {
      await sharedService.downloadAsset(filePath);
      setTimeout(() => {
        setDownloadingAssets(prev => {
          const next = new Set(prev);
          next.delete(filePath);
          return next;
        });
      }, 1500);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadingAssets(prev => {
        const next = new Set(prev);
        next.delete(filePath);
        return next;
      });
      alert('Download failed. Please try again.');
    }
  }, []);

  const handleImageLoad = useCallback((filePath: string) => {
    setImageLoading(prev => {
      const next = new Set(prev);
      next.delete(filePath);
      return next;
    });
  }, []);

  const handleImageError = useCallback((filePath: string) => {
    setImageLoadErrors(prev => new Set(prev).add(filePath));
    setImageLoading(prev => {
      const next = new Set(prev);
      next.delete(filePath);
      return next;
    });
  }, []);

  const handleVideoClick = useCallback((filePath: string) => {
    console.log('Opening video:', filePath);
    setPlaybackSpeed(1);
    setCurrentVideo(filePath);
    setShowVideoModal(true);
    setVideoLoading(true);
    setVideoError(false);
    
    // Reset and load video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, []);

  const closeVideoModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
    setShowVideoModal(false);
    setCurrentVideo(null);
    setPlaybackSpeed(1);
    setVideoLoading(false);
    setVideoError(false);
  }, []);

  const togglePlaybackSpeed = useCallback(() => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  }, [playbackSpeed]);

  const togglePictureInPicture = useCallback(async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error('Picture-in-Picture error:', error);
        alert('Picture-in-Picture is not supported in your browser');
      }
    }
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading shared assets..." />;
  }

  if (!assetInfo) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '48px', color: '#e91e63', marginBottom: '20px' }}></i>
          <h3>Unable to load shared assets</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Please check your internet connection and try again.
          </p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 60%, #673ab7 100%)',
              border: 'none'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
      paddingBottom: '60px'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .video-play-button:hover {
          background: rgba(233, 30, 99, 0.95) !important;
          transform: scale(1.15);
          border-color: #fff !important;
        }
      `}</style>

      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01) 0%, transparent 80%)',
        zIndex: 1
      }}></div>
      
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

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => onNavigate?.('home')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                padding: '8px 20px',
                color: '#fff',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Go to Home</span>
            </button>
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            Shared
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Feel free to use these assets in your projects.
          </p>
        </div>

        {/* Images Section */}
        {assetInfo.images && assetInfo.images.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '30px',
              paddingBottom: '15px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              Images
            </h2>
            
            <div className="row g-4">
              {assetInfo.images.map((filePath) => (
                <ImageCard
                  key={filePath}
                  filename={sharedService.getFileName(filePath)}
                  imageUrl={sharedService.getAssetUrl(filePath)}
                  isLoading={imageLoading.has(filePath)}
                  hasError={imageLoadErrors.has(filePath)}
                  isDownloading={downloadingAssets.has(filePath)}
                  onImageLoad={() => handleImageLoad(filePath)}
                  onImageError={() => handleImageError(filePath)}
                  onDownload={() => handleDownload(filePath)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {assetInfo.videos && assetInfo.videos.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '30px',
              paddingBottom: '15px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              Videos
            </h2>
            
            <div className="row g-4">
              {assetInfo.videos.map((filePath) => (
                <VideoCard
                  key={filePath}
                  filename={sharedService.getFileName(filePath)}
                  videoUrl={sharedService.getAssetUrl(filePath)}
                  isDownloading={downloadingAssets.has(filePath)}
                  onVideoClick={() => handleVideoClick(filePath)}
                  onDownload={() => handleDownload(filePath)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!assetInfo.images || assetInfo.images.length === 0) && 
         (!assetInfo.videos || assetInfo.videos.length === 0) && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <i className="bi bi-folder2-open" style={{ fontSize: '64px', marginBottom: '20px' }}></i>
            <p style={{ fontSize: '18px' }}>No shared assets available at the moment.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && currentVideo && (
        <VideoModal
          currentVideo={currentVideo}
          playbackSpeed={playbackSpeed}
          videoRef={videoRef}
          videoLoading={videoLoading}
          videoError={videoError}
          setVideoLoading={setVideoLoading}
          setVideoError={setVideoError}
          onClose={closeVideoModal}
          onDownload={() => handleDownload(currentVideo)}
          onSpeedChange={togglePlaybackSpeed}
          onPictureInPicture={togglePictureInPicture}
        />
      )}
    </div>
  );
}
