"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for available rooms
const availableRooms = [
  { id: 101, type: "Standard Single", price: 89 },
  { id: 103, type: "Standard Double", price: 109 },
  { id: 104, type: "Standard Double", price: 109 },
  { id: 201, type: "Deluxe Single", price: 129 },
  { id: 203, type: "Deluxe Double", price: 149 },
  { id: 204, type: "Deluxe Double", price: 149 },
  { id: 302, type: "Family Suite", price: 249 },
]

export default function NewBookingPage() {
  const router = useRouter()
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date())
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  )
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [adults, setAdults] = useState<string>("1")
  const [children, setChildren] = useState<string>("0")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would submit the booking data to your backend
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/reception/bookings")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="reception" title="New Booking" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <Link
            href="/reception/bookings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Bookings</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
                <CardDescription>Enter the guest's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Smith" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.smith@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-type">ID Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers-license">Driver's License</SelectItem>
                      <SelectItem value="national-id">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input id="id-number" placeholder="ID Number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Select room and dates for the booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date) => date < (checkInDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRooms.map((room) => (
                        <SelectItem key={room.id} value={room.id.toString()}>
                          Room {room.id} - {room.type} (${room.price}/night)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Select value={adults} onValueChange={setAdults}>
                      <SelectTrigger>
                        <SelectValue placeholder="Adults" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Select value={children} onValueChange={setChildren}>
                      <SelectTrigger>
                        <SelectValue placeholder="Children" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Input id="special-requests" placeholder="Any special requests or requirements" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter payment details or select payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Room Rate:</span>
                    <span>$109 per night</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Nights:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees (12%):</span>
                    <span>$39.24</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>$366.24</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/reception/bookings")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Booking..." : "Create Booking"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
}

