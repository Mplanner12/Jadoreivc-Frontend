// RootLayout.tsx
import ServerLayout from "./serverLayout";
import ClientLayout from "./clientLayout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <PayPalScriptProvider options={initialOptions}>
    <ServerLayout>
      <ClientLayout>{children}</ClientLayout>
    </ServerLayout>
    // </PayPalScriptProvider>
  );
}
