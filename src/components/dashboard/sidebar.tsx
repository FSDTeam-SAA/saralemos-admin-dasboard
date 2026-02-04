"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, UploadCloud, Users, Gift, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const menuItems = [
  { label: "Dashboard Overview", href: "/", icon: Grid },
  { label: "Update Hero Section", href: "/UpdateHero", icon: UploadCloud },
  { label: "User Management", href: "/Usermanagement", icon: Users },
  { label: "Subscriptions & Promo", href: "/subscription", icon: Gift },
  { label: "Settings", href: "/settings", icon: Settings },
];

import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Mobile menu button
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#65A30D] text-white rounded-full p-2 shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Grid className="w-6 h-6" />
      </button>

      {/* Sidebar for desktop and mobile */}
      <div
        className={`w-64 border-r border-border bg-background h-full fixed md:static top-0 left-0 z-40 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block`}
        style={{ minHeight: "100vh" }}
      >
        <div className="p-6 flex items-center justify-center gap-2">
          <Link href={"/"}>
            <Image
              src={"/images/logo.svg"}
              alt="logo"
              width={130}
              height={130}
              className=" object-cover"
            />
          </Link>
        </div>

        <nav className="px-4 py-8 space-y-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#F8F9FA] text-[#65A30D] font-medium"
                    : "text-primary/90 hover:text-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-4">
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="flex items-center gap-3 cursor-pointer bg-red-100 hover:bg-red-200 rounded-2xl px-4 py-2 text-destructive hover:text-destructive/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 bg-gray-200 rounded-full p-2"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <span className="text-lg">×</span>
        </button>
      </div>
      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
