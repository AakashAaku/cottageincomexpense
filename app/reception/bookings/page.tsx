import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data for bookings
const bookings = [
  {
    id: "B001",
    guestName: "John Smith",
    roomNumber: 101,
    checkIn: "2023-06-15",
    checkOut: "2023-06-18",
    status: "Confirmed",
    totalAmount: 267,
  },
  {
    id: "B002",
    guestName: "Sarah Johnson",
    roomNumber: 203,
    checkIn: "2023-06-16",
    checkOut: "2023-06-20",
    status: "Checked In",
    totalAmount: 596,
  },
  {
    id: "B003",
    guestName: "Michael Brown",
    roomNumber: 302,
    checkIn: "2023-06-18",
    checkOut: "2023-06-19",
    status: "Confirmed",
    totalAmount: 249,
  },
  {
    id: "B004",
    guestName: "Emily Davis",
    roomNumber: 105,
    checkIn: "2023-06-20",
    checkOut: "2023-06-25",
    status: "Confirmed",
    totalAmount: 545,
  },
  {
    id: "B005",
    guestName: "Robert Wilson",
    roomNumber: 204,
    checkIn: "2023-06-14",
    checkOut: "2023-06-16",
    status: "Checked Out",
    totalAmount: 298,
  },
  {
    id: "B006",
    guestName: "Jennifer Taylor",
    roomNumber: 301,
    checkIn: "2023-06-17",
    checkOut: "2023-06-22",
    status: "Checked In",
    totalAmount: 995,
  },
  {
    id: "B007",
    guestName: "David Miller",
    roomNumber: 102,
    checkIn: "2023-06-19",
    checkOut: "2023-06-21",
    status: "Confirmed",
    totalAmount: 218,
  },
]

export default function BookingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="reception" title="Bookings" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">All Bookings</h2>
          <Link href="/reception/bookings/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>Manage all guest bookings</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search bookings..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.roomNumber}</TableCell>
                    <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : booking.status === "Checked In"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>${booking.totalAmount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        {booking.status === "Confirmed" && (
                          <Button size="icon" variant="ghost">
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Check In</span>
                          </Button>
                        )}
                        {booking.status === "Checked In" && (
                          <Button size="icon" variant="ghost">
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Check Out</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

