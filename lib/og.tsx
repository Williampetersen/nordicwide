import { ImageResponse } from "next/og";

import { socialImage } from "@/lib/social";

export const ogSize = { width: socialImage.width, height: socialImage.height };
export const ogAlt = socialImage.alt;

/**
 * Shared social image for Open Graph and Twitter. Satori (next/og) only
 * supports inline styles, which is why this file does not use CSS Modules.
 */
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1B1762 0%, #252078 45%, #4B48FF 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#FFFFFF" />
            <path d="M13 25.5V11.5l14 14V11.5" stroke="#252078" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M9.5 31h21" stroke="#4B48FF" strokeOpacity="0.6" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            Nordic<span style={{ fontWeight: 400, marginLeft: 10, opacity: 0.85 }}>Wide</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 960 }}>
            Turn Marketing Into a Long-Term Growth Engine
          </div>
          <div style={{ display: "flex", fontSize: 30, opacity: 0.85, maxWidth: 900 }}>
            Strategic marketing, advertising, websites and analytics for sustainable business growth.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, opacity: 0.75 }}>nordicwide.com · Copenhagen, Denmark</div>
      </div>
    ),
    ogSize,
  );
}
