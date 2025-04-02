import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hotel } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hotel className="h-6 w-6" />
          <h1 className="text-xl font-bold">Hotel Management System</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">Streamline Your Hotel Operations</h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive solution for managing rooms, bookings, expenses, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl w-full">
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">Room Management</h3>
            <p>Efficiently manage room types, pricing, and availability.</p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">Booking System</h3>
            <p>Streamline check-ins, check-outs, and guest management.</p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">Financial Tracking</h3>
            <p>Monitor expenses and income with detailed reporting.</p>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hotel Management System. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

