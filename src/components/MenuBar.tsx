import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './MenuBar.css';

const MENU_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Docs', href: '#docs' },
  { label: 'Download', href: '#download' },
  { label: 'Shared', href: '#shared' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '/assets/flags/en.svg' },
  { code: 'us', name: 'English (US)', flag: '/assets/flags/us.svg' },
  { code: 'kh', name: 'ខ្មែរ', flag: '/assets/flags/kh.svg' },
  { code: 'es', name: 'Español', flag: '/assets/flags/es.svg' },
  { code: 'fr', name: 'Français', flag: '/assets/flags/fr.svg' },
  { code: 'de', name: 'Deutsch', flag: '/assets/flags/de.svg' },
  { code: 'zh', name: '中文', flag: '/assets/flags/zh.svg' },
  { code: 'pt', name: 'Português', flag: '/assets/flags/pt.svg' },
];

interface MenuBarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const MenuBar = ({ onNavigate, currentPage }: MenuBarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sync activeHash with currentPage prop
  useEffect(() => {
    if (currentPage) {
      setActiveHash(`#${currentPage}`);
    }
  }, [currentPage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (href: string) => {
    setNavbarOpen(false);
    setActiveHash(href);
    
    // Extract page name from href
    const page = href.replace('#', '');
    onNavigate?.(page);
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setLanguageDropdownOpen(false);
    // Here you would typically handle the language change logic
    console.log('Language changed to:', languageCode);
  };

  // Hide navbar only on home page
  console.log('Current page:', currentPage); // Debug log
  
  // Check if we're on home page
  if (currentPage === 'home' || !currentPage) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 custom-menubar" style={{ minHeight: 72 }}>
      <a className="navbar-brand d-flex align-items-center" href="#home" onClick={(e) => {
        e.preventDefault();
        handleMenuClick('#home');
      }}>
        <img 
          src="/icon.png" 
          alt="Open Worship Logo" 
          className="logo-img me-2" 
          style={{ width: '32px', height: '32px' }}
        />
        <span className="logo-text">Open Worship</span>
      </a>
      
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded={navbarOpen}
        aria-label="Toggle navigation"
        onClick={() => setNavbarOpen(open => !open)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className={`collapse navbar-collapse${navbarOpen ? ' show' : ''}`} id="navbarNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {MENU_ITEMS.map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link px-3 py-2 mx-1 rounded-3 text-decoration-none transition-all ${activeHash === item.href ? 'active' : ''}`}
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  handleMenuClick(item.href);
                }}
                style={{
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent'
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          
          {/* Language Selector */}
          <li className="nav-item dropdown" ref={dropdownRef}>
            <button
              className="nav-link dropdown-toggle language-selector px-3 py-2 mx-1"
              type="button"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={LANGUAGES.find(lang => lang.code === selectedLanguage)?.flag}
                alt={LANGUAGES.find(lang => lang.code === selectedLanguage)?.name}
                style={{ width: '20px', height: '15px', objectFit: 'cover' }}
              />
              <span>{selectedLanguage.toUpperCase()}</span>
              <i className="bi bi-chevron-down" style={{ fontSize: '12px' }}></i>
            </button>
            
            {languageDropdownOpen && (
              <div className="dropdown-menu language-dropdown show" style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                minWidth: '200px',
                zIndex: 1000,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}>
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    className="dropdown-item language-item"
                    onClick={() => handleLanguageChange(language.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      color: selectedLanguage === language.code ? '#e91e63' : 'rgba(255, 255, 255, 0.8)',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedLanguage !== language.code) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedLanguage !== language.code) {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      }
                    }}
                  >
                    <img 
                      src={language.flag}
                      alt={language.name}
                      style={{ width: '20px', height: '15px', objectFit: 'cover' }}
                    />
                    <span>{language.name}</span>
                    {selectedLanguage === language.code && (
                      <i className="bi bi-check" style={{ marginLeft: 'auto', color: '#e91e63' }}></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
