import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Zenith Physiotherapy",
  description: "Physiotherapy services for your well-being",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
