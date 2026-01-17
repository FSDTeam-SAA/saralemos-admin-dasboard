import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication Layout for Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-screen flex items-center justify-center bg-[#ECF3EC] overflow-hidden">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/login.jpg')",
        }}
      />

      {/* 🔹 Overlay (optional, readability better) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 🔹 Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
