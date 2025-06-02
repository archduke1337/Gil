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
      <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#e8f4f8" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#d0e8f0" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#b8dce8" stopOpacity="0.6" />
      </linearGradient>
      <filter id="diamondShadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>
    <path
      d="M32 8 L48 24 L32 56 L16 24 Z"
      fill="url(#diamondGradient)"
      stroke="#a0c4d0"
      strokeWidth="1"
      filter="url(#diamondShadow)"
    />
    <path d="M16 24 L32 24 L48 24" stroke="#8bb8c8" strokeWidth="0.5" opacity="0.6"/>
    <path d="M24 16 L32 24 L40 16" stroke="#8bb8c8" strokeWidth="0.5" opacity="0.6"/>
    <path d="M32 24 L32 40" stroke="#8bb8c8" strokeWidth="0.5" opacity="0.4"/>
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
      <radialGradient id="rubyGradient" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#ff6b9d" />
        <stop offset="40%" stopColor="#e63946" />
        <stop offset="80%" stopColor="#c1121f" />
        <stop offset="100%" stopColor="#a4161a" />
      </radialGradient>
      <filter id="rubyGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <ellipse cx="32" cy="32" rx="20" ry="26" fill="url(#rubyGradient)" filter="url(#rubyGlow)"/>
    <ellipse cx="32" cy="28" rx="8" ry="12" fill="#ff8fa3" opacity="0.4"/>
    <ellipse cx="28" cy="24" rx="3" ry="6" fill="#ffb3c1" opacity="0.6"/>
    <path d="M20 20 Q32 16 44 20 Q40 32 32 36 Q24 32 20 20" fill="#ff8fa3" opacity="0.3"/>
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
      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7dd87d" />
        <stop offset="30%" stopColor="#4caf50" />
        <stop offset="70%" stopColor="#2e7d32" />
        <stop offset="100%" stopColor="#1b5e20" />
      </linearGradient>
    </defs>
    <rect x="16" y="12" width="32" height="40" rx="2" ry="2" fill="url(#emeraldGradient)"/>
    <rect x="18" y="16" width="28" height="8" fill="#81c784" opacity="0.5"/>
    <rect x="20" y="20" width="24" height="4" fill="#a5d6a7" opacity="0.7"/>
    <path d="M16 28 L48 28 M16 36 L48 36 M16 44 L48 44" stroke="#66bb6a" strokeWidth="0.5" opacity="0.4"/>
    <path d="M24 12 L24 52 M32 12 L32 52 M40 12 L40 52" stroke="#66bb6a" strokeWidth="0.5" opacity="0.4"/>
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
      <radialGradient id="opalGradient" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#e8f5e8" />
        <stop offset="40%" stopColor="#e3f2fd" />
        <stop offset="60%" stopColor="#fce4ec" />
        <stop offset="80%" stopColor="#fff3e0" />
        <stop offset="100%" stopColor="#f3e5f5" />
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="24" ry="20" fill="url(#opalGradient)"/>
    <ellipse cx="28" cy="28" rx="8" ry="6" fill="#4fc3f7" opacity="0.6"/>
    <ellipse cx="38" cy="30" rx="6" ry="4" fill="#e91e63" opacity="0.5"/>
    <ellipse cx="30" cy="38" rx="5" ry="3" fill="#4caf50" opacity="0.5"/>
    <ellipse cx="36" cy="40" rx="4" ry="3" fill="#ff9800" opacity="0.6"/>
    <circle cx="26" cy="35" r="2" fill="#9c27b0" opacity="0.7"/>
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
      <radialGradient id="lapisGradient" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#5c6bc0" />
        <stop offset="40%" stopColor="#3f51b5" />
        <stop offset="80%" stopColor="#303f9f" />
        <stop offset="100%" stopColor="#1a237e" />
      </radialGradient>
    </defs>
    <rect x="14" y="14" width="36" height="36" rx="4" fill="url(#lapisGradient)"/>
    <circle cx="24" cy="24" r="2" fill="#ffeb3b"/>
    <circle cx="38" cy="28" r="1.5" fill="#ffc107"/>
    <circle cx="28" cy="36" r="1" fill="#fff59d"/>
    <circle cx="42" cy="40" r="1.5" fill="#ffeb3b"/>
    <circle cx="32" cy="44" r="1" fill="#ffc107"/>
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
      <linearGradient id="alexandriteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#81c784" />
        <stop offset="50%" stopColor="#66bb6a" />
        <stop offset="100%" stopColor="#e57373" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="20" ry="26" fill="url(#alexandriteGradient)"/>
    <ellipse cx="28" cy="26" rx="8" ry="12" fill="#a5d6a7" opacity="0.4"/>
    <ellipse cx="36" cy="38" rx="6" ry="8" fill="#ffcdd2" opacity="0.4"/>
    <path d="M20 20 Q32 16 44 20 Q40 32 32 36 Q24 32 20 20" fill="#c8e6c9" opacity="0.3"/>
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