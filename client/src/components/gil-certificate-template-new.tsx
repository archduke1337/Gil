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
      className={`bg-gradient-to-br from-amber-50 via-white to-amber-25 p-10 max-w-5xl mx-auto font-serif border-4 border-amber-300 shadow-2xl ${className}`}
      style={{ 
        minHeight: '900px',
        backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(139, 115, 85, 0.03) 1px, transparent 0)',
        backgroundSize: '60px 60px'
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

          {/* QR Code Section - Centered below ADDITIONAL INFORMATION */}
          <div className="w-full flex justify-center mt-6 mb-4">
            <div className="text-center">
              <div className="inline-block bg-white border-2 border-gray-400 p-3 rounded">
                <QRCodeSVG 
                  value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
                  size={80}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>
              <div className="text-xs mt-2 text-gray-600 font-medium">Scan to verify at gilab.info</div>
            </div>
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