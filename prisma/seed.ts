import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seeding...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@hotel.com" },
    update: {},
    create: {
      email: "admin@hotel.com",
      name: "Admin User",
      password: adminPassword,
      role: Role.ADMIN,
    },
  })
  console.log("Created admin user:", admin.email)

  // Create reception user
  const receptionPassword = await bcrypt.hash("reception123", 10)
  const reception = await prisma.user.upsert({
    where: { email: "reception@hotel.com" },
    update: {},
    create: {
      email: "reception@hotel.com",
      name: "Reception User",
      password: receptionPassword,
      role: Role.RECEPTION,
    },
  })
  console.log("Created reception user:", reception.email)

  // Create room types
  const standardSingle = await prisma.roomType.upsert({
    where: { id: "clrt1" },
    update: {},
    create: {
      id: "clrt1",
      name: "Standard Single",
      category: "Standard",
      price: 89,
      description: "A comfortable single room with all basic amenities",
    },
  })

  const standardDouble = await prisma.roomType.upsert({
    where: { id: "clrt2" },
    update: {},
    create: {
      id: "clrt2",
      name: "Standard Double",
      category: "Standard",
      price: 109,
      description: "A comfortable double room with all basic amenities",
    },
  })

  const deluxeSingle = await prisma.roomType.upsert({
    where: { id: "clrt3" },
    update: {},
    create: {
      id: "clrt3",
      name: "Deluxe Single",
      category: "Deluxe",
      price: 129,
      description: "A luxurious single room with premium amenities",
    },
  })

  const deluxeDouble = await prisma.roomType.upsert({
    where: { id: "clrt4" },
    update: {},
    create: {
      id: "clrt4",
      name: "Deluxe Double",
      category: "Deluxe",
      price: 149,
      description: "A luxurious double room with premium amenities",
    },
  })

  const suite = await prisma.roomType.upsert({
    where: { id: "clrt5" },
    update: {},
    create: {
      id: "clrt5",
      name: "Suite",
      category: "Suite",
      price: 199,
      description: "A spacious suite with separate living area",
    },
  })

  const familySuite = await prisma.roomType.upsert({
    where: { id: "clrt6" },
    update: {},
    create: {
      id: "clrt6",
      name: "Family Suite",
      category: "Suite",
      price: 249,
      description: "A large suite perfect for families",
    },
  })

  console.log("Created room types")

  // Create rooms
  const roomTypes = [standardSingle, standardDouble, deluxeSingle, deluxeDouble, suite, familySuite]
  const roomNumbers = [
    // Standard Singles
    { number: 101, typeId: standardSingle.id },
    { number: 102, typeId: standardSingle.id },
    // Standard Doubles
    { number: 103, typeId: standardDouble.id },
    { number: 104, typeId: standardDouble.id },
    { number: 105, typeId: standardDouble.id },
    // Deluxe Singles
    { number: 201, typeId: deluxeSingle.id },
    { number: 202, typeId: deluxeSingle.id },
    // Deluxe Doubles
    { number: 203, typeId: deluxeDouble.id },
    { number: 204, typeId: deluxeDouble.id },
    // Suites
    { number: 301, typeId: suite.id },
    { number: 302, typeId: familySuite.id },
  ]

  for (const room of roomNumbers) {
    await prisma.room.upsert({
      where: { roomNumber: room.number },
      update: {},
      create: {
        roomNumber: room.number,
        roomTypeId: room.typeId,
      },
    })
  }
  console.log("Created rooms")

  // Create cottages
  const cottages = [
    { number: 1, name: "Garden Cottage", price: 179 },
    { number: 2, name: "Lake View Cottage", price: 199 },
    { number: 3, name: "Mountain View Cottage", price: 219 },
    { number: 4, name: "Premium Cottage", price: 249 },
  ]

  for (const cottage of cottages) {
    await prisma.cottage.upsert({
      where: { cottageNumber: cottage.number },
      update: {},
      create: {
        cottageNumber: cottage.number,
        name: cottage.name,
        price: cottage.price,
        description: `A beautiful ${cottage.name.toLowerCase()} with scenic views`,
      },
    })
  }
  console.log("Created cottages")

  // Create expense categories
  const expenseCategories = [
    { name: "Maintenance", description: "Building and equipment maintenance" },
    { name: "Utilities", description: "Electricity, water, internet, etc." },
    { name: "Kitchen", description: "Food supplies and kitchen equipment" },
    { name: "Staff", description: "Staff-related expenses" },
    { name: "Marketing", description: "Advertising and promotions" },
  ]

  for (const category of expenseCategories) {
    await prisma.expenseCategory.upsert({
      where: { id: `ec-${category.name.toLowerCase()}` },
      update: {},
      create: {
        id: `ec-${category.name.toLowerCase()}`,
        name: category.name,
        description: category.description,
      },
    })
  }
  console.log("Created expense categories")

  // Create income categories
  const incomeCategories = [
    { name: "Room Bookings", description: "Income from room bookings" },
    { name: "Cottage Bookings", description: "Income from cottage bookings" },
    { name: "Restaurant", description: "Food and beverage sales" },
    { name: "Events", description: "Conference and event bookings" },
    { name: "Other", description: "Miscellaneous income" },
  ]

  for (const category of incomeCategories) {
    await prisma.incomeCategory.upsert({
      where: { id: `ic-${category.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `ic-${category.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: category.name,
        description: category.description,
      },
    })
  }
  console.log("Created income categories")

  // Create kitchen items
  const kitchenItems = [
    { name: "Breakfast Buffet", price: 15, category: "Breakfast" },
    { name: "Continental Breakfast", price: 10, category: "Breakfast" },
    { name: "Lunch Buffet", price: 20, category: "Lunch" },
    { name: "Dinner Buffet", price: 25, category: "Dinner" },
    { name: "Pizza", price: 12, category: "Snacks" },
    { name: "Burger", price: 10, category: "Snacks" },
    { name: "Pasta", price: 14, category: "Dinner" },
    { name: "Salad", price: 8, category: "Lunch" },
    { name: "Soft Drink", price: 3, category: "Beverages" },
    { name: "Coffee", price: 4, category: "Beverages" },
    { name: "Beer", price: 6, category: "Alcoholic Beverages" },
    { name: "Wine (Glass)", price: 8, category: "Alcoholic Beverages" },
  ]

  for (const item of kitchenItems) {
    await prisma.kitchenItem.upsert({
      where: { id: `ki-${item.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `ki-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: item.name,
        price: item.price,
        category: item.category,
        description: `Delicious ${item.name.toLowerCase()}`,
      },
    })
  }
  console.log("Created kitchen items")

  console.log("Seeding completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

