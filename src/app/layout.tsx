import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/lib/SessionProvider";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "sonner";
import { NavbarWrapper } from "@/components/custom/NavbarWrapper";

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
          <footer>
            <p className="flex items-center justify-center px-4 py-2 shadow-md">
              &copy; Developed by Cumstein
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
