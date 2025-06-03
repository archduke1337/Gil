import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logoPath from "@assets/1000119055-removebg-preview.png";

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
}

interface GILCertificateTemplateProps {
  data: GILCertificateData;
  className?: string;
}

export default function GILCertificateTemplate({ data, className = "" }: GILCertificateTemplateProps) {
  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return String(date);
  };

  const verificationUrl = `${data.verifierUrl || 'https://gilab.info/verify'}/${data.reportNumber}`;

  // Generate clarity plot diagram based on clarity grade
  const generateClarityPlotDiagram = (clarityGrade: string) => {
    const clarityInclusionPatterns: { [key: string]: Array<{ x: number, y: number, size: number, type: 'inclusion' | 'blemish' }> } = {
      'FL': [], // Flawless - no inclusions
      'IF': [], // Internally Flawless - no inclusions
      'VVS1': [
        { x: 55, y: 35, size: 0.8, type: 'inclusion' }
      ],
      'VVS2': [
        { x: 45, y: 40, size: 1, type: 'inclusion' },
        { x: 65, y: 45, size: 0.8, type: 'inclusion' }
      ],
      'VS1': [
        { x: 50, y: 35, size: 1.2, type: 'inclusion' },
        { x: 60, y: 50, size: 1, type: 'inclusion' }
      ],
      'VS2': [
        { x: 45, y: 40, size: 1.5, type: 'inclusion' },
        { x: 55, y: 55, size: 1.2, type: 'inclusion' },
        { x: 65, y: 45, size: 1, type: 'inclusion' }
      ],
      'SI1': [
        { x: 45, y: 40, size: 2, type: 'inclusion' },
        { x: 55, y: 55, size: 1.8, type: 'inclusion' },
        { x: 65, y: 45, size: 1.5, type: 'inclusion' },
        { x: 50, y: 65, size: 1.2, type: 'inclusion' }
      ],
      'SI2': [
        { x: 40, y: 40, size: 2.5, type: 'inclusion' },
        { x: 55, y: 50, size: 2.2, type: 'inclusion' },
        { x: 70, y: 45, size: 2, type: 'inclusion' },
        { x: 50, y: 65, size: 1.8, type: 'inclusion' },
        { x: 35, y: 60, size: 1.5, type: 'inclusion' }
      ],
      'I1': [
        { x: 40, y: 40, size: 3, type: 'inclusion' },
        { x: 55, y: 50, size: 2.8, type: 'inclusion' },
        { x: 70, y: 45, size: 2.5, type: 'inclusion' },
        { x: 50, y: 65, size: 2.2, type: 'inclusion' },
        { x: 35, y: 60, size: 2, type: 'inclusion' },
        { x: 60, y: 35, size: 1.8, type: 'inclusion' }
      ],
      'I2': [
        { x: 35, y: 35, size: 4, type: 'inclusion' },
        { x: 55, y: 50, size: 3.5, type: 'inclusion' },
        { x: 75, y: 45, size: 3, type: 'inclusion' },
        { x: 45, y: 70, size: 2.8, type: 'inclusion' },
        { x: 30, y: 65, size: 2.5, type: 'inclusion' },
        { x: 65, y: 30, size: 2.2, type: 'inclusion' },
        { x: 50, y: 35, size: 2, type: 'inclusion' }
      ],
      'I3': [
        { x: 30, y: 30, size: 5, type: 'inclusion' },
        { x: 55, y: 50, size: 4.5, type: 'inclusion' },
        { x: 80, y: 45, size: 4, type: 'inclusion' },
        { x: 40, y: 75, size: 3.5, type: 'inclusion' },
        { x: 25, y: 70, size: 3, type: 'inclusion' },
        { x: 70, y: 25, size: 2.8, type: 'inclusion' },
        { x: 45, y: 30, size: 2.5, type: 'inclusion' },
        { x: 60, y: 65, size: 2.2, type: 'inclusion' }
      ]
    };

    return clarityInclusionPatterns[clarityGrade] || clarityInclusionPatterns['VS2'];
  };

  // Generate color grade diagram based on color grade
  const generateColorGradeDiagram = (colorGrade: string) => {
    const colorGradients: { [key: string]: { start: string, end: string, description: string } } = {
      'D': { start: '#ffffff', end: '#f8f9fa', description: 'Absolutely Colorless' },
      'E': { start: '#f8f9fa', end: '#f1f3f4', description: 'Colorless' },
      'F': { start: '#f1f3f4', end: '#e8eaed', description: 'Colorless' },
      'G': { start: '#e8eaed', end: '#dadce0', description: 'Near Colorless' },
      'H': { start: '#dadce0', end: '#bdc1c6', description: 'Near Colorless' },
      'I': { start: '#bdc1c6', end: '#9aa0a6', description: 'Near Colorless' },
      'J': { start: '#9aa0a6', end: '#80868b', description: 'Near Colorless' },
      'K': { start: '#fef7e0', end: '#fef3c7', description: 'Faint Yellow' },
      'L': { start: '#fef3c7', end: '#fde68a', description: 'Faint Yellow' },
      'M': { start: '#fde68a', end: '#fcd34d', description: 'Faint Yellow' },
      'N': { start: '#fcd34d', end: '#f59e0b', description: 'Very Light Yellow' },
      'O': { start: '#f59e0b', end: '#d97706', description: 'Very Light Yellow' },
      'P': { start: '#d97706', end: '#b45309', description: 'Very Light Yellow' },
      'Q': { start: '#b45309', end: '#92400e', description: 'Light Yellow' },
      'R': { start: '#92400e', end: '#78350f', description: 'Light Yellow' },
      'S': { start: '#78350f', end: '#451a03', description: 'Light Yellow' }
    };

    return colorGradients[colorGrade] || colorGradients['H'];
  };

  return (
    <div className={`relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8 font-serif text-black ${className}`} 
         style={{ 
           width: '297mm', 
           height: '210mm', 
           fontSize: '10px',
           background: 'linear-gradient(135deg, #FEF7ED 0%, #FED7AA 20%, #FDBA74 40%, #FB923C 60%, #F97316 80%, #EA580C 100%)',
           fontFamily: 'Georgia, "Times New Roman", serif',
           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
           filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
         }}>
      
      {/* Enhanced Paper Texture with Security Pattern */}
      <div className="absolute inset-0 paper-texture certificate-watermark opacity-10 pointer-events-none"></div>
      
      {/* Animated Security Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none transform rotate-45"
           style={{ animation: 'securityPattern 6s ease-in-out infinite' }}>
        <div className="text-8xl font-bold text-amber-800" 
             style={{ 
               fontFamily: 'Georgia, serif',
               textShadow: '4px 4px 8px rgba(146, 64, 14, 0.2)',
               background: 'linear-gradient(45deg, #92400e, #d97706, #92400e)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent'
             }}>
          GIL AUTHENTIC
        </div>
      </div>
      
      {/* Elegant Header with 3D Effects */}
      <div className="relative mb-6 transform perspective-1000">
        {/* Multi-layer shadow effect */}
        <div className="absolute -inset-3 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 rounded-lg opacity-10 blur-sm"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 rounded-lg opacity-15 blur-sm"></div>
        <div className="absolute -inset-1 border-2 border-amber-700 rounded-lg shadow-lg"></div>
        
        {/* Main header with 3D depth */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6 rounded-lg border-2 border-amber-400"
             style={{
               boxShadow: `
                 0 8px 32px rgba(251, 146, 60, 0.3),
                 inset 0 1px 0 rgba(255, 255, 255, 0.5),
                 inset 0 -1px 0 rgba(251, 146, 60, 0.2),
                 0 4px 8px rgba(0, 0, 0, 0.1)
               `,
               background: 'linear-gradient(145deg, #fef3c7, #fed7aa, #fdba74)',
               transform: 'translateZ(0)'
             }}>
          
          {/* Embossed border effect */}
          <div className="absolute inset-2 border border-amber-300 rounded-lg"
               style={{
                 boxShadow: 'inset 2px 2px 4px rgba(251, 146, 60, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.3)'
               }}>
          </div>
          
          <div className="relative flex items-start justify-between z-10">
            
            {/* Left: Enhanced 3D Logo and Company Name */}
            <div className="flex items-center space-x-6">
              <div className="relative transform-gpu">
                {/* Multiple shadow layers for depth */}
                <div className="absolute -inset-2 bg-amber-900 rounded-full opacity-20 blur-md transform rotate-6"></div>
                <div className="absolute -inset-1 bg-amber-800 rounded-full opacity-25 blur-sm transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full transform rotate-12 opacity-40"></div>
                
                {/* Layered background for 3D effect */}
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500 rounded-full"
                     style={{
                       boxShadow: 'inset 2px 2px 8px rgba(146, 64, 14, 0.3), inset -2px -2px 8px rgba(255, 255, 255, 0.4)'
                     }}>
                </div>
                
                {/* Main logo with enhanced effects */}
                <img src={logoPath} alt="GIL Logo" 
                     className="relative w-20 h-20 rounded-full border-4 border-amber-700 z-10" 
                     style={{
                       boxShadow: `
                         0 8px 16px rgba(146, 64, 14, 0.4),
                         0 4px 8px rgba(0, 0, 0, 0.2),
                         inset 0 2px 0 rgba(255, 255, 255, 0.3),
                         inset 0 -2px 0 rgba(146, 64, 14, 0.2)
                       `,
                       filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                     }} />
                
                {/* Holographic effect overlay */}
                <div className="absolute inset-2 rounded-full opacity-20 pointer-events-none"
                     style={{
                       background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                       animation: 'shimmer 3s ease-in-out infinite'
                     }}>
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold tracking-wide text-amber-900 mb-1" 
                     style={{ 
                       fontFamily: 'Georgia, serif', 
                       textShadow: '2px 2px 4px rgba(146, 64, 14, 0.3), 0 0 8px rgba(251, 146, 60, 0.2)',
                       background: 'linear-gradient(135deg, #92400e, #d97706, #f59e0b)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                       filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
                     }}>
                  GIL°
                </div>
                <div className="text-sm text-amber-800 font-semibold tracking-wide"
                     style={{ 
                       textShadow: '1px 1px 2px rgba(146, 64, 14, 0.2)' 
                     }}>
                  Gemological Institute Laboratory
                </div>
                <div className="text-xs text-amber-700 italic mt-1">Excellence in Diamond Certification</div>
              </div>
            </div>
            
            {/* Center: Enhanced 3D Report Number */}
            <div className="text-center relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-700 to-orange-700 rounded-lg opacity-20 blur-md"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-lg p-4 border-3 border-amber-600"
                   style={{
                     boxShadow: `
                       0 12px 30px rgba(251, 146, 60, 0.4),
                       inset 0 3px 0 rgba(255, 255, 255, 0.8),
                       inset 0 -3px 0 rgba(251, 146, 60, 0.3),
                       0 6px 12px rgba(0, 0, 0, 0.15)
                     `,
                     transform: 'translateZ(0)'
                   }}>
                <div className="text-sm font-bold text-amber-800 mb-2 tracking-wider" 
                     style={{ textShadow: '1px 1px 3px rgba(146, 64, 14, 0.3)' }}>
                  GIL REPORT
                </div>
                <div className="text-2xl font-bold tracking-wider text-amber-900 mb-2" 
                     style={{ 
                       fontFamily: 'Georgia, serif',
                       textShadow: '3px 3px 6px rgba(146, 64, 14, 0.4), 0 0 10px rgba(251, 146, 60, 0.3)',
                       background: 'linear-gradient(135deg, #92400e, #d97706, #f59e0b)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                       filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
                     }}>
                  {data.reportNumber}
                </div>
                <div className="text-xs text-amber-700 italic font-medium" 
                     style={{ textShadow: '1px 1px 2px rgba(146, 64, 14, 0.2)' }}>
                  Verify this report at gilgem.com
                </div>
              </div>
            </div>

            {/* Right: Facsimile Notice */}
            <div className="text-right max-w-48">
              <div className="text-xs font-bold mb-2 text-amber-900 tracking-wider">FACSIMILE</div>
              <div className="text-xs leading-tight text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                This is a digital representation of the original GIL Report. This representation might not
                be accepted in lieu of the original GIL Report in certain circumstances. The original GIL
                Report includes security features which are not reproduced in this facsimile.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-4">
          {/* Natural Diamond Grading Report */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              GIL NATURAL DIAMOND GRADING REPORT
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-amber-200 pb-1">
                <span className="text-amber-800 font-medium">{formatDate(data.reportDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">GIL Report Number</span>
                <span className="font-mono font-bold text-amber-900">{data.reportNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Shape and Cutting Style</span>
                <span className="font-medium text-amber-900">{data.shape}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Measurements</span>
                <span className="font-mono text-amber-900">{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Result */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600 mt-6">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              GRADING RESULT
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-amber-700">Carat Weight</span>
                <span className="font-bold text-amber-900 text-sm">{data.caratWeight} carat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Color Grade</span>
                <span className="font-bold text-amber-900 text-sm">{data.colorGrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Clarity Grade</span>
                <span className="font-bold text-amber-900 text-sm">{data.clarityGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600 mt-6">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              ADDITIONAL GRADING INFORMATION
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-amber-700">Polish</span>
                <span className="text-amber-900 font-medium">{data.polish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Symmetry</span>
                <span className="text-amber-900 font-medium">{data.symmetry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Fluorescence</span>
                <span className="text-amber-900 font-medium">{data.fluorescence}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Inscription(s)</span>
                <span className="font-mono text-xs text-amber-900">{data.inscription || 'GIL ' + data.reportNumber}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-200">
                <div className="text-xs text-amber-700 font-medium">Comments:</div>
                <div className="text-xs mt-1 text-amber-800 italic">
                  {data.comments || 'Clouds are not shown. Pinpoints are not shown.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Additional Information */}
        <div className="col-span-5">
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600 mb-4">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              ADDITIONAL INFORMATION
            </div>
          </div>

          {/* Proportions Diagram */}
          <div className="bg-amber-50 border-2 border-amber-300 p-4 mb-4 rounded-lg shadow-sm" style={{ height: '220px' }}>
            <div className="text-center text-xs mb-3 font-medium text-amber-800">Profile to actual proportions</div>
            
            <div className="flex justify-center items-center h-32">
              <svg width="180" height="120" viewBox="0 0 180 120">
                {/* Crown */}
                <polygon points="90,15 60,50 120,50" fill="none" stroke="#92400e" strokeWidth="1.5"/>
                {/* Girdle */}
                <line x1="60" y1="50" x2="120" y2="50" stroke="#92400e" strokeWidth="3"/>
                {/* Pavilion */}
                <polygon points="60,50 120,50 90,100" fill="none" stroke="#92400e" strokeWidth="1.5"/>
                
                {/* Measurement lines and labels */}
                <line x1="55" y1="15" x2="55" y2="50" stroke="#d97706" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="125" y1="15" x2="125" y2="50" stroke="#d97706" strokeWidth="0.5" strokeDasharray="2,2"/>
                
                {/* Labels with elegant styling */}
                <text x="25" y="30" fontSize="9" fill="#92400e" fontFamily="Georgia">50%</text>
                <text x="135" y="30" fontSize="9" fill="#92400e" fontFamily="Georgia">57%</text>
                <text x="10" y="42" fontSize="8" fill="#92400e" fontFamily="Georgia">15.0% 35.0°</text>
                <text x="130" y="65" fontSize="8" fill="#92400e" fontFamily="Georgia">41.0°</text>
                <text x="10" y="75" fontSize="8" fill="#92400e" fontFamily="Georgia">43.5%</text>
                <text x="30" y="105" fontSize="8" fill="#92400e" fontFamily="Georgia">80%</text>
              </svg>
            </div>
            
            {/* Diamond face-up view with enhanced styling */}
            <div className="mt-4 flex justify-center">
              <div className="bg-white p-2 rounded border border-amber-200 shadow-sm">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <polygon points="45,8 70,28 70,62 45,82 20,62 20,28" fill="none" stroke="#92400e" strokeWidth="1.5"/>
                  <polygon points="45,18 60,28 60,62 45,72 30,62 30,28" fill="none" stroke="#d97706" strokeWidth="1"/>
                  <text x="32" y="86" fontSize="7" fill="#92400e" fontFamily="Georgia">Face View</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Clarity Characteristics */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600 mb-4">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              CLARITY CHARACTERISTICS
            </div>
          </div>

          {data.clarityPlotDiagram ? (
            // Dynamic Clarity Plot Diagram based on actual clarity grade
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm" style={{ height: '140px' }}>
                <div className="text-center text-xs mb-2 font-medium text-amber-800">Crown View - {data.clarityGrade}</div>
                <div className="flex justify-center items-center h-24">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* Diamond outline */}
                    <polygon points="60,15 95,45 95,75 60,105 25,75 25,45" fill="none" stroke="#92400e" strokeWidth="1.8"/>
                    <polygon points="60,25 85,45 85,75 60,95 35,75 35,45" fill="none" stroke="#d97706" strokeWidth="1"/>
                    
                    {/* Dynamic inclusions based on clarity grade */}
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle 
                        key={`crown-${index}`}
                        cx={inclusion.x + 5} 
                        cy={inclusion.y + 5} 
                        r={inclusion.size} 
                        fill={inclusion.type === 'inclusion' ? "#dc2626" : "#f59e0b"}
                        opacity="0.8"
                      />
                    ))}
                    
                    {/* Grade label */}
                    <text x="60" y="115" fontSize="8" fill="#92400e" fontFamily="Georgia" textAnchor="middle">
                      Clarity: {data.clarityGrade}
                    </text>
                  </svg>
                </div>
              </div>
              
              <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm" style={{ height: '140px' }}>
                <div className="text-center text-xs mb-2 font-medium text-amber-800">Profile View - {data.clarityGrade}</div>
                <div className="flex justify-center items-center h-24">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* Diamond profile outline */}
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#92400e" strokeWidth="1.8"/>
                    <circle cx="60" cy="60" r="35" fill="none" stroke="#d97706" strokeWidth="1"/>
                    
                    {/* Dynamic inclusions based on clarity grade */}
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle 
                        key={`profile-${index}`}
                        cx={inclusion.x + 5} 
                        cy={inclusion.y + 5} 
                        r={inclusion.size} 
                        fill={inclusion.type === 'inclusion' ? "#dc2626" : "#f59e0b"}
                        opacity="0.8"
                      />
                    ))}
                    
                    {/* Grade label */}
                    <text x="60" y="115" fontSize="8" fill="#92400e" fontFamily="Georgia" textAnchor="middle">
                      Profile: {data.clarityGrade}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            // Standard clarity diagrams when clarity plot is not selected
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm" style={{ height: '130px' }}>
                <div className="text-center text-xs mb-2 font-medium text-amber-800">Crown View</div>
                <div className="flex justify-center items-center h-20">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <polygon points="55,15 85,40 85,70 55,95 25,70 25,40" fill="none" stroke="#92400e" strokeWidth="1.5"/>
                    <circle cx="55" cy="55" r="2.5" fill="#dc2626"/>
                    <circle cx="48" cy="45" r="1.5" fill="#dc2626"/>
                    <circle cx="62" cy="48" r="1" fill="#dc2626"/>
                  </svg>
                </div>
              </div>
              <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm" style={{ height: '130px' }}>
                <div className="text-center text-xs mb-2 font-medium text-amber-800">Profile View</div>
                <div className="flex justify-center items-center h-20">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="45" fill="none" stroke="#92400e" strokeWidth="1.5"/>
                    <circle cx="55" cy="55" r="2.5" fill="#dc2626"/>
                    <circle cx="48" cy="45" r="1.5" fill="#dc2626"/>
                    <circle cx="62" cy="48" r="1" fill="#dc2626"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-4">
          
          {/* Grading Scale */}
          <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm">
            <div className="text-xs font-bold mb-3 text-center text-amber-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              CLARITY
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-amber-800">
                <span>FLAWLESS</span>
                <span className="font-mono">FL</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>INTERNALLY</span>
                <span className="font-mono">IF</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>FLAWLESS</span>
                <span></span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>VERY VERY</span>
                <span className="font-mono">VVS</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>SLIGHTLY INCL</span>
                <span></span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>VERY SLIGHTLY</span>
                <span className="font-mono">VS</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>INCLUDED</span>
                <span></span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>SLIGHTLY</span>
                <span className="font-mono">SI</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>INCLUDED</span>
                <span></span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>INCLUDED</span>
                <span className="font-mono">I</span>
              </div>
            </div>
          </div>

          {/* Color Grade Diagram - Conditional */}
          {data.colorGradeDiagram && (
            <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm">
              <div className="text-xs font-bold mb-3 text-center text-amber-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
                COLOR GRADE: {data.colorGrade}
              </div>
              
              <div className="space-y-3">
                {/* Color grade visualization */}
                <div className="bg-white p-3 rounded border border-amber-200">
                  <div className="text-center text-xs mb-2 font-medium text-amber-800">
                    {generateColorGradeDiagram(data.colorGrade).description}
                  </div>
                  
                  {/* Color gradient display */}
                  <div className="relative h-12 rounded border border-amber-300 overflow-hidden">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, ${generateColorGradeDiagram(data.colorGrade).start}, ${generateColorGradeDiagram(data.colorGrade).end})`
                      }}
                    ></div>
                    
                    {/* Grade marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-amber-900 text-white px-2 py-1 rounded text-xs font-bold border border-amber-700">
                        {data.colorGrade}
                      </div>
                    </div>
                  </div>
                  
                  {/* Color scale reference */}
                  <div className="mt-2 flex justify-between text-xs text-amber-700">
                    <span>D (Colorless)</span>
                    <span>Z (Light Yellow)</span>
                  </div>
                </div>
                
                {/* Diamond silhouette with color */}
                <div className="bg-white p-3 rounded border border-amber-200 text-center">
                  <div className="text-xs mb-2 font-medium text-amber-800">Diamond Color Representation</div>
                  <div className="flex justify-center">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <defs>
                        <linearGradient id={`colorGrade-${data.colorGrade}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={generateColorGradeDiagram(data.colorGrade).start} />
                          <stop offset="100%" stopColor={generateColorGradeDiagram(data.colorGrade).end} />
                        </linearGradient>
                      </defs>
                      
                      {/* Diamond shape */}
                      <polygon 
                        points="40,8 65,28 65,52 40,72 15,52 15,28" 
                        fill={`url(#colorGrade-${data.colorGrade})`}
                        stroke="#92400e" 
                        strokeWidth="1.5"
                      />
                      <polygon 
                        points="40,18 55,28 55,52 40,62 25,52 25,28" 
                        fill="none" 
                        stroke="#d97706" 
                        strokeWidth="1"
                      />
                      
                      {/* Grade label */}
                      <text x="40" y="76" fontSize="8" fill="#92400e" fontFamily="Georgia" textAnchor="middle">
                        Grade: {data.colorGrade}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced 3D GIL Seal with Security Features */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto transform-gpu">
              {/* Multi-layer depth shadows */}
              <div className="absolute -inset-3 bg-amber-900 rounded-full opacity-15 blur-lg"></div>
              <div className="absolute -inset-2 bg-amber-800 rounded-full opacity-20 blur-md"></div>
              <div className="absolute -inset-1 bg-amber-700 rounded-full opacity-25 blur-sm"></div>
              
              {/* Outer ring with 3D effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full"
                   style={{
                     boxShadow: `
                       0 8px 16px rgba(146, 64, 14, 0.4),
                       inset 0 2px 0 rgba(255, 255, 255, 0.3),
                       inset 0 -2px 0 rgba(146, 64, 14, 0.3)
                     `
                   }}></div>
              
              {/* Middle ring with embossed effect */}
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 rounded-full border-2 border-amber-700 embossed"
                   style={{
                     boxShadow: `
                       inset 2px 2px 4px rgba(146, 64, 14, 0.2),
                       inset -2px -2px 4px rgba(255, 255, 255, 0.3),
                       0 4px 8px rgba(0, 0, 0, 0.1)
                     `
                   }}></div>
              
              {/* Inner seal with holographic effect */}
              <div className="absolute inset-4 bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-full border border-amber-600 flex items-center justify-center"
                   style={{
                     boxShadow: `
                       inset 1px 1px 3px rgba(251, 146, 60, 0.2),
                       0 2px 4px rgba(0, 0, 0, 0.1)
                     `
                   }}>
                <div className="text-sm font-bold text-amber-900" 
                     style={{ 
                       fontFamily: 'Georgia, serif',
                       textShadow: '1px 1px 2px rgba(146, 64, 14, 0.3)',
                       background: 'linear-gradient(135deg, #92400e, #d97706)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent'
                     }}>
                  GIL
                </div>
              </div>
              
              {/* Security hologram overlay */}
              <div className="absolute inset-2 rounded-full opacity-30 pointer-events-none overflow-hidden">
                <div className="w-full h-full"
                     style={{
                       background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                       animation: 'shimmer 4s ease-in-out infinite'
                     }}></div>
              </div>
              
              {/* Enhanced decorative elements with 3D effects */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-3d-small"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-3d-small"></div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-3d-small"></div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-3d-small"></div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-lg shadow-sm text-center">
            <div className="text-xs font-medium text-amber-800 mb-2">
              The results documented in this report refer only to the diamond described, and were obtained using the techniques
              and equipment used by GIL at the time of examination.
            </div>
            <div className="text-xs text-amber-700 mb-3 italic">
              This report is not a guarantee, valuation or appraisal and contains only the characteristics
              of the diamond described. Additional instruments and assessment
              present are not to be considered. Internal characteristics may not be shown. Details of finish are
              not shown.
            </div>
            
            {/* Security Icons */}
            <div className="flex justify-center items-center space-x-2 mb-3">
              <div className="w-4 h-4 bg-amber-600 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-xs text-amber-800 font-medium">SECURITY FEATURES IN THIS DOCUMENT INCLUDE HOLOGRAM</div>
            </div>
            
            <div className="text-xs text-amber-700">MICRO-PRINT LINES AND GEMPRINT IDENTIFICATION AND ASSESSMENT
            TECHNOLOGY. PLEASE SEE GILAB.INFO FOR TERMS AND CONDITIONS.</div>
          </div>

          {/* QR Code and Website */}
          <div className="text-center">
            <div className="text-xs font-medium text-amber-800 mb-2">@gilgem.com</div>
            <div className="bg-white p-3 border-2 border-amber-300 rounded-lg shadow-sm inline-block">
              <QRCodeSVG 
                value={verificationUrl}
                size={60}
                bgColor="#ffffff"
                fgColor="#92400e"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Footer with Brown Theme */}
      <div className="mt-8 pt-6 border-t-2 border-amber-600">
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-4 rounded-lg border border-amber-300 shadow-sm">
          <div className="grid grid-cols-3 gap-6 text-xs">
            
            {/* Left: Security Features */}
            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <div className="font-bold mb-2 text-amber-900 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Security Features
              </div>
              <div className="space-y-1 text-amber-800">
                <div>• Digital verification via QR code</div>
                <div>• Unique report number tracking</div>
                <div>• Tamper-evident design elements</div>
                <div>• Holographic security markers</div>
                {data.colorGradeDiagram && <div>• Color grade diagram included</div>}
                {data.clarityPlotDiagram && <div>• Clarity plot diagram included</div>}
              </div>
            </div>
            
            {/* Center: Verification */}
            <div className="text-center bg-white p-3 rounded border-2 border-amber-300 shadow-sm">
              <div className="font-bold mb-2 text-amber-900 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Digital Verification
              </div>
              <div className="flex justify-center mb-2">
                <QRCodeSVG 
                  value={verificationUrl}
                  size={70}
                  level="M"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#92400e"
                />
              </div>
              <div className="text-xs text-amber-800 font-medium">Scan to verify authenticity</div>
              <div className="text-xs text-amber-700 mt-1">Visit: gilgem.com/verify</div>
            </div>
            
            {/* Right: Certification */}
            <div className="text-right bg-amber-50 p-3 rounded border border-amber-200">
              <div className="font-bold mb-2 text-amber-900 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Gemologist Certification
              </div>
              <div className="space-y-1 text-amber-800">
                <div><span className="font-medium">Gemologist:</span> {data.gemologistName}</div>
                <div><span className="font-medium">Date:</span> {formatDate(data.signatureDate)}</div>
                {data.digitallySignedBy && (
                  <div className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-1 rounded mt-2">
                    ✓ Digitally Signed by {data.gemologistName}
                  </div>
                )}
                <div className="text-xs italic text-amber-700 mt-2">Certified and verified by GIL</div>
              </div>
            </div>
          </div>
          
          {/* Additional Notes Section */}
          {data.certificateNotes && (
            <div className="mt-4 pt-3 border-t border-amber-300">
              <div className="bg-amber-50 p-3 rounded border border-amber-200">
                <div className="font-bold text-xs mb-2 text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Additional Notes:
                </div>
                <div className="text-xs text-amber-800 italic">{data.certificateNotes}</div>
              </div>
            </div>
          )}
          
          {/* Professional Footer Text */}
          <div className="mt-4 pt-3 border-t border-amber-300 text-center">
            <div className="text-xs text-amber-800 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
              GIL - GEMOLOGICAL INSTITUTE LABORATORY
            </div>
            <div className="text-xs text-amber-700 mt-1">
              Excellence in Diamond Certification • Est. 2024 • Visit: gilgem.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}