// RootLayout.tsx
import ServerLayout from "./serverLayout";
import ClientLayout from "./clientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServerLayout>
      <ClientLayout>{children}</ClientLayout>
    </ServerLayout>
  );
}
