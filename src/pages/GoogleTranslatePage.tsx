import { useTranslation } from "react-i18next";

interface GoogleTranslatePageProps {
  onNavigate?: (page: string) => void;
}

export default function GoogleTranslatePage({ onNavigate }: GoogleTranslatePageProps) {
  const { t } = useTranslation();
  const cards = t("googleTranslate.cards", { returnObjects: true }) as Record<
    string,
    { title: string; description: string }
  >;
  const cardConfigs = [
    { key: "review", icon: "bi-search" },
    { key: "context", icon: "bi-chat-square-quote" },
    { key: "feedback", icon: "bi-people" },
  ];

  return (
    <div
      id="google-translate"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #050505 0%, #111119 100%)",
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
              background: "linear-gradient(135deg, #4caf50, #2196f3)",
              boxShadow: "0 15px 40px rgba(33, 150, 243, 0.35)",
            }}
          >
            <i className="bi bi-translate" style={{ fontSize: "32px" }} />
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
            {t("googleTranslate.title")}
          </h1>
          <p style={{ color: "#c8c8c8", fontSize: "18px", maxWidth: "720px", margin: "0 auto" }}>
            {t("googleTranslate.subtitle")}
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
          {cardConfigs.map(({ key, icon }) => (
            <div
              key={key}
              style={{
                padding: "28px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
              }}
            >
              <i className={`bi ${icon}`} style={{ fontSize: "28px", color: "#4cafef" }} />
              <h3 style={{ marginTop: "16px", marginBottom: "12px", fontSize: "20px" }}>
                {cards?.[key]?.title}
              </h3>
              <p style={{ color: "#b0b0b0", lineHeight: 1.6 }}>{cards?.[key]?.description}</p>
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
          <h4 style={{ marginBottom: "12px", fontWeight: 600 }}>{t("googleTranslate.report.title")}</h4>
          <p style={{ color: "#c8c8c8", marginBottom: "20px" }}>
            {t("googleTranslate.report.description")}
          </p>
          <button
            onClick={() => onNavigate?.("contact")}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background: "linear-gradient(135deg, #4caf50, #2196f3)",
              color: "#fff",
              boxShadow: "0 15px 35px rgba(33, 150, 243, 0.35)",
            }}
          >
            {t("googleTranslate.report.button")}
          </button>
        </div>
      </div>
    </div>
  );
}
