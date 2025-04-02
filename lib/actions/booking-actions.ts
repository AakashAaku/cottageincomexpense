"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import { BookingStatus, PaymentStatus, RoomStatus } from "@prisma/client"

// Get all bookings
export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        guest: true,
        room: {
          include: {
            roomType: true,
          },
        },
        cottage: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return { bookings }
  } catch (error) {
    return { error: "Failed to fetch bookings" }
  }
}

// Get booking by ID
export async function getBookingById(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        guest: true,
        room: {
          include: {
            roomType: true,
          },
        },
        cottage: true,
      },
    })
    return { booking }
  } catch (error) {
    return { error: "Failed to fetch booking" }
  }
}

// Create a new booking
export async function createBooking(data: {
  guestId: string
  roomId?: string
  cottageId?: string
  checkInDate: Date
  checkOutDate: Date
  adults: number
  children: number
  totalAmount: number
  paymentMethod?: string
  paymentStatus?: PaymentStatus
  specialRequests?: string
}) {
  try {
    // Validate that either roomId or cottageId is provided
    if (!data.roomId && !data.cottageId) {
      return { error: "Either a room or cottage must be selected" }
    }

    // Check if the room/cottage is available for the selected dates
    if (data.roomId) {
      const room = await prisma.room.findUnique({
        where: { id: data.roomId },
      })

      if (!room || room.status !== RoomStatus.AVAILABLE) {
        return { error: "Selected room is not available" }
      }

      // Check for overlapping bookings
      const overlappingBookings = await prisma.booking.findMany({
        where: {
          roomId: data.roomId,
          bookingStatus: {
            in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
          },
          OR: [
            {
              // New booking starts during an existing booking
              checkInDate: {
                lte: data.checkOutDate,
              },
              checkOutDate: {
                gte: data.checkInDate,
              },
            },
          ],
        },
      })

      if (overlappingBookings.length > 0) {
        return { error: "Room is already booked for the selected dates" }
      }
    }

    if (data.cottageId) {
      const cottage = await prisma.cottage.findUnique({
        where: { id: data.cottageId },
      })

      if (!cottage || cottage.status !== "AVAILABLE") {
        return { error: "Selected cottage is not available" }
      }

      // Check for overlapping bookings
      const overlappingBookings = await prisma.booking.findMany({
        where: {
          cottageId: data.cottageId,
          bookingStatus: {
            in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
          },
          OR: [
            {
              // New booking starts during an existing booking
              checkInDate: {
                lte: data.checkOutDate,
              },
              checkOutDate: {
                gte: data.checkInDate,
              },
            },
          ],
        },
      })

      if (overlappingBookings.length > 0) {
        return { error: "Cottage is already booked for the selected dates" }
      }
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        ...data,
        bookingStatus: BookingStatus.CONFIRMED,
        paymentStatus: data.paymentStatus || PaymentStatus.PENDING,
      },
    })

    // Update room/cottage status if needed
    if (data.roomId) {
      await prisma.room.update({
        where: { id: data.roomId },
        data: { status: RoomStatus.OCCUPIED },
      })
    }

    if (data.cottageId) {
      await prisma.cottage.update({
        where: { id: data.cottageId },
        data: { status: "OCCUPIED" },
      })
    }

    revalidatePath("/reception/bookings")
    return { booking }
  } catch (error) {
    return { error: "Failed to create booking" }
  }
}

// Update a booking
export async function updateBooking(
  id: string,
  data: {
    checkInDate?: Date
    checkOutDate?: Date
    adults?: number
    children?: number
    totalAmount?: number
    paymentMethod?: string
    paymentStatus?: PaymentStatus
    bookingStatus?: BookingStatus
    specialRequests?: string
  },
) {
  try {
    const currentBooking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        cottage: true,
      },
    })

    if (!currentBooking) {
      return { error: "Booking not found" }
    }

    // Handle status changes
    if (data.bookingStatus && data.bookingStatus !== currentBooking.bookingStatus) {
      // If checking in
      if (data.bookingStatus === BookingStatus.CHECKED_IN) {
        if (currentBooking.roomId) {
          await prisma.room.update({
            where: { id: currentBooking.roomId },
            data: { status: RoomStatus.OCCUPIED },
          })
        }
        if (currentBooking.cottageId) {
          await prisma.cottage.update({
            where: { id: currentBooking.cottageId },
            data: { status: "OCCUPIED" },
          })
        }
      }

      // If checking out or cancelling
      if (data.bookingStatus === BookingStatus.CHECKED_OUT || data.bookingStatus === BookingStatus.CANCELLED) {
        if (currentBooking.roomId) {
          await prisma.room.update({
            where: { id: currentBooking.roomId },
            data: { status: RoomStatus.AVAILABLE },
          })
        }
        if (currentBooking.cottageId) {
          await prisma.cottage.update({
            where: { id: currentBooking.cottageId },
            data: { status: "AVAILABLE" },
          })
        }
      }
    }

    const booking = await prisma.booking.update({
      where: { id },
      data,
    })

    revalidatePath("/reception/bookings")
    return { booking }
  } catch (error) {
    return { error: "Failed to update booking" }
  }
}

// Cancel a booking
export async function cancelBooking(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
        cottage: true,
      },
    })

    if (!booking) {
      return { error: "Booking not found" }
    }

    // Update booking status
    await prisma.booking.update({
      where: { id },
      data: { bookingStatus: BookingStatus.CANCELLED },
    })

    // Update room/cottage status
    if (booking.roomId) {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { status: RoomStatus.AVAILABLE },
      })
    }

    if (booking.cottageId) {
      await prisma.cottage.update({
        where: { id: booking.cottageId },
        data: { status: "AVAILABLE" },
      })
    }

    revalidatePath("/reception/bookings")
    return { success: true }
  } catch (error) {
    return { error: "Failed to cancel booking" }
  }
}

// Get today's check-ins
export async function getTodayCheckIns() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const checkIns = await prisma.booking.findMany({
      where: {
        checkInDate: {
          gte: today,
          lt: tomorrow,
        },
        bookingStatus: BookingStatus.CONFIRMED,
      },
      include: {
        guest: true,
        room: {
          include: {
            roomType: true,
          },
        },
        cottage: true,
      },
      orderBy: {
        checkInDate: "asc",
      },
    })

    return { checkIns }
  } catch (error) {
    return { error: "Failed to fetch today's check-ins" }
  }
}

// Get today's check-outs
export async function getTodayCheckOuts() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const checkOuts = await prisma.booking.findMany({
      where: {
        checkOutDate: {
          gte: today,
          lt: tomorrow,
        },
        bookingStatus: BookingStatus.CHECKED_IN,
      },
      include: {
        guest: true,
        room: {
          include: {
            roomType: true,
          },
        },
        cottage: true,
      },
      orderBy: {
        checkOutDate: "asc",
      },
    })

    return { checkOuts }
  } catch (error) {
    return { error: "Failed to fetch today's check-outs" }
  }
}

// Get upcoming bookings (next 7 days)
export async function getUpcomingBookings() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const upcomingBookings = await prisma.booking.findMany({
      where: {
        checkInDate: {
          gte: today,
          lt: nextWeek,
        },
        bookingStatus: BookingStatus.CONFIRMED,
      },
      include: {
        guest: true,
        room: {
          include: {
            roomType: true,
          },
        },
        cottage: true,
      },
      orderBy: {
        checkInDate: "asc",
      },
    })

    return { upcomingBookings }
  } catch (error) {
    return { error: "Failed to fetch upcoming bookings" }
  }
}

