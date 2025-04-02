import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function ReceptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-64 shrink-0">
        <DashboardSidebar role="reception" />
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}

