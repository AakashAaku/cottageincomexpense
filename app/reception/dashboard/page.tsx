import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Home, Users, Plus, Calendar, Utensils, CreditCard } from "lucide-react"
import Link from "next/link"

export default function ReceptionDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="reception" title="Reception Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <Link href="/reception/bookings/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Booking
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">6 standard, 12 deluxe</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Cottages</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">4 standard, 4 premium</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 rooms, 2 cottages</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="checkouts">Check-outs</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Bookings</CardTitle>
                <CardDescription>Manage check-ins for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Guest Name {i}</p>
                        <p className="text-xs text-muted-foreground">Room {100 + i} • 2 Adults • 3 Nights</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Check In
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Bookings for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Future Guest {i}</p>
                        <p className="text-xs text-muted-foreground">
                          Cottage C{i} • Arriving: {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="checkouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Check-outs</CardTitle>
                <CardDescription>Guests checking out today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Departing Guest {i}</p>
                        <p className="text-xs text-muted-foreground">Room {200 + i} • 4 Nights • Balance: $0</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Check Out
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
              <CardDescription>Quick view of available rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Standard Rooms</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[101, 102, 103, 104, 105, 106, 107, 108, 109, 110].map((room) => (
                      <div
                        key={room}
                        className={`text-xs rounded p-1 text-center ${
                          Math.random() > 0.3 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Deluxe Rooms</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[201, 202, 203, 204, 205, 206, 207, 208].map((room) => (
                      <div
                        key={room}
                        className={`text-xs rounded p-1 text-center ${
                          Math.random() > 0.3 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common reception tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/reception/bookings/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                  </Button>
                </Link>
                <Link href="/reception/guests">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Guest List
                  </Button>
                </Link>
                <Link href="/reception/kitchen">
                  <Button variant="outline" className="w-full justify-start">
                    <Utensils className="mr-2 h-4 w-4" />
                    Kitchen Orders
                  </Button>
                </Link>
                <Link href="/reception/expenses">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Record Expense
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

