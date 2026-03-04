import { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";



export const metadata: Metadata = {
  title: "QuickBasket | Fast Grocery Delivery with Live Tracking & AI Chat",
  description:
    "Order groceries online with QuickBasket. A modern quick-commerce platform built using Next.js, offering real-time map tracking, AI chat support, and lightning-fast delivery.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-br from-indigo-200 via-blue-100 to-cyan-200">
        <Provider>
          <StoreProvider>
            <InitUser/>
            {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
