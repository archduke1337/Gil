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

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        onLogin();
      } else {
        alert("Invalid credentials - use admin/admin123");
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
      <h2 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Admin Login</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username (admin)"
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "4px",
            marginBottom: "1rem"
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (admin123)"
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "4px"
          }}
        />
      </div>
      
      <button
        onClick={handleLogin}
        disabled={isLoggingIn}
        style={{
          backgroundColor: "#8B5A3C",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%"
        }}
      >
        {isLoggingIn ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(false);

  const loadCertificates = async () => {
    setIsLoadingCerts(true);
    try {
      const response = await fetch("/api/certificates");
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Error loading certificates:", error);
    } finally {
      setIsLoadingCerts(false);
    }
  };

  // Load certificates on mount
  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#8B5A3C" }}>Admin Dashboard</h1>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {isLoadingCerts ? (
        <p>Loading certificates...</p>
      ) : (
        <div>
          <h2>Certificates ({certificates.length})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Report Number</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Carat Weight</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Color</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Clarity</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Cut</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Active</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.reportNumber}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.caratWeight}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.colorGrade}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.clarityGrade}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.cutGrade}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{cert.isActive ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkingApp() {
  const [currentPage, setCurrentPage] = useState("verify");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("verify");
  };

  const renderCurrentPage = () => {
    if (currentPage === "admin") {
      return isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />;
    }
    return <CertificateVerification />;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <nav style={{ 
        backgroundColor: "#8B5A3C", 
        padding: "1rem 2rem",
        color: "white"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>GIL - Gemological Institute Laboratories</h1>
          <div>
            <button
              onClick={() => setCurrentPage("verify")}
              style={{
                backgroundColor: currentPage === "verify" ? "rgba(255,255,255,0.2)" : "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "8px 16px",
                marginRight: "1rem",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Verify
            </button>
            <button
              onClick={() => setCurrentPage("admin")}
              style={{
                backgroundColor: currentPage === "admin" ? "rgba(255,255,255,0.2)" : "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default WorkingApp;