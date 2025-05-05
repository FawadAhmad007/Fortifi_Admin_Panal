"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Globe } from "lucide-react"
import { login } from "@/shared/services/request"
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/redux/reducers";
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)  
  const dispatch = useDispatch();
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login({ email, password })
console.log("Login response:", response)
      if (response?.data?.is_successfull ) {
        localStorage.setItem("admin-logged-in", "true")
        dispatch(loginSuccess({ token: response?.data?.token }));

        toast({
          variant: "success",
          title: "Login successful",
          description: "Welcome to the Fortifi Admin Panel",
        })

        router.push("/dashboard")

      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error?.message || "Invalid email or password",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 to-secondary-950 p-4">
      <Card className="w-full max-w-md border-white/10 bg-secondary-800/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-gray-300" />
            <CardTitle className="text-2xl font-bold text-white">Fortifi Admin Panel</CardTitle>
          </div>
          <CardDescription className="text-gray-400">Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary-700 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Button variant="link" className="text-primary-300 hover:text-primary-200 p-0 h-auto">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary-700 border-white/10"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t border-white/10 flex flex-col space-y-2 pt-4">
          <p className="text-sm text-gray-400 text-center">Use a valid email and password to sign in.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
