import { QRCodeSVG } from 'qrcode.react';
import gilLogoPath from "@assets/1000119055-removebg-preview.png";

// Helper function to generate clarity plot diagram based on clarity grade
const generateClarityPlotDiagram = (clarityGrade: string) => {
  const inclusionPatterns: { [key: string]: Array<{x: number, y: number, size: number, type: string}> } = {
    'FL': [], // Flawless - no inclusions
    'IF': [], // Internally Flawless - no inclusions
    'VVS1': [
      { x: 45, y: 25, size: 0.5, type: 'pinpoint' }
    ],
    'VVS2': [
      { x: 35, y: 30, size: 0.8, type: 'pinpoint' },
      { x: 50, y: 45, size: 0.6, type: 'pinpoint' }
    ],
    'VS1': [
      { x: 30, y: 25, size: 1, type: 'inclusion' },
      { x: 55, y: 40, size: 0.8, type: 'pinpoint' }
    ],
    'VS2': [
      { x: 25, y: 30, size: 1.2, type: 'inclusion' },
      { x: 45, y: 35, size: 1, type: 'inclusion' },
      { x: 35, y: 50, size: 0.8, type: 'pinpoint' }
    ],
    'SI1': [
      { x: 30, y: 25, size: 1.5, type: 'inclusion' },
      { x: 50, y: 40, size: 1.2, type: 'inclusion' },
      { x: 40, y: 55, size: 1, type: 'inclusion' }
    ],
    'SI2': [
      { x: 25, y: 30, size: 2, type: 'inclusion' },
      { x: 45, y: 25, size: 1.5, type: 'inclusion' },
      { x: 35, y: 45, size: 1.8, type: 'inclusion' },
      { x: 55, y: 50, size: 1, type: 'inclusion' }
    ],
    'I1': [
      { x: 20, y: 25, size: 2.5, type: 'inclusion' },
      { x: 40, y: 30, size: 2, type: 'inclusion' },
      { x: 30, y: 50, size: 2.2, type: 'inclusion' },
      { x: 55, y: 45, size: 1.8, type: 'inclusion' }
    ]
  };
  
  return inclusionPatterns[clarityGrade] || inclusionPatterns['VS1'];
};

interface GILCertificateData {
  reportNumber: string;
  reportDate: string | Date;
  shape: string;
  measurements: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  inscription?: string;
  comments?: string;
  gemologistName: string;
  signatureDate: string | Date;
  digitallySignedBy?: boolean;
  colorGradeDiagram?: boolean;
  clarityPlotDiagram?: boolean;
  certificateNotes?: string;
  verifierUrl?: string;
  proportionsDiagram?: string;
  clarityDiagram1?: string;
  clarityDiagram2?: string;
  tablePercentage?: string;
  depthPercentage?: string;
  crownAngle?: string;
  pavilionAngle?: string;
  girdleThickness?: string;
  culetSize?: string;
}

interface GILCertificateTemplateProps {
  data: GILCertificateData;
  className?: string;
}

export default function GILCertificateTemplate({ data, className = "" }: GILCertificateTemplateProps) {
  
  return (
    <div 
      className={`bg-amber-50 p-8 max-w-4xl mx-auto font-serif ${className}`}
      style={{ 
        minHeight: '800px',
        backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(139, 115, 85, 0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}>
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        {/* GIL Logo */}
        <div className="flex items-center">
          <div className="relative w-16 h-16 mr-3">
            <img 
              src={gilLogoPath} 
              alt="GIL - Gemological Institute Laboratory" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-black tracking-wider">GIL°</div>
            <div className="text-xs text-gray-600">Gemological Institute Laboratory</div>
          </div>
        </div>

        {/* Center - Report Info */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">GIL REPORT</div>
          <div className="text-3xl font-bold text-black tracking-wider">{data.reportNumber}</div>
          <div className="text-xs text-gray-600 mt-1">Verify this report at gilab.info</div>
        </div>

        {/* Right - Facsimile */}
        <div className="text-right text-xs max-w-48">
          <div className="mb-2 font-bold">FACSIMILE</div>
          <div className="text-gray-700 leading-tight">
            This is a facsimile of the original GIL Report. This facsimile includes security features 
            which are not reproduced in this facsimile.
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        
        {/* Left Column - Report Information */}
        <div className="space-y-4">
          {/* Report Info Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              GIL NATURAL DIAMOND GRADING REPORT
            </div>
            <div className="bg-white border border-gray-300 p-3 space-y-2 text-sm">
              <div className="text-center font-bold mb-2">
                {new Date(data.reportDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }).toUpperCase()}
              </div>
              <div className="flex justify-between">
                <span>GIL Report Number</span>
                <span className="font-mono">{data.reportNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Shape and Cutting Style</span>
                <span>{data.shape}</span>
              </div>
              <div className="flex justify-between">
                <span>Measurement</span>
                <span>{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Result Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              GRADING RESULT
            </div>
            <div className="bg-white border border-gray-300 p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Carat Weight</span>
                <span className="font-bold">{data.caratWeight} carat</span>
              </div>
              <div className="flex justify-between">
                <span>Color Grade</span>
                <span className="font-bold">{data.colorGrade}</span>
              </div>
              <div className="flex justify-between">
                <span>Clarity Grade</span>
                <span className="font-bold">{data.clarityGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              ADDITIONAL GRADING INFORMATION
            </div>
            <div className="bg-white border border-gray-300 p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Polish</span>
                <span>{data.polish}</span>
              </div>
              <div className="flex justify-between">
                <span>Symmetry</span>
                <span>{data.symmetry}</span>
              </div>
              <div className="flex justify-between">
                <span>Fluorescence</span>
                <span>{data.fluorescence}</span>
              </div>
              <div className="flex justify-between">
                <span>Inscription(s)</span>
                <span className="font-mono text-xs">{data.inscription || `GIL ${data.reportNumber}`}</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold mb-1">Comments:</div>
                <div className="text-xs">{data.comments || "Clouds are not shown. Pinpoints are not shown."}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Additional Information */}
        <div className="space-y-4">
          
          {/* Additional Information Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              ADDITIONAL INFORMATION
            </div>
            <div className="bg-white border border-gray-300 p-3">
              
              {/* Enhanced 3D Diamond Proportions Diagram */}
              <div className="mb-4">
                <svg width="220" height="180" viewBox="0 0 220 180" className="mx-auto">
                  <defs>
                    <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.9"/>
                      <stop offset="50%" stopColor="#e9ecef" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#dee2e6" stopOpacity="0.5"/>
                    </linearGradient>
                    <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6c757d" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#495057" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  <text x="110" y="15" textAnchor="middle" fontSize="10" fill="#666" fontWeight="bold">3D PROPORTIONS DIAGRAM</text>
                  
                  {/* 3D Diamond with depth and shadows */}
                  {/* Table (top view) */}
                  <path d="M60 45 L160 45 L140 85 L80 85 Z" fill="url(#diamondGradient)" stroke="#333" strokeWidth="1.2"/>
                  
                  {/* Crown facets with 3D effect */}
                  <path d="M60 45 L80 25 L140 25 L160 45" fill="url(#diamondGradient)" stroke="#333" strokeWidth="0.8" opacity="0.8"/>
                  <path d="M80 25 L100 15 L120 15 L140 25" fill="#f8f9fa" stroke="#333" strokeWidth="0.6" opacity="0.9"/>
                  
                  {/* Pavilion with 3D depth */}
                  <path d="M80 85 L110 125 L140 85" fill="url(#shadowGradient)" stroke="#333" strokeWidth="1"/>
                  
                  {/* Side view reference lines */}
                  <line x1="175" y1="45" x2="175" y2="125" stroke="#666" strokeWidth="0.8"/>
                  <text x="180" y="85" fontSize="8" fill="#666" transform="rotate(90, 180, 85)">DEPTH</text>
                  
                  {/* Measurement annotations with 3D positioning */}
                  <line x1="40" y1="45" x2="180" y2="45" stroke="#666" strokeWidth="0.5" strokeDasharray="2,2"/>
                  <text x="110" y="38" textAnchor="middle" fontSize="9" fill="#333" fontWeight="bold">
                    Table: {data.tablePercentage || "57%"}
                  </text>
                  
                  <line x1="70" y1="85" x2="150" y2="85" stroke="#666" strokeWidth="0.5" strokeDasharray="2,2"/>
                  <text x="110" y="100" textAnchor="middle" fontSize="9" fill="#333" fontWeight="bold">
                    Depth: {data.depthPercentage || "62.3%"}
                  </text>
                  
                  {/* Crown and Pavilion angle indicators */}
                  <path d="M60 45 L80 25 L75 30" fill="none" stroke="#e74c3c" strokeWidth="1.5"/>
                  <text x="35" y="35" fontSize="8" fill="#e74c3c" fontWeight="bold">Crown: {data.crownAngle || "34.5°"}</text>
                  
                  <path d="M140 85 L110 125 L115 120" fill="none" stroke="#3498db" strokeWidth="1.5"/>
                  <text x="145" y="105" fontSize="8" fill="#3498db" fontWeight="bold">Pavilion: {data.pavilionAngle || "40.8°"}</text>
                  
                  {/* Girdle thickness indicator */}
                  <line x1="80" y1="85" x2="140" y2="85" stroke="#f39c12" strokeWidth="3"/>
                  <text x="110" y="135" textAnchor="middle" fontSize="8" fill="#f39c12" fontWeight="bold">
                    Girdle: {data.girdleThickness || "Medium"}
                  </text>
                  
                  {/* Culet indicator */}
                  <circle cx="110" cy="125" r="2" fill="#9b59b6"/>
                  <text x="110" y="145" textAnchor="middle" fontSize="8" fill="#9b59b6" fontWeight="bold">
                    Culet: {data.culetSize || "None"}
                  </text>
                  
                  {/* Additional 3D reference grid */}
                  <g opacity="0.3">
                    <line x1="60" y1="160" x2="160" y2="160" stroke="#ddd" strokeWidth="0.5"/>
                    <line x1="110" y1="150" x2="110" y2="170" stroke="#ddd" strokeWidth="0.5"/>
                  </g>
                </svg>
              </div>

              {/* Proportions Details */}
              <div className="text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span>Table:</span>
                  <span>{data.tablePercentage || "57%"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Depth:</span>
                  <span>{data.depthPercentage || "62.3%"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crown Angle:</span>
                  <span>{data.crownAngle || "34.5°"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pavilion Angle:</span>
                  <span>{data.pavilionAngle || "40.8°"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Girdle:</span>
                  <span>{data.girdleThickness || "Medium to Slightly Thick"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Culet:</span>
                  <span>{data.culetSize || "None"}</span>
                </div>
              </div>

              {/* Crown and Pavilion Diagrams */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xs font-bold mb-2">Crown</div>
                  <svg width="80" height="60" viewBox="0 0 80 60">
                    <path d="M10 40 L70 40 L60 20 L20 20 Z" fill="none" stroke="#333" strokeWidth="1"/>
                    <text x="40" y="55" textAnchor="middle" fontSize="8" fill="#666">
                      {data.crownAngle || "34.5°"}
                    </text>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold mb-2">Pavilion</div>
                  <svg width="80" height="60" viewBox="0 0 80 60">
                    <path d="M20 20 L60 20 L40 50 Z" fill="none" stroke="#333" strokeWidth="1"/>
                    <text x="40" y="55" textAnchor="middle" fontSize="8" fill="#666">
                      {data.pavilionAngle || "40.8°"}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          
          {/* Enhanced 3D Clarity Characteristics Section */}
          <div>
            <div className="bg-[#8B4513] text-white text-xs font-bold py-1 px-2 border-b border-gray-300">
              CLARITY CHARACTERISTICS
            </div>
            <div className="bg-white border border-gray-300 p-3">
              
              {/* Enhanced 3D Clarity Plot Diagram */}
              <div className="mb-4">
                <svg width="200" height="160" viewBox="0 0 200 160" className="mx-auto">
                  <defs>
                    <radialGradient id="diamond3DGrad" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                      <stop offset="40%" stopColor="#f8f9fa" stopOpacity="0.9"/>
                      <stop offset="70%" stopColor="#e9ecef" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#dee2e6" stopOpacity="0.4"/>
                    </radialGradient>
                    <linearGradient id="facetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#f1f3f4" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#e8eaed" stopOpacity="0.3"/>
                    </linearGradient>
                    <filter id="shadow3D" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="1" dy="1" stdDeviation="0.5" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  
                  <text x="100" y="12" textAnchor="middle" fontSize="9" fill="#333" fontWeight="bold">3D CLARITY ANALYSIS</text>
                  
                  {/* 3D Diamond outline with faceted appearance */}
                  <circle cx="100" cy="80" r="50" fill="url(#diamond3DGrad)" stroke="#333" strokeWidth="1.5" filter="url(#shadow3D)"/>
                  
                  {/* Facet lines for 3D effect */}
                  <g opacity="0.4">
                    <line x1="100" y1="30" x2="100" y2="130" stroke="#666" strokeWidth="0.5"/>
                    <line x1="50" y1="80" x2="150" y2="80" stroke="#666" strokeWidth="0.5"/>
                    <line x1="65" y1="45" x2="135" y2="115" stroke="#666" strokeWidth="0.5"/>
                    <line x1="135" y1="45" x2="65" y2="115" stroke="#666" strokeWidth="0.5"/>
                  </g>
                  
                  {/* Table outline with 3D perspective */}
                  <path d="M75 65 L125 65 L125 95 L75 95 Z" fill="url(#facetGrad)" stroke="#666" strokeWidth="0.8" opacity="0.7"/>
                  <path d="M75 65 L78 62 L128 62 L125 65" fill="#f8f9fa" stroke="#666" strokeWidth="0.6" opacity="0.8"/>
                  <path d="M125 65 L128 62 L128 92 L125 95" fill="#e9ecef" stroke="#666" strokeWidth="0.6" opacity="0.6"/>
                  
                  {/* Enhanced 3D inclusions based on clarity grade */}
                  {(() => {
                    const clarityLevel = data.clarityGrade || "VS1";
                    const inclusions = [];
                    
                    if (clarityLevel.includes("FL") || clarityLevel.includes("IF")) {
                      return (
                        <g>
                          <text x="100" y="85" textAnchor="middle" fontSize="8" fill="#2e7d32" fontWeight="bold">FLAWLESS</text>
                          <circle cx="100" cy="80" r="35" fill="none" stroke="#4caf50" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.5"/>
                        </g>
                      );
                    } else if (clarityLevel.includes("VVS")) {
                      inclusions.push(
                        <g key="vvs">
                          <circle cx="95" cy="70" r="1" fill="#ff5722" opacity="0.7" filter="url(#shadow3D)"/>
                          <circle cx="94" cy="69" r="0.6" fill="#ffccbc" opacity="0.9"/>
                          <circle cx="110" cy="90" r="0.8" fill="#2196f3" opacity="0.6" filter="url(#shadow3D)"/>
                          <ellipse cx="109" cy="89" rx="0.6" ry="0.4" fill="#bbdefb" opacity="0.8"/>
                        </g>
                      );
                    } else if (clarityLevel.includes("VS")) {
                      inclusions.push(
                        <g key="vs">
                          <circle cx="90" cy="70" r="1.2" fill="#ff5722" opacity="0.8" filter="url(#shadow3D)"/>
                          <circle cx="89" cy="69" r="0.8" fill="#ffccbc" opacity="0.9"/>
                          <circle cx="115" cy="85" r="1" fill="#2196f3" opacity="0.7" filter="url(#shadow3D)"/>
                          <ellipse cx="114" cy="84" rx="0.8" ry="0.5" fill="#bbdefb" opacity="0.8"/>
                          <rect x="98" y="95" width="2" height="1.5" fill="#ff9800" opacity="0.7" filter="url(#shadow3D)"/>
                          <rect x="97.5" y="94.5" width="1.5" height="1" fill="#ffe0b2" opacity="0.8"/>
                        </g>
                      );
                    } else if (clarityLevel.includes("SI")) {
                      inclusions.push(
                        <g key="si">
                          <circle cx="88" cy="72" r="1.8" fill="#ff5722" opacity="0.9" filter="url(#shadow3D)"/>
                          <circle cx="87" cy="71" r="1.2" fill="#ffccbc" opacity="0.9"/>
                          <circle cx="118" cy="88" r="1.5" fill="#2196f3" opacity="0.8" filter="url(#shadow3D)"/>
                          <ellipse cx="117" cy="87" rx="1" ry="0.7" fill="#bbdefb" opacity="0.9"/>
                          <rect x="95" y="98" width="3" height="2" fill="#ff9800" opacity="0.8" filter="url(#shadow3D)"/>
                          <rect x="94.5" y="97.5" width="2.5" height="1.5" fill="#ffe0b2" opacity="0.9"/>
                          <polygon points="105,65 107,68 103,68" fill="#9c27b0" opacity="0.7" filter="url(#shadow3D)"/>
                          <polygon points="104.5,64.5 106.5,67 104,67" fill="#e1bee7" opacity="0.8"/>
                        </g>
                      );
                    } else {
                      inclusions.push(
                        <g key="i">
                          <circle cx="85" cy="75" r="2.5" fill="#ff5722" opacity="1" filter="url(#shadow3D)"/>
                          <circle cx="84" cy="74" r="1.8" fill="#ffccbc" opacity="0.9"/>
                          <circle cx="120" cy="90" r="2" fill="#2196f3" opacity="0.9" filter="url(#shadow3D)"/>
                          <ellipse cx="119" cy="89" rx="1.5" ry="1" fill="#bbdefb" opacity="0.9"/>
                          <rect x="92" y="100" width="4" height="3" fill="#ff9800" opacity="0.9" filter="url(#shadow3D)"/>
                          <rect x="91.5" y="99.5" width="3.5" height="2.5" fill="#ffe0b2" opacity="0.9"/>
                          <polygon points="108,62 112,68 104,68" fill="#9c27b0" opacity="0.8" filter="url(#shadow3D)"/>
                          <polygon points="107.5,61.5 111.5,67 104.5,67" fill="#e1bee7" opacity="0.9"/>
                          <ellipse cx="98" cy="80" rx="2" ry="1.3" fill="#4caf50" opacity="0.7" filter="url(#shadow3D)"/>
                          <ellipse cx="97.5" cy="79.5" rx="1.5" ry="1" fill="#c8e6c9" opacity="0.8"/>
                        </g>
                      );
                    }
                    
                    return inclusions;
                  })()}
                  
                  {/* Enhanced 3D Legend with depth */}
                  <g transform="translate(10, 135)">
                    <rect x="-2" y="-2" width="70" height="25" fill="#f8f9fa" stroke="#ddd" strokeWidth="0.3" rx="2"/>
                    <text x="2" y="6" fontSize="6" fill="#333" fontWeight="bold">CLARITY: {data.clarityGrade || "VS1"}</text>
                    
                    <circle cx="2" cy="12" r="1.5" fill="#ff5722" opacity="0.8"/>
                    <text x="7" y="14" fontSize="5" fill="#666">Crystal</text>
                    
                    <circle cx="2" cy="18" r="1.5" fill="#2196f3" opacity="0.7"/>
                    <text x="7" y="20" fontSize="5" fill="#666">Feather</text>
                    
                    <rect x="25" y="16" width="3" height="1.5" fill="#ff9800" opacity="0.7"/>
                    <text x="30" y="18" fontSize="5" fill="#666">Cavity</text>
                  </g>
                  
                  {/* 3D Viewing angle indicator */}
                  <g transform="translate(150, 140)">
                    <text x="0" y="0" fontSize="6" fill="#666">Face-up 10x</text>
                    <circle cx="10" cy="8" r="6" fill="none" stroke="#666" strokeWidth="0.4"/>
                    <text x="10" y="11" textAnchor="middle" fontSize="5" fill="#666">10x</text>
                  </g>
                </svg>
              </div>
              
              <div className="text-xs text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span><strong>Clarity Grade:</strong> {data.clarityGrade || "VS1"}</span>
                  <span><strong>Magnification:</strong> 10x</span>
                </div>
                <p><strong>Characteristics:</strong> {
                  (() => {
                    const clarity = data.clarityGrade || "VS1";
                    if (clarity.includes("FL") || clarity.includes("IF")) return "No inclusions visible";
                    if (clarity.includes("VVS")) return "Very minor inclusions";
                    if (clarity.includes("VS")) return "Minor inclusions under 10x";
                    if (clarity.includes("SI")) return "Noticeable inclusions";
                    return "Obvious inclusions visible";
                  })()
                }</p>
                <p><strong>Internal Features:</strong> Natural characteristics plotted above</p>
              </div>
            </div>
          </div>

          {/* QR Code Section - Positioned below ADDITIONAL INFORMATION */}
          <div className="text-center mt-4">
            <div className="inline-block bg-white border-2 border-gray-400 p-2">
              <QRCodeSVG 
                value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
                size={60}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="text-xs mt-2 text-gray-600">Scan to verify at gilab.info</div>
          </div>

          {/* GIL Seal */}
          <div className="text-center mb-4 mt-4">
            <div className="inline-block relative">
              <img 
                src={gilLogoPath} 
                alt="GIL Seal" 
                className="w-12 h-12 object-contain"
              />
              {data.digitallySignedBy && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M20 6L9 17L4 12" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-xs mt-1">gilab.info</div>
          </div>

          {/* Verification Text */}
          <div className="text-xs text-gray-700 mb-3">
            The results documented in this report refer only to the
            diamond described and were obtained using the techniques
            and equipment used by GIL at the time of examination. This
            certificate does not guarantee the characteristics and
            important gemstone identification and assessment process
            are often not enough for a complete and correct as
            assessed.
          </div>

          <div className="text-xs text-gray-700 mb-3">
            No security features in this document, including no
            holograms, digital report. Other security measures may be in
            use.
          </div>

          {/* Gemologist Signature */}
          <div className="border-t pt-3 mt-4">
            <div className="flex justify-between items-center">
              <div className="text-xs">
                <div className="font-bold mb-1">{data.gemologistName}</div>
                <div className="text-gray-600">Gemologist</div>
              </div>
              <div className="text-xs text-right">
                <div>{new Date(data.signatureDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}