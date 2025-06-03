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
    <div className={`bg-stone-100 p-6 font-sans text-black ${className}`} 
         style={{ 
           width: '297mm', 
           height: '210mm', 
           fontSize: '11px',
           backgroundColor: '#F5F5DC',
           fontFamily: 'Arial, sans-serif',
           lineHeight: '1.2'
         }}>
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        {/* GIL Logo */}
        <div className="flex items-center">
          <div className="relative w-16 h-16 mr-3">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#8B7355" strokeWidth="2"/>
              <g transform="translate(50,50)">
                {/* Radiating lines */}
                {[...Array(24)].map((_, i) => (
                  <line 
                    key={i}
                    x1="0" y1="-35" 
                    x2="0" y2="-40" 
                    stroke="#8B7355" 
                    strokeWidth="1"
                    transform={`rotate(${i * 15})`}
                  />
                ))}
                <circle cx="0" cy="0" r="25" fill="none" stroke="#8B7355" strokeWidth="2"/>
                <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#8B7355" fontWeight="bold">GIL</text>
              </g>
            </svg>
          </div>
          <div className="text-2xl font-bold text-black tracking-wider">GIL°</div>
        </div>

        {/* Center - Report Info */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">GIL REPORT</div>
          <div className="text-3xl font-bold text-black tracking-wider">{data.reportNumber}</div>
          <div className="text-xs text-gray-600 mt-1">Verify this report at gilgem.com</div>
        </div>

        {/* Right - Facsimile */}
        <div className="text-right text-xs max-w-48">
          <div className="font-bold mb-2 text-black">FACSIMILE</div>
          <div className="text-gray-700 leading-tight">
            This is a digital representation of the original GIL Report. This representation might not
            be accepted in lieu of the original GIL Report in certain circumstances. The original GIL
            Report includes security features which are not reproduced in this facsimile.
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-4">
          
          {/* GIL Natural Diamond Grading Report Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              GIL NATURAL DIAMOND GRADING REPORT
            </div>
            <div className="bg-white border border-gray-300 p-3 space-y-2 text-sm">
              <div className="text-center font-bold mb-2">JULY 26, 2025</div>
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
              
              {/* Diamond Proportions Diagram */}
              <div className="mb-4">
                <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                  {/* Profile diagram with measurements */}
                  <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#666">Profile to actual proportions</text>
                  
                  {/* Diamond outline */}
                  <path d="M50 40 L150 40 L130 80 L70 80 Z" fill="none" stroke="#333" strokeWidth="1"/>
                  <path d="M70 80 L100 120 L130 80" fill="none" stroke="#333" strokeWidth="1"/>
                  
                  {/* Measurement lines and labels */}
                  <line x1="30" y1="40" x2="170" y2="40" stroke="#666" strokeWidth="0.5"/>
                  <text x="100" y="35" textAnchor="middle" fontSize="8" fill="#666">50%</text>
                  
                  <line x1="60" y1="80" x2="140" y2="80" stroke="#666" strokeWidth="0.5"/>
                  <text x="100" y="95" textAnchor="middle" fontSize="8" fill="#666">57%</text>
                  
                  {/* Side measurements */}
                  <text x="25" y="70" fontSize="8" fill="#666">15.0%</text>
                  <text x="175" y="70" fontSize="8" fill="#666">35.0%</text>
                  <text x="60" y="110" fontSize="8" fill="#666">43.5%</text>
                  <text x="140" y="110" fontSize="8" fill="#666">41.0%</text>
                </svg>
              </div>

              {/* Crown and Pavilion Diagrams */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xs font-bold mb-2">Crown</div>
                  <svg width="80" height="60" viewBox="0 0 80 60">
                    <path d="M10 40 L70 40 L60 20 L20 20 Z" fill="none" stroke="#333" strokeWidth="1"/>
                    <text x="40" y="55" textAnchor="middle" fontSize="8" fill="#666">Crown Angle</text>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold mb-2">Pavilion</div>
                  <svg width="80" height="60" viewBox="0 0 80 60">
                    <path d="M20 20 L60 20 L40 50 Z" fill="none" stroke="#333" strokeWidth="1"/>
                    <text x="40" y="55" textAnchor="middle" fontSize="8" fill="#666">Pavilion Angle</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          
          {/* Clarity Characteristics Section */}
          <div>
            <div className="bg-amber-900 text-white p-2 text-sm font-bold tracking-wide" style={{ backgroundColor: '#8B7355' }}>
              CLARITY CHARACTERISTICS
            </div>
            <div className="bg-white border border-gray-300 p-3">
              
              {data.clarityPlotDiagram ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs mb-2">Crown View</div>
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <polygon points="40,10 65,30 65,50 40,70 15,50 15,30" fill="none" stroke="#333" strokeWidth="1"/>
                      {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                        <circle 
                          key={`crown-${index}`}
                          cx={inclusion.x + 10} 
                          cy={inclusion.y + 10} 
                          r={inclusion.size} 
                          fill={inclusion.type === 'inclusion' ? "#666" : "#999"}
                          opacity="0.8"
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs mb-2">Profile View</div>
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#333" strokeWidth="1"/>
                      {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                        <circle 
                          key={`profile-${index}`}
                          cx={inclusion.x + 10} 
                          cy={inclusion.y + 10} 
                          r={inclusion.size} 
                          fill={inclusion.type === 'inclusion' ? "#666" : "#999"}
                          opacity="0.8"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <polygon points="40,10 65,30 65,50 40,70 15,50 15,30" fill="none" stroke="#333" strokeWidth="1"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#333" strokeWidth="1"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* GIL Seal */}
              <div className="text-center mb-4">
                <div className="inline-block">
                  <svg viewBox="0 0 60 60" className="w-12 h-12">
                    <circle cx="30" cy="30" r="28" fill="none" stroke="#8B7355" strokeWidth="2"/>
                    <g transform="translate(30,30)">
                      {[...Array(16)].map((_, i) => (
                        <line 
                          key={i}
                          x1="0" y1="-20" 
                          x2="0" y2="-25" 
                          stroke="#8B7355" 
                          strokeWidth="1"
                          transform={`rotate(${i * 22.5})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="15" fill="none" stroke="#8B7355" strokeWidth="1"/>
                      <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#8B7355" fontWeight="bold">GIL</text>
                    </g>
                  </svg>
                </div>
                <div className="text-xs mt-1">gilgem.com</div>
              </div>

              {/* Verification Text */}
              <div className="text-xs text-gray-700 mb-3">
                The results documented in this report refer only to the
                diamond described and were obtained using the techniques
                and equipment used by GIL at the time of examination.
                This certificate does not guarantee the characteristics
                and important gemstone identification and assessment
                process are often not enough for a complete and correct as
                assessed.
              </div>

              {/* Security Features */}
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-600">No security features in this document, including no holograms 
                digital report. Other security measures may be in use.</div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <div className="inline-block bg-white border-2 border-gray-400 p-2">
              <QRCodeSVG 
                value={data.verifierUrl || `https://gilgem.com/verify/${data.reportNumber}`}
                size={60}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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