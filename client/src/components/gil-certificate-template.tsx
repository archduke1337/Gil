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

  return (
    <div className={`bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8 font-serif text-black ${className}`} 
         style={{ 
           width: '297mm', 
           height: '210mm', 
           fontSize: '10px',
           background: 'linear-gradient(135deg, #FEF7ED 0%, #FED7AA 20%, #FDBA74 40%, #FB923C 60%, #F97316 80%, #EA580C 100%)',
           fontFamily: 'Georgia, "Times New Roman", serif'
         }}>
      
      {/* Elegant Header with Decorative Elements */}
      <div className="relative mb-6">
        {/* Decorative border frame */}
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 rounded-lg opacity-20"></div>
        <div className="absolute -inset-1 border-2 border-amber-700 rounded-lg"></div>
        
        <div className="relative bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-4 rounded-lg shadow-lg border border-amber-300">
          <div className="flex items-start justify-between">
            
            {/* Left: Logo and Company Name */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-800 rounded-full transform rotate-12 opacity-30"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full"></div>
                <img src={logoPath} alt="GIL Logo" className="relative w-16 h-16 rounded-full border-3 border-amber-700 shadow-md z-10" />
              </div>
              <div>
                <div className="text-3xl font-bold tracking-wide text-amber-900" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                  GIL°
                </div>
                <div className="text-xs text-amber-800 font-medium mt-1">Gemological Institute Laboratory</div>
              </div>
            </div>
            
            {/* Center: Report Number */}
            <div className="text-center bg-white rounded-lg p-3 shadow-md border-2 border-amber-600">
              <div className="text-sm font-bold text-amber-800 mb-1 tracking-wide">GIL REPORT</div>
              <div className="text-2xl font-bold tracking-wider text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                {data.reportNumber}
              </div>
              <div className="text-xs mt-2 text-amber-700 italic">Verify this report at gilgem.com</div>
            </div>

            {/* Right: Facsimile Notice */}
            <div className="text-right max-w-48">
              <div className="text-xs font-bold mb-2 text-amber-900 tracking-wider">FACSIMILE</div>
              <div className="text-xs leading-tight text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                This is a digital representation of the original GIL Report. This representation might not
                be accepted in lieu of the original GIL Report in certain circumstances. The original GIL
                Report includes security features which are not reproduced in this facsimile.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-4">
          {/* Natural Diamond Grading Report */}
          <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white p-3 rounded-lg shadow-md border border-amber-600">
            <div className="text-xs font-bold text-center tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              GIL NATURAL DIAMOND GRADING REPORT
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-amber-200 pb-1">
                <span className="text-amber-800 font-medium">{formatDate(data.reportDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">GIL Report Number</span>
                <span className="font-mono font-bold text-amber-900">{data.reportNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Shape and Cutting Style</span>
                <span className="font-medium text-amber-900">{data.shape}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Measurements</span>
                <span className="font-mono text-amber-900">{data.measurements}</span>
              </div>
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

          {/* Enhanced GIL Seal */}
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full border-2 border-amber-700"></div>
              <div className="absolute inset-3 bg-white rounded-full border border-amber-600 flex items-center justify-center">
                <div className="text-xs font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>GIL</div>
              </div>
              {/* Decorative elements around seal */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-amber-600 rounded-full"></div>
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