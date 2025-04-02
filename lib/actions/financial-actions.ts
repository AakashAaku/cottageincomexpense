"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

// Get all expenses
export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        expenseCategory: true,
      },
      orderBy: {
        date: "desc",
      },
    })
    return { expenses }
  } catch (error) {
    return { error: "Failed to fetch expenses" }
  }
}

// Get all income
export async function getIncome() {
  try {
    const income = await prisma.income.findMany({
      include: {
        incomeCategory: true,
      },
      orderBy: {
        date: "desc",
      },
    })
    return { income }
  } catch (error) {
    return { error: "Failed to fetch income" }
  }
}

// Create a new expense
export async function createExpense(data: {
  expenseCategoryId: string
  amount: number
  description?: string
  date: Date
}) {
  try {
    const expense = await prisma.expense.create({
      data,
    })

    revalidatePath("/admin/expenses")
    return { expense }
  } catch (error) {
    return { error: "Failed to create expense" }
  }
}

// Create a new income
export async function createIncome(data: {
  incomeCategoryId: string
  amount: number
  description?: string
  date: Date
}) {
  try {
    const income = await prisma.income.create({
      data,
    })

    revalidatePath("/admin/expenses")
    return { income }
  } catch (error) {
    return { error: "Failed to create income" }
  }
}

// Get expense categories
export async function getExpenseCategories() {
  try {
    const categories = await prisma.expenseCategory.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return { categories }
  } catch (error) {
    return { error: "Failed to fetch expense categories" }
  }
}

// Get income categories
export async function getIncomeCategories() {
  try {
    const categories = await prisma.incomeCategory.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return { categories }
  } catch (error) {
    return { error: "Failed to fetch income categories" }
  }
}

// Create expense category
export async function createExpenseCategory(data: {
  name: string
  description?: string
}) {
  try {
    const category = await prisma.expenseCategory.create({
      data,
    })

    revalidatePath("/admin/expenses")
    return { category }
  } catch (error) {
    return { error: "Failed to create expense category" }
  }
}

// Create income category
export async function createIncomeCategory(data: {
  name: string
  description?: string
}) {
  try {
    const category = await prisma.incomeCategory.create({
      data,
    })

    revalidatePath("/admin/expenses")
    return { category }
  } catch (error) {
    return { error: "Failed to create income category" }
  }
}

// Get financial summary
export async function getFinancialSummary(period: "month" | "year" = "month") {
  try {
    const today = new Date()
    let startDate: Date

    if (period === "month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    } else {
      startDate = new Date(today.getFullYear(), 0, 1)
    }

    // Get total income
    const income = await prisma.income.aggregate({
      where: {
        date: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get total expenses
    const expenses = await prisma.expense.aggregate({
      where: {
        date: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get income by category
    const incomeByCategory = await prisma.income.groupBy({
      by: ["incomeCategoryId"],
      where: {
        date: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get expense by category
    const expenseByCategory = await prisma.expense.groupBy({
      by: ["expenseCategoryId"],
      where: {
        date: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get category details
    const incomeCategories = await prisma.incomeCategory.findMany({
      where: {
        id: {
          in: incomeByCategory.map((item) => item.incomeCategoryId),
        },
      },
    })

    const expenseCategories = await prisma.expenseCategory.findMany({
      where: {
        id: {
          in: expenseByCategory.map((item) => item.expenseCategoryId),
        },
      },
    })

    // Calculate net profit
    const totalIncome = income._sum.amount || 0
    const totalExpenses = expenses._sum.amount || 0
    const netProfit = totalIncome - totalExpenses

    // Format category data
    const incomeData = incomeByCategory.map((item) => {
      const category = incomeCategories.find((cat) => cat.id === item.incomeCategoryId)
      return {
        category: category?.name || "Unknown",
        amount: item._sum.amount || 0,
      }
    })

    const expenseData = expenseByCategory.map((item) => {
      const category = expenseCategories.find((cat) => cat.id === item.expenseCategoryId)
      return {
        category: category?.name || "Unknown",
        amount: item._sum.amount || 0,
      }
    })

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      incomeData,
      expenseData,
      period,
    }
  } catch (error) {
    return { error: "Failed to fetch financial summary" }
  }
}

