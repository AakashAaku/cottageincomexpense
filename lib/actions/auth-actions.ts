"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db"
import { Role } from "@prisma/client"

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Schema for user creation
const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([Role.ADMIN, Role.RECEPTION]),
})

// Login action
// export async function login(formData: FormData) {
  export const login = async (credentials: { email: string; password: string; role: string }) => {
  // const email = formData.get("email") as string
  // const password = formData.get("password") as string
  const { email, password, role } = credentials; // Destructure the passed object

  // Validate input
  const result = loginSchema.safeParse({ email, password })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  try {
    console.log("email for user============>>>",email);
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    console.log("user after user============>>>",user);

    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log("password match=============>",passwordMatch);
    if (!passwordMatch) {
      return { error: "Invalid email or password" }
    }

    // Set session cookie
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    ;(await cookies()).set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    // Redirect based on role
    if (user.role === Role.ADMIN) {
      redirect("/admin/dashboard")
    } else {
      redirect("/reception/dashboard")
    }
  } catch (error) {
    return { error: "An error occurred during login" }
  }
}

// Logout action
export async function logout() {
  (await cookies()).delete("session")
  redirect("/login")
}

// Create user action (for admin only)
export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as Role

  // Validate input
  const result = createUserSchema.safeParse({ name, email, password, role })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
  } catch (error) {
    return { error: "Failed to create user" }
  }
}

// Get current user from session
export async function getCurrentUser() {
  const sessionCookie = (await cookies()).get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      (await cookies()).delete("session")
      return null
    }

    // Get fresh user data
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return user
  } catch (error) {
    return null
  }
}

