export const metadata = {
  title: "Pantry Chef",
  description: "AI-powered recipe recommendation engine"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui', background: '#f8fafc', margin: 0 }}>
        <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
          <h1>Pantry Chef 🍳</h1>
          {children}
        </main>
      </body>
    </html>
  );
}