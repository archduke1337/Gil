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
    <div className={`bg-[#f5f5f0] p-8 font-serif text-black ${className}`} style={{ width: '297mm', height: '210mm', fontSize: '10px' }}>
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src={logoPath} alt="GIL Logo" className="w-16 h-16" />
          <div className="text-2xl font-bold tracking-wide">GIL</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 mb-1">GIL REPORT</div>
          <div className="text-3xl font-bold tracking-wider">{data.reportNumber}</div>
          <div className="text-xs mt-2">Verify this report at gilab.info</div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold mb-2">FACSIMILE</div>
          <div className="text-xs leading-tight max-w-40">
            This is a digital representation of the original GIL Report. This representation might not
            be accepted in lieu of the original GIL Report in certain circumstances. The original GIL
            Report includes security features which are not reproduced in this facsimile.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-4">
          {/* Natural Diamond Grading Report */}
          <div className="bg-[#8b7355] text-white p-2">
            <div className="text-xs font-bold text-center">GIL NATURAL DIAMOND GRADING REPORT</div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>JULY 26, 2025</span>
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
              <span>Measurements</span>
              <span className="font-mono">{data.measurements}</span>
            </div>
          </div>

          {/* Grading Result */}
          <div className="bg-[#8b7355] text-white p-2 mt-6">
            <div className="text-xs font-bold text-center">GRADING RESULT</div>
          </div>
          
          <div className="space-y-2 text-xs">
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

          {/* Additional Grading Information */}
          <div className="bg-[#8b7355] text-white p-2 mt-6">
            <div className="text-xs font-bold text-center">ADDITIONAL GRADING INFORMATION</div>
          </div>
          
          <div className="space-y-2 text-xs">
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
              <span className="font-mono text-xs">{data.inscription}</span>
            </div>
            <div className="mt-3">
              <div className="text-xs">Comments:</div>
              <div className="text-xs mt-1">{data.comments}</div>
            </div>
          </div>
        </div>

        {/* Center Column - Additional Information */}
        <div className="col-span-5">
          <div className="bg-[#8b7355] text-white p-2 mb-4">
            <div className="text-xs font-bold text-center">ADDITIONAL INFORMATION</div>
          </div>

          {/* Proportions Diagram */}
          <div className="bg-white border border-gray-300 p-4 mb-4" style={{ height: '200px' }}>
            <div className="text-center text-xs mb-2">Profile to actual proportions</div>
            {/* Proportions diagram would go here */}
            <div className="flex justify-center items-center h-32">
              <svg width="150" height="100" viewBox="0 0 150 100">
                {/* Crown */}
                <polygon points="75,10 45,40 105,40" fill="none" stroke="black" strokeWidth="1"/>
                {/* Girdle */}
                <line x1="45" y1="40" x2="105" y2="40" stroke="black" strokeWidth="2"/>
                {/* Pavilion */}
                <polygon points="45,40 105,40 75,80" fill="none" stroke="black" strokeWidth="1"/>
                
                {/* Labels */}
                <text x="20" y="25" fontSize="8" fill="black">50%</text>
                <text x="120" y="25" fontSize="8" fill="black">57%</text>
                <text x="15" y="35" fontSize="8" fill="black">15.0% 35.0°</text>
                <text x="115" y="55" fontSize="8" fill="black">41.0°</text>
                <text x="15" y="65" fontSize="8" fill="black">43.5%</text>
                <text x="25" y="85" fontSize="8" fill="black">80%</text>
              </svg>
            </div>
            
            {/* Diamond face-up view */}
            <div className="mt-4 flex justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,5 65,25 65,55 40,75 15,55 15,25" fill="none" stroke="black" strokeWidth="1"/>
                <polygon points="40,15 55,25 55,55 40,65 25,55 25,25" fill="none" stroke="black" strokeWidth="1"/>
              </svg>
            </div>
          </div>

          {/* Clarity Characteristics */}
          <div className="bg-[#8b7355] text-white p-2 mb-4">
            <div className="text-xs font-bold text-center">CLARITY CHARACTERISTICS</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-300 p-2" style={{ height: '120px' }}>
              <div className="flex justify-center items-center h-full">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <polygon points="50,10 80,35 80,65 50,90 20,65 20,35" fill="none" stroke="black" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="2" fill="red"/>
                  <circle cx="45" cy="40" r="1" fill="red"/>
                </svg>
              </div>
            </div>
            <div className="bg-white border border-gray-300 p-2" style={{ height: '120px' }}>
              <div className="flex justify-center items-center h-full">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="2" fill="red"/>
                  <circle cx="45" cy="40" r="1" fill="red"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3">
          {/* QR Code */}
          <div className="mb-6 text-center">
            <QRCodeSVG 
              value={verificationUrl}
              size={80}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>

          {/* Grading Scale */}
          <div className="bg-white border border-gray-300 p-2 mb-4">
            <div className="text-xs font-bold mb-2 text-center">CLARITY</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>FLAWLESS</span>
                <span>FL</span>
              </div>
              <div className="flex justify-between">
                <span>INTERNALLY FLAWLESS</span>
                <span>IF</span>
              </div>
              <div className="flex justify-between">
                <span>VERY VERY SLIGHTLY INCLUDED</span>
                <span>VVS</span>
              </div>
              <div className="flex justify-between">
                <span>VERY SLIGHTLY INCLUDED</span>
                <span>VS</span>
              </div>
              <div className="flex justify-between">
                <span>SLIGHTLY INCLUDED</span>
                <span>SI</span>
              </div>
              <div className="flex justify-between">
                <span>INCLUDED</span>
                <span>I</span>
              </div>
            </div>
          </div>

          {/* GIL Seal */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto border-4 border-yellow-600 rounded-full flex items-center justify-center bg-yellow-50">
              <div className="text-xs font-bold">GIL</div>
            </div>
          </div>

          {/* Website and Security Info */}
          <div className="text-xs text-center space-y-2">
            <div>@gilab.info</div>
            <div className="bg-white p-2 border border-gray-300">
              <QRCodeSVG 
                value="https://gilab.info"
                size={40}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-400">
        <div className="grid grid-cols-2 gap-8 text-xs">
          <div>
            <div className="font-bold mb-2">Security Features</div>
            <div className="space-y-1">
              <div>• Digital verification via QR code</div>
              <div>• Unique report number tracking</div>
              <div>• Tamper-evident design elements</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold mb-2">Gemologist Certification</div>
            <div className="space-y-1">
              <div>Gemologist: {data.gemologistName}</div>
              <div>Date: {data.signatureDate}</div>
              <div className="text-xs italic">Digitally signed and verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}