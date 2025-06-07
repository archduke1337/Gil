function AdminBasic() {
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
        padding: "40px"
      }}>
        <h1 style={{
          textAlign: "center",
          margin: "0 0 30px 0",
          color: "#8B5A3C",
          fontSize: "28px",
          fontWeight: "bold"
        }}>
          GIL Admin Dashboard
        </h1>
        
        <div style={{
          textAlign: "center",
          padding: "40px 0",
          color: "#374151"
        }}>
          <h2 style={{ margin: "0 0 20px 0" }}>Certificate Management System</h2>
          <p style={{ margin: "0 0 30px 0", fontSize: "16px", lineHeight: "1.6" }}>
            Welcome to the Gemological Institute Laboratories admin dashboard.
            This system manages certificate authentication and verification.
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "40px"
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
            marginTop: "40px",
            padding: "20px",
            background: "#fff7ed",
            borderRadius: "8px",
            border: "1px solid #fed7aa"
          }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#8B5A3C" }}>Quick Actions</h3>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <button 
                onClick={() => window.location.href = '/api/certificates'}
                style={{
                  padding: "10px 20px",
                  background: "#8B5A3C",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                View Certificates API
              </button>
              <button 
                onClick={() => alert('Admin features will be enabled after resolving React configuration')}
                style={{
                  padding: "10px 20px",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                Manage Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBasic;