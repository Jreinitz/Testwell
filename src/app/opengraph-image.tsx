import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TestWell — Affordable Lab Tests. No Doctor Visit Required.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f0fdfa 50%, #f8fafc 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(13,148,136,0.07) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo + Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #0d9488, rgba(13,148,136,0.8))",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(13,148,136,0.25)",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "36px",
                fontWeight: 700,
              }}
            >
              T
            </span>
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Test
            <span style={{ color: "#0d9488" }}>Well</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#0f172a",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Affordable Lab Tests.
          <br />
          <span style={{ color: "#0d9488" }}>No Doctor Visit Required.</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Save up to 80% on physician-reviewed blood tests at Quest &
          Labcorp locations across Florida & Texas.
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {[
            { value: "100+", label: "Lab Tests" },
            { value: "4,000+", label: "Locations" },
            { value: "80%", label: "Avg. Savings" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#0d9488",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            fontSize: "18px",
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          test-well.com
        </div>
      </div>
    ),
    { ...size }
  );
}
