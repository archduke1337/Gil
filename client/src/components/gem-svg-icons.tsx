interface GemSVGProps {
  className?: string;
  size?: number;
}

export const DiamondSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="diamondMainGradient" cx="35%" cy="25%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#f8fcff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#e1f5fe" stopOpacity="0.9" />
        <stop offset="75%" stopColor="#b3e5fc" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#81d4fa" stopOpacity="0.7" />
      </radialGradient>
      <linearGradient id="diamondReflection" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#e3f2fd" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#bbdefb" stopOpacity="0.2" />
      </linearGradient>
      <filter id="diamondBrilliance">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Main diamond shape */}
    <path
      d="M32 6 L50 22 L32 58 L14 22 Z"
      fill="url(#diamondMainGradient)"
      stroke="#90caf9"
      strokeWidth="0.8"
      filter="url(#diamondBrilliance)"
    />
    
    {/* Top facets */}
    <path d="M14 22 L32 22 L50 22" stroke="#64b5f6" strokeWidth="0.6" opacity="0.7"/>
    <path d="M20 14 L32 22 L44 14" stroke="#64b5f6" strokeWidth="0.6" opacity="0.6"/>
    <path d="M26 10 L32 22 L38 10" stroke="#42a5f5" strokeWidth="0.5" opacity="0.5"/>
    
    {/* Side facets */}
    <path d="M14 22 L32 36 L32 22" fill="url(#diamondReflection)" opacity="0.6"/>
    <path d="M50 22 L32 36 L32 22" fill="url(#diamondReflection)" opacity="0.4"/>
    
    {/* Bottom facets */}
    <path d="M32 22 L32 45" stroke="#29b6f6" strokeWidth="0.4" opacity="0.5"/>
    <path d="M20 35 L32 45 L44 35" stroke="#29b6f6" strokeWidth="0.4" opacity="0.4"/>
    
    {/* Brilliant highlights */}
    <ellipse cx="28" cy="18" rx="3" ry="2" fill="#ffffff" opacity="0.9"/>
    <ellipse cx="36" cy="20" rx="2" ry="1.5" fill="#ffffff" opacity="0.7"/>
  </svg>
);

export const RubySVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="rubyMainGradient" cx="35%" cy="25%">
        <stop offset="0%" stopColor="#ff1744" />
        <stop offset="25%" stopColor="#e91e63" />
        <stop offset="50%" stopColor="#d32f2f" />
        <stop offset="75%" stopColor="#c62828" />
        <stop offset="100%" stopColor="#b71c1c" />
      </radialGradient>
      <radialGradient id="rubyHighlight" cx="40%" cy="20%">
        <stop offset="0%" stopColor="#ff8a80" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#ff5722" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#d32f2f" stopOpacity="0.1" />
      </radialGradient>
      <filter id="rubyBrilliance">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main ruby crystal shape */}
    <path
      d="M32 8 L46 20 L48 32 L46 44 L32 56 L18 44 L16 32 L18 20 Z"
      fill="url(#rubyMainGradient)"
      stroke="#ad1457"
      strokeWidth="0.8"
      filter="url(#rubyBrilliance)"
    />
    
    {/* Crystal facets */}
    <path d="M18 20 L32 20 L46 20" stroke="#c2185b" strokeWidth="0.6" opacity="0.6"/>
    <path d="M16 32 L32 32 L48 32" stroke="#c2185b" strokeWidth="0.6" opacity="0.5"/>
    <path d="M18 44 L32 44 L46 44" stroke="#c2185b" strokeWidth="0.6" opacity="0.4"/>
    
    {/* Side facets for depth */}
    <path d="M18 20 L32 32 L18 44" fill="url(#rubyMainGradient)" opacity="0.7"/>
    <path d="M46 20 L32 32 L46 44" fill="url(#rubyMainGradient)" opacity="0.5"/>
    
    {/* Brilliant highlights */}
    <ellipse cx="32" cy="24" rx="8" ry="6" fill="url(#rubyHighlight)" opacity="0.6"/>
    <ellipse cx="28" cy="20" rx="4" ry="3" fill="#ff8a80" opacity="0.8"/>
    <circle cx="30" cy="18" r="2" fill="#ffffff" opacity="0.9"/>
    
    {/* Inner fire effect */}
    <path d="M24 28 Q32 24 40 28 Q36 36 32 40 Q28 36 24 28" fill="#ff5722" opacity="0.3"/>
  </svg>
);

export const EmeraldSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="emeraldMainGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#00e676" />
        <stop offset="25%" stopColor="#00c853" />
        <stop offset="50%" stopColor="#388e3c" />
        <stop offset="75%" stopColor="#2e7d32" />
        <stop offset="100%" stopColor="#1b5e20" />
      </radialGradient>
      <linearGradient id="emeraldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5d6a7" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#66bb6a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#4caf50" stopOpacity="0.1" />
      </linearGradient>
      <filter id="emeraldBrilliance">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main emerald cut shape */}
    <path
      d="M20 10 L44 10 L48 14 L48 50 L44 54 L20 54 L16 50 L16 14 Z"
      fill="url(#emeraldMainGradient)"
      stroke="#2e7d32"
      strokeWidth="0.8"
      filter="url(#emeraldBrilliance)"
    />
    
    {/* Step cut facets */}
    <rect x="18" y="12" width="28" height="6" fill="url(#emeraldHighlight)" opacity="0.6"/>
    <rect x="20" y="18" width="24" height="4" fill="url(#emeraldHighlight)" opacity="0.5"/>
    <rect x="22" y="22" width="20" height="4" fill="url(#emeraldHighlight)" opacity="0.4"/>
    
    {/* Characteristic emerald inclusions (jardin) */}
    <path d="M25 16 L28 19 L26 22" stroke="#81c784" strokeWidth="0.8" opacity="0.6" fill="none"/>
    <path d="M38 24 L41 27 L39 30" stroke="#a5d6a7" strokeWidth="0.6" opacity="0.5" fill="none"/>
    <circle cx="30" cy="35" r="1" fill="#c8e6c9" opacity="0.7"/>
    <ellipse cx="36" cy="40" rx="1.5" ry="0.8" fill="#e8f5e8" opacity="0.6"/>
    
    {/* Step cut lines */}
    <path d="M16 22 L48 22" stroke="#4caf50" strokeWidth="0.4" opacity="0.5"/>
    <path d="M16 32 L48 32" stroke="#4caf50" strokeWidth="0.4" opacity="0.4"/>
    <path d="M16 42 L48 42" stroke="#4caf50" strokeWidth="0.4" opacity="0.3"/>
    
    {/* Vertical step cuts */}
    <path d="M24 10 L24 54" stroke="#4caf50" strokeWidth="0.4" opacity="0.4"/>
    <path d="M32 10 L32 54" stroke="#4caf50" strokeWidth="0.4" opacity="0.3"/>
    <path d="M40 10 L40 54" stroke="#4caf50" strokeWidth="0.4" opacity="0.4"/>
    
    {/* Brilliant highlight */}
    <ellipse cx="35" cy="18" rx="5" ry="3" fill="#ffffff" opacity="0.7"/>
  </svg>
);

export const SapphireSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="sapphireGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#64b5f6" />
        <stop offset="30%" stopColor="#2196f3" />
        <stop offset="70%" stopColor="#1976d2" />
        <stop offset="100%" stopColor="#0d47a1" />
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="22" ry="28" fill="url(#sapphireGradient)"/>
    <ellipse cx="32" cy="26" rx="10" ry="14" fill="#90caf9" opacity="0.4"/>
    <ellipse cx="28" cy="22" rx="4" ry="8" fill="#bbdefb" opacity="0.6"/>
    <path d="M18 18 Q32 14 46 18 Q42 32 32 38 Q22 32 18 18" fill="#90caf9" opacity="0.3"/>
  </svg>
);

export const TanzaniteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tanzaniteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b39ddb" />
        <stop offset="30%" stopColor="#9575cd" />
        <stop offset="70%" stopColor="#7e57c2" />
        <stop offset="100%" stopColor="#5e35b1" />
      </linearGradient>
    </defs>
    <path d="M32 8 L50 20 L46 44 L32 56 L18 44 L14 20 Z" fill="url(#tanzaniteGradient)"/>
    <path d="M32 12 L44 22 L40 42 L32 50 L24 42 L20 22 Z" fill="#ce93d8" opacity="0.4"/>
    <path d="M32 16 L38 24 L36 36 L32 42 L28 36 L26 24 Z" fill="#e1bee7" opacity="0.5"/>
  </svg>
);

export const GarnetSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="garnetGradient" cx="35%" cy="25%">
        <stop offset="0%" stopColor="#f48fb1" />
        <stop offset="30%" stopColor="#e91e63" />
        <stop offset="70%" stopColor="#c2185b" />
        <stop offset="100%" stopColor="#880e4f" />
      </radialGradient>
    </defs>
    <polygon points="32,10 44,18 48,32 44,46 32,54 20,46 16,32 20,18" fill="url(#garnetGradient)"/>
    <polygon points="32,16 38,22 40,32 38,42 32,48 26,42 24,32 26,22" fill="#f06292" opacity="0.4"/>
    <circle cx="30" cy="26" r="3" fill="#f8bbd9" opacity="0.6"/>
  </svg>
);

export const AmethystSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="amethystGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e1bee7" />
        <stop offset="30%" stopColor="#ba68c8" />
        <stop offset="70%" stopColor="#9c27b0" />
        <stop offset="100%" stopColor="#6a1b9a" />
      </linearGradient>
    </defs>
    <path d="M32 6 L54 18 L50 46 L32 58 L14 46 L10 18 Z" fill="url(#amethystGradient)"/>
    <path d="M32 12 L46 22 L44 42 L32 50 L20 42 L18 22 Z" fill="#ce93d8" opacity="0.4"/>
    <path d="M32 18 L38 26 L36 38 L32 44 L28 38 L26 26 Z" fill="#e1bee7" opacity="0.5"/>
    <path d="M20 20 L44 20 M22 30 L42 30 M24 40 L40 40" stroke="#d1c4e9" strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

export const AquamarineSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="aquamarineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b3e5fc" />
        <stop offset="30%" stopColor="#4fc3f7" />
        <stop offset="70%" stopColor="#29b6f6" />
        <stop offset="100%" stopColor="#0288d1" />
      </linearGradient>
    </defs>
    <rect x="18" y="8" width="28" height="48" rx="3" fill="url(#aquamarineGradient)"/>
    <rect x="20" y="12" width="24" height="8" fill="#81d4fa" opacity="0.5"/>
    <rect x="22" y="16" width="20" height="4" fill="#b3e5fc" opacity="0.7"/>
    <path d="M18 24 L46 24 M18 32 L46 32 M18 40 L46 40 M18 48 L46 48" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

export const TopazSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="topazGradient" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#fff3e0" />
        <stop offset="30%" stopColor="#ffcc02" />
        <stop offset="70%" stopColor="#ff9800" />
        <stop offset="100%" stopColor="#e65100" />
      </radialGradient>
    </defs>
    <path d="M32 8 L48 22 L44 42 L32 56 L20 42 L16 22 Z" fill="url(#topazGradient)"/>
    <path d="M32 14 L42 24 L40 38 L32 48 L24 38 L22 24 Z" fill="#ffe0b2" opacity="0.5"/>
    <ellipse cx="29" cy="24" rx="4" ry="6" fill="#fff8e1" opacity="0.7"/>
  </svg>
);

export const OpalSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="opalBaseGradient" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#f8f9fa" />
        <stop offset="70%" stopColor="#e9ecef" />
        <stop offset="100%" stopColor="#dee2e6" />
      </radialGradient>
      <radialGradient id="opalBlueFlash" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#2196f3" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#03a9f4" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#81d4fa" stopOpacity="0.2" />
      </radialGradient>
      <radialGradient id="opalGreenFlash" cx="70%" cy="60%">
        <stop offset="0%" stopColor="#4caf50" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#8bc34a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#c8e6c9" stopOpacity="0.2" />
      </radialGradient>
      <filter id="opalShimmer">
        <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    {/* Main opal body */}
    <ellipse cx="32" cy="32" rx="26" ry="22" fill="url(#opalBaseGradient)" filter="url(#opalShimmer)"/>
    
    {/* Play-of-color patches */}
    <ellipse cx="25" cy="26" rx="9" ry="7" fill="url(#opalBlueFlash)" opacity="0.8"/>
    <ellipse cx="42" cy="30" rx="7" ry="5" fill="#e91e63" opacity="0.6"/>
    <ellipse cx="28" cy="42" rx="6" ry="4" fill="url(#opalGreenFlash)" opacity="0.7"/>
    <ellipse cx="40" cy="44" rx="5" ry="3" fill="#ff9800" opacity="0.6"/>
    <ellipse cx="35" cy="20" rx="4" ry="3" fill="#9c27b0" opacity="0.5"/>
    <ellipse cx="18" cy="38" rx="3" ry="2" fill="#ffeb3b" opacity="0.7"/>
    
    {/* Spectral flashes */}
    <path d="M20 32 Q28 28 36 32 Q32 38 24 36 Q18 34 20 32" fill="#00bcd4" opacity="0.4"/>
    <path d="M38 25 Q44 22 50 25 Q48 30 42 29 Q36 28 38 25" fill="#e1bee7" opacity="0.5"/>
    
    {/* Opal matrix patterns */}
    <circle cx="32" cy="32" r="1" fill="#6c757d" opacity="0.3"/>
    <ellipse cx="24" cy="35" rx="1.5" ry="1" fill="#6c757d" opacity="0.2"/>
    <ellipse cx="40" cy="28" rx="1" ry="1.5" fill="#6c757d" opacity="0.2"/>
    
    {/* Surface highlights */}
    <ellipse cx="28" cy="24" rx="6" ry="4" fill="#ffffff" opacity="0.6"/>
    <ellipse cx="36" cy="26" rx="3" ry="2" fill="#ffffff" opacity="0.8"/>
  </svg>
);

export const CitrineSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="citrineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff9c4" />
        <stop offset="30%" stopColor="#ffeb3b" />
        <stop offset="70%" stopColor="#ffc107" />
        <stop offset="100%" stopColor="#ff8f00" />
      </linearGradient>
    </defs>
    <path d="M32 6 L52 18 L48 46 L32 58 L16 46 L12 18 Z" fill="url(#citrineGradient)"/>
    <path d="M32 12 L44 22 L42 42 L32 50 L22 42 L20 22 Z" fill="#fff59d" opacity="0.5"/>
    <path d="M32 18 L36 26 L34 38 L32 44 L30 38 L28 26 Z" fill="#fff8e1" opacity="0.7"/>
  </svg>
);

export const KunziteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="kunziteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fce4ec" />
        <stop offset="30%" stopColor="#f48fb1" />
        <stop offset="70%" stopColor="#e91e63" />
        <stop offset="100%" stopColor="#ad1457" />
      </linearGradient>
    </defs>
    <rect x="16" y="10" width="32" height="44" rx="4" fill="url(#kunziteGradient)"/>
    <rect x="18" y="14" width="28" height="8" fill="#f8bbd9" opacity="0.5"/>
    <rect x="20" y="18" width="24" height="4" fill="#fce4ec" opacity="0.7"/>
    <path d="M16 26 L48 26 M16 34 L48 34 M16 42 L48 42" stroke="#f06292" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

export const TourmalineSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tourmalineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e91e63" />
        <stop offset="50%" stopColor="#4caf50" />
        <stop offset="100%" stopColor="#2196f3" />
      </linearGradient>
    </defs>
    <rect x="20" y="8" width="24" height="48" rx="2" fill="url(#tourmalineGradient1)"/>
    <rect x="22" y="12" width="20" height="12" fill="#e91e63" opacity="0.8"/>
    <rect x="22" y="26" width="20" height="12" fill="#4caf50" opacity="0.8"/>
    <rect x="22" y="40" width="20" height="12" fill="#2196f3" opacity="0.8"/>
  </svg>
);

export const JadeSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="jadeGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#a5d6a7" />
        <stop offset="40%" stopColor="#66bb6a" />
        <stop offset="80%" stopColor="#388e3c" />
        <stop offset="100%" stopColor="#1b5e20" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="24" fill="url(#jadeGradient)"/>
    <circle cx="32" cy="28" r="12" fill="#81c784" opacity="0.4"/>
    <circle cx="28" cy="24" r="6" fill="#c8e6c9" opacity="0.6"/>
    <path d="M16 32 Q32 20 48 32 Q32 44 16 32" fill="#a5d6a7" opacity="0.3"/>
  </svg>
);

export const LabradorитеSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="labradoriteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#90a4ae" />
        <stop offset="30%" stopColor="#607d8b" />
        <stop offset="70%" stopColor="#455a64" />
        <stop offset="100%" stopColor="#263238" />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="40" height="40" rx="6" fill="url(#labradoriteGradient)"/>
    <path d="M15 20 Q32 15 49 20 L45 35 Q32 30 19 35 Z" fill="#4fc3f7" opacity="0.6"/>
    <path d="M19 30 Q32 25 45 30 L41 40 Q32 35 23 40 Z" fill="#81c784" opacity="0.5"/>
    <ellipse cx="25" cy="25" rx="3" ry="2" fill="#ffeb3b" opacity="0.7"/>
  </svg>
);

export const PeridotSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="peridotGradient" cx="35%" cy="25%">
        <stop offset="0%" stopColor="#dcedc8" />
        <stop offset="30%" stopColor="#aed581" />
        <stop offset="70%" stopColor="#8bc34a" />
        <stop offset="100%" stopColor="#558b2f" />
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="20" ry="24" fill="url(#peridotGradient)"/>
    <ellipse cx="32" cy="26" rx="8" ry="12" fill="#c5e1a5" opacity="0.5"/>
    <ellipse cx="28" cy="22" rx="3" ry="6" fill="#e8f5e8" opacity="0.7"/>
    <path d="M20 20 Q32 16 44 20 Q40 32 32 36 Q24 32 20 20" fill="#c5e1a5" opacity="0.4"/>
  </svg>
);

export const MoonstoneSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="moonStoneGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#f5f5f5" />
        <stop offset="70%" stopColor="#e0e0e0" />
        <stop offset="100%" stopColor="#bdbdbd" />
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="22" ry="18" fill="url(#moonStoneGradient)"/>
    <ellipse cx="28" cy="28" rx="10" ry="8" fill="#bbdefb" opacity="0.4"/>
    <ellipse cx="36" cy="30" rx="6" ry="4" fill="#e1f5fe" opacity="0.6"/>
    <path d="M18 32 Q32 20 46 32 Q32 44 18 32" fill="#ffffff" opacity="0.5"/>
  </svg>
);

export const LapisLazuliSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="lapisMainGradient" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#3f51b5" />
        <stop offset="30%" stopColor="#303f9f" />
        <stop offset="70%" stopColor="#283593" />
        <stop offset="100%" stopColor="#1a237e" />
      </radialGradient>
      <radialGradient id="lapisTexture" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#5c6bc0" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#3949ab" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#1a237e" stopOpacity="0.2" />
      </radialGradient>
      <filter id="lapisBrilliance">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
      </filter>
    </defs>
    
    {/* Main lapis lazuli base */}
    <rect x="12" y="12" width="40" height="40" rx="6" fill="url(#lapisMainGradient)" filter="url(#lapisBrilliance)"/>
    
    {/* Natural stone texture */}
    <rect x="14" y="14" width="36" height="36" rx="4" fill="url(#lapisTexture)" opacity="0.7"/>
    
    {/* Pyrite veins and inclusions */}
    <circle cx="22" cy="22" r="2.5" fill="#ffd700" opacity="0.9"/>
    <circle cx="40" cy="26" r="1.8" fill="#ffeb3b" opacity="0.8"/>
    <circle cx="26" cy="35" r="1.2" fill="#ffc107" opacity="0.7"/>
    <circle cx="44" cy="42" r="2" fill="#ffd700" opacity="0.9"/>
    <circle cx="18" cy="40" r="1" fill="#fff59d" opacity="0.6"/>
    <circle cx="36" cy="18" r="1.5" fill="#ffeb3b" opacity="0.8"/>
    
    {/* Pyrite veining patterns */}
    <path d="M20 30 Q26 32 32 30 Q38 28 44 30" stroke="#ffd700" strokeWidth="0.8" opacity="0.6" fill="none"/>
    <path d="M16 38 Q22 36 28 38 Q34 40 40 38" stroke="#ffeb3b" strokeWidth="0.6" opacity="0.5" fill="none"/>
    
    {/* Calcite white veins */}
    <path d="M30 16 L34 20 L32 24" stroke="#ffffff" strokeWidth="1" opacity="0.4" fill="none"/>
    <path d="M42 34 L46 38 L44 42" stroke="#f8f9fa" strokeWidth="0.8" opacity="0.3" fill="none"/>
    
    {/* Deep blue variations */}
    <ellipse cx="28" cy="28" rx="6" ry="4" fill="#1a237e" opacity="0.3"/>
    <ellipse cx="38" cy="36" rx="4" ry="3" fill="#0d47a1" opacity="0.4"/>
  </svg>
);

export const TurquoiseSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="turquoiseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b2dfdb" />
        <stop offset="30%" stopColor="#4dd0e1" />
        <stop offset="70%" stopColor="#00acc1" />
        <stop offset="100%" stopColor="#006064" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="24" ry="20" fill="url(#turquoiseGradient)"/>
    <path d="M14 26 L50 26 L48 38 L16 38 Z" fill="#80cbc4" opacity="0.4"/>
    <path d="M18 30 L46 30 L44 34 L20 34 Z" fill="#b2dfdb" opacity="0.6"/>
    <ellipse cx="25" cy="32" rx="3" ry="2" fill="#e0f2f1" opacity="0.8"/>
  </svg>
);

export const MorganiteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="morganiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fce4ec" />
        <stop offset="30%" stopColor="#f8bbd9" />
        <stop offset="70%" stopColor="#f48fb1" />
        <stop offset="100%" stopColor="#e91e63" />
      </linearGradient>
    </defs>
    <rect x="18" y="10" width="28" height="44" rx="3" fill="url(#morganiteGradient)"/>
    <rect x="20" y="14" width="24" height="8" fill="#f8bbd9" opacity="0.5"/>
    <rect x="22" y="18" width="20" height="4" fill="#fce4ec" opacity="0.7"/>
    <path d="M18 28 L46 28 M18 36 L46 36 M18 44 L46 44" stroke="#f06292" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

export const SpinelSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="spinelGradient" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#ef9a9a" />
        <stop offset="30%" stopColor="#e57373" />
        <stop offset="70%" stopColor="#e53935" />
        <stop offset="100%" stopColor="#c62828" />
      </radialGradient>
    </defs>
    <polygon points="32,8 48,24 32,56 16,24" fill="url(#spinelGradient)"/>
    <polygon points="32,16 40,28 32,44 24,28" fill="#ffcdd2" opacity="0.4"/>
    <ellipse cx="30" cy="24" rx="4" ry="6" fill="#ffebee" opacity="0.6"/>
    <path d="M16 24 L32 24 L48 24" stroke="#f8bbd9" strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

export const AlexandriteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="alexandriteMainGradient" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#00e676" />
        <stop offset="30%" stopColor="#4caf50" />
        <stop offset="60%" stopColor="#8e24aa" />
        <stop offset="100%" stopColor="#d32f2f" />
      </radialGradient>
      <radialGradient id="alexandriteGreenSide" cx="20%" cy="40%">
        <stop offset="0%" stopColor="#66bb6a" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#388e3c" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#1b5e20" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id="alexandriteRedSide" cx="80%" cy="60%">
        <stop offset="0%" stopColor="#ef5350" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#c62828" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#b71c1c" stopOpacity="0.3" />
      </radialGradient>
      <filter id="alexandriteBrilliance">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Main alexandrite crystal */}
    <ellipse cx="32" cy="32" rx="22" ry="28" fill="url(#alexandriteMainGradient)" filter="url(#alexandriteBrilliance)"/>
    
    {/* Color change zones */}
    <ellipse cx="24" cy="26" rx="12" ry="16" fill="url(#alexandriteGreenSide)" opacity="0.8"/>
    <ellipse cx="40" cy="38" rx="10" ry="14" fill="url(#alexandriteRedSide)" opacity="0.8"/>
    
    {/* Transition zone showing pleochroism */}
    <path d="M20 20 Q32 24 44 20 Q40 40 32 44 Q24 40 20 20" fill="#9c27b0" opacity="0.4"/>
    
    {/* Crystal facets */}
    <path d="M32 8 L48 24 L32 40 L16 24 Z" fill="none" stroke="#4a148c" strokeWidth="0.6" opacity="0.5"/>
    <path d="M16 24 L32 24 L48 24" stroke="#6a1b9a" strokeWidth="0.4" opacity="0.6"/>
    
    {/* Brilliant highlights showing color change */}
    <ellipse cx="26" cy="22" rx="4" ry="3" fill="#a5d6a7" opacity="0.8"/>
    <ellipse cx="38" cy="34" rx="3" ry="2" fill="#ffcdd2" opacity="0.8"/>
    <circle cx="32" cy="18" r="2" fill="#ffffff" opacity="0.9"/>
    
    {/* Characteristic alexandrite glow */}
    <ellipse cx="32" cy="28" rx="8" ry="6" fill="#e1bee7" opacity="0.3"/>
  </svg>
);

export const IoliteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ioliteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c5cae9" />
        <stop offset="30%" stopColor="#9fa8da" />
        <stop offset="70%" stopColor="#7986cb" />
        <stop offset="100%" stopColor="#5c6bc0" />
      </linearGradient>
    </defs>
    <rect x="16" y="12" width="32" height="40" rx="4" fill="url(#ioliteGradient)"/>
    <rect x="18" y="16" width="28" height="8" fill="#9fa8da" opacity="0.5"/>
    <rect x="20" y="20" width="24" height="4" fill="#c5cae9" opacity="0.7"/>
    <path d="M16 28 L48 28 M16 36 L48 36 M16 44 L48 44" stroke="#7986cb" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

export const AndalusiteSVG = ({ className = "", size = 64 }: GemSVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="andalusiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d7ccc8" />
        <stop offset="30%" stopColor="#a1887f" />
        <stop offset="70%" stopColor="#8d6e63" />
        <stop offset="100%" stopColor="#5d4037" />
      </linearGradient>
    </defs>
    <rect x="16" y="12" width="32" height="40" rx="2" fill="url(#andalusiteGradient)"/>
    <path d="M32 12 L32 52" stroke="#3e2723" strokeWidth="2"/>
    <path d="M16 32 L48 32" stroke="#3e2723" strokeWidth="2"/>
    <rect x="18" y="16" width="28" height="8" fill="#bcaaa4" opacity="0.5"/>
    <circle cx="32" cy="32" r="8" fill="#efebe9" opacity="0.3"/>
  </svg>
);

// Gem icon mapping
export const gemIcons = {
  "1": DiamondSVG,
  "2": RubySVG,
  "3": EmeraldSVG,
  "4": SapphireSVG,
  "5": TanzaniteSVG,
  "6": GarnetSVG,
  "7": AmethystSVG,
  "8": AquamarineSVG,
  "9": TopazSVG,
  "10": OpalSVG,
  "11": CitrineSVG,
  "12": KunziteSVG,
  "13": TourmalineSVG,
  "14": JadeSVG,
  "15": LabradorитеSVG,
  "16": PeridotSVG,
  "17": MoonstoneSVG,
  "18": LapisLazuliSVG,
  "19": TurquoiseSVG,
  "20": MorganiteSVG,
  "21": SpinelSVG,
  "22": AlexandriteSVG,
  "23": IoliteSVG,
  "24": AndalusiteSVG,
};