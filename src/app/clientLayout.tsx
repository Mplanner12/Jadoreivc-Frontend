// ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Suspense } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const authRoutes = ["/logIn", "/signUp"];
  const isAuthRoute = authRoutes.includes(pathname);

  return (
    <Suspense fallback={null}>
      <>
        {!isAuthRoute && <Header />}
        <main>{children}</main>
        {!isAuthRoute && <Footer />}
      </>
    </Suspense>
  );
}
