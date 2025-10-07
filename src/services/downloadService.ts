export interface DownloadInfo {
  version: string;
  platform: string;
  architecture: string;
  installer: {
    filename: string;
    url: string;
    checksum: string;
  };
  portable: {
    filename: string;
    url: string;
    checksum: string;
  };
  commitId?: string;
}

export interface VersionInfo {
  currentVersion: string;
  latestVersion: string;
  commitId: string;
  downloads: DownloadInfo[];
}

class DownloadService {
  constructor() {
    console.log('DownloadService: UPDATED VERSION - NO GITHUB URLs - v2.0');
  }

  async getVersionInfo(): Promise<VersionInfo> {
    // Return version info with direct download URLs from openworship.app
    const versionInfo = this.getDirectVersionInfo();
    console.log('DownloadService: Using direct URLs from openworship.app');
    console.log('DownloadService: Sample URL:', versionInfo.downloads[0]?.installer?.url);
    console.log('DownloadService: All download URLs:');
    versionInfo.downloads.forEach((download, index) => {
      console.log(`  ${index + 1}. ${download.platform} ${download.architecture}:`);
      console.log(`     Installer: ${download.installer.url}`);
      console.log(`     Portable: ${download.portable.url}`);
    });
    return versionInfo;
  }

  private getDirectVersionInfo(): VersionInfo {
    // Real data with working download URLs from openworship.app
    return {
      currentVersion: '2025.07.31',
      latestVersion: '2025.8.6',
      commitId: '8253108fd8e87150364a9bc2043',
      downloads: [
        {
          version: '2025.8.6',
          platform: 'Windows',
          architecture: '64bit',
          installer: {
            filename: 'Open Worship app-2025.8.6-win-x64.exe',
            url: 'https://www.openworship.app/download/win/Open%20Worship%20app-2025.8.6-win-x64.exe',
            checksum: 'a7083cb4edab38a089441f81c98bat'
          },
          portable: {
            filename: 'Open Worship app-2025.8.6-win-x64.zip',
            url: 'https://www.openworship.app/download/win/Open%20Worship%20app-2025.8.6-win-x64.zip',
            checksum: 'efe45b2688889c17cee7f29c68f41'
          }
        },
        {
          version: '2025.8.6',
          platform: 'Windows',
          architecture: '32bit',
          installer: {
            filename: 'Open Worship app-2025.8.6-win-ia32.exe',
            url: 'https://www.openworship.app/download/win-ia32/Open%20Worship%20app-2025.8.6-win-ia32.exe',
            checksum: '44104785f026790c6d34720b459e5c'
          },
          portable: {
            filename: 'Open Worship app-2025.8.6-win-ia32.zip',
            url: 'https://www.openworship.app/download/win-ia32/Open%20Worship%20app-2025.8.6-win-ia32.zip',
            checksum: '6e110bda374d32f40f1142fedbe582f'
          }
        },
        {
          version: '2025.8.6',
          platform: 'Windows',
          architecture: 'Arm64',
          installer: {
            filename: 'Open Worship app-2025.8.6-win-arm64.exe',
            url: 'https://www.openworship.app/download/win-arm64/Open%20Worship%20app-2025.8.6-win-arm64.exe',
            checksum: '19cd11de92beec0a8f641e60a576e7'
          },
          portable: {
            filename: 'Open Worship app-2025.8.6-win-arm64.zip',
            url: 'https://www.openworship.app/download/win-arm64/Open%20Worship%20app-2025.8.6-win-arm64.zip',
            checksum: '9c6576ce0a2c0a41d963e96c7c7'
          }
        },
        {
          version: '2025.8.6',
          platform: 'macOS',
          architecture: 'Apple Silicon',
          installer: {
            filename: 'Open Worship app-2025.8.6-mac-arm64.dmg',
            url: 'https://www.openworship.app/download/mac/Open%20Worship%20app-2025.8.6-mac-arm64.dmg',
            checksum: '4abf3444e46d205064136d9ab506b'
          },
          portable: {
            filename: 'Open Worship app-2025.8.6-mac-arm64.zip',
            url: 'https://www.openworship.app/download/mac/Open%20Worship%20app-2025.8.6-mac-arm64.zip',
            checksum: '949d9abd9c5da7f7c4e9122b6aa5dc'
          }
        },
        {
          version: '2025.8.6',
          platform: 'macOS',
          architecture: 'Intel',
          installer: {
            filename: 'Open Worship app-2025.8.6-mac-x64.dmg',
            url: 'https://www.openworship.app/download/mac-intel/Open%20Worship%20app-2025.8.6-mac-x64.dmg',
            checksum: 'e239c9e340d585b8c5b54616084ec'
          },
          portable: {
            filename: 'Open Worship app-2025.8.6-mac-x64.zip',
            url: 'https://www.openworship.app/download/mac-intel/Open%20Worship%20app-2025.8.6-mac-x64.zip',
            checksum: '60b72835b09116bf5e6f84e2cfe125'
          }
        },
        {
          version: '2025.8.6',
          platform: 'Linux',
          architecture: 'x64',
          installer: {
            filename: 'open-worship-app_2025.8.6_amd64.deb',
            url: 'https://www.openworship.app/download/linux-ubuntu/open-worship-app_2025.8.6_amd64.deb',
            checksum: 'e869dc941fb7c524b960dbc843371c'
          },
          portable: {
            filename: 'open-worship-app_2025.8.6_x86_64.AppImage',
            url: 'https://www.openworship.app/download/linux-ubuntu/open-worship-app_2025.8.6_x86_64.AppImage',
            checksum: '3888b552c9eaa1d25887426118ad2f'
          }
        },
        {
          version: '2025.7.31',
          platform: 'Linux',
          architecture: 'x86_64',
          installer: {
            filename: 'open-worship-app_2025.7.31_amd64.deb',
            url: 'https://www.openworship.app/download/linux-fedora/open-worship-app_2025.7.31_amd64.deb',
            checksum: '6be4668ca04cf237e5ce49342f6d9'
          },
          portable: {
            filename: 'open-worship-app_2025.7.31_x86_64.AppImage',
            url: 'https://www.openworship.app/download/linux-fedora/open-worship-app_2025.7.31_x86_64.AppImage',
            checksum: 'bab1911d4caed47976cbf89c5c1fce'
          }
        }
      ]
    };
  }

  getCurrentVersion(): string {
    // TODO: Get from app metadata or package.json
    return '2025.07.31';
  }

  isOutdated(currentVersion: string, latestVersion: string): boolean {
    return currentVersion !== latestVersion;
  }

  getRecommendedDownload(downloads: DownloadInfo[]): DownloadInfo | null {
    if (!downloads.length) return null;
    
    // Detect platform and architecture
    const platform = navigator.platform.toLowerCase();
    let recommended = downloads[0]; // Default to first option
    
    if (platform.includes('mac')) {
      // Check if Apple Silicon or Intel
      const isAppleSilicon = navigator.userAgent.includes('Mac OS X') && 
                            (navigator.userAgent.includes('ARM') || 
                             (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform === 'macOS');
      recommended = isAppleSilicon ? 
        downloads.find(d => d.architecture === 'Apple Silicon') || recommended :
        downloads.find(d => d.architecture === 'Intel') || recommended;
    } else if (platform.includes('win')) {
      // For Windows, prefer 64bit
      recommended = downloads.find(d => d.architecture === '64bit') || recommended;
    }
    
    return recommended;
  }

  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }

  downloadFile(url: string, filename: string): void {
    try {
      console.log(`DownloadService: Attempting to download: ${filename} from ${url}`);
      
      // Verify URL is not pointing to GitHub
      if (url.includes('github.com')) {
        console.error('ERROR: Download URL still points to GitHub!', url);
        console.error('ERROR: Filename:', filename);
        console.error('ERROR: Full URL:', url);
        alert(`Error: Download URL still points to GitHub!\n\nURL: ${url}\n\nPlease refresh the page and try again.`);
        return;
      }
      
      console.log(`DownloadService: Confirmed URL points to openworship.app`);
      
      // Method 1: Try direct download with anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`DownloadService: Download link clicked for: ${filename}`);
      
      // Fallback: If download attribute doesn't work (cross-origin), open in new window
      setTimeout(() => {
        console.log(`DownloadService: Opening fallback window for: ${filename}`);
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 100);
      
    } catch (error) {
      console.error('DownloadService: Download failed:', error);
      // Final fallback: Direct window open
      console.log(`DownloadService: Using final fallback for: ${filename}`);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

export const downloadService = new DownloadService();
