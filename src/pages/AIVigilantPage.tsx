import { useTranslation } from 'react-i18next';

interface AIVigilantPageProps {
  onNavigate?: (page: string) => void;
}

export default function AIVigilantPage({ onNavigate }: AIVigilantPageProps) {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('aiVigilant.cards.review.title'),
      desc: t('aiVigilant.cards.review.description'),
      icon: 'bi-check2-circle',
    },
    {
      title: t('aiVigilant.cards.accountability.title'),
      desc: t('aiVigilant.cards.accountability.description'),
      icon: 'bi-people',
    },
    {
      title: t('aiVigilant.cards.protect.title'),
      desc: t('aiVigilant.cards.protect.description'),
      icon: 'bi-shield-lock',
    },
  ];

  return (
    <div
      id="ai-vigilant"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a1a1a, #050505)",
        color: "#f5f5f5",
        padding: "120px 24px 80px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "48px",
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255,255,255,0.02)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #e91e63, #9c27b0)",
              boxShadow: "0 15px 40px rgba(233, 30, 99, 0.35)",
            }}
          >
            <i className="bi bi-shield-exclamation" style={{ fontSize: "32px" }} />
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              marginTop: "24px",
              marginBottom: "12px",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {t('aiVigilant.title')}
          </h1>
          <p style={{ color: "#c8c8c8", fontSize: "18px", maxWidth: "720px", margin: "0 auto" }}>
            {t('aiVigilant.subtitle')}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                padding: "28px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
              }}
            >
              <i className={`bi ${card.icon}`} style={{ fontSize: "28px", color: "#e91e63" }} />
              <h3 style={{ marginTop: "16px", marginBottom: "12px", fontSize: "20px" }}>{card.title}</h3>
              <p style={{ color: "#b0b0b0", lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h4 style={{ marginBottom: "12px", fontWeight: 600 }}>{t('aiVigilant.report.title')}</h4>
          <p style={{ color: "#c8c8c8", marginBottom: "20px" }}>
            {t('aiVigilant.report.description')}
          </p>
          <button
            onClick={() => onNavigate?.("contact")}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background: "linear-gradient(135deg, #e91e63, #9c27b0)",
              color: "#fff",
              boxShadow: "0 15px 35px rgba(233, 30, 99, 0.35)",
            }}
          >
            {t('aiVigilant.report.button')}
          </button>
        </div>
      </div>
    </div>
  );
}
