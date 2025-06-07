import React from "react";

const CleanApp = () => {
  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        backgroundColor: "white",
        padding: "32px",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }
    },
    React.createElement(
      "div",
      { style: { maxWidth: "1024px", margin: "0 auto" } },
      React.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: "32px" } },
        React.createElement("img", {
          src: "/attached_assets/1000119055-removebg-preview.png",
          alt: "GIL Logo",
          style: { height: "96px", margin: "0 auto 16px", display: "block" }
        }),
        React.createElement(
          "h1",
          {
            style: {
              fontSize: "36px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "16px",
              margin: "0 0 16px 0"
            }
          },
          "GIL Diamond Certificate Verification"
        ),
        React.createElement(
          "p",
          {
            style: {
              fontSize: "20px",
              color: "#6b7280",
              marginBottom: "32px",
              margin: "0 0 32px 0"
            }
          },
          "Professional Diamond Authentication & Gemological Services"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "32px"
          }
        },
        React.createElement(
          "div",
          {
            style: {
              backgroundColor: "#eff6ff",
              padding: "24px",
              borderRadius: "8px"
            }
          },
          React.createElement(
            "h2",
            {
              style: {
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "16px",
                margin: "0 0 16px 0"
              }
            },
            "Verify Certificate"
          ),
          React.createElement(
            "p",
            {
              style: {
                color: "#374151",
                marginBottom: "16px",
                margin: "0 0 16px 0"
              }
            },
            "Enter your diamond certificate number to verify authenticity and view detailed grading information."
          ),
          React.createElement("input", {
            type: "text",
            placeholder: "Enter certificate number",
            style: {
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "16px"
            }
          }),
          React.createElement(
            "button",
            {
              style: {
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600"
              }
            },
            "Verify Certificate"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              backgroundColor: "#f9fafb",
              padding: "24px",
              borderRadius: "8px"
            }
          },
          React.createElement(
            "h2",
            {
              style: {
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "16px",
                margin: "0 0 16px 0"
              }
            },
            "Our Services"
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: "12px" } },
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center" } },
              React.createElement("span", {
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  marginRight: "12px"
                }
              }),
              "Diamond Certificate Verification"
            ),
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center" } },
              React.createElement("span", {
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  marginRight: "12px"
                }
              }),
              "Gemstone Authentication"
            ),
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center" } },
              React.createElement("span", {
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  marginRight: "12px"
                }
              }),
              "Professional Grading Services"
            ),
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center" } },
              React.createElement("span", {
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  marginRight: "12px"
                }
              }),
              "Gem Encyclopedia Access"
            )
          )
        )
      )
    )
  );
};

export default CleanApp;