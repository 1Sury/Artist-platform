// Replace entire file for simplicity
import Link from "next/link";
import { Music } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <nav className="bg-card shadow-sm border-b w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Artistly</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle /> {/* Add ThemeToggle here */}
            </div>
          </div>
        </div>
      </nav>
      <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-primary hover:underline">
        Return to Home
      </Link>
    </div>
  );
}