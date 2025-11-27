/**
 * HLS Video Player Component
 * 
 * This component provides adaptive streaming support using HLS (HTTP Live Streaming).
 * It automatically adjusts video quality based on network conditions.
 * 
 * Installation required:
 *   npm install hls.js
 * 
 * Usage:
 *   <HlsVideoPlayer 
 *     hlsUrl="https://cdn.example.com/video.m3u8"
 *     poster="https://cdn.example.com/poster.jpg"
 *     title="Video Title"
 *   />
 * 
 * Benefits:
 * - Adaptive bitrate switching
 * - Better buffering on slow networks
 * - Lower startup latency
 * - Automatic quality selection
 */

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsVideoPlayerProps {
  hlsUrl: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  onError?: (error: string) => void;
}

export default function HlsVideoPlayer({
  hlsUrl,
  poster,
  title,
  autoPlay = false,
  muted = false,
  onError
}: HlsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuality, setCurrentQuality] = useState<string>('auto');
  const [availableQualities, setAvailableQualities] = useState<{ level: number; height: number }[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari has native HLS support
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('Using native HLS support (Safari)');
      video.src = hlsUrl;
      setIsLoading(false);
      return;
    }

    // Other browsers use hls.js
    if (!Hls.isSupported()) {
      const error = 'HLS is not supported in this browser';
      console.error(error);
      onError?.(error);
      return;
    }

    console.log('Initializing hls.js');
    const hls = new Hls({
      // Low latency configuration
      lowLatencyMode: true,
      backBufferLength: 90,
      maxBufferLength: 30,
      maxMaxBufferLength: 600,
      // Enable debugging in development
      debug: process.env.NODE_ENV === 'development',
      // Optimize for live or VOD
      liveSyncDurationCount: 3,
    });

    hlsRef.current = hls;

    // Load the HLS manifest
    hls.loadSource(hlsUrl);
    hls.attachMedia(video);

    // Handle manifest parsed event
    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log('✓ HLS manifest loaded');
      console.log(`  ${data.levels.length} quality levels available`);
      
      // Store available quality levels
      const qualities = data.levels.map((level, index) => ({
        level: index,
        height: level.height
      }));
      setAvailableQualities(qualities);
      setIsLoading(false);
    });

    // Handle level switching
    hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
      const level = hls.levels[data.level];
      console.log(`📊 Quality switched to ${level.height}p (${Math.round(level.bitrate / 1000)} kbps)`);
      setCurrentQuality(`${level.height}p`);
    });

    // Handle buffering events
    hls.on(Hls.Events.BUFFER_APPENDED, (event, data) => {
      console.log('📦 Buffer appended');
    });

    // Handle errors
    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('❌ HLS Error:', data);

      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error('Fatal network error, trying to recover...');
            hls.startLoad();
            onError?.('Network error occurred. Attempting to recover...');
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error('Fatal media error, trying to recover...');
            hls.recoverMediaError();
            onError?.('Media error occurred. Attempting to recover...');
            break;
          default:
            console.error('Fatal error, cannot recover');
            hls.destroy();
            onError?.('A fatal error occurred. Please try refreshing the page.');
            break;
        }
      }
    });

    // Cleanup
    return () => {
      console.log('Destroying HLS instance');
      hls.destroy();
      hlsRef.current = null;
    };
  }, [hlsUrl, onError]);

  const handleQualityChange = (levelIndex: number) => {
    const hls = hlsRef.current;
    if (!hls) return;

    if (levelIndex === -1) {
      // Auto quality
      hls.currentLevel = -1;
      setCurrentQuality('auto');
      console.log('Quality set to: Auto');
    } else {
      // Manual quality selection
      hls.currentLevel = levelIndex;
      const level = hls.levels[levelIndex];
      setCurrentQuality(`${level.height}p`);
      console.log(`Quality set to: ${level.height}p`);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        controls
        autoPlay={autoPlay}
        muted={muted}
        playsInline
        preload="metadata"
        aria-label={title || 'Video player'}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          backgroundColor: '#000'
        }}
        onLoadedMetadata={(e) => {
          const video = e.target as HTMLVideoElement;
          console.log('✓ Video metadata loaded');
          console.log(`  Duration: ${video.duration.toFixed(2)}s`);
          console.log(`  Dimensions: ${video.videoWidth}x${video.videoHeight}`);
        }}
        onCanPlay={() => {
          console.log('▶ Video ready to play');
          setIsLoading(false);
        }}
        onWaiting={() => {
          console.log('⏸ Buffering...');
        }}
        onPlaying={() => {
          console.log('▶ Playing');
        }}
      />

      {/* Quality selector (optional) */}
      {availableQualities.length > 1 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '8px',
          padding: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <select
            value={currentQuality === 'auto' ? '-1' : availableQualities.findIndex(q => `${q.height}p` === currentQuality)}
            onChange={(e) => handleQualityChange(Number(e.target.value))}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="-1">Auto ({currentQuality})</option>
            {availableQualities.map((quality, index) => (
              <option key={quality.level} value={index}>
                {quality.height}p
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
