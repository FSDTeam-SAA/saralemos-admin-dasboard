"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, UploadCloud, Users, Gift, Settings, LogOut } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { label: "Dashboard Overview", href: "/", icon: Grid },
  { label: "Update Hero Section", href: "/UpdateHero", icon: UploadCloud },
  { label: "User Management", href: "/Usermanagement", icon: Users },
  { label: "Subscriptions & Promo", href: "/subscription", icon: Gift },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-background">
      <div className="p-6 flex items-center justify-center gap-2">
        <Link href={'/'}>
        
        <Image src={'/images/logo.svg'} alt="logo" width={130} height={130} className=" object-cover" />
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
                  ? "bg-green-100 text-green-600 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-4">
        <button className="flex items-center gap-3 px-4 py-2 text-destructive hover:text-destructive/80 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
