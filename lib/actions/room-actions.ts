"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { RoomStatus } from "@prisma/client"

// Get all rooms
export async function getRooms() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomType: true,
      },
      orderBy: {
        roomNumber: "asc",
      },
    })
    return { rooms }
  } catch (error) {
    return { error: "Failed to fetch rooms" }
  }
}

// Get room by ID
export async function getRoomById(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        roomType: true,
      },
    })
    return { room }
  } catch (error) {
    return { error: "Failed to fetch room" }
  }
}

// Create a new room
export async function createRoom(roomNumber: number, roomTypeId: string, status: RoomStatus = RoomStatus.AVAILABLE) {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: { roomNumber },
    })

    if (existingRoom) {
      return { error: "Room number already exists" }
    }

    const room = await prisma.room.create({
      data: {
        roomNumber,
        roomTypeId,
        status,
      },
    })

    revalidatePath("/admin/rooms")
    return { room }
  } catch (error) {
    return { error: "Failed to create room" }
  }
}

// Update a room
export async function updateRoom(
  id: string,
  data: {
    roomNumber?: number
    roomTypeId?: string
    status?: RoomStatus
  },
) {
  try {
    if (data.roomNumber) {
      const existingRoom = await prisma.room.findFirst({
        where: {
          roomNumber: data.roomNumber,
          id: { not: id },
        },
      })

      if (existingRoom) {
        return { error: "Room number already exists" }
      }
    }

    const room = await prisma.room.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/rooms")
    return { room }
  } catch (error) {
    return { error: "Failed to update room" }
  }
}

// Delete a room
export async function deleteRoom(id: string) {
  try {
    // Check if room has any bookings
    const bookings = await prisma.booking.findMany({
      where: { roomId: id },
    })

    if (bookings.length > 0) {
      return { error: "Cannot delete room with existing bookings" }
    }

    await prisma.room.delete({
      where: { id },
    })

    revalidatePath("/admin/rooms")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete room" }
  }
}

// Get all room types
export async function getRoomTypes() {
  try {
    const roomTypes = await prisma.roomType.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return { roomTypes }
  } catch (error) {
    return { error: "Failed to fetch room types" }
  }
}

// Create a new room type
export async function createRoomType(name: string, category: string, price: number, description?: string) {
  try {
    const roomType = await prisma.roomType.create({
      data: {
        name,
        category,
        price,
        description,
      },
    })

    revalidatePath("/admin/rooms")
    return { roomType }
  } catch (error) {
    return { error: "Failed to create room type" }
  }
}

// Update a room type
export async function updateRoomType(
  id: string,
  data: {
    name?: string
    category?: string
    price?: number
    description?: string
    status?: string
  },
) {
  try {
    const roomType = await prisma.roomType.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/rooms")
    return { roomType }
  } catch (error) {
    return { error: "Failed to update room type" }
  }
}

// Delete a room type
export async function deleteRoomType(id: string) {
  try {
    // Check if any rooms are using this room type
    const rooms = await prisma.room.findMany({
      where: { roomTypeId: id },
    })

    if (rooms.length > 0) {
      return { error: "Cannot delete room type that is in use" }
    }

    await prisma.roomType.delete({
      where: { id },
    })

    revalidatePath("/admin/rooms")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete room type" }
  }
}

