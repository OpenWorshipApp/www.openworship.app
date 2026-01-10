interface GoogleTranslatePageProps {
  onNavigate?: (page: string) => void;
}

export default function GoogleTranslatePage({ onNavigate }: GoogleTranslatePageProps) {
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
            Google Translate Vigilant
          </h1>
          <p style={{ color: "#c8c8c8", fontSize: "18px", maxWidth: "720px", margin: "0 auto" }}>
            Some text in Open Worship App is translated using Google Translate. Machine translation
            can miss nuances, so please verify important content before presenting it.
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
          {[
            {
              title: "Review Accuracy",
              desc: "Double-check lyrics, scripture passages, and announcements that were auto-translated.",
              icon: "bi-search",
            },
            {
              title: "Context Matters",
              desc: "Idioms or local phrases may translate poorly. Adjust wording to match your congregation.",
              icon: "bi-chat-square-quote",
            },
            {
              title: "Invite Feedback",
              desc: "Encourage bilingual members to report mistakes so we can improve future translations.",
              icon: "bi-people",
            },
          ].map((card) => (
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
              <i className={`bi ${card.icon}`} style={{ fontSize: "28px", color: "#4cafef" }} />
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
          <h4 style={{ marginBottom: "12px", fontWeight: 600 }}>Spot an incorrect translation?</h4>
          <p style={{ color: "#c8c8c8", marginBottom: "20px" }}>
            Let us know about translation errors so we can provide better localized text in future
            releases.
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
            Report Translation Issue
          </button>
        </div>
      </div>
    </div>
  );
}
