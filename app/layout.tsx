import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNowDisplay = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNowDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "NGQ Assets",
  description: "Control your financial future easily with NGQ Assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = true;

  if (isMaintenanceMode) {
    return (
      <html lang="en" className={`${helveticaNowDisplay.variable} h-full`}>
        <head>
          <style dangerouslySetInnerHTML={{ __html: `
            *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: var(--font-helvetica), system-ui, -apple-system, sans-serif;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #0a0a0f;
              background-image:
                radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 60, 200, 0.15), transparent),
                radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255, 60, 60, 0.08), transparent);
              color: #e4e4e7;
              -webkit-font-smoothing: antialiased;
              overflow: hidden;
            }
            .container {
              text-align: center;
              padding: 3rem 2rem;
              max-width: 520px;
              width: 100%;
              margin: 0 auto;
              position: relative;
            }
            .icon-wrap {
              width: 88px; height: 88px;
              margin: 0 auto 2rem;
              border-radius: 50%;
              background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.04));
              border: 1px solid rgba(239, 68, 68, 0.15);
              display: flex; align-items: center; justify-content: center;
              animation: pulse-ring 3s ease-in-out infinite;
            }
            @keyframes pulse-ring {
              0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.1); }
              50% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
            }
            .icon-wrap svg { width: 38px; height: 38px; color: #ef4444; }
            h1 {
              font-size: 1.75rem; font-weight: 800;
              letter-spacing: -0.03em;
              color: #fafafa;
              margin-bottom: 0.75rem;
              line-height: 1.2;
            }
            .subtitle {
              font-size: 0.95rem; color: #a1a1aa;
              line-height: 1.7; margin-bottom: 2.5rem;
              max-width: 420px; margin-left: auto; margin-right: auto;
            }
            .divider {
              width: 48px; height: 2px;
              background: linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent);
              margin: 0 auto 2rem;
              border-radius: 2px;
            }
            .status-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 16px;
              padding: 1.25rem 1.5rem;
              margin-bottom: 2rem;
              backdrop-filter: blur(12px);
            }
            .status-row {
              display: flex; justify-content: space-between; align-items: center;
              padding: 0.5rem 0;
            }
            .status-row + .status-row { border-top: 1px solid rgba(255,255,255,0.04); }
            .status-label { font-size: 0.8rem; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
            .status-value { font-size: 0.85rem; color: #d4d4d8; font-weight: 500; }
            .status-badge {
              display: inline-flex; align-items: center; gap: 6px;
              background: rgba(239, 68, 68, 0.1);
              color: #fca5a5; font-size: 0.78rem; font-weight: 600;
              padding: 4px 12px; border-radius: 100px;
              border: 1px solid rgba(239, 68, 68, 0.15);
            }
            .status-badge::before {
              content: ''; width: 6px; height: 6px;
              background: #ef4444; border-radius: 50%;
              animation: blink 1.5s ease-in-out infinite;
            }
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
            .footer-text {
              font-size: 0.78rem; color: #52525b;
              line-height: 1.6;
            }
            .err-code {
              display: inline-block; margin-top: 1.5rem;
              font-size: 0.7rem; font-weight: 600;
              color: #3f3f46; letter-spacing: 0.08em;
              background: rgba(255,255,255,0.03);
              padding: 8px 20px; border-radius: 8px;
              border: 1px solid rgba(255,255,255,0.04);
            }
          `}} />
        </head>
        <body>
          <div className="container">
            <div className="icon-wrap">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h1>Service Temporarily Suspended</h1>
            <p className="subtitle">
              This website has been taken offline due to an outstanding payment from the site owner. Services will be restored once the pending balance is cleared.
            </p>

            <div className="divider" />

            <div className="status-card">
              <div className="status-row">
                <span className="status-label">Status</span>
                <span className="status-badge">Payment Overdue</span>
              </div>
              <div className="status-row">
                <span className="status-label">Service</span>
                <span className="status-value">NGQ Assets Platform</span>
              </div>
              <div className="status-row">
                <span className="status-label">Action Required</span>
                <span className="status-value">Settle Outstanding Invoice</span>
              </div>
            </div>

            <p className="footer-text">
              If you are the site owner, please contact your developer to resolve this matter and restore services immediately.
            </p>

            <span className="err-code">ERR_CODE: 402_PAYMENT_REQUIRED</span>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${helveticaNowDisplay.variable} h-full`}>
      <body className="font-sans antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
