import { useCallback } from 'react';
import type { RefObject, Dispatch, SetStateAction } from 'react';
import { sharedService } from '../../services/sharedService';

interface VideoModalProps {
  currentVideo: string;
  playbackSpeed: number;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoLoading: boolean;
  videoError: boolean;
  setVideoLoading: Dispatch<SetStateAction<boolean>>;
  setVideoError: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onDownload: () => void;
  onSpeedChange: () => void;
  onPictureInPicture: () => void;
}

export function VideoModal({
  currentVideo,
  playbackSpeed,
  videoRef,
  videoLoading,
  videoError,
  setVideoLoading,
  setVideoError,
  onClose,
  onDownload,
  onSpeedChange,
  onPictureInPicture
}: VideoModalProps) {

  const handleRetry = useCallback(() => {
    setVideoError(false);
    setVideoLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoRef, setVideoError, setVideoLoading]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '0',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(233, 30, 99, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Loading indicator */}
        {videoLoading && !videoError && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            zIndex: 10
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255, 255, 255, 0.1)',
              borderTop: '4px solid #e91e63',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>Loading video...</span>
          </div>
        )}

        {/* Error state */}
        {videoError ? (
          <div style={{
            width: '100%',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            gap: '15px'
          }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '48px', color: '#e91e63' }}></i>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', margin: 0 }}>Failed to load video</p>
            <button
              onClick={handleRetry}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            key={currentVideo}
            controls
            autoPlay
            preload="auto"
            playsInline
            controlsList="nodownload"
            aria-label={`Video player: ${sharedService.getFileName(currentVideo)}`}
            onLoadedMetadata={(e) => {
              console.log('✓ Video metadata loaded:', currentVideo);
              const videoElement = e.target as HTMLVideoElement;
              videoElement.playbackRate = playbackSpeed;
              console.log(`  Duration: ${videoElement.duration.toFixed(2)}s`);
              console.log(`  Dimensions: ${videoElement.videoWidth}x${videoElement.videoHeight}`);
              setVideoLoading(false);
            }}
            onLoadStart={() => {
              console.log('⏳ Video loading started:', currentVideo);
              setVideoLoading(true);
            }}
            onCanPlay={() => {
              console.log('▶ Video ready to play:', currentVideo);
              setVideoLoading(false);
            }}
            onWaiting={() => {
              console.log('⏸ Video buffering...');
            }}
            onPlaying={() => {
              console.log('▶ Video playing');
            }}
            onProgress={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const duration = video.duration;
                if (duration > 0) {
                  const bufferedPercent = (bufferedEnd / duration) * 100;
                  console.log(`📊 Buffered: ${bufferedPercent.toFixed(1)}%`);
                }
              }
            }}
            onError={(e) => {
              console.error('❌ Video failed to load:', currentVideo);
              console.error('URL:', sharedService.getAssetUrl(currentVideo));
              const videoElement = e.target as HTMLVideoElement;
              if (videoElement.error) {
                console.error('Error code:', videoElement.error.code);
                console.error('Error message:', videoElement.error.message);
                
                let errorMsg = 'Unknown error';
                let errorDetails = '';
                switch (videoElement.error.code) {
                  case 1:
                    errorMsg = 'Video loading aborted';
                    errorDetails = 'The video download was interrupted';
                    break;
                  case 2:
                    errorMsg = 'Network error';
                    errorDetails = 'A network error occurred while loading the video. Check your connection and server configuration.';
                    break;
                  case 3:
                    errorMsg = 'Decode error';
                    errorDetails = 'Video format not supported or file is corrupted. Try re-encoding to H.264/MP4.';
                    break;
                  case 4:
                    errorMsg = 'Source not found';
                    errorDetails = 'Video file not available at the specified URL. Check file exists in /public/shared/videos/';
                    break;
                }
                console.error('Error type:', errorMsg);
                console.error('Details:', errorDetails);
                console.error('ReadyState:', videoElement.readyState);
                console.error('NetworkState:', videoElement.networkState);
              }
              setVideoLoading(false);
              setVideoError(true);
            }}
            style={{
              width: '100%',
              maxHeight: '80vh',
              borderRadius: '12px',
              backgroundColor: '#000',
              display: videoLoading ? 'none' : 'block'
            }}
          >
            <source src={sharedService.getAssetUrl(currentVideo)} type="video/mp4" />
            <source src={sharedService.getAssetUrl(currentVideo)} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Control buttons */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={onDownload}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e91e63, #9c27b0)';
              e.currentTarget.style.borderColor = '#e91e63';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <i className="bi bi-download"></i>
            Download
          </button>

          <button
            onClick={onSpeedChange}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e91e63, #9c27b0)';
              e.currentTarget.style.borderColor = '#e91e63';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <i className="bi bi-speedometer2"></i>
            {playbackSpeed}x
          </button>

          <button
            onClick={onPictureInPicture}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e91e63, #9c27b0)';
              e.currentTarget.style.borderColor = '#e91e63';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <i className="bi bi-pip"></i>
            Picture-in-Picture
          </button>
        </div>
      </div>
    </div>
  );
}
