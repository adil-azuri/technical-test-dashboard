// app/components/ProtectedRoute.tsx
"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "antd";
import { useAuth } from "@/app/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Saat loading screen ada, sementara status otentikasi diverifikasi
  if (loading || !user) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ minHeight: "100vh", fontSize: "20px" }}
      >
        <p>Verifying user authentication...</p>
      </Flex>
    );
  }

  return <>{children}</>;
};
