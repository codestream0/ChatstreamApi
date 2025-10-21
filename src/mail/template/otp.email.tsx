import React from "react"

interface OtpEmailProps {
  otp: string
}

export const OtpEmail: React.FC<OtpEmailProps> = ({ otp }) => {
  const containerStyle: React.CSSProperties = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    backgroundColor: "#0f172a",
    padding: "40px 20px",
    margin: 0,
  }

  const wrapperStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  }

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
    padding: "40px 30px 50px 30px",
    textAlign: "center",
    color: "#ffffff",
    position: "relative",
  }

  const headerDecorStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "200px",
    height: "200px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    alignItems: "center",
    // justifyContent: "center",
    // display: "flex",
    transform: "translate(50%, -50%)",
  }

  const logoStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
    position: "relative",
    zIndex: 1,
  }

  const logoImageStyle: React.CSSProperties = {
    width: "140px",
    height: "auto",
    marginTop: "45px",
    // margin: "0 auto 24px auto",
    // display: "block",
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: "300",
    margin: 0,
    opacity: 0.95,
    letterSpacing: "0.5px",
    position: "relative",
    zIndex: 1,
  }

  const contentStyle: React.CSSProperties = {
    padding: "45px 35px",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 16px 0",
    lineHeight: "1.3",
    letterSpacing: "-0.5px",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#475569",
    margin: "0 0 32px 0",
    lineHeight: "1.7",
    fontWeight: "400",
  }

  const otpBoxStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    border: "2px solid #0ea5e9",
    borderRadius: "12px",
    padding: "32px 24px",
    textAlign: "center",
    margin: "32px 0",
    boxShadow: "0 4px 15px rgba(6, 182, 212, 0.1)",
  }

  const otpLabelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0369a1",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    margin: "0 0 16px 0",
  }

  const otpCodeStyle: React.CSSProperties = {
    fontSize: "42px",
    fontWeight: "800",
    color: "#1e40af",
    letterSpacing: "10px",
    margin: "0",
    fontFamily: '"Courier New", monospace',
    wordSpacing: "8px",
  }

  const expiryStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#dc2626",
    fontWeight: "600",
    margin: "20px 0 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  }

  const noteStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#334155",
    margin: "32px 0 0 0",
    lineHeight: "1.8",
    backgroundColor: "#fef3c7",
    border: "1px solid #fcd34d",
    borderRadius: "8px",
    padding: "16px",
    borderLeft: "4px solid #f59e0b",
  }

  const noteTextStyle: React.CSSProperties = {
    margin: 0,
  }

  const footerStyle: React.CSSProperties = {
    backgroundColor: "#f8fafc",
    padding: "28px 35px",
    borderTop: "2px solid #e2e8f0",
    textAlign: "center",
  }

  const dividerStyle: React.CSSProperties = {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #cbd5e1, transparent)",
    margin: "24px 0",
  }

  const footerTextStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#64748b",
    margin: "0",
    lineHeight: "1.7",
    fontWeight: "400",
  }

  const footerLinkStyle: React.CSSProperties = {
    color: "#0ea5e9",
    textDecoration: "none",
    fontWeight: "600",
  }

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={headerDecorStyle}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chatstream-logo-yfSdwCiE4tq8xvtPwUTxBghk64tiNd.png"
            alt="Chatstream Logo"
            style={logoImageStyle}
          />
          </div>
          <h1 style={logoStyle}>🔐 Secure Verification</h1>
          <p style={subtitleStyle}>One-Time Password Authentication</p>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <h2 style={titleStyle}>Your Verification Code</h2>
          <p style={descriptionStyle}>
            We've sent you a secure one-time password to verify your identity. This code is valid for 5 minutes.
          </p>

          {/* OTP Box */}
          <div style={otpBoxStyle}>
            <p style={otpLabelStyle}>Enter This Code</p>
            <p style={otpCodeStyle}>{otp}</p>
            <p style={expiryStyle}>⏱️ Expires in 5 minutes</p>
          </div>

          <div style={noteStyle}>
            <p style={noteTextStyle}>
              <strong>🛡️ Security Notice:</strong> Never share this code with anyone. Our team will never ask for your
              OTP via email, phone, or message.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <div style={dividerStyle}></div>
          <p style={footerTextStyle}>
            If you didn't request this code, please <span style={footerLinkStyle}>contact support</span> immediately or
            ignore this email.
          </p>
          <p style={footerTextStyle} >
            <p style={{ marginTop: "12px", fontSize: "12px", color: "#94a3b8" }}>
            © 2025 Your Company. All rights reserved.
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}
