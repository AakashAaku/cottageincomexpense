"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Hotel,
  LayoutDashboard,
  Bed,
  Home,
  Users,
  CreditCard,
  Utensils,
  FileText,
  LogOut,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "admin" | "reception"
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/rooms", label: "Room Management", icon: Bed },
    { href: "/admin/cottages", label: "Cottage Management", icon: Home },
    { href: "/admin/kitchen", label: "Kitchen Management", icon: Utensils },
    { href: "/admin/expenses", label: "Expenses & Income", icon: CreditCard },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const receptionLinks = [
    { href: "/reception/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/reception/bookings", label: "Bookings", icon: Bed },
    { href: "/reception/guests", label: "Guests", icon: Users },
    { href: "/reception/kitchen", label: "Kitchen", icon: Utensils },
    { href: "/reception/expenses", label: "Expenses", icon: CreditCard },
  ]

  const links = role === "admin" ? adminLinks : receptionLinks

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <Link href={role === "admin" ? "/admin/dashboard" : "/reception/dashboard"} className="flex items-center gap-2">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HMS</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 mt-auto">
        <Link href="/login">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  )
}

