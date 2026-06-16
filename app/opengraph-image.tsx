import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mayane Cohen, Designer du sensible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5EFE6",
          padding: "60px 80px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Header mono */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A8A39B",
            fontFamily: "monospace",
          }}
        >
          <span>MAYANE COHEN · PORTFOLIO · 2026</span>
          <span
            style={{
              border: "1px solid #C97A6A",
              padding: "6px 14px",
              color: "#C97A6A",
            }}
          >
            Nº 01 · MAI 2026
          </span>
        </div>

        {/* Hairline */}
        <div
          style={{
            marginTop: 20,
            height: 1,
            background: "linear-gradient(90deg, transparent, #C97A6A66, transparent)",
          }}
        />

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40 }}>
          {/* Label section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#C97A6A",
              fontFamily: "monospace",
              marginBottom: 30,
            }}
          >
            <span style={{ display: "block", width: 48, height: 1, background: "#C97A6A" }} />
            <span>Designer · Sensible & Digital</span>
          </div>

          {/* Titre principal */}
          <div
            style={{
              fontSize: 130,
              lineHeight: 1,
              color: "#1A1A1A",
              fontStyle: "italic",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Designer</div>
            <div style={{ color: "#9F7437" }}>du sensible.</div>
          </div>

          {/* Sous-titre */}
          <div
            style={{
              marginTop: 30,
              fontSize: 28,
              color: "#6B6258",
              fontStyle: "italic",
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            Six projets. Le digital comme outil, le sensible comme boussole.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A8A39B",
            fontFamily: "monospace",
            marginTop: 30,
          }}
        >
          <span>Mayane Cohen</span>
          <span>mayane-cohen.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
