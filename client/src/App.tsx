import { useState, useEffect } from "react";

interface Certificate {
  id: number;
  reportNumber: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  isActive: boolean;
}

function CertificateVerification() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!referenceNumber.trim()) return;
    
    setIsVerifying(true);
    try {
      const response = await fetch(`/api/certificates/verify/${encodeURIComponent(referenceNumber)}`);
      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      setVerificationResult({ isValid: false, message: "Verification failed" });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Certificate Verification</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="Enter certificate reference number (e.g., G5096035810)"
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px"
          }}
        />
      </div>
      
      <button
        onClick={handleVerify}
        disabled={isVerifying || !referenceNumber.trim()}
        style={{
          backgroundColor: "#8B5A3C",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          opacity: isVerifying ? 0.7 : 1
        }}
      >
        {isVerifying ? "Verifying..." : "Verify Certificate"}
      </button>

      {verificationResult && (
        <div style={{ 
          marginTop: "2rem", 
          padding: "1rem", 
          backgroundColor: verificationResult.isValid ? "#d4edda" : "#f8d7da",
          border: `1px solid ${verificationResult.isValid ? "#c3e6cb" : "#f5c6cb"}`,
          borderRadius: "4px"
        }}>
          {verificationResult.isValid ? (
            <div>
              <h3 style={{ color: "#155724", margin: "0 0 1rem 0" }}>Certificate Found</h3>
              {verificationResult.certificate && (
                <div>
                  <p><strong>Report Number:</strong> {verificationResult.certificate.reportNumber}</p>
                  <p><strong>Carat Weight:</strong> {verificationResult.certificate.caratWeight}</p>
                  <p><strong>Color Grade:</strong> {verificationResult.certificate.colorGrade}</p>
                  <p><strong>Clarity Grade:</strong> {verificationResult.certificate.clarityGrade}</p>
                  <p><strong>Cut Grade:</strong> {verificationResult.certificate.cutGrade}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 style={{ color: "#721c24", margin: "0 0 1rem 0" }}>Certificate Not Found</h3>
              <p>{verificationResult.message || "The reference number was not found in our database."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}





function WorkingApp() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <nav style={{ 
        backgroundColor: "#8B5A3C", 
        padding: "1rem 2rem",
        color: "white"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>GIL - Gemological Institute Laboratories</h1>
        </div>
      </nav>

      <main>
        <CertificateVerification />
      </main>
    </div>
  );
}

export default WorkingApp;