// Editorial SVG placeholders. The HANDOFF.md says these are placeholders to
// be replaced with real product photography (4/5 ratio, soft seamless bg).

import type { ProductKind } from "@/data/types";

type SilhouetteProps = {
  kind: ProductKind;
  tone: string;
  bg?: string;
  full?: boolean;
};

export function Silhouette({
  kind,
  tone,
  bg = "#F5F5F7",
  full,
}: SilhouetteProps) {
  const _accent = tone;
  const fullStyle = full ? { width: "100%", height: "100%" } : undefined;

  if (kind === "dress" || kind === "dress-long") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <path
          d="M160 70 Q140 90 130 120 Q108 180 96 360 L224 360 Q212 180 190 120 Q180 90 160 70 Z"
          fill={tone}
        />
        <circle cx="160" cy="60" r="14" fill={tone} opacity="0.9" />
        <path d="M148 78 Q160 92 172 78" stroke={_accent} strokeWidth="1" fill="none" opacity="0.4" />
        <path
          d="M160 130 Q156 220 148 358"
          stroke={_accent}
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />
      </svg>
    );
  }
  if (kind === "dress-short") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <path
          d="M160 80 Q138 100 130 130 Q118 170 100 250 L220 250 Q202 170 190 130 Q182 100 160 80 Z"
          fill={tone}
        />
        <circle cx="160" cy="68" r="13" fill={tone} opacity="0.9" />
        <rect x="142" y="250" width="8" height="100" fill={tone} opacity="0.85" />
        <rect x="170" y="250" width="8" height="100" fill={tone} opacity="0.85" />
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <path
          d="M120 160 Q120 110 160 110 Q200 110 200 160"
          stroke={tone}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="100" y="160" width="120" height="140" rx="6" fill={tone} />
        <line x1="100" y1="190" x2="220" y2="190" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        <rect x="152" y="220" width="16" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  if (kind === "scarf") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <rect x="80" y="120" width="160" height="160" fill={tone} transform="rotate(8 160 200)" />
        <rect
          x="80"
          y="120"
          width="160"
          height="160"
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          transform="rotate(8 160 200)"
        />
        <rect
          x="92"
          y="132"
          width="136"
          height="136"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          transform="rotate(8 160 200)"
        />
      </svg>
    );
  }
  if (kind === "jewel") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <circle cx="160" cy="200" r="64" fill="none" stroke={tone} strokeWidth="6" />
        <circle cx="160" cy="136" r="6" fill={tone} />
      </svg>
    );
  }
  if (kind === "shoe") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <path
          d="M80 240 Q80 200 120 200 L220 200 Q240 200 240 220 L240 240 Q220 248 200 248 L100 248 Q80 248 80 240 Z"
          fill={tone}
        />
        <path d="M220 200 L228 168 Q228 158 220 158 Q210 158 210 170 L210 200 Z" fill={tone} />
      </svg>
    );
  }
  if (kind === "tie") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={fullStyle}>
        <rect width="320" height="400" fill={bg} />
        <path d="M148 96 L172 96 L168 120 L152 120 Z" fill={tone} />
        <path
          d="M152 122 L168 122 L182 300 Q160 330 138 300 Z"
          fill={tone}
        />
        <path d="M152 122 L168 122 L160 150 Z" fill="rgba(255,255,255,0.12)" />
        <path
          d="M156 160 Q160 230 160 290"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 400" style={fullStyle}>
      <rect width="320" height="400" fill={bg} />
    </svg>
  );
}

export function HeroPhoto() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="herobg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2EBDC" />
          <stop offset="1" stopColor="#D8C7AA" />
        </linearGradient>
        <linearGradient id="herofloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9B894" />
          <stop offset="1" stopColor="#A89677" />
        </linearGradient>
        <radialGradient id="herospot" cx="0.65" cy="0.3" r="0.7">
          <stop offset="0" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#herobg)" />
      <rect y="700" width="1600" height="200" fill="url(#herofloor)" opacity="0.55" />
      <rect width="1600" height="900" fill="url(#herospot)" />
      <g transform="translate(1080 260)">
        <ellipse cx="0" cy="640" rx="220" ry="14" fill="rgba(0,0,0,0.07)" />
        <path
          d="M0 0 Q-30 60 -42 130 Q-58 220 -82 460 Q-94 580 -120 640 L120 640 Q94 580 82 460 Q58 220 42 130 Q30 60 0 0 Z"
          fill="#1D1D1F"
        />
        <path d="M0 20 Q-4 250 -40 630" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M0 20 Q4 250 40 630" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M-42 -8 Q0 -18 42 -8 L40 8 Q0 -2 -40 8 Z" fill="#1D1D1F" />
        <path d="M-38 -10 Q-10 -28 0 -28 Q10 -28 38 -10" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
        <ellipse cx="0" cy="-56" rx="32" ry="38" fill="#E5C9A6" />
        <path d="M-32 -76 Q-36 -94 -8 -96 Q22 -98 30 -78 L30 -52 Q24 -64 0 -68 Q-22 -64 -32 -52 Z" fill="#2A1F18" />
        <path
          d="M-46 4 Q-70 80 -78 200"
          stroke="#1D1D1F"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M46 4 Q70 80 78 200"
          stroke="#1D1D1F"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
      </g>
      <rect width="1600" height="900" fill="rgba(0,0,0,0.02)" />
    </svg>
  );
}

export function EditorialPhoto({
  tone = "#E5DFD0",
  accent = "#1D1D1F",
}: { tone?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="ed-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone} />
          <stop offset="1" stopColor="#C5BBA3" />
        </linearGradient>
      </defs>
      <rect width="800" height="640" fill="url(#ed-bg)" />
      <rect x="60" y="60" width="680" height="520" fill="none" stroke="rgba(0,0,0,0.05)" />
      <g transform="translate(400 360)" opacity="0.95">
        <path
          d="M-200 0 Q-120 -40 0 -30 Q120 -20 200 -10"
          stroke={accent}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
        <ellipse cx="-180" cy="0" rx="60" ry="36" fill="#E5C9A6" />
        <ellipse cx="180" cy="20" rx="60" ry="36" fill="#E5C9A6" />
        <path d="M-30 -40 L30 -30 L36 30 L-36 40 Z" fill={accent} opacity="0.85" />
        <line x1="-30" y1="-40" x2="40" y2="-50" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
      </g>
      <rect width="800" height="640" fill="rgba(0,0,0,0.015)" />
    </svg>
  );
}

export function UniversArt({ kind }: { kind: "robes" | "sacs" | "access" }) {
  if (kind === "robes") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="u-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8DDC9" />
            <stop offset="1" stopColor="#C8B79B" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#u-r)" />
        <g transform="translate(200 130)">
          <ellipse cx="0" cy="320" rx="120" ry="8" fill="rgba(0,0,0,0.06)" />
          <path
            d="M0 0 Q-18 40 -28 80 Q-44 180 -70 320 L70 320 Q44 180 28 80 Q18 40 0 0 Z"
            fill="#1D1D1F"
          />
          <ellipse cx="0" cy="-22" rx="20" ry="22" fill="#E5C9A6" />
          <path d="M-22 -40 Q-22 -52 0 -54 Q22 -52 22 -40 L22 -22 Q12 -32 0 -32 Q-12 -32 -22 -22 Z" fill="#2A1F18" />
        </g>
      </svg>
    );
  }
  if (kind === "sacs") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="u-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0E8DA" />
            <stop offset="1" stopColor="#D8C7AA" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#u-s)" />
        <g transform="translate(200 230)">
          <ellipse cx="0" cy="180" rx="140" ry="10" fill="rgba(0,0,0,0.06)" />
          <path
            d="M-90 -30 Q-90 -90 -30 -90 Q30 -90 30 -30"
            stroke="#A6855E"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="-110" y="-30" width="220" height="200" rx="8" fill="#A6855E" />
          <line x1="-110" y1="20" x2="110" y2="20" stroke="rgba(0,0,0,0.18)" />
          <rect x="-12" y="50" width="24" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="u-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EBD9" />
          <stop offset="1" stopColor="#D8C18C" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#u-a)" />
      <g transform="translate(200 250)">
        <rect x="-160" y="-100" width="200" height="200" fill="#C9A96E" transform="rotate(-12 -60 0)" />
        <circle cx="60" cy="-40" r="60" fill="none" stroke="#1D1D1F" strokeWidth="6" />
        <circle cx="60" cy="-100" r="6" fill="#1D1D1F" />
        <rect x="40" y="60" width="120" height="20" rx="10" fill="#1D1D1F" />
        <rect x="-100" y="80" width="60" height="40" rx="8" fill="#1D1D1F" />
      </g>
    </svg>
  );
}
