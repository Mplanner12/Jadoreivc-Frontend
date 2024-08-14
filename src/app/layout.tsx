// RootLayout.tsx
import ServerLayout from "./serverLayout";
import ClientLayout from "./clientLayout";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <ServerLayout>
      <ClientLayout>{children}</ClientLayout>
    </ServerLayout>
    // </Suspense>
  );
}
