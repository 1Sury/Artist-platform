"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || user.role !== "manager") {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [user, router, pathname]);

  if (!user || user.role !== "manager") {
    return null;
  }

  return <>{children}</>;
}