import { createRoot } from "react-dom/client";
import "./index.css";

function SimpleApp() {
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
              onClick={() => window.location.href = '/admin'}
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
