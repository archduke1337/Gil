import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";

interface Certificate {
  id: number;
  referenceNumber: string;
  gemType: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade: string;
  cutGrade: string;
  isActive: boolean;
  uploadDate: string;
}

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        loadCertificates();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/certificates");
      if (response.ok) {
        const data = await response.json();
        setCertificates(data.certificates || []);
      }
    } catch (err) {
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setCertificates([]);
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef7ed, #ffffff, #fff7ed)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <h1 style={{
            textAlign: "center",
            margin: "0 0 30px 0",
            color: "#8B5A3C",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            GIL Admin Login
          </h1>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                color: "#374151", 
                fontWeight: "500" 
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none"
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ 
                display: "block", 
                marginBottom: "8px", 
                color: "#374151", 
                fontWeight: "500" 
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none"
                }}
                required
              />
            </div>
            
            {error && (
              <div style={{ 
                color: "#dc2626", 
                fontSize: "14px", 
                textAlign: "center",
                marginBottom: "20px"
              }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading ? "#9ca3af" : "#8B5A3C",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef7ed, #ffffff, #fff7ed)",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <header style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid #e5e7eb",
        padding: "20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{
            margin: 0,
            color: "#8B5A3C",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            GIL Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "8px 16px",
                background: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              ← Back to Home
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}>
            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#374151" }}>Total Certificates</h3>
              <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#8B5A3C" }}>
                {certificates.length}
              </p>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#374151" }}>Active Certificates</h3>
              <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#059669" }}>
                {certificates.filter(cert => cert.isActive).length}
              </p>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#374151" }}>Recent Uploads</h3>
              <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#7c3aed" }}>
                {certificates.filter(cert => {
                  if (!cert.uploadDate) return false;
                  const uploadDate = new Date(cert.uploadDate);
                  const now = new Date();
                  const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
            </div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            padding: "24px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}>
              <h2 style={{ margin: 0, color: "#374151", fontSize: "20px" }}>Certificate Database</h2>
              <button
                onClick={loadCertificates}
                style={{
                  padding: "8px 16px",
                  background: "#8B5A3C",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  border: "3px solid #f3f4f6",
                  borderTop: "3px solid #8B5A3C",
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  animation: "spin 1s linear infinite"
                }}></div>
                <p style={{ margin: 0, color: "#6b7280" }}>Loading certificates...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</p>
                <button
                  onClick={loadCertificates}
                  style={{
                    padding: "8px 16px",
                    background: "#8B5A3C",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Retry
                </button>
              </div>
            ) : certificates.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ margin: 0, color: "#6b7280" }}>No certificates found.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Reference
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Gem Type
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Carat
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Color
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Clarity
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Cut
                      </th>
                      <th style={{ textAlign: "left", padding: "12px", color: "#374151", fontWeight: "600" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr key={cert.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "12px", fontFamily: "monospace", fontSize: "14px" }}>
                          {cert.referenceNumber}
                        </td>
                        <td style={{ padding: "12px" }}>{cert.gemType}</td>
                        <td style={{ padding: "12px" }}>{cert.caratWeight}</td>
                        <td style={{ padding: "12px" }}>{cert.colorGrade}</td>
                        <td style={{ padding: "12px" }}>{cert.clarityGrade}</td>
                        <td style={{ padding: "12px" }}>{cert.cutGrade}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            background: cert.isActive ? "#d1fae5" : "#f3f4f6",
                            color: cert.isActive ? "#065f46" : "#374151"
                          }}>
                            {cert.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}

function SimpleApp() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return <AdminDashboard />;
  }
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef7ed, #ffffff, #fff7ed)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        textAlign: "center"
      }}>
        <h1 style={{
          margin: "0 0 30px 0",
          color: "#8B5A3C",
          fontSize: "28px",
          fontWeight: "bold"
        }}>
          GIL - Gemological Institute Laboratories
        </h1>
        
        <p style={{
          margin: "0 0 30px 0",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#374151"
        }}>
          Professional gemological certificate verification and management system
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          <div style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #8B5A3C"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#8B5A3C" }}>System Status</h3>
            <p style={{ margin: 0, color: "#059669", fontWeight: "bold" }}>Operational</p>
          </div>
          
          <div style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #8B5A3C"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#8B5A3C" }}>Database</h3>
            <p style={{ margin: 0, color: "#059669", fontWeight: "bold" }}>Connected</p>
          </div>
          
          <div style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #8B5A3C"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#8B5A3C" }}>API Status</h3>
            <p style={{ margin: 0, color: "#059669", fontWeight: "bold" }}>Active</p>
          </div>
        </div>
        
        <div style={{
          padding: "20px",
          background: "#fff7ed",
          borderRadius: "8px",
          border: "1px solid #fed7aa"
        }}>
          <h3 style={{ margin: "0 0 15px 0", color: "#8B5A3C" }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="/api/certificates"
              style={{
                padding: "10px 20px",
                background: "#8B5A3C",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              View Certificates API
            </a>
            <button 
              onClick={() => setShowAdmin(true)}
              style={{
                padding: "10px 20px",
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(<SimpleApp />);
