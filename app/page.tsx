"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("admin-logged-in")

    if (isLoggedIn === "true") {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}

