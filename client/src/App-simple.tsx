import { useState } from "react";

function SimpleApp() {
  const [message, setMessage] = useState("GIL Certificate System");

  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "2rem", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5" 
    }}>
      <h1 style={{ color: "#8B5A3C", textAlign: "center" }}>{message}</h1>
      <div style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        backgroundColor: "white", 
        padding: "2rem", 
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Certificate Verification</h2>
        <p>Enter a certificate reference number to verify:</p>
        <input 
          type="text" 
          placeholder="e.g., G5096035810"
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "4px",
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
            cursor: "pointer"
          }}
          onClick={() => setMessage("Verification feature coming soon")}
        >
          Verify Certificate
        </button>
      </div>
    </div>
  );
}

export default SimpleApp;