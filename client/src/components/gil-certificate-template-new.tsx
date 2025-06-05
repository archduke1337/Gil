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
      className={`bg-gradient-to-br from-yellow-50 via-amber-25 to-yellow-50 p-10 max-w-6xl mx-auto font-display border-4 border-yellow-600 shadow-2xl ${className}`}
      style={{ 
        minHeight: '1100px',
        backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(180, 83, 9, 0.08) 1px, transparent 0)',
        backgroundSize: '60px 60px',
        boxShadow: '0 25px 50px -12px rgba(180, 83, 9, 0.3), 0 0 0 1px rgba(180, 83, 9, 0.1)',
        backgroundColor: '#fffef7'
      }}>
      
      {/* Golden Brown Header Section - Logo Matching */}
      <div className="bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 border-b-4 border-yellow-700 pb-8 mb-8 rounded-t-lg" style={{ backgroundColor: '#fefce8' }}>
        <div className="flex justify-between items-start">
          {/* Left - Laboratory Information */}
          <div className="flex items-center space-x-6">
            <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#b45309' }}>
              <img 
                src={gilLogoPath} 
                alt="GIL Laboratory" 
                className="w-16 h-16 object-contain drop-shadow-sm"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/15 to-amber-600/15"></div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-800 to-amber-800 bg-clip-text text-transparent tracking-wide font-display" style={{ color: '#92400e' }}>GIL°</div>
              <div className="text-sm font-heading tracking-wide" style={{ color: '#92400e' }}>Gemological Institute</div>
              <div className="text-sm font-heading tracking-wide" style={{ color: '#92400e' }}>Laboratory</div>
            </div>
          </div>

          {/* Center - Report Title */}
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-900 to-amber-900 bg-clip-text text-transparent mb-3 tracking-wide font-display" style={{ color: '#78350f' }}>NATURAL DIAMOND</div>
            <div className="text-2xl font-semibold bg-gradient-to-r from-yellow-800 to-amber-800 bg-clip-text text-transparent mb-2 tracking-wide font-heading" style={{ color: '#92400e' }}>GRADING REPORT</div>
            <div className="text-sm mb-4 font-body" style={{ color: '#a16207' }}>
              {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-2xl font-bold bg-white/90 px-6 py-3 tracking-wider rounded-lg shadow-md font-display border-3" style={{ color: '#78350f', borderColor: '#a16207' }}>
              {data.reportNumber}
            </div>
          </div>

          {/* Right - Security Information */}
          <div className="text-right text-xs max-w-48 bg-white/80 p-4 rounded-lg shadow-sm border-2" style={{ borderColor: '#a16207' }}>
            <div className="mb-2 font-bold font-heading" style={{ color: '#92400e' }}>AUTHENTICITY</div>
            <div className="leading-tight mb-3 font-body" style={{ color: '#a16207' }}>
              This report includes advanced security features and is digitally verified through our secure database.
            </div>
            <div className="text-xs font-semibold font-body" style={{ color: '#92400e' }}>
              Verify online at<br/>
              <span style={{ color: '#b45309' }}>gilab.info</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional Three Column Layout */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Identification & Grading Results */}
        <div className="space-y-6">
          {/* Identification Section */}
          <div className="border-2 rounded-lg shadow-lg overflow-hidden" style={{ borderColor: '#a16207' }}>
            <div className="text-white p-4 text-center" style={{ background: 'linear-gradient(to right, #b45309, #92400e)' }}>
              <div className="font-bold text-sm tracking-wide font-heading">IDENTIFICATION</div>
            </div>
            <div className="p-5 space-y-4 text-sm" style={{ background: 'linear-gradient(to bottom right, #ffffff, #fefce8)' }}>
              <div className="grid grid-cols-2 gap-2 items-center border-b pb-3" style={{ borderColor: '#fbbf24' }}>
                <span className="font-medium font-body" style={{ color: '#92400e' }}>Shape and Cutting Style:</span>
                <span className="text-right font-semibold" style={{ color: '#78350f' }}>{data.shape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b pb-3" style={{ borderColor: '#fbbf24' }}>
                <span className="font-medium font-body" style={{ color: '#92400e' }}>Measurements:</span>
                <span className="text-right font-mono text-xs" style={{ color: '#78350f' }}>{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Results Section */}
          <div className="border-2 border-amber-300 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">GRADING RESULTS</div>
            </div>
            <div className="bg-gradient-to-br from-white to-amber-25 p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center border-b border-amber-200 pb-3">
                <span className="font-medium text-amber-800 font-body">Carat Weight:</span>
                <span className="text-right font-bold text-xl text-amber-900 font-display">{data.caratWeight}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-amber-200 pb-3">
                <span className="font-medium text-amber-800 font-body">Color Grade:</span>
                <span className="text-right font-bold text-xl text-amber-900 font-display">{data.colorGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-amber-200 pb-3">
                <span className="font-medium text-amber-800 font-body">Clarity Grade:</span>
                <span className="text-right font-bold text-xl text-amber-900 font-display">{data.clarityGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-amber-200 pb-3">
                <span className="font-medium text-amber-800 font-body">Cut Grade:</span>
                <span className="text-right font-bold text-xl text-amber-900 font-display">{data.cutGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="border-2 border-amber-300 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">ADDITIONAL GRADING INFORMATION</div>
            </div>
            <div className="bg-gradient-to-br from-white to-amber-25 p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-amber-800 font-body">Polish:</span>
                <span className="text-right text-amber-900 font-semibold">{data.polish}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-amber-800 font-body">Symmetry:</span>
                <span className="text-right text-amber-900 font-semibold">{data.symmetry}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-amber-800 font-body">Fluorescence:</span>
                <span className="text-right text-amber-900 font-semibold">{data.fluorescence}</span>
              </div>
              {data.inscription && (
                <div className="grid grid-cols-2 gap-2 items-center pt-3 border-t border-amber-200">
                  <span className="font-medium text-amber-800 font-body">Inscriptions:</span>
                  <span className="text-right text-amber-900 font-mono text-xs">{data.inscription}</span>
                </div>
              )}
              {data.comments && (
                <div className="pt-3 border-t border-amber-200">
                  <div className="font-medium mb-2 text-amber-800 font-body">Comments:</div>
                  <div className="text-xs text-amber-700 font-body leading-relaxed">{data.comments}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Column - Proportions Diagram */}
        <div className="space-y-6">
          <div className="border-2 border-amber-300 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">PROPORTIONS</div>
            </div>
            <div className="bg-gradient-to-br from-white to-amber-25 p-6 text-center">
              {/* Enhanced Diamond Diagram */}
              <div className="relative mx-auto w-52 h-52 mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Main Diamond Outline with Amber Theme */}
                  <polygon
                    points="100,20 160,80 100,180 40,80"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  {/* Table */}
                  <line x1="70" y1="80" x2="130" y2="80" stroke="#d97706" strokeWidth="3"/>
                  <text x="100" y="72" textAnchor="middle" className="text-xs fill-amber-800 font-body font-semibold">Table: {data.tablePercentage || "57%"}</text>
                  
                  {/* Crown with Gradient */}
                  <polygon
                    points="70,80 100,20 130,80"
                    fill="rgba(251, 146, 60, 0.15)"
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  <text x="82" y="50" textAnchor="middle" className="text-xs fill-amber-800 font-body font-medium">Crown</text>
                  
                  {/* Pavilion with Gradient */}
                  <polygon
                    points="70,80 100,180 130,80"
                    fill="rgba(251, 146, 60, 0.1)"
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  <text x="118" y="130" textAnchor="middle" className="text-xs fill-amber-800 font-body font-medium">Pavilion</text>
                  
                  {/* Depth Line */}
                  <line x1="175" y1="20" x2="175" y2="180" stroke="#ea580c" strokeWidth="2" strokeDasharray="3,3"/>
                  <text x="185" y="105" textAnchor="start" className="text-xs fill-orange-700 font-body font-semibold">Depth: {data.depthPercentage || "62.3%"}</text>
                </svg>
              </div>

              {/* Technical Measurements with Amber Theme */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-left bg-amber-50 p-3 rounded border border-amber-200">
                  <div className="font-semibold mb-2 text-amber-800 font-heading">Measurements:</div>
                  <div className="text-amber-700 font-body">Table: {data.tablePercentage || "57%"}</div>
                  <div className="text-amber-700 font-body">Depth: {data.depthPercentage || "62.3%"}</div>
                  <div className="text-amber-700 font-body">Crown Angle: {data.crownAngle || "34.5°"}</div>
                </div>
                <div className="text-left bg-orange-50 p-3 rounded border border-orange-200">
                  <div className="font-semibold mb-2 text-orange-800 font-heading">Details:</div>
                  <div className="text-orange-700 font-body">Pavilion Angle: {data.pavilionAngle || "40.8°"}</div>
                  <div className="text-orange-700 font-body">Girdle: {data.girdleThickness || "Medium"}</div>
                  <div className="text-orange-700 font-body">Culet: {data.culetSize || "None"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="space-y-6">
          <div className="border-2 border-amber-300 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">CLARITY CHARACTERISTICS</div>
            </div>
            <div className="bg-gradient-to-br from-white to-amber-25 p-6">
              {/* Enhanced Clarity Plot Diagram */}
              <div className="mb-6">
                <div className="relative mx-auto w-36 h-36 border-3 border-amber-400 rounded-full bg-gradient-to-br from-white to-amber-50 shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Main circle outline with amber theme */}
                    <circle cx="50" cy="50" r="45" fill="white" stroke="#d97706" strokeWidth="2"/>
                    
                    {/* Plot inclusions with amber theme colors */}
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <g key={index}>
                        {inclusion.type === 'inclusion' ? (
                          <circle
                            cx={inclusion.x}
                            cy={inclusion.y}
                            r={inclusion.size}
                            fill="#dc2626"
                            opacity="0.8"
                            className="drop-shadow-sm"
                          />
                        ) : (
                          <circle
                            cx={inclusion.x}
                            cy={inclusion.y}
                            r={inclusion.size}
                            fill="#059669"
                            opacity="0.7"
                            className="drop-shadow-sm"
                          />
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="text-center text-xs text-amber-700 mt-3 font-body">
                  Clarity Grade: <span className="font-bold text-amber-900 text-sm font-display">{data.clarityGrade}</span>
                </div>
              </div>

              {/* Enhanced Clarity Information */}
              <div className="space-y-4 text-xs">
                <div className="bg-amber-50 p-3 rounded border border-amber-200">
                  <div className="font-semibold mb-2 text-amber-800 font-heading">Clarity Grade:</div>
                  <div className="text-2xl font-bold text-amber-900 font-display">{data.clarityGrade}</div>
                </div>
                
                <div className="border-t border-amber-200 pt-4">
                  <div className="font-semibold mb-3 text-amber-800 font-heading">Key to Symbols:</div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-3 opacity-80 shadow-sm"></div>
                      <span className="text-amber-700 font-body">Crystal, Needle, Pinpoint</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-3 opacity-70 shadow-sm"></div>
                      <span className="text-amber-700 font-body">Surface Features</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-amber-200 pt-4">
                  <div className="font-semibold mb-2 text-amber-800 font-heading">Clarity Analysis:</div>
                  <div className="text-amber-700 font-body leading-relaxed">
                    {(() => {
                      switch (data.clarityGrade) {
                        case 'FL':
                          return "No inclusions or blemishes visible under 10x magnification";
                        case 'IF':
                          return "No inclusions visible under 10x magnification";
                        case 'VVS1':
                        case 'VVS2':
                          return "Very, very slight inclusions difficult to see under 10x magnification";
                        case 'VS1':
                        case 'VS2':
                          return "Very slight inclusions visible under 10x magnification";
                        case 'SI1':
                        case 'SI2':
                          return "Slight inclusions visible under 10x magnification";
                        default:
                          return "Inclusions visible under 10x magnification";
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer Section - Authentication & Security */}
      <div className="border-t-2 border-gray-400 pt-6 mt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left - Laboratory Information */}
          <div className="space-y-4">
            <div className="border border-gray-400">
              <div className="bg-blue-900 text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">LABORATORY INFORMATION</div>
              </div>
              <div className="bg-white p-4 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Report Number:</span>
                  <span className="font-mono">{data.reportNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Report Date:</span>
                  <span>{data.reportDate instanceof Date ? data.reportDate.toLocaleDateString() : new Date(data.reportDate).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Gemologist:</span>
                  <span>{data.gemologistName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Signature Date:</span>
                  <span>{data.signatureDate instanceof Date ? data.signatureDate.toLocaleDateString() : new Date(data.signatureDate).toLocaleDateString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="font-medium mb-2">Security Features:</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div>• Digital signature verification</div>
                    <div>• Holographic security elements</div>
                    <div>• Tamper-evident materials</div>
                    <div>• Database verification backup</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Disclaimers */}
            <div className="border border-gray-400">
              <div className="bg-blue-900 text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">IMPORTANT LIMITATIONS</div>
              </div>
              <div className="bg-white p-4 text-xs text-gray-700 leading-relaxed">
                <div className="space-y-2">
                  <p>This report identifies the described unset diamond and provides an opinion of its quality based on the internationally accepted grading standards at the time of examination.</p>
                  
                  <p>The results documented in this report refer only to the diamond described, and were obtained using the techniques and equipment available at GIL at the time of examination.</p>
                  
                  <p>This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see gilab.info/limitations.</p>
                  
                  <p className="font-medium text-blue-900">Verify this report at gilab.info</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - QR Code and Verification */}
          <div className="space-y-4">
            <div className="border border-gray-400">
              <div className="bg-blue-900 text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">DIGITAL VERIFICATION</div>
              </div>
              <div className="bg-white p-6 text-center">
                {/* QR Code for verification */}
                <div className="inline-block">
                  <QRCodeSVG 
                    value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
                    size={120}
                    level="H"
                    includeMargin={true}
                    className="border border-gray-300"
                  />
                </div>
                <div className="mt-3 text-xs">
                  <div className="font-medium text-blue-900 mb-1">Scan to Verify</div>
                  <div className="text-gray-600">
                    {data.verifierUrl || `gilab.info/verify/${data.reportNumber}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="border border-gray-400">
              <div className="bg-blue-900 text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">DIGITAL AUTHENTICATION</div>
              </div>
              <div className="bg-white p-4 text-center">
                <div className="space-y-3">
                  <div className="text-xs">
                    <div className="font-medium mb-1">Digitally Signed By:</div>
                    <div className="text-blue-900 font-medium">{data.gemologistName}</div>
                    <div className="text-gray-600">Certified Gemologist</div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-xs text-gray-700">
                      <div className="font-medium mb-1">Certificate Authority:</div>
                      <div>GIL Laboratory Systems</div>
                      <div>Digital Certificate ID: GIL-{data.reportNumber}</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-xs text-blue-900 font-medium">
                      This document has been digitally signed and is protected by cryptographic security measures.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              © {new Date().getFullYear()} Gemological Institute Laboratory (GIL). All rights reserved.
            </div>
            <div className="text-xs text-blue-900 font-medium">
              Verify at gilab.info | Report #{data.reportNumber}
            </div>
            <div className="text-xs text-gray-600">
              Page 1 of 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}