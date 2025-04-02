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
import { Plus, Pencil, Trash, TrendingUp, TrendingDown } from "lucide-react"

// Mock data for expenses
const expenses = [
  { id: 1, category: "Maintenance", description: "Plumbing repairs", amount: 350, date: "2023-06-10" },
  { id: 2, category: "Utilities", description: "Electricity bill", amount: 1200, date: "2023-06-05" },
  { id: 3, category: "Kitchen", description: "Food supplies", amount: 850, date: "2023-06-08" },
  { id: 4, category: "Maintenance", description: "HVAC service", amount: 420, date: "2023-06-12" },
  { id: 5, category: "Utilities", description: "Water bill", amount: 380, date: "2023-06-05" },
  { id: 6, category: "Kitchen", description: "New cookware", amount: 650, date: "2023-06-15" },
  { id: 7, category: "Staff", description: "Staff training", amount: 500, date: "2023-06-11" },
]

// Mock data for income
const income = [
  { id: 1, category: "Room Bookings", description: "Room 101 - John Smith", amount: 267, date: "2023-06-15" },
  { id: 2, category: "Room Bookings", description: "Room 203 - Sarah Johnson", amount: 596, date: "2023-06-16" },
  { id: 3, category: "Restaurant", description: "Restaurant sales", amount: 1250, date: "2023-06-14" },
  { id: 4, category: "Cottage Bookings", description: "Cottage C1 - David Miller", amount: 498, date: "2023-06-12" },
  { id: 5, category: "Room Bookings", description: "Room 302 - Michael Brown", amount: 249, date: "2023-06-18" },
  { id: 6, category: "Restaurant", description: "Bar sales", amount: 780, date: "2023-06-15" },
  { id: 7, category: "Events", description: "Conference room booking", amount: 1200, date: "2023-06-10" },
]

// Mock data for expense categories
const expenseCategories = [
  { id: 1, name: "Maintenance", description: "Building and equipment maintenance" },
  { id: 2, name: "Utilities", description: "Electricity, water, internet, etc." },
  { id: 3, name: "Kitchen", description: "Food supplies and kitchen equipment" },
  { id: 4, name: "Staff", description: "Staff-related expenses" },
  { id: 5, name: "Marketing", description: "Advertising and promotions" },
]

// Mock data for income categories
const incomeCategories = [
  { id: 1, name: "Room Bookings", description: "Income from room bookings" },
  { id: 2, name: "Cottage Bookings", description: "Income from cottage bookings" },
  { id: 3, name: "Restaurant", description: "Food and beverage sales" },
  { id: 4, name: "Events", description: "Conference and event bookings" },
  { id: 5, name: "Other", description: "Miscellaneous income" },
]

export default function ExpensesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader role="admin" title="Expenses & Income" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Financial Management</h2>
          <div className="flex items-center gap-2">
            <AddCategoryDialog />
            <AddTransactionDialog />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,840</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,350</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$490</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">-15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <Tabs defaultValue="expenses">
              <TabsList>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
              </TabsList>
              <TabsContent value="expenses">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Transactions</CardTitle>
                    <CardDescription>View and manage all expense transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenses.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell className="font-medium">EXP-{expense.id}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>${expense.amount}</TableCell>
                            <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
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
              <TabsContent value="income">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Transactions</CardTitle>
                    <CardDescription>View and manage all income transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {income.map((inc) => (
                          <TableRow key={inc.id}>
                            <TableCell className="font-medium">INC-{inc.id}</TableCell>
                            <TableCell>{inc.category}</TableCell>
                            <TableCell>{inc.description}</TableCell>
                            <TableCell>${inc.amount}</TableCell>
                            <TableCell>{new Date(inc.date).toLocaleDateString()}</TableCell>
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
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Tabs defaultValue="expense-categories">
              <TabsList>
                <TabsTrigger value="expense-categories">Expense Categories</TabsTrigger>
                <TabsTrigger value="income-categories">Income Categories</TabsTrigger>
              </TabsList>
              <TabsContent value="expense-categories">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                    <CardDescription>Manage expense categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenseCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">EC-{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
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
              <TabsContent value="income-categories">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Categories</CardTitle>
                    <CardDescription>Manage income categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {incomeCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">IC-{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function AddCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Create a new expense or income category.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category-type">Category Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g. Maintenance" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Brief description of the category" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddTransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Record a new expense or income transaction.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input id="amount" type="number" placeholder="e.g. 250" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Brief description of the transaction" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

