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
      className={`bg-white p-10 max-w-6xl mx-auto font-sans border-2 border-gray-400 shadow-lg ${className}`}
      style={{ 
        minHeight: '1100px',
        backgroundColor: '#ffffff'
      }}>
      
      {/* Professional Header Section - GIA Style */}
      <div className="bg-white border-b-2 border-gray-400 pb-6 mb-8">
        <div className="flex justify-between items-start">
          {/* Left - Laboratory Information */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
              <img 
                src={gilLogoPath} 
                alt="GIL Laboratory" 
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900 tracking-wide">GIL</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Gemological Institute</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Laboratory</div>
            </div>
          </div>

          {/* Center - Report Title */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900 mb-2 tracking-wide">DIAMOND</div>
            <div className="text-xl font-semibold text-blue-900 mb-1 tracking-wide">GRADING REPORT</div>
            <div className="text-sm text-gray-600 mb-4">
              {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-2xl font-bold text-blue-900 border-2 border-blue-900 px-4 py-2 tracking-wider">
              {data.reportNumber}
            </div>
          </div>

          {/* Right - Security Information */}
          <div className="text-right text-xs max-w-48">
            <div className="mb-2 font-bold text-blue-900">SECURITY FEATURES</div>
            <div className="text-gray-700 leading-tight mb-3">
              This report includes security features to prevent alteration and is backed by GIL's database.
            </div>
            <div className="text-xs text-blue-900 font-semibold">
              Verify this report at<br/>gilab.info
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional Three Column Layout */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Identification & Grading Results */}
        <div className="space-y-6">
          {/* Identification Section */}
          <div className="border border-gray-400">
            <div className="bg-blue-900 text-white p-3 text-center">
              <div className="font-bold text-sm tracking-wide">IDENTIFICATION</div>
            </div>
            <div className="bg-white p-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Shape and Cutting Style:</span>
                <span className="text-right">{data.shape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Measurements:</span>
                <span className="text-right text-xs">{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Results Section */}
          <div className="border border-gray-400">
            <div className="bg-blue-900 text-white p-3 text-center">
              <div className="font-bold text-sm tracking-wide">GRADING RESULTS</div>
            </div>
            <div className="bg-white p-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Carat Weight:</span>
                <span className="text-right font-bold text-lg">{data.caratWeight}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Color Grade:</span>
                <span className="text-right font-bold text-lg">{data.colorGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Clarity Grade:</span>
                <span className="text-right font-bold text-lg">{data.clarityGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-gray-200 pb-2">
                <span className="font-medium">Cut Grade:</span>
                <span className="text-right font-bold text-lg">{data.cutGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="border border-gray-400">
            <div className="bg-blue-900 text-white p-3 text-center">
              <div className="font-bold text-sm tracking-wide">ADDITIONAL GRADING INFORMATION</div>
            </div>
            <div className="bg-white p-4 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium">Polish:</span>
                <span className="text-right">{data.polish}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium">Symmetry:</span>
                <span className="text-right">{data.symmetry}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium">Fluorescence:</span>
                <span className="text-right">{data.fluorescence}</span>
              </div>
              {data.inscription && (
                <div className="grid grid-cols-2 gap-2 items-center pt-2 border-t border-gray-200">
                  <span className="font-medium">Inscriptions:</span>
                  <span className="text-right text-xs">{data.inscription}</span>
                </div>
              )}
              {data.comments && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="font-medium mb-1">Comments:</div>
                  <div className="text-xs text-gray-700">{data.comments}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Column - Proportions Diagram */}
        <div className="space-y-6">
          <div className="border border-gray-400">
            <div className="bg-blue-900 text-white p-3 text-center">
              <div className="font-bold text-sm tracking-wide">PROPORTIONS</div>
            </div>
            <div className="bg-white p-6 text-center">
              {/* Professional Diamond Diagram */}
              <div className="relative mx-auto w-48 h-48 mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Main Diamond Outline */}
                  <polygon
                    points="100,20 160,80 100,180 40,80"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  {/* Table */}
                  <line x1="70" y1="80" x2="130" y2="80" stroke="#1e40af" strokeWidth="2"/>
                  <text x="100" y="75" textAnchor="middle" className="text-xs fill-blue-900">Table: {data.tablePercentage || "57%"}</text>
                  
                  {/* Crown */}
                  <polygon
                    points="70,80 100,20 130,80"
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="#1e40af"
                    strokeWidth="1"
                  />
                  <text x="85" y="55" textAnchor="middle" className="text-xs fill-blue-900">Crown</text>
                  
                  {/* Pavilion */}
                  <polygon
                    points="70,80 100,180 130,80"
                    fill="rgba(59, 130, 246, 0.05)"
                    stroke="#1e40af"
                    strokeWidth="1"
                  />
                  <text x="115" y="130" textAnchor="middle" className="text-xs fill-blue-900">Pavilion</text>
                  
                  {/* Depth Line */}
                  <line x1="175" y1="20" x2="175" y2="180" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2"/>
                  <text x="185" y="105" textAnchor="start" className="text-xs fill-red-600">Depth: {data.depthPercentage || "62.3%"}</text>
                </svg>
              </div>

              {/* Technical Measurements */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-left">
                  <div className="font-medium mb-2">Measurements:</div>
                  <div>Table: {data.tablePercentage || "57%"}</div>
                  <div>Depth: {data.depthPercentage || "62.3%"}</div>
                  <div>Crown Angle: {data.crownAngle || "34.5°"}</div>
                </div>
                <div className="text-left">
                  <div className="font-medium mb-2">Details:</div>
                  <div>Pavilion Angle: {data.pavilionAngle || "40.8°"}</div>
                  <div>Girdle: {data.girdleThickness || "Medium"}</div>
                  <div>Culet: {data.culetSize || "None"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="space-y-6">
          <div className="border border-gray-400">
            <div className="bg-blue-900 text-white p-3 text-center">
              <div className="font-bold text-sm tracking-wide">CLARITY CHARACTERISTICS</div>
            </div>
            <div className="bg-white p-6">
              {/* Clarity Plot Diagram */}
              <div className="mb-6">
                <div className="relative mx-auto w-32 h-32 border-2 border-gray-400 rounded-full bg-gray-50">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Main circle outline */}
                    <circle cx="50" cy="50" r="45" fill="white" stroke="#666" strokeWidth="1"/>
                    
                    {/* Plot inclusions based on clarity grade */}
                    {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                      <g key={index}>
                        {inclusion.type === 'inclusion' ? (
                          <circle
                            cx={inclusion.x}
                            cy={inclusion.y}
                            r={inclusion.size}
                            fill="#dc2626"
                            opacity="0.7"
                          />
                        ) : (
                          <circle
                            cx={inclusion.x}
                            cy={inclusion.y}
                            r={inclusion.size}
                            fill="#059669"
                            opacity="0.6"
                          />
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="text-center text-xs text-gray-600 mt-2">
                  Clarity Grade: <span className="font-bold text-blue-900">{data.clarityGrade}</span>
                </div>
              </div>

              {/* Clarity Information */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-medium mb-1">Clarity Grade:</div>
                  <div className="text-lg font-bold text-blue-900">{data.clarityGrade}</div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-medium mb-2">Key to Symbols:</div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-2 opacity-70"></div>
                      <span>Crystal, Needle, Pinpoint</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2 opacity-60"></div>
                      <span>Surface Features</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="font-medium mb-1">Clarity Analysis:</div>
                  <div className="text-gray-700">
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