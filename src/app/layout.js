import localFont from "next/font/local";
import "./globals.css";

const albertSans = localFont({
  src: "./fonts/AlbertSansVF.ttf",
  variable: "--font-albert-sans",
  weight: "400 500 600",
});

export const metadata = {
  title: "Reference8 - Photo reference tool",
  description: "Web-based photo reference tool for artists and creatives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
