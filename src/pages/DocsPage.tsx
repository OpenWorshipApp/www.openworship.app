import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollToTopButton from '../components/ScrollToTopButton';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/modern-footer.scss';

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

interface DocsPageProps {
  onNavigate?: (page: string) => void;
}

interface CrossSpec {
  top: string;
  left: string;
  rotate: number;
  stroke: string;
}

interface OverviewFeature {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  border: string;
  shadow: string;
  glow: string;
}

interface QuickStartStep {
  heading: string;
  body?: string;
  list?: string[];
}

interface OverviewFeatureConfig {
  icon: string;
  titleKey: string;
  descKey: string;
  gradient: string;
  border: string;
  shadow: string;
  glow: string;
}

const crossPalette: CrossSpec[] = [
  { top: '8%', left: '18%', rotate: -12, stroke: 'rgba(236, 72, 153, 0.4)' },
  { top: '18%', left: '72%', rotate: 20, stroke: 'rgba(79, 70, 229, 0.35)' },
  { top: '36%', left: '32%', rotate: -28, stroke: 'rgba(14, 165, 233, 0.4)' },
  { top: '54%', left: '82%', rotate: 8, stroke: 'rgba(20, 184, 166, 0.4)' },
  { top: '70%', left: '22%', rotate: 18, stroke: 'rgba(96, 165, 250, 0.35)' },
  { top: '46%', left: '58%', rotate: -6, stroke: 'rgba(236, 72, 153, 0.3)' },
];

const overviewFeatureConfigs: OverviewFeatureConfig[] = [
  {
    icon: '🎵',
    titleKey: 'docs.overviewFeatures.song.title',
    descKey: 'docs.overviewFeatures.song.desc',
    gradient: 'linear-gradient(135deg, rgba(255,110,199,0.12), rgba(236,72,153,0.08))',
    border: 'rgba(255,110,199,0.35)',
    shadow: 'rgba(255,110,199,0.25)',
    glow: '0 4px 10px rgba(255,110,199,0.35)',
  },
  {
    icon: '✝️',
    titleKey: 'docs.overviewFeatures.scripture.title',
    descKey: 'docs.overviewFeatures.scripture.desc',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08))',
    border: 'rgba(99,102,241,0.4)',
    shadow: 'rgba(59,130,246,0.25)',
    glow: '0 4px 10px rgba(99,102,241,0.35)',
  },
  {
    icon: '🕊️',
    titleKey: 'docs.overviewFeatures.live.title',
    descKey: 'docs.overviewFeatures.live.desc',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(45,212,191,0.08))',
    border: 'rgba(45,212,191,0.35)',
    shadow: 'rgba(20,184,166,0.25)',
    glow: '0 4px 10px rgba(16,185,129,0.35)',
  },
  {
    icon: '⛪',
    titleKey: 'docs.overviewFeatures.customization.title',
    descKey: 'docs.overviewFeatures.customization.desc',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(248,113,113,0.08))',
    border: 'rgba(251,191,36,0.35)',
    shadow: 'rgba(248,113,113,0.25)',
    glow: '0 4px 10px rgba(251,191,36,0.32)',
  },
];

const headingBorderImage = 'linear-gradient(to right, rgba(59,130,246,0.35), rgba(99,102,241,0.3)) 1';
const headingIconColor = '#7dd3fc';
const infoCardBackground = 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,185,129,0.08))';
const infoCardBorder = '1px solid rgba(59,130,246,0.25)';
const linkAccentColor = '#7dd3fc';

const DocsPage = ({ onNavigate }: DocsPageProps) => {
  const { t } = useTranslation();
  const navigationItems: NavItem[] = [
    {
      id: 'getting-started',
      title: t('docs.nav.gettingStarted.title'),
      children: [
        { id: 'overview', title: t('docs.nav.gettingStarted.items.overview') },
        { id: 'installation', title: t('docs.nav.gettingStarted.items.installation') },
        { id: 'quick-start', title: t('docs.nav.gettingStarted.items.quickStart') },
        { id: 'system-requirements', title: t('docs.nav.gettingStarted.items.systemRequirements') }
      ]
    },
    {
      id: 'user-guide',
      title: t('docs.nav.userGuide.title'),
      children: [
        { id: 'basic-usage', title: t('docs.nav.userGuide.items.basicUsage') },
        { id: 'worship-sets', title: t('docs.nav.userGuide.items.worshipSets') },
        { id: 'bible-display', title: t('docs.nav.userGuide.items.bibleDisplay') },
        { id: 'presentation-mode', title: t('docs.nav.userGuide.items.presentationMode') },
        { id: 'slide-editor', title: t('docs.nav.userGuide.items.slideEditor') }
      ]
    },
    {
      id: 'features',
      title: t('docs.nav.features.title'),
      children: [
        { id: 'song-management', title: t('docs.nav.features.items.songManagement') },
        { id: 'bible-search', title: t('docs.nav.features.items.bibleSearch') },
        { id: 'live-presentation', title: t('docs.nav.features.items.livePresentation') },
        { id: 'multi-screen', title: t('docs.nav.features.items.multiScreen') },
        { id: 'background-media', title: t('docs.nav.features.items.backgroundMedia') }
      ]
    },
    {
      id: 'advanced',
      title: t('docs.nav.advanced.title'),
      children: [
        { id: 'keyboard-shortcuts', title: t('docs.nav.advanced.items.keyboardShortcuts') },
        { id: 'troubleshooting', title: t('docs.nav.advanced.items.troubleshooting') },
        { id: 'contributing', title: t('docs.nav.advanced.items.contributing') },
        { id: 'tech-stack', title: t('docs.nav.advanced.items.techStack') }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const overviewFeatures: OverviewFeature[] = overviewFeatureConfigs.map(
    ({ icon, titleKey, descKey, gradient, border, shadow, glow }) => ({
      icon,
      title: t(titleKey),
      desc: t(descKey),
      gradient,
      border,
      shadow,
      glow,
    })
  );

  const installationOptions = t('docs.installation.downloadOptions', { returnObjects: true }) as string[];
  const quickStartSteps = t('docs.quickStart.steps', { returnObjects: true }) as QuickStartStep[];
  const systemMinimum = t('docs.systemRequirements.minimum', { returnObjects: true }) as string[];
  const systemDev = t('docs.systemRequirements.dev', { returnObjects: true }) as string[];
  const basicUsageAreas = t('docs.basicUsage.areas', { returnObjects: true }) as string[];
  const worshipSetSteps = t('docs.worshipSets.addingSongsSteps', { returnObjects: true }) as string[];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const filteredNavItems = navigationItems.map(section => ({
    ...section,
    children: section.children?.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => 
    section.children && section.children.length > 0
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const htmlElement = section as HTMLElement;
        const sectionTop = htmlElement.offsetTop;
        const sectionHeight = htmlElement.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
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

        {/* Christian Cross Pattern Overlay */}
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          {/* Decorative Crosses */}
          {crossPalette.map((cross, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: cross.top,
              left: cross.left,
              opacity: 0.03,
              transform: `rotate(${cross.rotate}deg)`
            }}>
              <div style={{
                width: '2px',
                height: '35px',
                background: `linear-gradient(to bottom, transparent, ${cross.stroke}, transparent)`,
                margin: '0 auto'
              }}></div>
              <div style={{
                width: '25px',
                height: '2px',
                background: `linear-gradient(to right, transparent, ${cross.stroke}, transparent)`,
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}></div>
            </div>
          ))}
        </div>

        {/* Light Rays from Above */}
        <div style={{
          position: 'fixed',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200%',
          height: '100%',
          background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.05) 30%, rgba(236, 72, 153, 0.04) 55%, transparent 75%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'flex', position: 'relative', zIndex: 10, paddingTop: '72px' }}>
          {/* Sidebar */}
          <nav style={{
            width: '280px',
            height: 'calc(100vh - 72px)',
            background: 'linear-gradient(180deg, rgba(3, 5, 15, 0.97), rgba(10, 12, 25, 0.95), rgba(8, 12, 20, 0.92))',
            borderRight: '1px solid rgba(148, 163, 184, 0.25)',
            position: 'fixed',
            top: '72px',
            overflowY: 'auto',
            padding: '20px 0',
            zIndex: 999,
            boxShadow: '0 0 30px rgba(2, 6, 23, 0.4)',
            backdropFilter: 'blur(14px)',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          className="hide-scrollbar"
          >
            {/* Search Box */}
            <div style={{
              padding: '0 20px 20px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '20px'
            }}>
              <input
                type="text"
                placeholder={t('docs.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>

            {/* Navigation Sections */}
            {filteredNavItems.map(section => (
              <div key={section.id} style={{ marginBottom: '30px' }}>
                <div style={{
                  color: '#9da3c4',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '0 20px',
                  marginBottom: '10px'
                }}>
                  {section.title}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {section.children?.map(item => (
                    <li key={item.id} style={{ marginBottom: '2px' }}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        style={{
                          display: 'block',
                          width: '100%',
                          color: activeSection === item.id ? '#e91e63' : '#cccccc',
                          backgroundColor: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          padding: '8px 20px',
                          fontSize: '14px',
                          transition: 'all 0.2s ease',
                          borderLeft: activeSection === item.id ? '3px solid #e91e63' : '3px solid transparent',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeSection !== item.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#cccccc';
                          }
                        }}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Main Content */}
          <main style={{
            marginLeft: '280px',
            padding: '40px',
            paddingTop: '20px',
            maxWidth: '1200px',
            minHeight: 'calc(100vh - 72px)',
            flex: 1
          }}>
            <div style={{ maxWidth: '800px' }}>
              {/* Overview Section */}
              <section id="overview">
                <h1 style={{
                  fontSize: 'clamp(42px, 7vw, 64px)',
                  fontWeight: '800',
                  marginBottom: '24px',
                  lineHeight: '1.1',
                  background: 'linear-gradient(90deg, #ff6b9d 0%, #e91e63 25%, #c2185b 40%, #9c27b0 70%, #7b1fa2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {t('docs.hero.title')}
                </h1>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.hero.intro')}
                </p>

                {/* Inspirational Bible Verse */}
                <div style={{
                  maxWidth: '100%',
                  margin: '24px 0',
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(147,197,253,0.08))',
                  borderLeft: '3px solid',
                  borderImage: 'linear-gradient(to bottom, #38bdf8, #a78bfa) 1',
                  borderRadius: '6px'
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: '#bfdbfe',
                    fontStyle: 'italic',
                    lineHeight: '1.7',
                    marginBottom: '8px'
                  }}>
                    {t('docs.hero.verse.text')}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#888',
                    textAlign: 'right',
                    fontWeight: '600',
                    marginBottom: 0
                  }}>
                    {t('docs.hero.verse.reference')}
                  </p>
                </div>
                
                <div style={{
                  background: infoCardBackground,
                  border: infoCardBorder,
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '20px 0',
                  color: '#ffffff'
                }}>
                  <span style={{ color: headingIconColor, marginRight: '8px' }}>✝️</span>
                  <strong>{t('docs.hero.calloutPrefix')}</strong> <button 
                    onClick={() => scrollToSection('quick-start')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: linkAccentColor,
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    {t('docs.hero.calloutLink')}
                  </button> {t('docs.hero.calloutSuffix')}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px',
                  margin: '40px 0'
                }}>
                  {overviewFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: `1px solid ${feature.border}`,
                        borderRadius: '20px',
                        padding: '32px 28px',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(20px)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = feature.gradient;
                        e.currentTarget.style.borderColor = feature.border;
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = `0 20px 40px ${feature.shadow}, 0 10px 20px rgba(15,23,42,0.35)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
                        e.currentTarget.style.borderColor = feature.border;
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(148,163,184,0.04) 60%, rgba(15,23,42,0.03) 100%)',
                        borderRadius: '20px',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          fontSize: '48px', 
                          marginBottom: '20px',
                          filter: feature.glow
                        }}>
                          {feature.icon}
                        </div>
                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '20px',
                          fontWeight: '600',
                          marginBottom: '16px',
                          lineHeight: '1.3'
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          color: '#aaa',
                          fontSize: '15px',
                          marginBottom: '0',
                          lineHeight: '1.5'
                        }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: headingBorderImage,
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: headingIconColor, opacity: 0.8, fontSize: '24px' }}>📥</span>
                  {t('docs.installation.title')}
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.installation.intro')}
                </p>

                <h3 style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '500',
                  margin: '30px 0 15px 0'
                }}>
                  {t('docs.installation.downloadOptionsHeading')}
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  {installationOptions.map((option, idx) => (
                    <li key={`install-option-${idx}`} style={{ marginBottom: '8px' }}>
                      {option}
                    </li>
                  ))}
                </ul>

                <div style={{
                  background: infoCardBackground,
                  border: infoCardBorder,
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '20px 0',
                  color: '#ffffff'
                }}>
                  <span style={{ color: headingIconColor, marginRight: '8px' }}>🙏</span>
                  {t('docs.installation.ctaPrefix')} <button 
                    onClick={() => onNavigate?.('download')}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: linkAccentColor, 
                      textDecoration: 'underline', 
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    {t('docs.installation.ctaLink')}
                  </button> {t('docs.installation.ctaSuffix')}
                </div>
              </section>

              {/* Quick Start Section */}
              <section id="quick-start">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: headingBorderImage,
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: headingIconColor, opacity: 0.8, fontSize: '24px' }}>🚀</span>
                  {t('docs.quickStart.title')}
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.quickStart.intro')}
                </p>

                {quickStartSteps.map((step, index) => (
                  <div key={`quick-step-${index}`}>
                    <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                      {`${index + 1}. ${step.heading}`}
                    </h3>
                    {step.body && (
                      <p style={{
                        color: '#ffffff',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '16px'
                      }}>
                        {step.body}
                      </p>
                    )}
                    {step.list && (
                      <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                        {step.list.map((item, itemIdx) => (
                          <li key={`quick-step-${index}-item-${itemIdx}`} style={{ marginBottom: '8px' }}>
                            {item}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </section>

              {/* System Requirements Section */}
              <section id="system-requirements">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: headingBorderImage,
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: headingIconColor, opacity: 0.8, fontSize: '24px' }}>💻</span>
                  {t('docs.systemRequirements.title')}
                </h2>
                
                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  {t('docs.systemRequirements.minimumHeading')}
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  {systemMinimum.map((requirement, idx) => (
                    <li key={`system-min-${idx}`} style={{ marginBottom: '8px' }}>
                      {requirement}
                    </li>
                  ))}
                </ul>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  {t('docs.systemRequirements.devHeading')}
                </h3>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  {systemDev.map((devItem, idx) => (
                    <li key={`system-dev-${idx}`} style={{ marginBottom: '8px' }}>
                      {devItem}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Basic Usage Section */}
              <section id="basic-usage">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: headingBorderImage,
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: headingIconColor, opacity: 0.8, fontSize: '24px' }}>📚</span>
                  {t('docs.basicUsage.title')}
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.basicUsage.intro')}
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  {t('docs.basicUsage.mainInterfaceHeading')}
                </h3>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.basicUsage.mainInterfaceIntro')}
                </p>
                <ul style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  {basicUsageAreas.map((area, idx) => (
                    <li key={`basic-area-${idx}`} style={{ marginBottom: '8px' }}>
                      {area}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Creating Worship Sets Section */}
              <section id="worship-sets">
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '400',
                  margin: '40px 0 20px 0',
                  borderBottom: '1px solid',
                  borderImage: headingBorderImage,
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: headingIconColor, opacity: 0.8, fontSize: '24px' }}>🎵</span>
                  {t('docs.worshipSets.title')}
                </h2>
                <p style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {t('docs.worshipSets.intro')}
                </p>

                <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '500', margin: '30px 0 15px 0' }}>
                  {t('docs.worshipSets.addingSongsHeading')}
                </h3>
                <ol style={{ color: '#ffffff', margin: '16px 0', paddingLeft: '24px' }}>
                  {worshipSetSteps.map((step, idx) => (
                    <li key={`worship-step-${idx}`} style={{ marginBottom: '8px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>
            </div>

          </main>

          <ScrollToTopButton />
        </div>

        {/* Footer positioned after sidebar, full width */}
        <footer className="modern-footer" style={{
          marginLeft: '280px',
          marginTop: '0',
          borderTop: '2px solid',
          borderImage: 'linear-gradient(to right, rgba(233, 30, 99, 0.4), rgba(156, 39, 176, 0.4), rgba(103, 58, 183, 0.3)) 1',
          padding: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="footer-content">
            <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#ce93d8', opacity: 0.8 }}>✝️</span>
              Open Worship
            </div>
            <div className="footer-links">
              <a href="#" onClick={() => onNavigate?.('home')}>{t('docs.footer.links.home')}</a>
              <a href="#" onClick={() => onNavigate?.('download')}>{t('docs.footer.links.download')}</a>
              <a href="#" onClick={() => onNavigate?.('about')}>{t('docs.footer.links.about')}</a>
            </div>
            <div className="footer-socials">
              <a href="https://github.com/OpenWorshipApp/open-worship-app-dt" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-discord"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            {t('docs.footer.copyright')}
          </div>
        </footer>
      </div>
    </>
  );
};

export default DocsPage;
