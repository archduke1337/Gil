import * as React from "react";
import * as ReactDOM from "react-dom/client";

const MinimalApp = () => {
  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      backgroundColor: "white",
      padding: "32px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }
  }, [
    React.createElement("div", {
      key: "container",
      style: { maxWidth: "1024px", margin: "0 auto" }
    }, [
      React.createElement("div", {
        key: "header",
        style: { textAlign: "center", marginBottom: "32px" }
      }, [
        React.createElement("img", {
          key: "logo",
          src: "/attached_assets/1000119055-removebg-preview.png",
          alt: "GIL Logo",
          style: { height: "96px", margin: "0 auto 16px", display: "block" }
        }),
        React.createElement("h1", {
          key: "title",
          style: {
            fontSize: "36px",
            fontWeight: "bold",
            color: "#111827",
            margin: "0 0 16px 0"
          }
        }, "GIL Diamond Certificate Verification"),
        React.createElement("p", {
          key: "subtitle",
          style: {
            fontSize: "20px",
            color: "#6b7280",
            margin: "0 0 32px 0"
          }
        }, "Professional Diamond Authentication & Gemological Services")
      ]),
      React.createElement("div", {
        key: "content",
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "32px"
        }
      }, [
        React.createElement("div", {
          key: "verify-card",
          style: {
            backgroundColor: "#eff6ff",
            padding: "24px",
            borderRadius: "8px"
          }
        }, [
          React.createElement("h2", {
            key: "verify-title",
            style: {
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 16px 0"
            }
          }, "Verify Certificate"),
          React.createElement("p", {
            key: "verify-text",
            style: {
              color: "#374151",
              margin: "0 0 16px 0"
            }
          }, "Enter your diamond certificate number to verify authenticity and view detailed grading information."),
          React.createElement("input", {
            key: "verify-input",
            type: "text",
            placeholder: "Enter certificate number",
            style: {
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "16px",
              boxSizing: "border-box"
            }
          }),
          React.createElement("button", {
            key: "verify-button",
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
          }, "Verify Certificate")
        ]),
        React.createElement("div", {
          key: "services-card",
          style: {
            backgroundColor: "#f9fafb",
            padding: "24px",
            borderRadius: "8px"
          }
        }, [
          React.createElement("h2", {
            key: "services-title",
            style: {
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 16px 0"
            }
          }, "Our Services"),
          React.createElement("div", {
            key: "services-list",
            style: { display: "flex", flexDirection: "column", gap: "12px" }
          }, [
            "Diamond Certificate Verification",
            "Gemstone Authentication", 
            "Professional Grading Services",
            "Gem Encyclopedia Access"
          ].map((service, index) => 
            React.createElement("div", {
              key: `service-${index}`,
              style: { display: "flex", alignItems: "center" }
            }, [
              React.createElement("span", {
                key: "dot",
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  marginRight: "12px"
                }
              }),
              service
            ])
          ))
        ])
      ])
    ])
  ]);
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(MinimalApp));
}