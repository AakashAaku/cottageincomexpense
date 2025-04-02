"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

// Get all guests
export async function getGuests() {
  try {
    const guests = await prisma.guest.findMany({
      orderBy: {
        lastName: "asc",
      },
    })
    return { guests }
  } catch (error) {
    return { error: "Failed to fetch guests" }
  }
}

// Get guest by ID
export async function getGuestById(id: string) {
  try {
    const guest = await prisma.guest.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            room: {
              include: {
                roomType: true,
              },
            },
            cottage: true,
          },
          orderBy: {
            checkInDate: "desc",
          },
        },
      },
    })
    return { guest }
  } catch (error) {
    return { error: "Failed to fetch guest" }
  }
}

// Create a new guest
export async function createGuest(data: {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  idType?: string
  idNumber?: string
}) {
  try {
    const guest = await prisma.guest.create({
      data,
    })

    revalidatePath("/reception/guests")
    return { guest }
  } catch (error) {
    return { error: "Failed to create guest" }
  }
}

// Update a guest
export async function updateGuest(
  id: string,
  data: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    address?: string
    idType?: string
    idNumber?: string
  },
) {
  try {
    const guest = await prisma.guest.update({
      where: { id },
      data,
    })

    revalidatePath("/reception/guests")
    return { guest }
  } catch (error) {
    return { error: "Failed to update guest" }
  }
}

// Search guests
export async function searchGuests(query: string) {
  try {
    const guests = await prisma.guest.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        lastName: "asc",
      },
    })
    return { guests }
  } catch (error) {
    return { error: "Failed to search guests" }
  }
}

