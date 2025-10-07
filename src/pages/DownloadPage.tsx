import React, { useState, useEffect } from 'react';
import { downloadService, type VersionInfo, type DownloadInfo } from '../services/downloadService';
// Navigation handled by AppRouter
import ScrollToTopButton from '../components/ScrollToTopButton';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/modern-cards.scss';
import '../styles/modern-footer.scss';

interface DownloadPageProps {
  onNavigate?: (page: string) => void;
}

const DownloadPage = ({ onNavigate }: DownloadPageProps) => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [copiedChecksum, setCopiedChecksum] = useState<string>('');

  useEffect(() => {
    const fetchVersionInfo = async () => {
      try {
        const info = await downloadService.getVersionInfo();
        setVersionInfo(info);
      } catch (error) {
        console.error('Failed to fetch version info:', error);
      }
    };

    fetchVersionInfo();
  }, []);

  const copyToClipboard = async (text: string, type: string) => {
    console.log('Copy button clicked - Text:', text, 'Type:', type);
    try {
      const success = await downloadService.copyToClipboard(text);
      console.log('Copy operation result:', success);
      if (success) {
        console.log('Setting copied state for:', type);
        setCopiedChecksum(type);
        setTimeout(() => setCopiedChecksum(''), 2000);
      } else {
        console.log('Copy failed, setting error state');
        setCopiedChecksum(`${type}-error`);
        setTimeout(() => setCopiedChecksum(''), 2000);
      }
    } catch (error) {
      console.error('Copy failed with exception:', error);
      setCopiedChecksum(`${type}-error`);
      setTimeout(() => setCopiedChecksum(''), 2000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes('win')) {
      return 'bi bi-windows';
    }
    if (platform.toLowerCase().includes('mac')) {
      return 'bi bi-apple';
    }
    if (platform.toLowerCase().includes('linux')) {
      return 'bi bi-ubuntu';
    }
    return 'bi bi-question-circle';
  };

  const renderDownloadCard = (download: DownloadInfo, isRecommended = false) => {
    const cardClasses = `modern-card card-animate-in ${isRecommended ? 'recommended-card' : 'download-card'}`;
    const uniqueId = `${download.platform}-${download.architecture}`;

    return (
      <div 
        className={cardClasses} 
        style={{
          position: 'relative',
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '2px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.background = '#2a2a2a';
          e.currentTarget.style.border = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.background = '#1a1a1a';
          e.currentTarget.style.border = 'none';
        }}
      >
        {/* Animated running border */}
        <div className="card-content" style={{ position: 'relative', zIndex: '10' }}>
          <div className="card-body">
            <h5 className="card-title">
              <i className={`${getPlatformIcon(download.platform)} me-2`}></i>
              {`${download.platform} (${download.architecture})`}
              <span className="version-badge ms-2">{download.version}</span>
            </h5>
            <div className="download-section">
              <h6 style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.8
              }}>Installer</h6>
              <button 
                className="download-link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Downloading installer:', download.installer.filename);
                  downloadService.downloadFile(download.installer.url, download.installer.filename);
                }}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#cccccc',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 100,
                  pointerEvents: 'auto',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#cccccc';
                }}
              >
                {download.installer.filename}
              </button>
              <div className="checksum-container">
                <span 
                  className="checksum-text"
                  style={{
                    color: '#aaa',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    opacity: 0.9,
                    letterSpacing: '0.5px'
                  }}
                >{download.installer.checksum}</span>
                <button
                  className={`copy-btn ${copiedChecksum === `${uniqueId}-installer` ? 'copied' : copiedChecksum === `${uniqueId}-installer-error` ? 'error' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Copy button clicked for installer checksum');
                    copyToClipboard(download.installer.checksum, `${uniqueId}-installer`);
                  }}
                  style={{ 
                    position: 'relative', 
                    zIndex: '100', 
                    pointerEvents: 'auto',
                    background: 'transparent',
                    border: copiedChecksum === `${uniqueId}-installer` ? 
                      '1px solid #22c55e' : 
                      '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedChecksum === `${uniqueId}-installer` ? '#22c55e' : '#cccccc',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (copiedChecksum !== `${uniqueId}-installer`) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedChecksum !== `${uniqueId}-installer`) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#cccccc';
                    }
                  }}>
                  {copiedChecksum === `${uniqueId}-installer` ? (
                    <>
                      <i className="bi bi-check-circle-fill me-1"></i>
                      Copied!
                    </>
                  ) : copiedChecksum === `${uniqueId}-installer-error` ? (
                    <>
                      <i className="bi bi-x-circle-fill me-1"></i>
                      Failed
                    </>
                  ) : (
                    <>
                      <i className="bi bi-clipboard me-1"></i>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="download-section">
              <h6 style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.8
              }}>Portable ZIP</h6>
              <button 
                className="download-link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Downloading portable:', download.portable.filename);
                  downloadService.downloadFile(download.portable.url, download.portable.filename);
                }}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#cccccc',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 100,
                  pointerEvents: 'auto',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#cccccc';
                }}
              >
                {download.portable.filename}
              </button>
              <div className="checksum-container">
                <span 
                  className="checksum-text"
                  style={{
                    color: '#aaa',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    opacity: 0.9,
                    letterSpacing: '0.5px'
                  }}
                >{download.portable.checksum}</span>
                <button
                  className={`copy-btn ${copiedChecksum === `${uniqueId}-portable` ? 'copied' : copiedChecksum === `${uniqueId}-portable-error` ? 'error' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Copy button clicked for portable checksum');
                    copyToClipboard(download.portable.checksum, `${uniqueId}-portable`);
                  }}
                  style={{ 
                    position: 'relative', 
                    zIndex: '100', 
                    pointerEvents: 'auto',
                    background: 'transparent',
                    border: copiedChecksum === `${uniqueId}-portable` ? 
                      '1px solid #22c55e' : 
                      '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedChecksum === `${uniqueId}-portable` ? '#22c55e' : '#cccccc',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (copiedChecksum !== `${uniqueId}-portable`) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedChecksum !== `${uniqueId}-portable`) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = '#cccccc';
                    }
                  }}>
                  {copiedChecksum === `${uniqueId}-portable` ? (
                    <>
                      <i className="bi bi-check-circle-fill me-1"></i>
                      Copied!
                    </>
                  ) : copiedChecksum === `${uniqueId}-portable-error` ? (
                    <>
                      <i className="bi bi-x-circle-fill me-1"></i>
                      Failed
                    </>
                  ) : (
                    <>
                      <i className="bi bi-clipboard me-1"></i>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            {download.commitId && (
              <div className="commit-info">
                <div className="commit-container">
                  <i className="bi bi-git me-2"></i>
                  <span className="commit-text">Commit ID:{download.commitId.substring(0, 7)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getRecommendedDownload = () => {
    if (!versionInfo) return null;
    const recommended = downloadService.getRecommendedDownload(versionInfo.downloads);
    return recommended ? renderDownloadCard(recommended, true) : null;
  };

  // navigation handled by MenuBar via hash links; no page-level handler needed here

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
      {/* Navigation handled by AppRouter */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px',
        paddingTop: '152px'
      }}>
        <style>
          {`
            @keyframes borderRun {
              0% { background-position: 0% 0%; }
              100% { background-position: 400% 0%; }
            }
          `}
        </style>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #e91e63 30%, #9c27b0 60%, #673ab7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Downloads</h1>
          <p style={{
            fontSize: '20px',
            color: '#888',
            maxWidth: '600px',
            margin: '0 auto'
          }}>Get the latest version of Open Worship for your platform.</p>
        </header>


        {getRecommendedDownload() && (
          <div className="mb-5">
            {getRecommendedDownload()}
          </div>
        )}

        <div className="card-grid grid-2">
          {versionInfo ? (
            versionInfo.downloads.map((download) => (
              renderDownloadCard(download)
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <hr className="my-5" />

        <div className="card-grid grid-3">
          <div 
            className="feature-card feature-card--music modern-card card-interactive card-animate-in" 
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="feature-icon icon-music"><i className="bi bi-music-note-beamed"></i></div>
                <h5 className="card-title">Worship Sets</h5>
                <p className="card-text">Create and manage song lists for services.</p>
              </div>
            </div>
          </div>
          <div 
            className="feature-card feature-card--bible modern-card card-interactive card-animate-in" 
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="feature-icon icon-bible"><i className="bi bi-book"></i></div>
                <h5 className="card-title">Bible & Scripture</h5>
                <p className="card-text">Easily display verses and passages.</p>
              </div>
            </div>
          </div>
          <div 
            className="feature-card feature-card--planning modern-card card-interactive card-animate-in" 
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <div className="card-content">
              <div className="card-body">
                <div className="feature-icon icon-calendar"><i className="bi bi-calendar-event"></i></div>
                <h5 className="card-title">Service Planning</h5>
                <p className="card-text">Organize your entire service flow seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="modern-footer mt-5">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">Open Worship</div>
            <div className="footer-links">
              <a href="#">Home</a>
              <a href="#">Features</a>
              <a href="#">Docs</a>
            </div>
            <div className="footer-socials">
              <a href="https://github.com/OpenWorshipApp/open-worship-app-dt" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; 2025 Open Worship. All Rights Reserved.
          </div>
        </div>
      </footer>
      
      <ScrollToTopButton />
    </div>
  );
};

export default DownloadPage;
