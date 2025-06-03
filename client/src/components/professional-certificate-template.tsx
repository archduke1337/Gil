import { forwardRef } from "react";
import logoPath from "@assets/1000119055-removebg-preview.png";

interface CertificateData {
  referenceNumber: string;
  gemType: string;
  shape: string;
  dimensions: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  treatment: string;
  origin: string;
  inscription: string;
  comments: string;
  certificationDate: Date;
  examinedBy: string;
  approvedBy: string;
  labLocation: string;
  equipmentUsed: string;
  tablePercentage: string;
  depthPercentage: string;
  crownAngle: string;
  pavilionAngle: string;
}

interface ProfessionalCertificateTemplateProps {
  data: CertificateData;
}

// Diamond Cut Diagram SVG
const DiamondCutDiagram = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    <defs>
      <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#f8f9fa", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#e9ecef", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#dee2e6", stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Main diamond outline */}
    <polygon points="150,20 220,80 150,180 80,80" fill="url(#diamondGrad)" stroke="#6c757d" strokeWidth="1"/>
    
    {/* Internal facet lines */}
    <line x1="150" y1="20" x2="150" y2="80" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="80" y1="80" x2="220" y2="80" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="150" y1="80" x2="150" y2="180" stroke="#6c757d" strokeWidth="0.5"/>
    
    {/* Crown facets */}
    <line x1="115" y1="50" x2="185" y2="50" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="100" y1="65" x2="200" y2="65" stroke="#6c757d" strokeWidth="0.5"/>
    
    {/* Pavilion facets */}
    <line x1="120" y1="110" x2="180" y2="110" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="135" y1="145" x2="165" y2="145" stroke="#6c757d" strokeWidth="0.5"/>
    
    {/* Measurement lines and labels */}
    <line x1="80" y1="200" x2="220" y2="200" stroke="#8B7355" strokeWidth="1" markerEnd="url(#arrowhead)"/>
    <text x="150" y="195" textAnchor="middle" fontSize="8" fill="#8B7355">Table</text>
    
    <line x1="230" y1="20" x2="230" y2="180" stroke="#8B7355" strokeWidth="1"/>
    <text x="235" y="100" textAnchor="start" fontSize="8" fill="#8B7355">Depth</text>
    
    {/* Arrow marker */}
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8B7355"/>
      </marker>
    </defs>
  </svg>
);

// Clarity Plot Diagram
const ClarityPlotDiagram = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <defs>
      <radialGradient id="clarityGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:0.9}} />
        <stop offset="70%" style={{stopColor:"#f8f9fa", stopOpacity:0.8}} />
        <stop offset="100%" style={{stopColor:"#e9ecef", stopOpacity:0.9}} />
      </radialGradient>
    </defs>
    
    {/* Main diamond outline - top view */}
    <circle cx="100" cy="100" r="80" fill="url(#clarityGrad)" stroke="#6c757d" strokeWidth="2"/>
    
    {/* Internal facet structure */}
    <polygon points="100,30 160,70 160,130 100,170 40,130 40,70" fill="none" stroke="#6c757d" strokeWidth="1"/>
    <polygon points="100,50 140,80 140,120 100,150 60,120 60,80" fill="none" stroke="#6c757d" strokeWidth="0.5"/>
    
    {/* Sample inclusions */}
    <circle cx="85" cy="75" r="2" fill="#d4691b" opacity="0.7"/>
    <circle cx="120" cy="110" r="1.5" fill="#8B4513" opacity="0.6"/>
    <circle cx="70" cy="125" r="1" fill="#A0522D" opacity="0.5"/>
    
    {/* Crown lines */}
    <line x1="100" y1="30" x2="100" y2="100" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="40" y1="70" x2="160" y2="130" stroke="#6c757d" strokeWidth="0.5"/>
    <line x1="160" y1="70" x2="40" y2="130" stroke="#6c757d" strokeWidth="0.5"/>
  </svg>
);

// Proportions Diagram
const ProportionsDiagram = () => (
  <svg viewBox="0 0 250 150" className="w-full h-full">
    {/* Side view of diamond */}
    <polygon points="125,20 180,70 125,130 70,70" fill="#f8f9fa" stroke="#6c757d" strokeWidth="1"/>
    
    {/* Table line */}
    <line x1="95" y1="70" x2="155" y2="70" stroke="#8B7355" strokeWidth="2"/>
    <text x="175" y="75" fontSize="8" fill="#8B7355">57%</text>
    
    {/* Crown height */}
    <line x1="60" y1="20" x2="60" y2="70" stroke="#8B7355" strokeWidth="1"/>
    <text x="45" y="45" fontSize="8" fill="#8B7355">15.0%</text>
    
    {/* Pavilion depth */}
    <line x1="190" y1="70" x2="190" y2="130" stroke="#8B7355" strokeWidth="1"/>
    <text x="195" y="100" fontSize="8" fill="#8B7355">43.5%</text>
    
    {/* Total depth */}
    <line x1="200" y1="20" x2="200" y2="130" stroke="#8B7355" strokeWidth="1"/>
    <text x="205" y="75" fontSize="8" fill="#8B7355">62.1%</text>
    
    {/* Angle measurements */}
    <path d="M 125,70 L 145,50 A 20,20 0 0,1 155,70" fill="none" stroke="#8B7355" strokeWidth="1"/>
    <text x="160" y="55" fontSize="8" fill="#8B7355">35.0°</text>
    
    <path d="M 125,70 L 145,90 A 20,20 0 0,0 155,70" fill="none" stroke="#8B7355" strokeWidth="1"/>
    <text x="160" y="95" fontSize="8" fill="#8B7355">41.0°</text>
  </svg>
);

const ProfessionalCertificateTemplate = forwardRef<HTMLDivElement, ProfessionalCertificateTemplateProps>(
  ({ data }, ref) => {
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      }).format(date);
    };

    return (
      <div ref={ref} className="bg-[#f5f3f0] p-8 font-['Times_New_Roman',serif] text-[#4a4a4a] min-h-[297mm] w-[210mm] mx-auto" style={{ pageBreakInside: 'avoid' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={logoPath} alt="GIL" className="h-16 w-auto" />
            <div className="text-2xl font-bold text-[#8B7355] tracking-wider">GIL</div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-[#8B7355] mb-2">GIL REPORT</div>
            <div className="text-3xl font-bold text-[#4a4a4a] tracking-widest">{data.referenceNumber}</div>
            <div className="text-sm mt-2">Verify this report at gilgem.com</div>
          </div>
          
          <div className="text-xs text-right max-w-[200px] leading-tight">
            <div className="font-semibold mb-1">FACSIMILE</div>
            <div>This is a digital representation of the original GIL Report. This representation might not be accepted in lieu of the original GIL Report in certain circumstances. The original GIL Report includes security features which are not reproducible on a facsimile.</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-[#8B7355] text-white p-3 text-center font-semibold">
              GIL NATURAL DIAMOND GRADING REPORT
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>{formatDate(data.certificationDate)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>GIL Report Number</span>
                <span className="font-mono">{data.referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Shape and Cutting Style</span>
                <span>{data.shape}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Measurements</span>
                <span>{data.dimensions}</span>
              </div>
            </div>

            {/* Grading Results */}
            <div className="bg-[#8B7355] text-white p-3 text-center font-semibold">
              GRADING RESULTS
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Carat Weight</span>
                <span className="font-semibold">{data.caratWeight} carat</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Color Grade</span>
                <span className="font-semibold">{data.colorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Clarity Grade</span>
                <span className="font-semibold">{data.clarityGrade}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Cut Grade</span>
                <span className="font-semibold">{data.cutGrade}</span>
              </div>
            </div>

            {/* Additional Grading Information */}
            <div className="bg-[#8B7355] text-white p-3 text-center font-semibold">
              ADDITIONAL GRADING INFORMATION
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Polish</span>
                <span>{data.polish}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Symmetry</span>
                <span>{data.symmetry}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Fluorescence</span>
                <span>{data.fluorescence}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span>Inscription(s)</span>
                <span className="font-mono">{data.inscription || data.referenceNumber}</span>
              </div>
              {data.comments && (
                <div className="text-xs leading-tight">
                  <span className="font-semibold">Comments:</span> {data.comments}
                </div>
              )}
            </div>
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            {/* Additional Information Header */}
            <div className="bg-[#8B7355] text-white p-3 text-center font-semibold">
              ADDITIONAL INFORMATION
            </div>

            {/* Proportions Diagram */}
            <div className="bg-white p-4 border">
              <div className="h-32 mb-2">
                <ProportionsDiagram />
              </div>
              <div className="text-xs text-center">Profile to actual proportions</div>
            </div>

            {/* Cut Diagram */}
            <div className="bg-white p-4 border">
              <div className="h-32 mb-2">
                <DiamondCutDiagram />
              </div>
              <div className="text-xs text-center grid grid-cols-2 gap-2 mt-2">
                <div>Crown Angle: {data.crownAngle}</div>
                <div>Table Size: {data.tablePercentage}</div>
                <div>Pavilion Angle: {data.pavilionAngle}</div>
                <div>Depth: {data.depthPercentage}</div>
              </div>
            </div>

            {/* Clarity Characteristics */}
            <div className="bg-[#8B7355] text-white p-3 text-center font-semibold">
              CLARITY CHARACTERISTICS
            </div>
            
            <div className="bg-white p-4 border flex justify-center items-center space-x-4">
              <div className="w-24 h-24">
                <ClarityPlotDiagram />
              </div>
              <div className="w-24 h-24">
                <ClarityPlotDiagram />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Clarity Scale */}
            <div className="bg-white border p-3">
              <div className="text-xs font-semibold mb-2 text-center">CLARITY</div>
              <div className="space-y-1 text-xs">
                <div className="bg-gray-100 p-1 text-center">INTERNALLY FLAWLESS</div>
                <div className="text-center">FL</div>
                <div className="text-center">IF</div>
                <div className="text-center">VVS₁</div>
                <div className="text-center">VVS₂</div>
                <div className="text-center">VS₁</div>
                <div className="text-center">VS₂</div>
                <div className="text-center">SI₁</div>
                <div className="text-center">SI₂</div>
                <div className="text-center">I₁</div>
                <div className="text-center">I₂</div>
                <div className="text-center">I₃</div>
              </div>
            </div>

            {/* GIL Logo */}
            <div className="flex justify-center">
              <img src={logoPath} alt="GIL" className="h-16 w-auto opacity-50" />
            </div>

            {/* Footer Information */}
            <div className="text-xs leading-tight space-y-2">
              <div>gilgem.com</div>
              <div className="border border-gray-400 p-2">
                <div className="text-center mb-1">QR Code Placeholder</div>
                <div className="bg-gray-200 h-16 w-16 mx-auto"></div>
              </div>
              
              <div className="text-xs">
                The results documented in this report refer only to the diamond described and were obtained using the techniques and equipment available to GIL at the time of the examination. This report is not a guarantee or valuation and Gemological Institute Laboratories makes no representation as to the origin source being as represented. Gemological Institute Laboratories expressly disclaims all warranties and guarantees of the diamond and this grading and does not accept any liability or responsibility relating to the origin source of this diamond or verification of any inscription or laser-drill holes. Any alteration of this report renders it invalid.
              </div>
              
              <div className="flex items-center text-xs mt-2">
                <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                <div>This security standard has been implemented, not all security features listed herein will be visible at the gem grading or gem identification report.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Examiner Information */}
        <div className="mt-8 flex justify-between text-xs">
          <div>
            <div className="font-semibold">Examined by: {data.examinedBy}</div>
            <div>Approved by: {data.approvedBy}</div>
          </div>
          <div className="text-right">
            <div>{data.labLocation}</div>
            <div>{data.equipmentUsed}</div>
          </div>
        </div>
      </div>
    );
  }
);

ProfessionalCertificateTemplate.displayName = 'ProfessionalCertificateTemplate';

export default ProfessionalCertificateTemplate;