"use client"

import { useState } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  CheckSquare,
  Megaphone,
  QrCode,
  Plus,
  Clock,
  DollarSign,
  TrendingUp,
  GripVertical,
  Check,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SOSButton } from "@/components/sos-button"
import { AIChatbot } from "@/components/ai-chatbot"

export default function OrganizerDashboard() {
  const [scheduleItems, setScheduleItems] = useState([
    { id: "1", time: "09:00 AM", title: "Registration & Welcome", duration: "1h" },
    { id: "2", time: "10:00 AM", title: "Keynote Speech", duration: "1.5h" },
    { id: "3", time: "11:30 AM", title: "Panel Discussion", duration: "1h" },
    { id: "4", time: "12:30 PM", title: "Lunch Break", duration: "1h" },
  ])

  const [vendorTasks, setVendorTasks] = useState([
    { id: "1", vendor: "Catering Co", task: "Setup buffet tables", status: "completed" },
    { id: "2", vendor: "AV Solutions", task: "Test microphones", status: "in-progress" },
    { id: "3", vendor: "Decor Plus", task: "Install stage backdrop", status: "pending" },
  ])

  const [sponsors, setSponsors] = useState([
    { id: "1", name: "TechCorp", tier: "Platinum", status: "approved", amount: "$50,000" },
    { id: "2", name: "InnovateLabs", tier: "Gold", status: "pending", amount: "$25,000" },
    { id: "3", name: "StartupHub", tier: "Silver", status: "approved", amount: "$10,000" },
  ])

  const [announcement, setAnnouncement] = useState("")
  const [showAnnouncementSuccess, setShowAnnouncementSuccess] = useState(false)

  const stats = [
    { label: "Total Attendees", value: "1,247", icon: Users, change: "+12%", color: "cyan" },
    { label: "Active Sessions", value: "8", icon: Calendar, change: "+2", color: "blue" },
    { label: "Pending Tasks", value: "15", icon: CheckSquare, change: "-3", color: "purple" },
    { label: "Check-ins Today", value: "892", icon: QrCode, change: "+156", color: "green" },
  ]

  const handleBroadcast = () => {
    if (announcement.trim()) {
      setShowAnnouncementSuccess(true)
      setTimeout(() => {
        setShowAnnouncementSuccess(false)
        setAnnouncement("")
      }, 3000)
    }
  }

  const toggleTaskStatus = (taskId: string) => {
    setVendorTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "pending" ? "in-progress" : task.status === "in-progress" ? "completed" : "completed",
            }
          : task,
      ),
    )
  }

  const approveSponsor = (sponsorId: string) => {
    setSponsors((sponsors) =>
      sponsors.map((sponsor) => (sponsor.id === sponsorId ? { ...sponsor, status: "approved" } : sponsor)),
    )
  }

  return (
    <DashboardLayout role="organizer" userName="Sarah Chen">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="font-bold text-3xl text-white">Event Dashboard</h1>
            <p className="text-gray-400">TechConf 2025 - March 15-17</p>
          </div>
          <div className="flex gap-3">
            <SOSButton />
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                      className="mt-2 font-bold text-3xl text-white"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-1 text-cyan-400 text-sm">{stat.change}</p>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 p-3">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Schedule Builder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Schedule Builder</h2>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Session
              </Button>
            </div>
            <Reorder.Group axis="y" values={scheduleItems} onReorder={setScheduleItems} className="space-y-3">
              {scheduleItems.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <motion.div
                    layout
                    className="group flex cursor-grab items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/30 active:cursor-grabbing"
                  >
                    <GripVertical className="h-5 w-5 text-gray-500" />
                    <div className="flex flex-1 items-center gap-4">
                      <div className="flex items-center gap-2 rounded-md bg-cyan-500/10 px-3 py-1">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="font-medium text-cyan-400 text-sm">{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vendor Task Board */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Vendor Tasks</h2>
              </div>
              <div className="space-y-3">
                {vendorTasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{task.task}</p>
                      <p className="text-gray-400 text-sm">{task.vendor}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      <Badge
                        className={
                          task.status === "completed"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : task.status === "in-progress"
                              ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                              : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                        }
                      >
                        {task.status === "completed" && <Check className="mr-1 h-3 w-3" />}
                        {task.status.replace("-", " ")}
                      </Badge>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Sponsor Management */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Sponsor Management</h2>
              </div>
              <div className="space-y-3">
                {sponsors.map((sponsor, idx) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-white">{sponsor.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {sponsor.tier}
                          </Badge>
                          <span className="text-gray-400 text-sm">{sponsor.amount}</span>
                        </div>
                      </div>
                      {sponsor.status === "pending" ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={() => approveSponsor(sponsor.id)}
                            className="bg-cyan-500 text-black hover:bg-cyan-400"
                          >
                            Approve
                          </Button>
                        </motion.div>
                      ) : (
                        <Badge className="bg-green-500/20 text-green-400">
                          <Check className="mr-1 h-3 w-3" />
                          Approved
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Broadcast Announcements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Broadcast Announcement</h2>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Type your announcement..."
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="flex-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleBroadcast} className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Send
                </Button>
              </motion.div>
            </div>
            <AnimatePresence>
              {showAnnouncementSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-3 rounded-lg bg-green-500/20 p-3 text-green-400"
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Announcement sent to all attendees!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* QR Check-in Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <QrCode className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Check-in Statistics</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-gray-400 text-sm">Total Check-ins</p>
                <p className="mt-2 font-bold text-2xl text-white">892</p>
                <div className="mt-2 flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+15% from yesterday</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-gray-400 text-sm">Current Attendance</p>
                <p className="mt-2 font-bold text-2xl text-white">71.5%</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "71.5%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full bg-cyan-500"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-gray-400 text-sm">Peak Hour</p>
                <p className="mt-2 font-bold text-2xl text-white">10:00 AM</p>
                <p className="mt-2 text-gray-400 text-sm">324 check-ins</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  )
}
