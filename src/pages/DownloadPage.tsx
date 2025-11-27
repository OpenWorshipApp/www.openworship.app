import React, { useState, useEffect, useRef } from 'react';
import { downloadService, type VersionInfo, type DownloadInfo, type FileInfo } from '../services/downloadService';
// Navigation handled by AppRouter
import ScrollToTopButton from '../components/ScrollToTopButton';
import MacInstructionComp from '../components/MacInstructionComp';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/modern-cards.scss';
import '../styles/modern-footer.scss';

interface DownloadPageProps {
  onNavigate?: (page: string) => void;
}

const DownloadPage = ({ onNavigate }: DownloadPageProps) => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [copiedChecksum, setCopiedChecksum] = useState<string>('');
  const [showMacInstructions, setShowMacInstructions] = useState<boolean>(false);
  const [isSafari, setIsSafari] = useState<boolean>(false);
  const macInstructionsRef = useRef<HTMLDivElement>(null);

  // Detect Safari browser
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafariBrowser = ua.includes('Safari') && !ua.includes('Chrome');
    setIsSafari(isSafariBrowser);
  }, []);

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

  const getArchitectureBadge = (architecture: string) => {
    const isMac = architecture.toLowerCase().includes('mac');
    const isIntel = architecture.toLowerCase().includes('intel');
    const isArm = architecture.toLowerCase().includes('arm') || architecture.toLowerCase().includes('apple silicon');
    const isUniversal = architecture.toLowerCase().includes('universal');

    if (!isMac) return null;

    let color = '#6c757d';
    let icon = 'bi bi-cpu';
    let text = architecture;

    if (isUniversal) {
      color = '#9c27b0';
      icon = 'bi bi-star-fill';
      text = 'Universal';
    } else if (isArm) {
      color = '#22c55e';
      icon = 'bi bi-lightning-charge-fill';
      text = 'Apple Silicon';
    } else if (isIntel) {
      color = '#3b82f6';
      icon = 'bi bi-cpu-fill';
      text = 'Intel';
    }

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 12px',
          borderRadius: '16px',
          backgroundColor: `${color}22`,
          border: `1px solid ${color}`,
          color: color,
          fontSize: '12px',
          fontWeight: '600',
          marginLeft: '8px'
        }}
      >
        <i className={icon} style={{ fontSize: '14px' }}></i>
        {text}
      </span>
    );
  };

  const renderFileList = (files: FileInfo | FileInfo[], type: 'installer' | 'portable', uniqueIdPrefix: string) => {
    const fileArray = downloadService.normalizeFileInfo(files);
    
    return fileArray.map((file, index) => {
      const fileId = `${uniqueIdPrefix}-${type}-${index}`;
      const fileUrl = downloadService.getFileUrl(file);
      const fileName = downloadService.getFileName(file);
      
      return (
        <div key={fileId} style={{ marginBottom: fileArray.length > 1 ? '16px' : '0' }}>
          <button 
            className="download-link"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(`Downloading ${type}:`, fileName);
              downloadService.downloadFile(fileUrl, fileName);
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
            {fileName}
          </button>
          <div className="checksum-container">
            <div style={{ marginBottom: '8px' }}>
              <span style={{ 
                color: '#cccccc', 
                fontSize: '13px',
                fontWeight: '500'
              }}>
                Checksum (sha512):
              </span>
            </div>
            <span 
              className="checksum-text"
              style={{
                color: '#aaa',
                fontSize: '12px',
                fontFamily: 'monospace',
                opacity: 0.9,
                letterSpacing: '0.5px'
              }}
            >{file.checksum}</span>
            <button
              className={`copy-btn ${copiedChecksum === fileId ? 'copied' : copiedChecksum === `${fileId}-error` ? 'error' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Copy button clicked for ${type} checksum`);
                copyToClipboard(file.checksum, fileId);
              }}
              style={{ 
                position: 'relative', 
                zIndex: '100', 
                pointerEvents: 'auto',
                background: 'transparent',
                border: copiedChecksum === fileId ? 
                  '1px solid #22c55e' : 
                  '1px solid rgba(255, 255, 255, 0.1)',
                color: copiedChecksum === fileId ? '#22c55e' : '#cccccc',
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
                if (copiedChecksum !== fileId) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (copiedChecksum !== fileId) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#cccccc';
                }
              }}>
              {copiedChecksum === fileId ? (
                <>
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Copied!
                </>
              ) : copiedChecksum === `${fileId}-error` ? (
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
      );
    });
  };

  const renderDownloadCard = (download: DownloadInfo, isRecommended = false) => {
    const cardClasses = `modern-card card-animate-in ${isRecommended ? 'recommended-card' : 'download-card'}`;
    const uniqueId = `${download.platform}-${download.architecture}`;
    const isMac = download.platform.toLowerCase().includes('mac');

    return (
      <div 
        className={cardClasses} 
        style={{
          position: 'relative',
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '2px',
          overflow: 'hidden',
          border: 'none',
          pointerEvents: 'none'
        }}
      >
        {/* Animated running border */}
        <div className="card-content" style={{ position: 'relative', zIndex: '10', pointerEvents: 'auto' }}>
          <div className="card-body" style={{ pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h5 className="card-title" style={{ marginBottom: 0 }}>
                ({download.version})
                <i className={`${getPlatformIcon(download.platform)} ms-2 me-2`}></i>
                {download.architecture}
                {getArchitectureBadge(download.architecture)}
              </h5>
              {isMac && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newState = !showMacInstructions;
                    setShowMacInstructions(newState);
                    // Scroll to instructions after state update
                    if (newState) {
                      setTimeout(() => {
                        macInstructionsRef.current?.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }, 100);
                    }
                  }}
                  style={{
                    background: showMacInstructions ? 'rgba(34, 197, 94, 0.2)' : 'rgba(128, 128, 128, 0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    pointerEvents: 'auto',
                    zIndex: 200
                  }}
                  title="Toggle MacOS installation instructions"
                >
                  <i
                    className={showMacInstructions ? 'bi bi-lightbulb-fill' : 'bi bi-lightbulb'}
                    style={{
                      color: showMacInstructions ? '#22c55e' : '#fbbf24',
                      fontSize: '20px'
                    }}
                  ></i>
                </button>
              )}
            </div>
            <div className="download-section" style={{ pointerEvents: 'auto' }}>
              <h6 style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.8
              }}>Installer</h6>
              {renderFileList(download.installer, 'installer', uniqueId)}
            </div>
            <div className="download-section" style={{ pointerEvents: 'auto' }}>
              <h6 style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.8
              }}>Portable ZIP</h6>
              {renderFileList(download.portable, 'portable', uniqueId)}
            </div>
            {(download.commitId || download.commitID) && (
              <div className="commit-id" style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <i className="bi bi-git"></i>
                <strong style={{ color: '#cccccc' }}>Commit ID:</strong>
                <a
                  href={`https://github.com/OpenWorshipApp/open-worship-app-dt/tree/${download.commitId || download.commitID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#e91e63',
                    textDecoration: 'none',
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {download.commitId || download.commitID}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getYoutubeInstallLink = () => {
    if (!versionInfo) return null;
    const recommended = downloadService.getRecommendedDownload(versionInfo.downloads);
    if (!recommended) return null;

    const platform = recommended.platform.toLowerCase();
    if (platform.includes('win')) {
      return 'https://youtu.be/o7ej5Od62qU';
    }
    if (platform.includes('mac')) {
      return 'https://youtu.be/wEQtSFY5LV8';
    }
    return null;
  };

  const getRecommendedDownload = () => {
    if (!versionInfo) return null;
    const recommended = downloadService.getRecommendedDownload(versionInfo.downloads);
    const youtubeLink = getYoutubeInstallLink();
    
    return recommended ? (
      <div>
        {youtubeLink && (
          <div style={{
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 60%, #673ab7 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: 'none',
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(233, 30, 99, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(233, 30, 99, 0.3)';
              }}
            >
              <i className="bi bi-youtube" style={{ fontSize: '24px', color: '#ff0000' }}></i>
              Watch how to install
            </a>
          </div>
        )}
        {renderDownloadCard(recommended, true)}
      </div>
    ) : null;
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
        
        {/* Top Navigation Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => onNavigate?.('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#5b7cff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(91, 124, 255, 0.1)';
              e.currentTarget.style.borderColor = '#5b7cff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="bi bi-house-fill" style={{ fontSize: '18px' }}></i>
            Go to Home
          </button>

          <a
            href="https://github.com/OpenWorshipApp/open-worship-app-dt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#5b7cff',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(91, 124, 255, 0.1)';
              e.currentTarget.style.borderColor = '#5b7cff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="bi bi-github" style={{ fontSize: '18px' }}></i>
            Fork me on Github
          </a>

          <a
            href="https://www.youtube.com/@owf2025"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#5b7cff',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(91, 124, 255, 0.1)';
              e.currentTarget.style.borderColor = '#5b7cff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="bi bi-youtube" style={{ fontSize: '18px', color: '#ff0000' }}></i>
            Youtube
          </a>
        </div>

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

        {/* Safari Browser Warning */}
        {isSafari && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%)',
            border: '2px solid #dc2626',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ 
              fontSize: '32px', 
              color: '#dc2626',
              marginTop: '4px'
            }}></i>
            <div>
              <h3 style={{ 
                color: '#fca5a5',
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                Safari Browser Detected
              </h3>
              <p style={{ 
                color: '#fecaca',
                fontSize: '15px',
                lineHeight: '1.6',
                margin: 0
              }}>
                Safari may fail to detect Apple CPU architecture correctly. We recommend using <strong>Chrome, Edge, or Firefox</strong> for better download experience.
              </p>
            </div>
          </div>
        )}

        {/* MacOS Installation Instructions */}
        {showMacInstructions && versionInfo && versionInfo.downloads.some(d => d.platform.toLowerCase().includes('mac')) && (
          <div ref={macInstructionsRef}>
            <MacInstructionComp 
            isArm64={versionInfo.downloads.some(d => 
              d.platform.toLowerCase().includes('mac') && 
              (d.architecture.toLowerCase().includes('arm') || d.architecture.toLowerCase().includes('apple silicon'))
            )}
          />
          </div>
        )}

        {getRecommendedDownload() && (
          <div className="mb-5">
            {getRecommendedDownload()}
          </div>
        )}

        <div className="card-grid grid-2">
          {versionInfo ? (
            versionInfo.downloads
              .filter((download) => {
                const recommended = downloadService.getRecommendedDownload(versionInfo.downloads);
                // Exclude the recommended download from the main list
                return !(recommended && 
                  download.platform === recommended.platform && 
                  download.architecture === recommended.architecture &&
                  download.version === recommended.version);
              })
              .map((download, index) => (
                <div key={`${download.platform}-${download.architecture}-${index}`}>
                  {renderDownloadCard(download)}
                </div>
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
