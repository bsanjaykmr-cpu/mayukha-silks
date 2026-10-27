import React from "react";

interface VirtualCursorProps {
  x: number;
  y: number;
  isClicking?: boolean;
  label?: string;
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({
  x,
  y,
  isClicking = false,
  label
}) => {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 99999,
        transform: `translate(-4px, -4px) scale(${isClicking ? 0.9 : 1})`,
        transition: "transform 0.1s ease",
        filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))"
      }}
    >
      {/* Click ripple animation */}
      {isClicking && (
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: 36,
            height: 36,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #C5A059",
            backgroundColor: "rgba(197, 160, 89, 0.3)",
            animation: "pulse 0.3s ease-out forwards"
          }}
        />
      )}

      {/* Luxury Metallic Gold Saree Cursor SVG */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill="url(#goldGrad)"
          stroke="#4A121A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="goldGrad" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF4D0" />
            <stop offset="0.5" stopColor="#C5A059" />
            <stop offset="1" stopColor="#9A7730" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Action Pill Tag */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 14,
            background: "rgba(107, 29, 39, 0.95)",
            color: "#FFFDF9",
            border: "1px solid rgba(197, 160, 89, 0.6)",
            borderRadius: 999,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.8,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            backdropFilter: "blur(6px)"
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
