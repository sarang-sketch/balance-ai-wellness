import './globals.css';

export default function DebugLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Debug BalanceAI</title>
      </head>
      <body>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Debug Mode - BalanceAI</h1>
          <p>This is a minimal layout for troubleshooting.</p>
          <hr />
          {children}
        </div>
      </body>
    </html>
  );
}