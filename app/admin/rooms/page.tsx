import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash } from "lucide-react"

// Mock data for room types
const roomTypes = [
  { id: 1, name: "Standard Single", category: "Standard", price: 89, status: "Available" },
  { id: 2, name: "Standard Double", category: "Standard", price: 109, status: "Available" },
  { id: 3, name: "Deluxe Single", category: "Deluxe", price: 129, status: "Available" },
  { id: 4, name: "Deluxe Double", category: "Deluxe", price: 149, status: "Available" },
  { id: 5, name: "Suite", category: "Suite", price: 199, status: "Available" },
  { id: 6, name: "Family Suite", category: "Suite", price: 249, status: "Available" },
]

// Mock data for rooms
const rooms = [
  { id: 101, type: "Standard Single", status: "Available" },
  { id: 102, type: "Standard Single", status: "Occupied" },
  { id: 103, type: "Standard Double", status: "Available" },
  { id: 104, type: "Standard Double", status: "Available" },
  { id: 105, type: "Standard Double", status: "Maintenance" },
  { id: 201, type: "Deluxe Single", status: "Available" },
  { id: 202, type: "Deluxe Single", status: "Occupied" },
  { id: 203, type: "Deluxe Double", status: "Available" },
  { id: 204, type: "Deluxe Double", status: "Available" },
  { id: 301, type: "Suite", status: "Occupied" },
  { id: 302, type: "Family Suite", status: "Available" },
]

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="admin" title="Room Management" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Rooms</h2>
          <div className="flex items-center gap-2">
            <AddRoomTypeDialog />
            <AddRoomDialog />
          </div>
        </div>

        <Tabs defaultValue="rooms">
          <TabsList>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="types">Room Types</TabsTrigger>
          </TabsList>
          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Rooms</CardTitle>
                <CardDescription>Manage all rooms in the hotel</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.id}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              room.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : room.status === "Occupied"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {room.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="types" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room Types</CardTitle>
                <CardDescription>Manage room types and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomTypes.map((type) => (
                      <TableRow key={type.id}>
                        <TableCell className="font-medium">{type.name}</TableCell>
                        <TableCell>{type.category}</TableCell>
                        <TableCell>${type.price}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              type.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {type.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function AddRoomTypeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Room Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Room Type</DialogTitle>
          <DialogDescription>Create a new room type with pricing and details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g. Deluxe Double" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price per Night ($)</Label>
            <Input id="price" type="number" placeholder="e.g. 149" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Brief description of the room type" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Room Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddRoomDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
          <DialogDescription>Add a new room to the hotel inventory.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="room-number">Room Number</Label>
            <Input id="room-number" placeholder="e.g. 101" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room-type">Room Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name.toLowerCase().replace(/\s+/g, "-")}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

