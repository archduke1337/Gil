import { QRCodeSVG } from 'qrcode.react';

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

const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Dynamic clarity plot diagram generator based on clarity grade
const generateClarityPlotDiagram = (clarityGrade: string) => {
  const clarityInclusionPatterns: { [key: string]: any[] } = {
    'FL': [], // Flawless - no inclusions
    'IF': [], // Internally Flawless - no inclusions
    'VVS1': [
      { x: 45, y: 50, size: 0.8, type: 'pinpoint' }
    ],
    'VVS2': [
      { x: 42, y: 48, size: 1, type: 'pinpoint' },
      { x: 48, y: 52, size: 0.8, type: 'pinpoint' }
    ],
    'VS1': [
      { x: 40, y: 45, size: 1.2, type: 'inclusion' },
      { x: 50, y: 55, size: 1, type: 'pinpoint' }
    ],
    'VS2': [
      { x: 38, y: 42, size: 1.5, type: 'inclusion' },
      { x: 48, y: 50, size: 1.2, type: 'inclusion' },
      { x: 52, y: 58, size: 1, type: 'pinpoint' }
    ],
    'SI1': [
      { x: 35, y: 40, size: 2, type: 'inclusion' },
      { x: 45, y: 48, size: 1.8, type: 'inclusion' },
      { x: 55, y: 55, size: 1.5, type: 'inclusion' },
      { x: 50, y: 62, size: 1.2, type: 'pinpoint' }
    ],
    'SI2': [
      { x: 32, y: 38, size: 2.5, type: 'inclusion' },
      { x: 42, y: 45, size: 2.2, type: 'inclusion' },
      { x: 52, y: 52, size: 2, type: 'inclusion' },
      { x: 58, y: 60, size: 1.8, type: 'inclusion' },
      { x: 48, y: 65, size: 1.5, type: 'pinpoint' }
    ],
    'I1': [
      { x: 30, y: 35, size: 3, type: 'inclusion' },
      { x: 40, y: 42, size: 2.8, type: 'inclusion' },
      { x: 50, y: 50, size: 2.5, type: 'inclusion' },
      { x: 60, y: 58, size: 2.2, type: 'inclusion' },
      { x: 45, y: 65, size: 2, type: 'inclusion' }
    ],
    'I2': [
      { x: 28, y: 32, size: 3.5, type: 'inclusion' },
      { x: 38, y: 40, size: 3.2, type: 'inclusion' },
      { x: 48, y: 48, size: 3, type: 'inclusion' },
      { x: 58, y: 56, size: 2.8, type: 'inclusion' },
      { x: 42, y: 62, size: 2.5, type: 'inclusion' },
      { x: 52, y: 68, size: 2.2, type: 'inclusion' }
    ],
    'I3': [
      { x: 25, y: 30, size: 4, type: 'inclusion' },
      { x: 35, y: 38, size: 3.8, type: 'inclusion' },
      { x: 45, y: 45, size: 3.5, type: 'inclusion' },
      { x: 55, y: 53, size: 3.2, type: 'inclusion' },
      { x: 40, y: 60, size: 3, type: 'inclusion' },
      { x: 50, y: 67, size: 2.8, type: 'inclusion' },
      { x: 60, y: 65, size: 2.5, type: 'inclusion' }
    ]
  };
  
  return clarityInclusionPatterns[clarityGrade] || clarityInclusionPatterns['SI1'];
};

// Dynamic color grade diagram generator
const generateColorGradeDiagram = (colorGrade: string) => {
  const colorGradients: { [key: string]: { start: string; end: string; description: string } } = {
    'D': { start: '#ffffff', end: '#fafafa', description: 'Absolutely Colorless' },
    'E': { start: '#fefefe', end: '#f8f8f8', description: 'Absolutely Colorless' },
    'F': { start: '#fdfdfd', end: '#f6f6f6', description: 'Absolutely Colorless' },
    'G': { start: '#fcfcfc', end: '#f4f4f4', description: 'Near Colorless' },
    'H': { start: '#fbfbfb', end: '#f2f2f2', description: 'Near Colorless' },
    'I': { start: '#faf9f8', end: '#f0efe8', description: 'Near Colorless' },
    'J': { start: '#f9f8f6', end: '#eeeee0', description: 'Near Colorless' },
    'K': { start: '#f8f7f4', end: '#ededda', description: 'Faint Yellow' },
    'L': { start: '#f7f6f2', end: '#ebebd4', description: 'Faint Yellow' },
    'M': { start: '#f6f5f0', end: '#e9e9ce', description: 'Faint Yellow' },
    'N': { start: '#f5f4ee', end: '#e7e7c8', description: 'Very Light Yellow' },
    'O': { start: '#f4f3ec', end: '#e5e5c2', description: 'Very Light Yellow' },
    'P': { start: '#f3f2ea', end: '#e3e3bc', description: 'Very Light Yellow' },
    'Q': { start: '#f2f1e8', end: '#e1e1b6', description: 'Very Light Yellow' },
    'R': { start: '#f1f0e6', end: '#dfdfb0', description: 'Very Light Yellow' },
    'S': { start: '#f0efe4', end: '#ddddaa', description: 'Light Yellow' }
  };

  return colorGradients[colorGrade] || colorGradients['H'];
};

export default function GILCertificateTemplate({ data, className = "" }: GILCertificateTemplateProps) {
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
            <img 
              src="/attached_assets/1000119055-removebg-preview.png" 
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
                <div className="inline-block relative">
                  <img 
                    src="/attached_assets/1000119055-removebg-preview.png" 
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
        </div>
      </div>
    </div>
  );
}