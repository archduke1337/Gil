function App() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8f9fa",
      fontFamily: "Arial, sans-serif"
    }}>
      <nav style={{ 
        backgroundColor: "#8B5A3C", 
        padding: "1rem 2rem",
        color: "white"
      }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
          GIL - Gemological Institute Laboratories
        </h1>
      </nav>
      
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>
          Certificate Verification System
        </h2>
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          Professional diamond certification verification service
        </p>
        
        <div style={{ 
          backgroundColor: "white", 
          padding: "2rem", 
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "2rem"
        }}>
          <h3 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Verify Certificate</h3>
          <input 
            type="text" 
            placeholder="Enter certificate reference number"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              marginBottom: "1rem"
            }}
          />
          <button 
            style={{
              backgroundColor: "#8B5A3C",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Verify Certificate
          </button>
        </div>
        
        <div style={{ 
          backgroundColor: "white", 
          padding: "2rem", 
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#8B5A3C", marginBottom: "1rem" }}>Admin Access</h3>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Administrator login for certificate management
          </p>
          <button 
            style={{
              backgroundColor: "#8B5A3C",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Admin Login
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;