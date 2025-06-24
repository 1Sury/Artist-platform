import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ApplicationProvider>
            {children}
            <Toaster />
          </ApplicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}