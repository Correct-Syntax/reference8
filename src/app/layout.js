import localFont from "next/font/local";
import "./globals.css";

const albertSans = localFont({
  src: "./fonts/AlbertSansVF.ttf",
  variable: "--font-albert-sans",
  weight: "400 500 600",
});

export const metadata = {
  title: "Artist reference tool - Reference8",
  description: "",
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
