import "./globals.css";

export const metadata = {
  title: "Zenith Physiotherapy",
  description: "Physiotherapy services for your well-being",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
