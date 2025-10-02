"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Zap, BarChart3, Settings, LogOut, Menu, Bell } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  role: "organizer" | "attendee" | "vendor" | "sponsor"
  userName: string
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const roleIcons = {
    organizer: Calendar,
    attendee: Users,
    vendor: Zap,
    sponsor: BarChart3,
  }

  const RoleIcon = roleIcons[role]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500">
                <Calendar className="h-5 w-5 text-black" />
              </div>
              <span className="font-bold text-lg">SyncSphere</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
            </Button>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20">
                <RoleIcon className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-white">{userName}</p>
                <p className="text-xs text-gray-400 capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-black/95 pt-20 backdrop-blur-lg lg:hidden"
        >
          <div className="flex flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">{children}</main>

      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  )
}
