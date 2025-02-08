import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider></Provider>
        {children}
      </body>
    </html>
  );
}
