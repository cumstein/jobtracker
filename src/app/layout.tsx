import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/lib/SessionProvider";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "sonner";
import { NavbarWrapper } from "@/components/custom/NavbarWrapper";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobTracker",
  description: "Track your Jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            <NavbarWrapper>
              <Navbar />
            </NavbarWrapper>
            <main className="flex flex-col justify-between min-h-screen">
              <div className="w-full mx-auto max-w-3xl px-4 mt-20">
                {children}
                <Toaster richColors position="bottom-center" />
              </div>
            </main>
          </AuthSessionProvider>
          <footer className="mt-20 border-t pt-6 pb-8 text-center text-sm text-muted-foreground">
            <p>
              Designed & developed with love by{" "}
              <span className="font-semibold">Cumstein</span>
            </p>
            <div className="mt-2 flex justify-center gap-4 text-xl">
              <a
                href="https://github.com/cumstein"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/kamyab-hosseinzadeh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
            <p className="mt-2 text-xs">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
