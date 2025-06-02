interface GemDimensionProps {
  gemType: string;
  className?: string;
}

export const DiamondDimensionDiagram = ({ className = "" }: { className?: string }) => (
  <svg
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="diamondDimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e3f2fd" />
        <stop offset="100%" stopColor="#bbdefb" />
      </linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
      </marker>
    </defs>
    
    {/* Diamond Side View */}
    <g transform="translate(50, 50)">
      <text x="100" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Side View - Cut Proportions</text>
      
      {/* Diamond outline */}
      <path d="M100 40 L160 70 L160 120 L100 180 L40 120 L40 70 Z" 
            fill="url(#diamondDimGradient)" stroke="#1976d2" strokeWidth="2"/>
      
      {/* Table */}
      <line x1="70" y1="70" x2="130" y2="70" stroke="#1976d2" strokeWidth="2"/>
      <text x="135" y="75" className="text-xs fill-muted-foreground">Table: 53-64%</text>
      
      {/* Crown height */}
      <line x1="20" y1="40" x2="20" y2="70" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <line x1="20" y1="70" x2="20" y2="40" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <text x="25" y="58" className="text-xs fill-muted-foreground">Crown: 14-16%</text>
      
      {/* Pavilion depth */}
      <line x1="180" y1="70" x2="180" y2="180" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <line x1="180" y1="180" x2="180" y2="70" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <text x="185" y="125" className="text-xs fill-muted-foreground">Pavilion: 42-44%</text>
      
      {/* Total depth */}
      <line x1="210" y1="40" x2="210" y2="180" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <line x1="210" y1="180" x2="210" y2="40" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <text x="215" y="110" className="text-xs fill-muted-foreground">Total Depth: 58-64%</text>
      
      {/* Girdle */}
      <circle cx="100" cy="70" r="2" fill="#666"/>
      <text x="105" y="65" className="text-xs fill-muted-foreground">Girdle</text>
    </g>
    
    {/* Diamond Top View */}
    <g transform="translate(250, 80)">
      <text x="50" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Top View</text>
      
      {/* Diamond outline from top */}
      <circle cx="50" cy="60" r="40" fill="none" stroke="#1976d2" strokeWidth="2"/>
      
      {/* Table outline */}
      <rect x="30" y="40" width="40" height="40" fill="url(#diamondDimGradient)" stroke="#1976d2" strokeWidth="1"/>
      
      {/* Diameter measurement */}
      <line x1="10" y1="100" x2="90" y2="100" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <line x1="90" y1="100" x2="10" y2="100" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)"/>
      <text x="50" y="115" textAnchor="middle" className="text-xs fill-muted-foreground">Diameter: 100%</text>
    </g>
    
    {/* Measurements Table */}
    <g transform="translate(50, 220)">
      <text x="0" y="0" className="text-sm font-semibold fill-foreground">Standard Proportions:</text>
      <text x="0" y="15" className="text-xs fill-muted-foreground">• Table: 53-64% of diameter</text>
      <text x="0" y="30" className="text-xs fill-muted-foreground">• Crown Height: 14-16% of diameter</text>
      <text x="0" y="45" className="text-xs fill-muted-foreground">• Pavilion Depth: 42-44% of diameter</text>
      <text x="200" y="15" className="text-xs fill-muted-foreground">• Total Depth: 58-64% of diameter</text>
      <text x="200" y="30" className="text-xs fill-muted-foreground">• Crown Angle: 34-35°</text>
      <text x="200" y="45" className="text-xs fill-muted-foreground">• Pavilion Angle: 40.75-41.25°</text>
    </g>
  </svg>
);

export const EmeraldDimensionDiagram = ({ className = "" }: { className?: string }) => (
  <svg
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="emeraldDimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c8e6c9" />
        <stop offset="100%" stopColor="#4caf50" />
      </linearGradient>
      <marker id="arrowhead2" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
      </marker>
    </defs>
    
    {/* Emerald Side View */}
    <g transform="translate(50, 50)">
      <text x="80" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Emerald Cut - Step Cut Proportions</text>
      
      {/* Emerald outline */}
      <rect x="40" y="40" width="80" height="120" rx="8" ry="8" 
            fill="url(#emeraldDimGradient)" stroke="#2e7d32" strokeWidth="2"/>
      
      {/* Step cut lines */}
      <line x1="45" y1="60" x2="115" y2="60" stroke="#2e7d32" strokeWidth="1"/>
      <line x1="50" y1="80" x2="110" y2="80" stroke="#2e7d32" strokeWidth="1"/>
      <line x1="45" y1="100" x2="115" y2="100" stroke="#2e7d32" strokeWidth="1"/>
      <line x1="50" y1="120" x2="110" y2="120" stroke="#2e7d32" strokeWidth="1"/>
      <line x1="45" y1="140" x2="115" y2="140" stroke="#2e7d32" strokeWidth="1"/>
      
      {/* Table measurement */}
      <line x1="50" y1="95" x2="110" y2="95" stroke="#1976d2" strokeWidth="2"/>
      <text x="125" y="100" className="text-xs fill-muted-foreground">Table: 60-70%</text>
      
      {/* Crown */}
      <line x1="20" y1="40" x2="20" y2="95" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <line x1="20" y1="95" x2="20" y2="40" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <text x="25" y="70" className="text-xs fill-muted-foreground">Crown: 11-16%</text>
      
      {/* Pavilion */}
      <line x1="140" y1="95" x2="140" y2="160" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <line x1="140" y1="160" x2="140" y2="95" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <text x="145" y="125" className="text-xs fill-muted-foreground">Pavilion: 43-45%</text>
      
      {/* Total depth */}
      <line x1="160" y1="40" x2="160" y2="160" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <line x1="160" y1="160" x2="160" y2="40" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <text x="165" y="100" className="text-xs fill-muted-foreground">Total: 61-67%</text>
    </g>
    
    {/* Emerald Top View */}
    <g transform="translate(250, 80)">
      <text x="50" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Top View</text>
      
      {/* Emerald outline from top */}
      <rect x="20" y="40" width="60" height="80" rx="6" ry="6" 
            fill="url(#emeraldDimGradient)" stroke="#2e7d32" strokeWidth="2"/>
      
      {/* Step cut pattern */}
      <rect x="25" y="45" width="50" height="70" rx="3" ry="3" fill="none" stroke="#2e7d32" strokeWidth="1"/>
      <rect x="30" y="50" width="40" height="60" rx="2" ry="2" fill="none" stroke="#2e7d32" strokeWidth="1"/>
      <rect x="35" y="60" width="30" height="40" fill="#4caf50" stroke="#2e7d32" strokeWidth="1"/>
      
      {/* Length/Width measurements */}
      <line x1="10" y1="130" x2="90" y2="130" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <line x1="90" y1="130" x2="10" y2="130" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <text x="50" y="145" textAnchor="middle" className="text-xs fill-muted-foreground">Length</text>
      
      <line x1="5" y1="40" x2="5" y2="120" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <line x1="5" y1="120" x2="5" y2="40" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead2)"/>
      <text x="-30" y="80" textAnchor="middle" className="text-xs fill-muted-foreground" transform="rotate(-90, -30, 80)">Width</text>
    </g>
    
    {/* Measurements Table */}
    <g transform="translate(50, 220)">
      <text x="0" y="0" className="text-sm font-semibold fill-foreground">Emerald Cut Specifications:</text>
      <text x="0" y="15" className="text-xs fill-muted-foreground">• Table: 60-70% of width</text>
      <text x="0" y="30" className="text-xs fill-muted-foreground">• Crown Height: 11-16% of width</text>
      <text x="0" y="45" className="text-xs fill-muted-foreground">• Length to Width: 1.3-1.5 ratio</text>
      <text x="200" y="15" className="text-xs fill-muted-foreground">• Total Depth: 61-67% of width</text>
      <text x="200" y="30" className="text-xs fill-muted-foreground">• Step Cut: 3-4 rows of facets</text>
      <text x="200" y="45" className="text-xs fill-muted-foreground">• Corner Cut: Octagonal shape</text>
    </g>
  </svg>
);

export const RoundBrilliantDimensionDiagram = ({ className = "" }: { className?: string }) => (
  <svg
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="brilliantGradient" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#fff3e0" />
        <stop offset="100%" stopColor="#ff9800" />
      </radialGradient>
      <marker id="arrowhead3" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
      </marker>
    </defs>
    
    {/* Round Brilliant Side View */}
    <g transform="translate(50, 50)">
      <text x="100" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Round Brilliant Cut - 57 Facets</text>
      
      {/* Crown */}
      <path d="M100 40 L140 80 L100 85 L60 80 Z" 
            fill="url(#brilliantGradient)" stroke="#f57c00" strokeWidth="2"/>
      
      {/* Pavilion */}
      <path d="M100 85 L140 80 L100 160 L60 80 Z" 
            fill="url(#brilliantGradient)" stroke="#f57c00" strokeWidth="2"/>
      
      {/* Table */}
      <line x1="80" y1="80" x2="120" y2="80" stroke="#1976d2" strokeWidth="3"/>
      <text x="125" y="85" className="text-xs fill-muted-foreground">Table: 53-58%</text>
      
      {/* Crown height */}
      <line x1="30" y1="40" x2="30" y2="80" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <line x1="30" y1="80" x2="30" y2="40" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <text x="35" y="62" className="text-xs fill-muted-foreground">Crown: 15-16%</text>
      
      {/* Pavilion depth */}
      <line x1="170" y1="80" x2="170" y2="160" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <line x1="170" y1="160" x2="170" y2="80" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <text x="175" y="120" className="text-xs fill-muted-foreground">Pavilion: 43%</text>
      
      {/* Total depth */}
      <line x1="190" y1="40" x2="190" y2="160" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <line x1="190" y1="160" x2="190" y2="40" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead3)"/>
      <text x="195" y="100" className="text-xs fill-muted-foreground">Total: 59-62.5%</text>
      
      {/* Crown angle */}
      <path d="M100 80 L120 60 L120 80" fill="none" stroke="#9c27b0" strokeWidth="1"/>
      <text x="105" y="55" className="text-xs fill-muted-foreground">34.5°</text>
      
      {/* Pavilion angle */}
      <path d="M100 85 L120 120 L120 85" fill="none" stroke="#9c27b0" strokeWidth="1"/>
      <text x="105" y="110" className="text-xs fill-muted-foreground">40.75°</text>
    </g>
    
    {/* Round Top View */}
    <g transform="translate(250, 80)">
      <text x="50" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Facet Pattern</text>
      
      {/* Outer circle */}
      <circle cx="50" cy="60" r="40" fill="none" stroke="#f57c00" strokeWidth="2"/>
      
      {/* Table (octagon) */}
      <polygon points="50,35 65,40 70,55 65,70 50,75 35,70 30,55 35,40" 
               fill="url(#brilliantGradient)" stroke="#1976d2" strokeWidth="1"/>
      
      {/* Crown facets */}
      <g stroke="#f57c00" strokeWidth="0.5" fill="none">
        <path d="M50 35 L50 20"/>
        <path d="M65 40 L75 25"/>
        <path d="M70 55 L85 55"/>
        <path d="M65 70 L75 85"/>
        <path d="M50 75 L50 90"/>
        <path d="M35 70 L25 85"/>
        <path d="M30 55 L15 55"/>
        <path d="M35 40 L25 25"/>
      </g>
      
      <text x="50" y="115" textAnchor="middle" className="text-xs fill-muted-foreground">57 Facets Total</text>
    </g>
    
    {/* Facet Count */}
    <g transform="translate(50, 220)">
      <text x="0" y="0" className="text-sm font-semibold fill-foreground">Facet Structure:</text>
      <text x="0" y="15" className="text-xs fill-muted-foreground">• Table: 1 facet</text>
      <text x="0" y="30" className="text-xs fill-muted-foreground">• Crown: 32 facets (8 stars + 8 kites + 16 upper girdle)</text>
      <text x="0" y="45" className="text-xs fill-muted-foreground">• Pavilion: 24 facets (8 mains + 16 lower girdle)</text>
      <text x="250" y="15" className="text-xs fill-muted-foreground">• Crown Angle: 34-35°</text>
      <text x="250" y="30" className="text-xs fill-muted-foreground">• Pavilion Angle: 40.6-41.8°</text>
      <text x="250" y="45" className="text-xs fill-muted-foreground">• Culet: None to Medium</text>
    </g>
  </svg>
);

export const OvalDimensionDiagram = ({ className = "" }: { className?: string }) => (
  <svg
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ovalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f3e5f5" />
        <stop offset="100%" stopColor="#9c27b0" />
      </linearGradient>
      <marker id="arrowhead4" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
      </marker>
    </defs>
    
    {/* Oval Side View */}
    <g transform="translate(50, 50)">
      <text x="80" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Oval Cut - Modified Brilliant</text>
      
      {/* Oval outline */}
      <ellipse cx="80" cy="100" rx="50" ry="70" 
               fill="url(#ovalGradient)" stroke="#7b1fa2" strokeWidth="2"/>
      
      {/* Table */}
      <ellipse cx="80" cy="85" rx="30" ry="8" stroke="#1976d2" strokeWidth="2" fill="none"/>
      <text x="120" y="90" className="text-xs fill-muted-foreground">Table: 53-63%</text>
      
      {/* Crown height */}
      <line x1="20" y1="30" x2="20" y2="85" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <line x1="20" y1="85" x2="20" y2="30" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <text x="25" y="60" className="text-xs fill-muted-foreground">Crown: 14-16%</text>
      
      {/* Pavilion */}
      <line x1="140" y1="85" x2="140" y2="170" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <line x1="140" y1="170" x2="140" y2="85" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <text x="145" y="125" className="text-xs fill-muted-foreground">Pavilion: 42-44%</text>
      
      {/* Length/Width ratio */}
      <line x1="30" y1="185" x2="130" y2="185" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <line x1="130" y1="185" x2="30" y2="185" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead4)"/>
      <text x="80" y="200" textAnchor="middle" className="text-xs fill-muted-foreground">L:W Ratio 1.3-1.5</text>
    </g>
    
    {/* Oval Top View */}
    <g transform="translate(250, 80)">
      <text x="50" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Top View</text>
      
      {/* Oval from top */}
      <ellipse cx="50" cy="60" rx="30" ry="45" 
               fill="url(#ovalGradient)" stroke="#7b1fa2" strokeWidth="2"/>
      
      {/* Facet lines */}
      <g stroke="#7b1fa2" strokeWidth="0.5" fill="none">
        <ellipse cx="50" cy="60" rx="20" ry="30"/>
        <ellipse cx="50" cy="60" rx="15" ry="22"/>
        <path d="M50 15 L50 105"/>
        <path d="M20 60 L80 60"/>
        <path d="M35 25 L65 95"/>
        <path d="M65 25 L35 95"/>
      </g>
    </g>
    
    {/* Specifications */}
    <g transform="translate(50, 220)">
      <text x="0" y="0" className="text-sm font-semibold fill-foreground">Oval Cut Specifications:</text>
      <text x="0" y="15" className="text-xs fill-muted-foreground">• Length to Width: 1.3-1.5 ratio</text>
      <text x="0" y="30" className="text-xs fill-muted-foreground">• Table: 53-63% of width</text>
      <text x="0" y="45" className="text-xs fill-muted-foreground">• 56-58 facets total</text>
      <text x="200" y="15" className="text-xs fill-muted-foreground">• Depth: 58-62% of width</text>
      <text x="200" y="30" className="text-xs fill-muted-foreground">• Crown Angle: 34-35°</text>
      <text x="200" y="45" className="text-xs fill-muted-foreground">• Bow-tie effect possible</text>
    </g>
  </svg>
);

export const CushionDimensionDiagram = ({ className = "" }: { className?: string }) => (
  <svg
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cushionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff8e1" />
        <stop offset="100%" stopColor="#ffc107" />
      </linearGradient>
      <marker id="arrowhead5" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
      </marker>
    </defs>
    
    {/* Cushion Side View */}
    <g transform="translate(50, 50)">
      <text x="80" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Cushion Cut - Pillow Shape</text>
      
      {/* Cushion outline */}
      <rect x="30" y="40" width="100" height="120" rx="25" ry="25" 
            fill="url(#cushionGradient)" stroke="#f57c00" strokeWidth="2"/>
      
      {/* Table */}
      <rect x="45" y="85" width="70" height="8" rx="4" ry="4" stroke="#1976d2" strokeWidth="2" fill="none"/>
      <text x="125" y="90" className="text-xs fill-muted-foreground">Table: 61-67%</text>
      
      {/* Crown */}
      <line x1="20" y1="40" x2="20" y2="85" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <line x1="20" y1="85" x2="20" y2="40" stroke="#e91e63" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <text x="25" y="65" className="text-xs fill-muted-foreground">Crown: 13-16%</text>
      
      {/* Pavilion */}
      <line x1="140" y1="85" x2="140" y2="160" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <line x1="140" y1="160" x2="140" y2="85" stroke="#4caf50" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <text x="145" y="120" className="text-xs fill-muted-foreground">Pavilion: 42-45%</text>
      
      {/* Total depth */}
      <line x1="160" y1="40" x2="160" y2="160" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <line x1="160" y1="160" x2="160" y2="40" stroke="#ff9800" strokeWidth="1" markerEnd="url(#arrowhead5)"/>
      <text x="165" y="100" className="text-xs fill-muted-foreground">Total: 61-68%</text>
    </g>
    
    {/* Cushion Top View */}
    <g transform="translate(250, 80)">
      <text x="50" y="20" textAnchor="middle" className="text-sm font-semibold fill-foreground">Top View</text>
      
      {/* Cushion from top */}
      <rect x="20" y="35" width="60" height="60" rx="15" ry="15" 
            fill="url(#cushionGradient)" stroke="#f57c00" strokeWidth="2"/>
      
      {/* Facet pattern */}
      <g stroke="#f57c00" strokeWidth="0.5" fill="none">
        <rect x="25" y="40" width="50" height="50" rx="12" ry="12"/>
        <rect x="30" y="45" width="40" height="40" rx="8" ry="8"/>
        <path d="M50 35 L50 95"/>
        <path d="M20 65 L80 65"/>
        <path d="M30 40 L70 90"/>
        <path d="M70 40 L30 90"/>
      </g>
    </g>
    
    {/* Specifications */}
    <g transform="translate(50, 220)">
      <text x="0" y="0" className="text-sm font-semibold fill-foreground">Cushion Cut Specifications:</text>
      <text x="0" y="15" className="text-xs fill-muted-foreground">• Square or rectangular shape</text>
      <text x="0" y="30" className="text-xs fill-muted-foreground">• Table: 61-67% of width</text>
      <text x="0" y="45" className="text-xs fill-muted-foreground">• 58-64 facets total</text>
      <text x="200" y="15" className="text-xs fill-muted-foreground">• Depth: 61-68% of width</text>
      <text x="200" y="30" className="text-xs fill-muted-foreground">• Rounded corners</text>
      <text x="200" y="45" className="text-xs fill-muted-foreground">• Vintage appeal</text>
    </g>
  </svg>
);

export default function GemDimensionDiagram({ gemType, className = "" }: GemDimensionProps) {
  const getDiagramForGem = (type: string) => {
    switch (type.toLowerCase()) {
      case 'diamond':
        return <DiamondDimensionDiagram className={className} />;
      case 'emerald':
        return <EmeraldDimensionDiagram className={className} />;
      case 'ruby':
        return <OvalDimensionDiagram className={className} />;
      case 'sapphire':
        return <CushionDimensionDiagram className={className} />;
      case 'tanzanite':
      case 'amethyst':
      case 'aquamarine':
        return <OvalDimensionDiagram className={className} />;
      case 'garnet':
      case 'topaz':
      case 'citrine':
        return <CushionDimensionDiagram className={className} />;
      default:
        return <RoundBrilliantDimensionDiagram className={className} />;
    }
  };

  return (
    <div className="w-full">
      {getDiagramForGem(gemType)}
    </div>
  );
}