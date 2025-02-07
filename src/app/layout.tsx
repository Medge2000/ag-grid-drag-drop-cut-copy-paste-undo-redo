import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_PROCORE_AG_GRID_LICENSE || "");

// Add this script to prevent theme flash
const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })()
`;

export const metadata: Metadata = {
  title: "EtMoPortfolio",
  description: "EtMoPortfolio",
  icons: {
    icon: "/favicon.ico?v=1", // Force cache refresh
  },
};

// Move the viewport setting into its own export
export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-grow flex-col min-h-screen bg-white dark:bg-gradient-to-br from-gray-900 to-gray-950">
        <ThemeProvider>
          <main className="flex flex-grow p-8 flex-col items-center">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
