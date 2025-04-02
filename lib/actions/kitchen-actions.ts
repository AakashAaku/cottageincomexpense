"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
import type { KitchenOrderStatus } from "@prisma/client"

// Get all kitchen items
export async function getKitchenItems() {
  try {
    const items = await prisma.kitchenItem.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return { items }
  } catch (error) {
    return { error: "Failed to fetch kitchen items" }
  }
}

// Create a new kitchen item
export async function createKitchenItem(data: {
  name: string
  price: number
  category: string
  description?: string
  available?: boolean
}) {
  try {
    const item = await prisma.kitchenItem.create({
      data,
    })

    revalidatePath("/admin/kitchen")
    return { item }
  } catch (error) {
    return { error: "Failed to create kitchen item" }
  }
}

// Update a kitchen item
export async function updateKitchenItem(
  id: string,
  data: {
    name?: string
    price?: number
    category?: string
    description?: string
    available?: boolean
  },
) {
  try {
    const item = await prisma.kitchenItem.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/kitchen")
    return { item }
  } catch (error) {
    return { error: "Failed to update kitchen item" }
  }
}

// Get all kitchen orders
export async function getKitchenOrders() {
  try {
    const orders = await prisma.kitchenOrder.findMany({
      include: {
        items: {
          include: {
            kitchenItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return { orders }
  } catch (error) {
    return { error: "Failed to fetch kitchen orders" }
  }
}

// Create a new kitchen order
export async function createKitchenOrder(data: {
  roomNumber?: number
  cottageNumber?: number
  guestName?: string
  items: {
    kitchenItemId: string
    quantity: number
    price: number
  }[]
}) {
  try {
    // Calculate total amount
    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create order with items
    const order = await prisma.kitchenOrder.create({
      data: {
        roomNumber: data.roomNumber,
        cottageNumber: data.cottageNumber,
        guestName: data.guestName,
        totalAmount,
        items: {
          create: data.items.map((item) => ({
            kitchenItemId: item.kitchenItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            kitchenItem: true,
          },
        },
      },
    })

    revalidatePath("/reception/kitchen")
    return { order }
  } catch (error) {
    return { error: "Failed to create kitchen order" }
  }
}

// Update kitchen order status
export async function updateKitchenOrderStatus(id: string, status: KitchenOrderStatus) {
  try {
    const order = await prisma.kitchenOrder.update({
      where: { id },
      data: { status },
    })

    revalidatePath("/reception/kitchen")
    revalidatePath("/admin/kitchen")
    return { order }
  } catch (error) {
    return { error: "Failed to update order status" }
  }
}

