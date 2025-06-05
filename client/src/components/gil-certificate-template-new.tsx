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
      id="certificate-preview"
      className={`mx-auto shadow-2xl ${className}`}
      style={{ 
        width: '8.5in',
        minHeight: '11in',
        backgroundColor: '#ffffff',
        border: '3px solid #000000',
        fontFamily: 'Times New Roman, serif',
        padding: '0.75in',
        boxSizing: 'border-box'
      }}>
      
      {/* Professional Header */}
      <div className="border-b-4 border-black pb-4 mb-6">
        <div className="flex justify-between items-start">
          {/* Left - Laboratory Seal */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
              <div className="text-2xl font-bold" style={{ color: '#000000', fontFamily: 'Times New Roman, serif' }}>GIL</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#000000', fontFamily: 'Times New Roman, serif' }}>
                GEMOLOGICAL INSTITUTE LABORATORY
              </div>
              <div className="text-sm" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
                Independent Gemological Testing Laboratory
              </div>
              <div className="text-xs mt-1" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
                CARLSBAD • NEW YORK • BANGKOK • MUMBAI
              </div>
            </div>
          </div>

          {/* Right - Report Details */}
          <div className="text-right">
            <div className="text-xl font-bold mb-2" style={{ color: '#000000', fontFamily: 'Times New Roman, serif' }}>
              DIAMOND GRADING REPORT
            </div>
            <div className="text-lg mb-1" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
              {data.reportDate instanceof Date ? data.reportDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-2xl font-bold border-2 border-black px-4 py-2 inline-block" style={{ color: '#000000', fontFamily: 'Arial, sans-serif' }}>
              {data.reportNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Content Layout */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        
        {/* Left Column - Identification & Results */}
        <div className="col-span-5 space-y-4">
          {/* This Report */}
          <div>
            <div className="text-lg font-bold mb-2 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
              This Report
            </div>
            <div className="space-y-1 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="flex justify-between">
                <span>GIL Report Number</span>
                <span className="font-bold">{data.reportNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Shape and Cutting Style</span>
                <span>{data.shape}</span>
              </div>
              <div className="flex justify-between">
                <span>Measurements</span>
                <span className="font-mono text-xs">{data.measurements}</span>
              </div>
            </div>
          </div>

          {/* Grading Results */}
          <div>
            <div className="text-lg font-bold mb-2 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
              Grading Results
            </div>
            <div className="space-y-2">
              <div className="text-center py-3 border border-black">
                <div className="text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Carat Weight</div>
                <div className="text-3xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>{data.caratWeight}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center py-2 border border-black">
                  <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>Color Grade</div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>{data.colorGrade}</div>
                </div>
                <div className="text-center py-2 border border-black">
                  <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>Clarity Grade</div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>{data.clarityGrade}</div>
                </div>
                <div className="text-center py-2 border border-black">
                  <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>Cut Grade</div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>{data.cutGrade}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Grading Information */}
          <div>
            <div className="text-lg font-bold mb-2 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
              Additional Grading Information
            </div>
            <div className="space-y-1 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
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
            </div>
          </div>

          {/* Comments */}
          <div>
            <div className="text-lg font-bold mb-2 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
              Comments
            </div>
            <div className="text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
              {data.comments || "Clouds are not shown. Pinpoints are not shown."}
            </div>
          </div>
        </div>

        {/* Center Column - Proportions */}
        <div className="col-span-4">
          <div className="text-lg font-bold mb-4 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
            Proportions
          </div>
          <div className="text-center">
            {/* Professional Diamond Profile */}
            <svg viewBox="0 0 300 400" className="w-full h-80 border border-black">
              {/* Main Diamond Profile */}
              <polygon
                points="150,50 220,140 150,350 80,140"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
              />
              
              {/* Table */}
              <line x1="110" y1="140" x2="190" y2="140" stroke="#000000" strokeWidth="4"/>
              <text x="150" y="130" textAnchor="middle" className="text-sm font-medium" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                TABLE
              </text>
              <text x="60" y="145" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                {data.tablePercentage || "57%"}
              </text>
              
              {/* Crown */}
              <polygon
                points="110,140 150,50 190,140"
                fill="rgba(200, 200, 200, 0.2)"
                stroke="#000000"
                strokeWidth="2"
              />
              <text x="100" y="95" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                CROWN
              </text>
              
              {/* Pavilion */}
              <polygon
                points="110,140 150,350 190,140"
                fill="rgba(150, 150, 150, 0.1)"
                stroke="#000000"
                strokeWidth="2"
              />
              <text x="200" y="245" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                PAVILION
              </text>
              
              {/* Girdle */}
              <line x1="80" y1="140" x2="220" y2="140" stroke="#000000" strokeWidth="3"/>
              <text x="230" y="145" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                GIRDLE
              </text>
              
              {/* Measurements */}
              <text x="250" y="80" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Table: {data.tablePercentage || "57%"}
              </text>
              <text x="250" y="100" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Depth: {data.depthPercentage || "62.3%"}
              </text>
              <text x="250" y="120" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Crown Angle: {data.crownAngle || "34.5°"}
              </text>
              <text x="250" y="140" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Pavilion Angle: {data.pavilionAngle || "40.8°"}
              </text>
              <text x="250" y="160" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Girdle: {data.girdleThickness || "Medium"}
              </text>
              <text x="250" y="180" className="text-xs" fill="#000000" style={{ fontFamily: 'Arial, sans-serif' }}>
                Culet: {data.culetSize || "None"}
              </text>
            </svg>
          </div>
        </div>

        {/* Right Column - Clarity Characteristics */}
        <div className="col-span-3">
          <div className="text-lg font-bold mb-4 pb-1 border-b-2 border-black" style={{ fontFamily: 'Times New Roman, serif' }}>
            Clarity Characteristics
          </div>
          
          {/* Professional Clarity Plots */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Crown</div>
              <svg viewBox="0 0 140 140" className="w-32 h-32 border-2 border-black mx-auto">
                <polygon
                  points="70,20 110,50 70,120 30,50"
                  fill="white"
                  stroke="#000000"
                  strokeWidth="2"
                />
                {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                  <circle
                    key={index}
                    cx={inclusion.x * 1.4}
                    cy={inclusion.y * 1.4}
                    r={inclusion.size * 1.2}
                    fill="#000000"
                    opacity="0.8"
                  />
                ))}
              </svg>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Pavilion</div>
              <svg viewBox="0 0 140 140" className="w-32 h-32 border-2 border-black mx-auto">
                <circle
                  cx="70"
                  cy="70"
                  r="50"
                  fill="white"
                  stroke="#000000"
                  strokeWidth="2"
                />
                {generateClarityPlotDiagram(data.clarityGrade).map((inclusion, index) => (
                  <circle
                    key={index}
                    cx={inclusion.x * 1.4}
                    cy={inclusion.y * 1.4}
                    r={inclusion.size * 1.2}
                    fill="#000000"
                    opacity="0.8"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Symbol Key */}
          <div className="mb-6">
            <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>Key to Symbols</div>
            <div className="space-y-1 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                <span>Crystal, Included mineral, Needle</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                <span>Cloud, Pinpoint</span>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="text-xs leading-tight p-3 border border-black" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="font-bold mb-2">IMPORTANT LIMITATIONS</div>
            <div className="mb-2">
              The results documented in this report refer only to the diamond described, and were obtained using the techniques and equipment available to GIL at the time of examination.
            </div>
            <div>
              This report is not a guarantee or valuation. For additional information and important limitations and disclaimers, please see gilab.info/limitations.
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <div className="mt-8 pt-4 border-t-4 border-black">
        <div className="grid grid-cols-3 gap-8 items-end">
          {/* Left - Laboratory Information */}
          <div>
            <div className="text-xs mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="font-bold">Gemological Institute Laboratory</div>
              <div>The Robert Mouawad Campus</div>
              <div>5355 Armada Drive</div>
              <div>Carlsbad, CA 92008</div>
              <div>T 760 603 4500 F 760 603 4595</div>
              <div>gilab.info</div>
            </div>
          </div>

          {/* Center - Authentication */}
          <div className="text-center">
            <div className="mb-2">
              <QRCodeSVG 
                value={data.verifierUrl || `https://gilab.info/verify/${data.reportNumber}`}
                size={80}
                level="H"
                includeMargin={true}
                className="border-2 border-black"
              />
            </div>
            <div className="text-xs font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
              Verify this report at gilab.info
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              Report Number: {data.reportNumber}
            </div>
          </div>

          {/* Right - Signature Block */}
          <div className="text-right">
            <div className="mb-4">
              <div className="text-xs mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                {data.signatureDate instanceof Date ? data.signatureDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date(data.signatureDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="border-b border-black w-48 mb-1 ml-auto"></div>
              <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                {data.gemologistName}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                Staff Gemologist
              </div>
            </div>
            <div className="text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div>© {new Date().getFullYear()} Gemological Institute Laboratory</div>
              <div>All rights reserved worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}