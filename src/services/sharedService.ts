export interface AssetInfo {
  images: string[];
  videos: string[];
}

class SharedService {
  private rootUrl: string;

  constructor() {
    const isDev = window.location.hostname === 'localhost';
    this.rootUrl = isDev 
      ? 'https://www.openworship.app' 
      : window.location.origin;
    console.log('SharedService: Using root URL:', this.rootUrl);
  }

  async getAssetInfo(): Promise<AssetInfo | null> {
    const cacheBuster = new Date().getTime();
    const url = `${this.rootUrl}/shared/assets.json?_=${cacheBuster}`;
    
    try {
      console.log('SharedService: Fetching assets from:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('SharedService: Assets loaded:', data);
      return data;
    } catch (error) {
      console.error('SharedService: Failed to fetch asset info:', error);
      return null;
    }
  }

  getAssetUrl(filePath: string): string {
    return `${this.rootUrl}/shared/${filePath}`;
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  async downloadAsset(filePath: string): Promise<void> {
    const url = this.getAssetUrl(filePath);
    const filename = this.getFileName(filePath);
    
    try {
      console.log(`SharedService: Downloading ${filename} from ${url}`);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`SharedService: Download initiated for ${filename}`);
    } catch (error) {
      console.error('SharedService: Download failed:', error);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

export const sharedService = new SharedService();
