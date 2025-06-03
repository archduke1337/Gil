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
              
              {/* Diamond Proportions Diagram */}
              <div className="mb-4">
                <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                  <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#666">Profile to actual proportions</text>
                  
                  {/* Diamond outline */}
                  <path d="M50 40 L150 40 L130 80 L70 80 Z" fill="none" stroke="#333" strokeWidth="1"/>
                  <path d="M70 80 L100 120 L130 80" fill="none" stroke="#333" strokeWidth="1"/>
                  
                  {/* Measurement lines and labels using actual data */}
                  <line x1="30" y1="40" x2="170" y2="40" stroke="#666" strokeWidth="0.5"/>
                  <text x="100" y="35" textAnchor="middle" fontSize="8" fill="#666">
                    {data.tablePercentage || "57%"}
                  </text>
                  
                  <line x1="60" y1="80" x2="140" y2="80" stroke="#666" strokeWidth="0.5"/>
                  <text x="100" y="95" textAnchor="middle" fontSize="8" fill="#666">
                    {data.depthPercentage || "62.3%"}
                  </text>
                  
                  {/* Side measurements */}
                  <text x="25" y="70" fontSize="8" fill="#666">{data.crownAngle || "34.5°"}</text>
                  <text x="175" y="70" fontSize="8" fill="#666">{data.pavilionAngle || "40.8°"}</text>
                  <text x="60" y="110" fontSize="8" fill="#666">{data.girdleThickness || "Medium"}</text>
                  <text x="140" y="110" fontSize="8" fill="#666">{data.culetSize || "None"}</text>
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