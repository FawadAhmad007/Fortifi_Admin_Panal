"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  Users,
  LayoutDashboard,
  Menu,
  LogOut,
  ChevronRight,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  Globe,
  User,
  TrendingUp,
  UserPlus
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("admin-logged-in")

    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-logged-in")
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "KYC Management", href: "/dashboard/kyc", icon: Users },
    { name: "News Management", href: "/dashboard/news", icon: FileText },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Market Data", href: "/dashboard/market", icon: TrendingUp },
    { name: "User Analytics", href: "/dashboard/users", icon: User },
    { name: "Global Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Join Beta", href: "/dashboard/join-beta", icon: UserPlus },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col bg-secondary-600 fixed inset-y-0 z-50 md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 font-semibold text-white">
            <Globe className="h-6 w-6 text-gray-300" />
            <span className="text-xl font-bold">Fortifi Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item mb-1 ${isActive ? "active" : "text-gray-400"}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-primary-700 text-white">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="ml-auto text-gray-400 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a] shadow-md">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-secondary-600 border-r border-white/10">
                  <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6 bg-[#0a0a0a]">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <Globe className="h-6 w-6 text-gray-300" />
                      <span className="text-xl font-bold">Fortifi Admin Panel</span>
                    </div>
                  </div>
                  <nav className="flex-1 overflow-auto py-4 px-3">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`sidebar-item mb-1 ${isActive ? "active" : "text-gray-400"}`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                        </Link>
                      )
                    })}
                  </nav>
                  <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary-700 text-white">AD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-gray-400">admin@example.com</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="ml-auto text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Logout</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="md:hidden flex items-center gap-2 font-semibold text-white">
                <Globe className="h-6 w-6 text-gray-300" />
                <span className="text-xl font-bold">Fortifi Admin</span>
              </div>
            </div>

            <div className="flex items-center ml-auto gap-4">
              <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full glass-effect text-xs text-primary-300">
                <Globe className="h-3 w-3" />
                <span>Network: Mainnet</span>
              </div>

              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-primary-700 text-white">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-secondary-500 border border-white/10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-white/5">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/5">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-white/5" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

