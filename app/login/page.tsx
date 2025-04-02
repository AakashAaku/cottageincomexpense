"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hotel, ArrowLeft } from "lucide-react"
import { login } from "@/lib/actions/auth-actions"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || ""

  const handleLogin = async (e: React.FormEvent, role: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // const formData = new FormData()
    // formData.append("email", email)
    // formData.append("password", password)

    const credentials = {
      email,
      password,
      role
    }

    try {
      console.log("form data============",credentials);
      const result = await login(credentials)
      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      }
      // No need to handle success case as the login action will redirect
    } catch (error) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Hotel className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
            {error && <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">{error}</div>}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="reception">Reception</TabsTrigger>
              </TabsList>
              <TabsContent value="admin">
                <form onSubmit={(e) => handleLogin(e, "admin")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in as Admin"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="reception">
                <form onSubmit={(e) => handleLogin(e, "reception")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reception-email">Email</Label>
                      <Input
                        id="reception-email"
                        type="email"
                        placeholder="reception@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reception-password">Password</Label>
                      <Input
                        id="reception-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in as Receptionist"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-sm text-center text-muted-foreground mt-2">
              Forgot your password?{" "}
              <Link href="#" className="text-primary hover:underline">
                Reset it here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

