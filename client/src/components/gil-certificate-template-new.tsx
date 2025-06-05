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
      
      {/* Professional Header Section - Matching GIL Certificate */}
      <div className="pb-8 mb-8 border-b-4" style={{ backgroundColor: '#f5f1eb', borderColor: '#8b7355' }}>
        <div className="flex justify-between items-start">
          {/* Left - Laboratory Information */}
          <div className="flex items-center space-x-6">
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#8b7355' }}>
              <img 
                src={gilLogoPath} 
                alt="GIL Laboratory" 
                className="w-16 h-16 object-contain drop-shadow-sm"
              />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-wide font-display" style={{ color: '#8b7355' }}>GIL</div>
              <div className="text-sm font-heading tracking-wide" style={{ color: '#8b7355' }}>Gemological Institute</div>
              <div className="text-sm font-heading tracking-wide" style={{ color: '#8b7355' }}>Laboratory</div>
            </div>
          </div>

          {/* Center - Report Title */}
          <div className="text-center">
            <div className="text-sm mb-2 font-heading tracking-wide" style={{ color: '#8b7355' }}>GIL REPORT</div>
            <div className="text-4xl font-bold mb-3 tracking-wider font-display" style={{ color: '#8b7355' }}>{data.reportNumber}</div>
            <div className="text-sm mb-4 font-body" style={{ color: '#8b7355' }}>
              Verify this report at gilab.info
            </div>
          </div>

          {/* Right - Security Information */}
          <div className="text-right text-xs max-w-48 p-4 rounded border" style={{ backgroundColor: '#ffffff', borderColor: '#8b7355' }}>
            <div className="mb-2 font-bold font-heading" style={{ color: '#8b7355' }}>FACSIMILE</div>
            <div className="leading-tight font-body" style={{ color: '#8b7355' }}>
              This is a digital representation of the original GIL Report. This representation might not be identical to the original GIL Report in various characteristics. The original GIL Report should be retained in a safe place by the client.
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional Three Column Layout */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Identification & Grading Results */}
        <div className="space-y-6">
          {/* GIA Natural Diamond Grading Report Section */}
          <div className="border border-gray-400 shadow-md">
            <div className="text-white p-3 text-center font-bold text-sm tracking-wide" style={{ backgroundColor: '#8b7355' }}>
              NATURAL DIAMOND GRADING REPORT
            </div>
            <div className="p-4 space-y-3 text-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="text-center font-bold mb-3" style={{ color: '#8b7355' }}>
                {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>GIL Report Number</span>
                <span className="text-right font-mono text-sm" style={{ color: '#8b7355' }}>{data.reportNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Shape and Cutting Style</span>
                <span className="text-right" style={{ color: '#8b7355' }}>{data.shape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Measurements</span>
                <span className="text-right font-mono text-xs" style={{ color: '#8b7355' }}>{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Result Section */}
          <div className="border border-gray-400 shadow-md">
            <div className="text-white p-3 text-center font-bold text-sm tracking-wide" style={{ backgroundColor: '#8b7355' }}>
              GRADING RESULT
            </div>
            <div className="p-4 space-y-3 text-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Carat Weight</span>
                <span className="text-right font-bold text-lg" style={{ color: '#8b7355' }}>{data.caratWeight} carat</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Color Grade</span>
                <span className="text-right font-bold text-lg" style={{ color: '#8b7355' }}>{data.colorGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Clarity Grade</span>
                <span className="text-right font-bold text-lg" style={{ color: '#8b7355' }}>{data.clarityGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Cut Grade</span>
                <span className="text-right font-bold text-lg" style={{ color: '#8b7355' }}>{data.cutGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="border border-gray-400 shadow-md">
            <div className="text-white p-3 text-center font-bold text-sm tracking-wide" style={{ backgroundColor: '#8b7355' }}>
              ADDITIONAL GRADING INFORMATION
            </div>
            <div className="p-4 space-y-2 text-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Polish</span>
                <span className="text-right" style={{ color: '#8b7355' }}>{data.polish}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Symmetry</span>
                <span className="text-right" style={{ color: '#8b7355' }}>{data.symmetry}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Fluorescence</span>
                <span className="text-right" style={{ color: '#8b7355' }}>{data.fluorescence}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium" style={{ color: '#8b7355' }}>Inscription(s)</span>
                <span className="text-right font-mono text-xs" style={{ color: '#8b7355' }}>{data.inscription || `GIL ${data.reportNumber}`}</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold mb-1" style={{ color: '#8b7355' }}>Comments:</div>
                <div className="text-xs" style={{ color: '#8b7355' }}>{data.comments || "Clouds are not shown. Pinpoints are not shown."}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Additional Information with Proportions */}
        <div className="space-y-6">
          <div className="border border-gray-400 shadow-md">
            <div className="text-white p-3 text-center font-bold text-sm tracking-wide" style={{ backgroundColor: '#8b7355' }}>
              ADDITIONAL INFORMATION
            </div>
            <div className="p-4 text-center" style={{ backgroundColor: '#ffffff' }}>
              {/* Diamond Proportions Diagram */}
              <div className="relative mx-auto w-48 h-48 mb-4">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Main Diamond Outline */}
                  <polygon
                    points="100,20 160,80 100,180 40,80"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="2"
                  />
                  {/* Table */}
                  <line x1="70" y1="80" x2="130" y2="80" stroke="#8b7355" strokeWidth="2"/>
                  <text x="100" y="70" textAnchor="middle" className="text-xs" fill="#8b7355">Table</text>
                  <text x="45" y="75" textAnchor="middle" className="text-xs" fill="#8b7355">{data.tablePercentage || "57%"}</text>
                  
                  {/* Crown */}
                  <polygon
                    points="70,80 100,20 130,80"
                    fill="rgba(139, 115, 85, 0.1)"
                    stroke="#8b7355"
                    strokeWidth="1"
                  />
                  <text x="80" y="50" className="text-xs" fill="#8b7355">Crown</text>
                  
                  {/* Pavilion */}
                  <polygon
                    points="70,80 100,180 130,80"
                    fill="rgba(139, 115, 85, 0.05)"
                    stroke="#8b7355"
                    strokeWidth="1"
                  />
                  <text x="110" y="130" className="text-xs" fill="#8b7355">Pavilion</text>
                  
                  {/* Measurements */}
                  <text x="165" y="25" className="text-xs" fill="#8b7355">Crown Ht: {data.crownAngle || "15.0%"}</text>
                  <text x="165" y="40" className="text-xs" fill="#8b7355">Crown Angle: {data.crownAngle || "35.0°"}</text>
                  <text x="165" y="55" className="text-xs" fill="#8b7355">Star Length: 50%</text>
                  <text x="165" y="70" className="text-xs" fill="#8b7355">Pavilion Depth: {data.depthPercentage || "43.5%"}</text>
                  <text x="165" y="85" className="text-xs" fill="#8b7355">Pavilion Angle: {data.pavilionAngle || "40.8°"}</text>
                </svg>
              </div>
              <div className="text-xs mb-4" style={{ color: '#8b7355' }}>
                Profile to actual proportions
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="space-y-6">
          <div className="border border-gray-400 shadow-md">
            <div className="text-white p-3 text-center font-bold text-sm tracking-wide" style={{ backgroundColor: '#8b7355' }}>
              CLARITY CHARACTERISTICS
            </div>
            <div className="p-4" style={{ backgroundColor: '#ffffff' }}>
              {/* Diamond Clarity Diagram */}
              <div className="mb-4 flex justify-center space-x-4">
                <div className="text-center">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 border border-gray-300">
                    <polygon
                      points="50,10 85,40 50,90 15,40"
                      fill="none"
                      stroke="#8b7355"
                      strokeWidth="1"
                    />
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle
                        key={index}
                        cx={inclusion.x}
                        cy={inclusion.y}
                        r={inclusion.size}
                        fill={inclusion.type === 'inclusion' ? "#dc2626" : "#059669"}
                        opacity="0.7"
                      />
                    ))}
                  </svg>
                </div>
                <div className="text-center">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 border border-gray-300">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8b7355"
                      strokeWidth="1"
                    />
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <circle
                        key={index}
                        cx={inclusion.x}
                        cy={inclusion.y}
                        r={inclusion.size}
                        fill={inclusion.type === 'inclusion' ? "#dc2626" : "#059669"}
                        opacity="0.7"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* GIL Logo */}
              <div className="flex justify-end mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8b7355' }}>
                  <img 
                    src={gilLogoPath} 
                    alt="GIL" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>

              {/* Footer Information */}
              <div className="text-xs leading-relaxed" style={{ color: '#8b7355' }}>
                <div className="mb-2">
                  The results documented in this report refer only to the diamond described and were obtained using the techniques and equipment available to GIL at the time of examination.
                </div>
                <div className="mb-2">
                  This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see gilab.info/limitations.
                </div>
                <div className="text-xs">
                  GIL Report Number {data.reportNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer - Matching GIL Style */}
      <div className="mt-6 pt-4 border-t border-gray-300 text-center">
        <div className="flex justify-center">
          <QRCodeSVG 
            value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
            size={80}
            level="H"
            includeMargin={true}
            className="border border-gray-300"
          />
        </div>
        <div className="mt-2 text-xs" style={{ color: '#8b7355' }}>
          gilab.info/verify
        </div>
      </div>
    </div>
  );
}