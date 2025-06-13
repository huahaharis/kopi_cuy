'use client'
import "@/app/globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from "@/component/header/header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 h-screen">
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}