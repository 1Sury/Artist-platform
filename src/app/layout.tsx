import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artistly",
  description: "Connect with talented performing artists for your events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ApplicationProvider>
              {children}
              <Toaster />
            </ApplicationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}