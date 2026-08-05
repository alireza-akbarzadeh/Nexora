import { ImageResponse } from "next/og";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_DESCRIPTION } from "@/lib/seo/site";

export const alt = "Nexora — Trade the Future of Finance";
export const size = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
export const contentType = "image/png";

/**
 * Default social-preview image for every route.
 *
 * A file-convention route (Satori-rendered via `next/og`, ships with
 * Next.js) rather than a static PNG — it stays in sync with the brand tokens
 * in `globals.css` as code, with no extra dependency or design pipeline.
 * Colours are duplicated as literals because Satori renders outside a
 * browser and cannot resolve CSS custom properties.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#090b0f",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,124,255,0.28), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(217,255,90,0.16)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(139,124,255,0.2)",
            filter: "blur(90px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #d9ff5a 0%, #b8f04a 45%, #8b7cff 100%)",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#f4f6f8" }}>
            Nexora
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#f4f6f8",
            maxWidth: 900,
            position: "relative",
          }}
        >
          Trade the Future of Finance
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#8d96a3",
            maxWidth: 820,
            position: "relative",
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  );
}
