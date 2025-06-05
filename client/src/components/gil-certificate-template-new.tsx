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
      { x: 35, y: 30, size: 0.8, type: 'crystal' },
      { x: 65, y: 60, size: 0.6, type: 'pinpoint' }
    ],
    'VS1': [
      { x: 40, y: 50, size: 1.0, type: 'inclusion' },
      { x: 60, y: 30, size: 0.8, type: 'crystal' },
      { x: 55, y: 65, size: 0.7, type: 'surface' }
    ],
    'VS2': [
      { x: 35, y: 45, size: 1.2, type: 'inclusion' },
      { x: 65, y: 35, size: 1.0, type: 'crystal' },
      { x: 50, y: 70, size: 0.9, type: 'surface' },
      { x: 45, y: 25, size: 0.8, type: 'pinpoint' }
    ],
    'SI1': [
      { x: 30, y: 40, size: 1.5, type: 'inclusion' },
      { x: 70, y: 55, size: 1.3, type: 'crystal' },
      { x: 45, y: 65, size: 1.1, type: 'surface' },
      { x: 60, y: 25, size: 1.0, type: 'pinpoint' },
      { x: 35, y: 70, size: 0.9, type: 'surface' }
    ],
    'SI2': [
      { x: 25, y: 35, size: 1.8, type: 'inclusion' },
      { x: 75, y: 50, size: 1.6, type: 'crystal' },
      { x: 50, y: 75, size: 1.4, type: 'surface' },
      { x: 65, y: 20, size: 1.2, type: 'pinpoint' },
      { x: 30, y: 65, size: 1.1, type: 'surface' },
      { x: 55, y: 35, size: 1.0, type: 'inclusion' }
    ]
  };

  return inclusionPatterns[clarityGrade] || inclusionPatterns['SI2'];
};

interface GILCertificateData {
  reportNumber: string;
  reportDate: Date;
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
  signatureDate: Date;
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
      className={`p-10 max-w-6xl mx-auto font-display shadow-2xl ${className}`}
      style={{ 
        minHeight: '1100px',
        backgroundColor: '#f5f1eb',
        backgroundImage: 'linear-gradient(135deg, #f5f1eb 0%, #ede5db 50%, #f5f1eb 100%)',
        border: '3px solid #8b7355',
        boxShadow: '0 25px 50px -12px rgba(139, 115, 85, 0.3), 0 0 0 1px rgba(139, 115, 85, 0.1)'
      }}>
      
      {/* Professional Header Section */}
      <div className="pb-6 mb-6" style={{ backgroundColor: '#f5f1eb' }}>
        <div className="flex justify-between items-center">
          {/* Left - Laboratory Information */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#8b7355' }}>
              <img 
                src={gilLogoPath} 
                alt="GIL Laboratory" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <div className="text-4xl font-bold tracking-tight" style={{ color: '#8b7355', fontFamily: 'Times New Roman, serif' }}>GIL</div>
              <div className="text-base font-medium" style={{ color: '#8b7355', fontFamily: 'Arial, sans-serif' }}>Gemological Institute Laboratory</div>
              <div className="text-sm" style={{ color: '#8b7355', fontFamily: 'Arial, sans-serif' }}>A Subsidiary of Gemological Institute of America</div>
            </div>
          </div>

          {/* Center - Report Title */}
          <div className="text-center">
            <div className="text-2xl font-bold mb-2" style={{ color: '#8b7355', fontFamily: 'Times New Roman, serif' }}>
              NATURAL DIAMOND GRADING REPORT
            </div>
            <div className="text-lg mb-2" style={{ color: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-2xl font-bold px-4 py-2 border-2 inline-block" style={{ color: '#8b7355', borderColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              {data.reportNumber}
            </div>
          </div>

          {/* Right - Security Features */}
          <div className="text-right max-w-xs">
            <div className="text-xs p-3 border" style={{ backgroundColor: '#ffffff', borderColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              <div className="font-bold mb-2" style={{ color: '#8b7355' }}>SECURITY FEATURES</div>
              <div className="space-y-1 text-xs" style={{ color: '#8b7355' }}>
                <div>• Microprint border</div>
                <div>• Security screen</div>
                <div>• Hologram</div>
                <div>• Security paper</div>
                <div>• Digital verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional Three Column Layout */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Diamond Details */}
        <div className="space-y-4">
          {/* Diamond Identification */}
          <div className="border-2 border-gray-800">
            <div className="text-white p-2 text-center font-bold text-sm" style={{ backgroundColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              DIAMOND IDENTIFICATION
            </div>
            <div className="p-3 space-y-2 text-sm" style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-medium" style={{ color: '#000000' }}>GIL Report Number:</span>
                <span className="font-bold" style={{ color: '#000000' }}>{data.reportNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-medium" style={{ color: '#000000' }}>Shape and Cutting Style:</span>
                <span style={{ color: '#000000' }}>{data.shape}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium" style={{ color: '#000000' }}>Measurements:</span>
                <span className="font-mono text-xs" style={{ color: '#000000' }}>{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Results */}
          <div className="border-2 border-gray-800">
            <div className="text-white p-2 text-center font-bold text-sm" style={{ backgroundColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              GRADING RESULTS
            </div>
            <div className="p-3" style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: '#000000' }}>Carat Weight</div>
                  <div className="text-2xl font-bold" style={{ color: '#000000' }}>{data.caratWeight}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#000000' }}>Color Grade</div>
                    <div className="text-xl font-bold" style={{ color: '#000000' }}>{data.colorGrade}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#000000' }}>Clarity Grade</div>
                    <div className="text-xl font-bold" style={{ color: '#000000' }}>{data.clarityGrade}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#000000' }}>Cut Grade</div>
                    <div className="text-xl font-bold" style={{ color: '#000000' }}>{data.cutGrade}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="border-2 border-gray-800">
            <div className="text-white p-2 text-center font-bold text-sm" style={{ backgroundColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              ADDITIONAL GRADING INFORMATION
            </div>
            <div className="p-3 space-y-2 text-sm" style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-medium" style={{ color: '#000000' }}>Polish:</span>
                <span style={{ color: '#000000' }}>{data.polish}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-medium" style={{ color: '#000000' }}>Symmetry:</span>
                <span style={{ color: '#000000' }}>{data.symmetry}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-medium" style={{ color: '#000000' }}>Fluorescence:</span>
                <span style={{ color: '#000000' }}>{data.fluorescence}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium" style={{ color: '#000000' }}>Inscription(s):</span>
                <span className="font-mono text-xs" style={{ color: '#000000' }}>{data.inscription || `GIL ${data.reportNumber}`}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-300">
                <div className="text-xs font-bold mb-1" style={{ color: '#000000' }}>Comments:</div>
                <div className="text-xs" style={{ color: '#000000' }}>{data.comments || "Clouds are not shown. Pinpoints are not shown."}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Proportions */}
        <div className="space-y-4">
          <div className="border-2 border-gray-800">
            <div className="text-white p-2 text-center font-bold text-sm" style={{ backgroundColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              PROPORTIONS
            </div>
            <div className="p-4 text-center" style={{ backgroundColor: '#ffffff' }}>
              {/* Professional Diamond Diagram */}
              <div className="relative mx-auto w-56 h-56 mb-4">
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  {/* Main Diamond Profile */}
                  <polygon
                    points="120,30 180,90 120,210 60,90"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  
                  {/* Table Line */}
                  <line x1="90" y1="90" x2="150" y2="90" stroke="#000000" strokeWidth="3"/>
                  
                  {/* Crown Section */}
                  <polygon
                    points="90,90 120,30 150,90"
                    fill="rgba(200, 200, 200, 0.3)"
                    stroke="#000000"
                    strokeWidth="1"
                  />
                  
                  {/* Pavilion Section */}
                  <polygon
                    points="90,90 120,210 150,90"
                    fill="rgba(150, 150, 150, 0.2)"
                    stroke="#000000"
                    strokeWidth="1"
                  />
                  
                  {/* Girdle */}
                  <line x1="60" y1="90" x2="180" y2="90" stroke="#000000" strokeWidth="2"/>
                  
                  {/* Measurements and Labels */}
                  <text x="30" y="95" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Table: {data.tablePercentage || "57%"}
                  </text>
                  <text x="30" y="110" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Depth: {data.depthPercentage || "62.3%"}
                  </text>
                  <text x="30" y="125" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Crown Angle: {data.crownAngle || "34.5°"}
                  </text>
                  <text x="30" y="140" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Pavilion Angle: {data.pavilionAngle || "40.8°"}
                  </text>
                  <text x="30" y="155" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Girdle: {data.girdleThickness || "Medium"}
                  </text>
                  <text x="30" y="170" className="text-xs font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Culet: {data.culetSize || "None"}
                  </text>
                </svg>
              </div>
              <div className="text-xs" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
                Actual size may vary
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="space-y-4">
          <div className="border-2 border-gray-800">
            <div className="text-white p-2 text-center font-bold text-sm" style={{ backgroundColor: '#8b7355', fontFamily: 'Arial, sans-serif' }}>
              CLARITY CHARACTERISTICS
            </div>
            <div className="p-4" style={{ backgroundColor: '#ffffff' }}>
              {/* Professional Clarity Plots */}
              <div className="mb-4 flex justify-center space-x-6">
                <div className="text-center">
                  <div className="text-xs mb-2 font-medium" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>Crown View</div>
                  <svg viewBox="0 0 120 120" className="w-24 h-24 border-2 border-gray-800">
                    <polygon
                      points="60,15 95,45 60,105 25,45"
                      fill="white"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle
                        key={index}
                        cx={inclusion.x * 1.2}
                        cy={inclusion.y * 1.2}
                        r={inclusion.size}
                        fill={inclusion.type === 'inclusion' ? "#000000" : "#666666"}
                        opacity="0.8"
                      />
                    ))}
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-xs mb-2 font-medium" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>Pavilion View</div>
                  <svg viewBox="0 0 120 120" className="w-24 h-24 border-2 border-gray-800">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="white"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle
                        key={index}
                        cx={inclusion.x * 1.2}
                        cy={inclusion.y * 1.2}
                        r={inclusion.size}
                        fill={inclusion.type === 'inclusion' ? "#000000" : "#666666"}
                        opacity="0.8"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Symbol Key */}
              <div className="mb-4">
                <div className="text-xs font-bold mb-2" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>Key to Symbols:</div>
                <div className="space-y-1 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                    <span style={{ color: '#000000' }}>Crystal, Included mineral, Needle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                    <span style={{ color: '#000000' }}>Cloud, Pinpoint</span>
                  </div>
                </div>
              </div>

              {/* Professional Footer */}
              <div className="text-xs leading-tight" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
                <div className="mb-2">
                  The results documented in this report refer only to the diamond described, and were obtained using the techniques and equipment available to GIL at the time of examination.
                </div>
                <div className="mb-2">
                  This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see gilab.info/limitations.
                </div>
                <div className="text-center mt-4 pt-2 border-t border-gray-300">
                  <div className="font-bold">GIL Report Number {data.reportNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-800">
        <div className="flex justify-between items-center">
          {/* Left - Laboratory Signature */}
          <div className="text-left">
            <div className="mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="text-sm font-bold" style={{ color: '#000000' }}>Gemologist:</div>
              <div className="text-sm" style={{ color: '#000000' }}>{data.gemologistName}</div>
              <div className="text-xs" style={{ color: '#000000' }}>
                {data.signatureDate instanceof Date ? data.signatureDate.toLocaleDateString() : new Date(data.signatureDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Center - QR Code Verification */}
          <div className="text-center">
            <div className="mb-2">
              <QRCodeSVG 
                value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
                size={60}
                level="H"
                includeMargin={true}
                className="border border-gray-400"
              />
            </div>
            <div className="text-xs" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
              Verify at gilab.info
            </div>
          </div>

          {/* Right - Certificate Information */}
          <div className="text-right">
            <div className="text-xs" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
              <div>© {new Date().getFullYear()} GIL</div>
              <div>All Rights Reserved</div>
              <div className="mt-1">Page 1 of 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}