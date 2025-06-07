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
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCertificate, setNewCertificate] = useState({
    reportNumber: "",
    caratWeight: "",
    colorGrade: "",
    clarityGrade: "",
    cutGrade: "",
    isActive: true
  });

  const loadCertificates = async () => {
    setIsLoadingCerts(true);
    setError(null);
    try {
      const response = await fetch("/api/certificates");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Error loading certificates:", error);
      setError("Failed to load certificates. Please try again.");
      setCertificates([]);
    } finally {
      setIsLoadingCerts(false);
    }
  };

  const handleAddCertificate = async () => {
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCertificate)
      });
      
      if (response.ok) {
        setShowAddForm(false);
        setNewCertificate({
          reportNumber: "",
          caratWeight: "",
          colorGrade: "",
          clarityGrade: "",
          cutGrade: "",
          isActive: true
        });
        loadCertificates();
        alert("Certificate added successfully");
      } else {
        alert("Failed to add certificate");
      }
    } catch (error) {
      alert("Error adding certificate");
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        const response = await fetch(`/api/certificates/${id}`, {
          method: "DELETE"
        });
        
        if (response.ok) {
          loadCertificates();
          alert("Certificate deleted successfully");
        } else {
          alert("Failed to delete certificate");
        }
      } catch (error) {
        alert("Error deleting certificate");
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (response.ok) {
        loadCertificates();
        alert(`Certificate ${!currentStatus ? "activated" : "deactivated"} successfully`);
      } else {
        alert("Failed to update certificate status");
      }
    } catch (error) {
      alert("Error updating certificate status");
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              backgroundColor: "#8B5A3C",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {showAddForm ? "Cancel" : "Add Certificate"}
          </button>
          <button
            onClick={loadCertificates}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Refresh
          </button>
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
      </div>

      {showAddForm && (
        <div style={{ 
          backgroundColor: "white", 
          padding: "2rem", 
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "2rem" 
        }}>
          <h3 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Add New Certificate</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Report Number (e.g., G5096035810)"
              value={newCertificate.reportNumber}
              onChange={(e) => setNewCertificate({...newCertificate, reportNumber: e.target.value})}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
            <input
              type="text"
              placeholder="Carat Weight (e.g., 1.25)"
              value={newCertificate.caratWeight}
              onChange={(e) => setNewCertificate({...newCertificate, caratWeight: e.target.value})}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            />
            <select
              value={newCertificate.colorGrade}
              onChange={(e) => setNewCertificate({...newCertificate, colorGrade: e.target.value})}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="">Select Color Grade</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
            </select>
            <select
              value={newCertificate.clarityGrade}
              onChange={(e) => setNewCertificate({...newCertificate, clarityGrade: e.target.value})}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="">Select Clarity Grade</option>
              <option value="FL">FL</option>
              <option value="IF">IF</option>
              <option value="VVS1">VVS1</option>
              <option value="VVS2">VVS2</option>
              <option value="VS1">VS1</option>
              <option value="VS2">VS2</option>
              <option value="SI1">SI1</option>
              <option value="SI2">SI2</option>
            </select>
            <select
              value={newCertificate.cutGrade}
              onChange={(e) => setNewCertificate({...newCertificate, cutGrade: e.target.value})}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              <option value="">Select Cut Grade</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={newCertificate.isActive}
                onChange={(e) => setNewCertificate({...newCertificate, isActive: e.target.checked})}
              />
              Active Certificate
            </label>
          </div>
          <button
            onClick={handleAddCertificate}
            disabled={!newCertificate.reportNumber || !newCertificate.caratWeight}
            style={{
              backgroundColor: "#8B5A3C",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: (!newCertificate.reportNumber || !newCertificate.caratWeight) ? 0.6 : 1
            }}
          >
            Add Certificate
          </button>
        </div>
      )}

      {isLoadingCerts ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading certificates...</p>
        </div>
      ) : error ? (
        <div style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "1rem",
          borderRadius: "4px",
          border: "1px solid #f5c6cb",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>Error Loading Dashboard</h3>
          <p style={{ margin: "0 0 1rem 0" }}>{error}</p>
          <button
            onClick={loadCertificates}
            style={{
              backgroundColor: "#8B5A3C",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div>
          <h2>Certificates ({certificates.length})</h2>
          {certificates.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              border: "1px solid #dee2e6"
            }}>
              <p style={{ margin: "0 0 1rem 0", color: "#6c757d" }}>No certificates found</p>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  backgroundColor: "#8B5A3C",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add Your First Certificate
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Report Number</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Carat Weight</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Color</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Clarity</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Cut</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Status</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
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
                      <td style={{ 
                        padding: "12px", 
                        border: "1px solid #ddd",
                        color: cert.isActive ? "#28a745" : "#dc3545"
                      }}>
                        {cert.isActive ? "Active" : "Inactive"}
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handleToggleStatus(cert.id, cert.isActive)}
                            style={{
                              backgroundColor: cert.isActive ? "#ffc107" : "#28a745",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            {cert.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(cert.id)}
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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