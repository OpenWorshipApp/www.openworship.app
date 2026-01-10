import { useEffect, useState } from 'react';
import { sharedService } from '../services/sharedService';
import type { AssetInfo } from '../services/sharedService';
import '../styles/modern-cards.css';

interface SharedPageProps {
  onNavigate?: (page: string) => void;
}

interface AssetCardProps {
  filename: string;
  url: string;
  type: 'image' | 'video';
  onDownload: () => void;
}

const AssetCard = ({ filename, url, type, onDownload }: AssetCardProps) => (
  <div className="col-md-6 col-lg-4">
    <div className="modern-card feature-card" style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        paddingTop: '56.25%',
        position: 'relative',
        background: '#000'
      }}>
        {type === 'image' ? (
          <img
            src={url}
            alt={filename}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: 'rgba(255,255,255,0.02)'
            }}
          />
        ) : (
          <video
            src={url}
            controls
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#000'
            }}
          />
        )}
      </div>

      <div style={{ padding: '18px' }}>
        <div style={{ color: '#fff', fontWeight: 600, marginBottom: '12px', wordBreak: 'break-word' }}>
          {filename}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px',
              textAlign: 'center',
              color: '#fff',
              textDecoration: 'none'
            }}
          >
            View
          </a>
          <button
            type="button"
            onClick={onDownload}
            style={{
              flex: 1,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 60%, #673ab7 100%)',
              color: '#fff',
              border: 'none',
              textAlign: 'center',
              padding: '10px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function SharedPage({ onNavigate }: SharedPageProps) {
  const [assetInfo, setAssetInfo] = useState<AssetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await sharedService.getAssetInfo();
        setAssetInfo(data);
      } catch (err) {
        console.error('Failed to fetch shared assets', err);
        setError('Unable to load shared assets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff'
      }}>
        Loading shared assets...
      </div>
    );
  }

  if (error || !assetInfo) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff',
        textAlign: 'center',
        padding: '20px'
      }}>
        {error ?? 'No shared assets are available right now.'}
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
            All assets on this page are in the public domain and can be used freely.
          </p>
        </div>

        {/* Images Section */}
        {assetInfo.images?.length ? (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '24px'
            }}>
              Images
            </h2>
            <div className="row g-4">
              {assetInfo.images.map((filePath) => (
                <AssetCard
                  key={filePath}
                  filename={sharedService.getFileName(filePath)}
                  url={sharedService.getAssetUrl(filePath)}
                  type="image"
                  onDownload={() => sharedService.downloadAsset(filePath)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Videos Section */}
        {assetInfo.videos?.length ? (
          <section>
            <h2 style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '24px'
            }}>
              Videos
            </h2>
            <div className="row g-4">
              {assetInfo.videos.map((filePath) => (
                <AssetCard
                  key={filePath}
                  filename={sharedService.getFileName(filePath)}
                  url={sharedService.getAssetUrl(filePath)}
                  type="video"
                  onDownload={() => sharedService.downloadAsset(filePath)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Empty State */}
        {(!assetInfo.images?.length && !assetInfo.videos?.length) && (
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

    </div>
  );
}
