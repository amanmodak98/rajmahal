"use client";

import Link from "next/link";
import { useRef } from "react";
import { hotel } from "@/lib/content";
import { useParallaxY } from "@/lib/useParallax";

export function MapThree() {
  const ref = useRef<HTMLDivElement>(null);
  const transform = useParallaxY(ref, 40);

  return (
    <div ref={ref} className="relative w-full">
      <div
        style={{ transform, willChange: "transform" }}
        className="relative aspect-[16/9] max-w-5xl mx-auto rounded-[28px] border border-gold-rule bg-cream overflow-hidden shadow-vanta"
      >
        <svg viewBox="0 0 1000 540" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="topo" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(140,110,51,0.16)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="spot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(138,26,26,0.22)" />
              <stop offset="60%" stopColor="rgba(138,26,26,0)" />
            </radialGradient>
          </defs>
          <rect width="1000" height="540" fill="url(#topo)" />

          {/* Highway NH-73 line, horizontal */}
          <path d="M 0 240 C 250 235, 500 250, 750 245 L 1000 248" stroke="rgba(138,26,26,0.55)" strokeWidth="2" fill="none" />
          <text x="60" y="225" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(138,26,26,0.75)" letterSpacing="2">
            DELHI · DEHRADUN HIGHWAY · NH-73
          </text>
          <text x="60" y="262" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(140,110,51,0.55)" letterSpacing="2">
            KM 58 / ROORKEE
          </text>

          {/* Ganges corridor, lower diagonal */}
          <path d="M -50 380 C 200 350, 400 360, 1050 410" stroke="rgba(140,110,51,0.42)" strokeWidth="1.2" fill="none" strokeDasharray="4 6" />
          <text x="60" y="372" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(140,110,51,0.65)" letterSpacing="2">
            GANGES CORRIDOR
          </text>

          {/* Three points of interest around the hotel star */}
          {[
            { x: 540, y: 245, label: "IIT Roorkee", note: "2 km" },
            { x: 740, y: 200, label: "Roorkee town", note: "5 km" },
            { x: 880, y: 290, label: "Haridwar", note: "12 km" },
            { x: 240, y: 245, label: "Delhi", note: "190 km" },
            { x: 760, y: 80, label: "Dehradun", note: "70 km" },
            { x: 320, y: 420, label: "Rishikesh", note: "30 km" },
          ].map((p, i) => {
            const cx = p.x, cy = p.y;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={28} fill="url(#spot)" />
                <circle cx={cx} cy={cy} r={3} fill={i === 1 ? "#8A1A1A" : "#9A7530"} />
                <text x={cx + 12} y={cy + 5} fontFamily="Cormorant Garamond" fontSize={i === 1 ? "16" : "13"} fill={i === 1 ? "#8A1A1A" : "#1B1410"} style={{ fontStyle: i === 1 ? "italic" : "normal" }}>
                  {p.label}  ·  {p.note}
                </text>
              </g>
            );
          })}

          {/* Hotel star - the centre of the map, larger */}
          <g transform="translate(640, 245)">
            <circle r="44" fill="url(#spot)" />
            <circle r="20" fill="none" stroke="rgba(138,26,26,0.4)" strokeWidth="0.6" />
            <path d="M 0 -14 L 4 -4 L 14 -4 L 6 3 L 9 13 L 0 7 L -9 13 L -6 3 L -14 -4 L -4 -4 Z" fill="#8A1A1A" />
            <text x="0" y="-30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A1A1A" letterSpacing="3">
              HOTEL RAJMAHAL
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
