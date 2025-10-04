"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, LogIn, UserPlus, LogOut, User, Activity, Users, Award } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { session, logout } = useAuth()

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/scheduler", label: "Scheduler", icon: Calendar },
    { href: "/diagnostic", label: "Diagnostic", icon: Activity },
    { href: "/community", label: "Community", icon: Users },
    { href: "/success-stories", label: "Success Stories", icon: Award },
    { href: "/chatbot", label: "AI Assistant", icon: MessageSquare },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image src="/logo.jpg" alt="AgriRisk Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none">AgriRisk</span>
              <span className="text-xs font-normal text-muted-foreground leading-none">Management</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{session.user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
