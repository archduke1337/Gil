import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Simple certificate verification component
function CertificateVerification() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = useCallback(async () => {
    if (!referenceNumber.trim()) return;
    
    setIsVerifying(true);
    try {
      const response = await fetch(`/api/certificates/verify/${encodeURIComponent(referenceNumber)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ isValid: false, message: "Verification failed" });
    } finally {
      setIsVerifying(false);
    }
  }, [referenceNumber]);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Certificate Verification</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="Enter certificate reference number"
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

      {result && (
        <div style={{ 
          marginTop: "2rem", 
          padding: "1rem", 
          backgroundColor: result.isValid ? "#d4edda" : "#f8d7da",
          border: `1px solid ${result.isValid ? "#c3e6cb" : "#f5c6cb"}`,
          borderRadius: "4px"
        }}>
          {result.isValid ? (
            <div>
              <h3 style={{ color: "#155724", margin: "0 0 1rem 0" }}>Certificate Found</h3>
              {result.certificate && (
                <div>
                  <p><strong>Report Number:</strong> {result.certificate.reportNumber}</p>
                  <p><strong>Carat Weight:</strong> {result.certificate.caratWeight}</p>
                  <p><strong>Color Grade:</strong> {result.certificate.colorGrade}</p>
                  <p><strong>Clarity Grade:</strong> {result.certificate.clarityGrade}</p>
                  <p><strong>Cut Grade:</strong> {result.certificate.cutGrade}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 style={{ color: "#721c24", margin: "0 0 1rem 0" }}>Certificate Not Found</h3>
              <p>{result.message || "The reference number was not found in our database."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple admin login component
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        onLogin();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  }, [username, password, onLogin]);

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
      <h2 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Admin Login</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
          placeholder="Password"
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
        disabled={isLoading}
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
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

// Certificate Generator Component
function CertificateGenerator({ onSuccess }: { onSuccess: () => void }) {
  const [reportNumber, setReportNumber] = useState(`G${Date.now().toString().slice(-10)}`);
  const [caratWeight, setCaratWeight] = useState("1.00");
  const [colorGrade, setColorGrade] = useState("D");
  const [clarityGrade, setClarityGrade] = useState("FL");
  const [cutGrade, setCutGrade] = useState("Excellent");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = useCallback(async () => {
    setIsCreating(true);
    try {
      const certificateData = {
        reportNumber,
        reportDate: new Date().toISOString(),
        shape: "Round",
        measurements: "6.50 x 6.52 x 4.05 mm",
        caratWeight: parseFloat(caratWeight),
        colorGrade,
        clarityGrade,
        cutGrade,
        polish: "Excellent",
        symmetry: "Excellent",
        fluorescence: "None",
        gemologistName: "Dr. Sarah Johnson",
        signatureDate: new Date().toISOString(),
        labLocation: "GIL Headquarters",
        equipmentUsed: "Gemological microscope, spectroscopy, precision scale",
        gemType: "Diamond",
        isActive: true,
      };

      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateData),
      });

      if (response.ok) {
        onSuccess();
        setReportNumber(`G${Date.now().toString().slice(-10)}`);
        alert("Certificate created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to create certificate: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert("Error creating certificate");
    } finally {
      setIsCreating(false);
    }
  }, [reportNumber, caratWeight, colorGrade, clarityGrade, cutGrade, onSuccess]);

  return (
    <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", border: "1px solid #ddd" }}>
      <h3 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Create New Certificate</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Report Number:</label>
          <input
            type="text"
            value={reportNumber}
            onChange={(e) => setReportNumber(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Carat Weight:</label>
          <input
            type="text"
            value={caratWeight}
            onChange={(e) => setCaratWeight(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Color Grade:</label>
          <select
            value={colorGrade}
            onChange={(e) => setColorGrade(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Clarity Grade:</label>
          <select
            value={clarityGrade}
            onChange={(e) => setClarityGrade(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="FL">FL</option>
            <option value="IF">IF</option>
            <option value="VVS1">VVS1</option>
            <option value="VVS2">VVS2</option>
            <option value="VS1">VS1</option>
            <option value="VS2">VS2</option>
            <option value="SI1">SI1</option>
            <option value="SI2">SI2</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Cut Grade:</label>
          <select
            value={cutGrade}
            onChange={(e) => setCutGrade(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleCreate}
        disabled={isCreating}
        style={{
          backgroundColor: "#8B5A3C",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: isCreating ? 0.7 : 1
        }}
      >
        {isCreating ? "Creating..." : "Create Certificate"}
      </button>
    </div>
  );
}

// Simple admin dashboard
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const queryClient = useQueryClient();
  
  const { data: certificatesData, isLoading, error } = useQuery({
    queryKey: ["/api/certificates"],
    queryFn: async () => {
      const response = await fetch("/api/certificates");
      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }
      return response.json();
    }
  });

  const certificates = certificatesData?.certificates || [];

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "#8B5A3C" }}>Admin Dashboard</h1>
        <div style={{ color: "red", marginTop: "1rem" }}>
          Error loading certificates. Please try again.
        </div>
      </div>
    );
  }

  const handleCertificateCreated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
  }, [queryClient]);

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

      <CertificateGenerator onSuccess={handleCertificateCreated} />

      {isLoading ? (
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
                {certificates.map((cert: any) => (
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

// Main application component
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPage = () => {
    if (currentPage === "admin") {
      if (isLoggedIn) {
        return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
      } else {
        return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
      }
    }
    
    return <CertificateVerification />;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: "#8B5A3C", 
        padding: "1rem 2rem",
        color: "white"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>GIL - Gemological Institute Laboratories</h1>
          <div>
            <button
              onClick={() => setCurrentPage("home")}
              style={{
                backgroundColor: currentPage === "home" ? "rgba(255,255,255,0.2)" : "transparent",
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

      {/* Main content */}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
