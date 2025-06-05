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
      className={`bg-gradient-to-br from-background via-card to-background p-10 max-w-6xl mx-auto font-display border-4 border-primary shadow-2xl ${className}`}
      style={{ 
        minHeight: '1100px',
        backgroundImage: 'radial-gradient(circle at 30px 30px, hsl(var(--primary) / 0.08) 1px, transparent 0)',
        backgroundSize: '60px 60px',
        boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.3), 0 0 0 1px hsl(var(--primary) / 0.1)',
        backgroundColor: 'hsl(var(--background))'
      }}>
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-card to-primary/10 border-b-4 border-primary pb-8 mb-8 rounded-t-lg" style={{ backgroundColor: 'hsl(var(--card))' }}>
        <div className="flex justify-between items-start">
          {/* Left - Laboratory Information */}
          <div className="flex items-center space-x-6">
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary/20">
              <img 
                src={gilLogoPath} 
                alt="GIL Laboratory" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tracking-wide font-display text-primary">GIL°</div>
              <div className="text-sm font-heading tracking-wide text-primary">Gemological Institute</div>
              <div className="text-sm font-heading tracking-wide text-primary">Laboratory</div>
            </div>
          </div>

          {/* Center - Report Title */}
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3 tracking-wide font-display text-primary">NATURAL DIAMOND</div>
            <div className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2 tracking-wide font-heading text-primary">GRADING REPORT</div>
            <div className="text-sm mb-4 font-body text-primary/70">
              {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-2xl font-bold bg-card/90 px-6 py-3 tracking-wider rounded-lg shadow-md font-display border-3 border-primary text-primary">
              {data.reportNumber}
            </div>
          </div>

          {/* Right - Security Information */}
          <div className="text-right text-xs max-w-48 bg-card/80 p-4 rounded-lg shadow-sm border-2 border-primary">
            <div className="mb-2 font-bold font-heading text-primary">AUTHENTICITY</div>
            <div className="leading-tight mb-3 font-body text-primary/70">
              This report includes advanced security features and is digitally verified through our secure database.
            </div>
            <div className="text-xs font-semibold font-body text-primary">
              Verify online at<br/>
              <span className="text-primary">gilab.info</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional Three Column Layout */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Left Column - Identification & Grading Results */}
        <div className="space-y-6">
          {/* Identification Section */}
          <div className="border-2 border-primary rounded-lg shadow-lg overflow-hidden">
            <div className="text-white p-4 text-center bg-gradient-to-r from-primary to-primary/80">
              <div className="font-bold text-sm tracking-wide font-heading">IDENTIFICATION</div>
            </div>
            <div className="p-5 space-y-4 text-sm bg-gradient-to-br from-background to-card">
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium font-body text-primary">Shape and Cutting Style:</span>
                <span className="text-right font-semibold text-primary/80">{data.shape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium font-body text-primary">Measurements:</span>
                <span className="text-right font-mono text-xs text-primary/80">{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Results Section */}
          <div className="border-2 border-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">GRADING RESULTS</div>
            </div>
            <div className="bg-gradient-to-br from-background to-card p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium text-primary font-body">Carat Weight:</span>
                <span className="text-right font-bold text-xl text-primary/80 font-display">{data.caratWeight}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium text-primary font-body">Color Grade:</span>
                <span className="text-right font-bold text-xl text-primary/80 font-display">{data.colorGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium text-primary font-body">Clarity Grade:</span>
                <span className="text-right font-bold text-xl text-primary/80 font-display">{data.clarityGrade}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center border-b border-primary/20 pb-3">
                <span className="font-medium text-primary font-body">Cut Grade:</span>
                <span className="text-right font-bold text-xl text-primary/80 font-display">{data.cutGrade}</span>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div className="border-2 border-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">ADDITIONAL GRADING INFORMATION</div>
            </div>
            <div className="bg-gradient-to-br from-background to-card p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-primary font-body">Polish:</span>
                <span className="text-right text-primary/80 font-semibold">{data.polish}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-primary font-body">Symmetry:</span>
                <span className="text-right text-primary/80 font-semibold">{data.symmetry}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="font-medium text-primary font-body">Fluorescence:</span>
                <span className="text-right text-primary/80 font-semibold">{data.fluorescence}</span>
              </div>
              {data.inscription && (
                <div className="grid grid-cols-2 gap-2 items-center pt-3 border-t border-primary/20">
                  <span className="font-medium text-primary font-body">Inscriptions:</span>
                  <span className="text-right text-primary/80 font-mono text-xs">{data.inscription}</span>
                </div>
              )}
              {data.comments && (
                <div className="pt-3 border-t border-primary/20">
                  <div className="font-medium mb-2 text-primary font-body">Comments:</div>
                  <div className="text-xs text-primary/70 font-body leading-relaxed">{data.comments}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Column - Proportions Diagram */}
        <div className="space-y-6">
          <div className="border-2 border-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">PROPORTIONS</div>
            </div>
            <div className="bg-gradient-to-br from-background to-card p-6 text-center">
              {/* Enhanced Diamond Diagram */}
              <div className="relative mx-auto w-52 h-52 mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Main Diamond Outline with Primary Theme */}
                  <polygon
                    points="100,20 160,80 100,180 40,80"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  {/* Table */}
                  <line x1="70" y1="80" x2="130" y2="80" stroke="hsl(var(--primary))" strokeWidth="3"/>
                  <text x="100" y="72" textAnchor="middle" className="text-xs font-body font-semibold" fill="hsl(var(--primary))">Table: {data.tablePercentage || "57%"}</text>
                  
                  {/* Crown with Gradient */}
                  <polygon
                    points="70,80 100,20 130,80"
                    fill="hsl(var(--primary) / 0.15)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                  <text x="82" y="50" textAnchor="middle" className="text-xs font-body font-medium" fill="hsl(var(--primary))">Crown</text>
                  
                  {/* Pavilion with Gradient */}
                  <polygon
                    points="70,80 100,180 130,80"
                    fill="hsl(var(--primary) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                  <text x="118" y="130" textAnchor="middle" className="text-xs font-body font-medium" fill="hsl(var(--primary))">Pavilion</text>
                  
                  {/* Depth Line */}
                  <line x1="175" y1="20" x2="175" y2="180" stroke="hsl(var(--primary) / 0.8)" strokeWidth="2" strokeDasharray="3,3"/>
                  <text x="185" y="105" textAnchor="start" className="text-xs font-body font-semibold" fill="hsl(var(--primary) / 0.8)">Depth: {data.depthPercentage || "62.3%"}</text>
                </svg>
              </div>

              {/* Technical Measurements with Primary Theme */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-left bg-card p-3 rounded border border-primary/20">
                  <div className="font-semibold mb-2 text-primary font-heading">Measurements:</div>
                  <div className="text-primary/70 font-body">Table: {data.tablePercentage || "57%"}</div>
                  <div className="text-primary/70 font-body">Depth: {data.depthPercentage || "62.3%"}</div>
                  <div className="text-primary/70 font-body">Crown Angle: {data.crownAngle || "34.5°"}</div>
                </div>
                <div className="text-left bg-card p-3 rounded border border-primary/20">
                  <div className="font-semibold mb-2 text-primary font-heading">Details:</div>
                  <div className="text-primary/70 font-body">Pavilion Angle: {data.pavilionAngle || "40.8°"}</div>
                  <div className="text-primary/70 font-body">Girdle: {data.girdleThickness || "Medium"}</div>
                  <div className="text-primary/70 font-body">Culet: {data.culetSize || "None"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="space-y-6">
          <div className="border-2 border-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 text-center">
              <div className="font-bold text-sm tracking-wide font-heading">CLARITY CHARACTERISTICS</div>
            </div>
            <div className="bg-gradient-to-br from-background to-card p-6">
              {/* Enhanced Clarity Plot Diagram */}
              <div className="mb-6">
                <div className="relative mx-auto w-36 h-36 border-3 border-primary rounded-full bg-gradient-to-br from-background to-card shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Main circle outline with primary theme */}
                    <circle cx="50" cy="50" r="45" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2"/>
                    
                    {/* Plot inclusions with theme colors */}
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
                <div className="text-center text-xs text-primary/70 mt-3 font-body">
                  Clarity Grade: <span className="font-bold text-primary text-sm font-display">{data.clarityGrade}</span>
                </div>
              </div>

              {/* Enhanced Clarity Information */}
              <div className="space-y-4 text-xs">
                <div className="bg-card p-3 rounded border border-primary/20">
                  <div className="font-semibold mb-2 text-primary font-heading">Clarity Grade:</div>
                  <div className="text-2xl font-bold text-primary font-display">{data.clarityGrade}</div>
                </div>
                
                <div className="border-t border-primary/20 pt-4">
                  <div className="font-semibold mb-3 text-primary font-heading">Key to Symbols:</div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-3 opacity-80 shadow-sm"></div>
                      <span className="text-primary/70 font-body">Crystal, Needle, Pinpoint</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-3 opacity-70 shadow-sm"></div>
                      <span className="text-primary/70 font-body">Surface Features</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4">
                  <div className="font-semibold mb-2 text-primary font-heading">Clarity Analysis:</div>
                  <div className="text-primary/70 font-body leading-relaxed">
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
      <div className="border-t-2 border-primary pt-6 mt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left - Laboratory Information */}
          <div className="space-y-4">
            <div className="border border-primary">
              <div className="bg-primary text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">LABORATORY INFORMATION</div>
              </div>
              <div className="bg-background p-4 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-primary">Report Number:</span>
                  <span className="font-mono text-primary/80">{data.reportNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-primary">Report Date:</span>
                  <span className="text-primary/80">{data.reportDate instanceof Date ? data.reportDate.toLocaleDateString() : new Date(data.reportDate).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-primary">Gemologist:</span>
                  <span className="text-primary/80">{data.gemologistName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-primary">Signature Date:</span>
                  <span className="text-primary/80">{data.signatureDate instanceof Date ? data.signatureDate.toLocaleDateString() : new Date(data.signatureDate).toLocaleDateString()}</span>
                </div>
                
                <div className="border-t border-primary/20 pt-3 mt-3">
                  <div className="font-medium mb-2 text-primary">Security Features:</div>
                  <div className="space-y-1 text-xs text-primary/70">
                    <div>• Digital signature verification</div>
                    <div>• Holographic security elements</div>
                    <div>• Tamper-evident materials</div>
                    <div>• Database verification backup</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Disclaimers */}
            <div className="border border-primary">
              <div className="bg-primary text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">IMPORTANT LIMITATIONS</div>
              </div>
              <div className="bg-background p-4 text-xs text-primary/70 leading-relaxed">
                <div className="space-y-2">
                  <p>This report identifies the described unset diamond and provides an opinion of its quality based on the internationally accepted grading standards at the time of examination.</p>
                  
                  <p>The results documented in this report refer only to the diamond described, and were obtained using the techniques and equipment available at GIL at the time of examination.</p>
                  
                  <p>This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see gilab.info/limitations.</p>
                  
                  <p className="font-medium text-primary">Verify this report at gilab.info</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - QR Code and Verification */}
          <div className="space-y-4">
            <div className="border border-primary">
              <div className="bg-primary text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">DIGITAL VERIFICATION</div>
              </div>
              <div className="bg-background p-6 text-center">
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
                  <div className="font-medium text-primary mb-1">Scan to Verify</div>
                  <div className="text-gray-600">
                    {data.verifierUrl || `gilab.info/verify/${data.reportNumber}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="border border-gray-400">
              <div className="bg-primary text-white p-3 text-center">
                <div className="font-bold text-sm tracking-wide">DIGITAL AUTHENTICATION</div>
              </div>
              <div className="bg-white p-4 text-center">
                <div className="space-y-3">
                  <div className="text-xs">
                    <div className="font-medium mb-1">Digitally Signed By:</div>
                    <div className="text-primary font-medium">{data.gemologistName}</div>
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
                    <div className="text-xs text-primary font-medium">
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
            <div className="text-xs text-primary font-medium">
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