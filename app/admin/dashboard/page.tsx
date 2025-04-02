import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Home, Utensils, Users, TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="admin" title="Admin Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">18 available, 6 occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Cottages</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 available, 4 occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">10 rooms, 8 cottages</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Kitchen Status</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">3 staff on duty</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="income">
          <TabsList>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Overview</CardTitle>
                <CardDescription>Monthly income breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Room Bookings</p>
                      <p className="text-2xl font-bold">$12,450</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Cottage Bookings</p>
                      <p className="text-2xl font-bold">$8,320</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Kitchen & Restaurant</p>
                      <p className="text-2xl font-bold">$5,680</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Overview</CardTitle>
                <CardDescription>Monthly expense breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Maintenance</p>
                      <p className="text-2xl font-bold">$3,250</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm">+5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Utilities</p>
                      <p className="text-2xl font-bold">$2,180</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm">-3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Kitchen Supplies</p>
                      <p className="text-2xl font-bold">$4,320</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest 5 bookings in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bed className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Guest {i}</p>
                      <p className="text-xs text-muted-foreground">
                        Room {100 + i} • Check-in: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm font-medium">${Math.floor(Math.random() * 200) + 100}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
              <CardDescription>Current room and cottage status</CardDescription>
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
                <div>
                  <h4 className="text-sm font-medium mb-2">Cottages</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((cottage) => (
                      <div
                        key={cottage}
                        className={`text-xs rounded p-1 text-center ${
                          Math.random() > 0.3 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        C{cottage}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

