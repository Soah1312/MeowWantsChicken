"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Award, Bell, Check, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AIChatbot } from "@/components/ai-chatbot"

export default function SponsorDashboard() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [formData, setFormData] = useState({
    eventName: "",
    tier: "gold",
    message: "",
  })

  const sponsorProfile = {
    name: "TechCorp Industries",
    tier: "Platinum",
    logo: "TC",
    status: "active",
    since: "Jan 2024",
  }

  const roiMetrics = [
    { label: "Booth Visits", value: "2,847", change: "+23%", icon: Users, color: "cyan" },
    { label: "Brand Impressions", value: "45.2K", change: "+18%", icon: Eye, color: "blue" },
    { label: "Link Clicks", value: "1,234", change: "+31%", icon: MousePointerClick, color: "purple" },
    { label: "ROI Score", value: "8.5/10", change: "+0.8", icon: TrendingUp, color: "green" },
  ]

  const sponsoredEvents = [
    {
      id: "1",
      name: "TechConf 2025",
      date: "March 15-17",
      tier: "Platinum",
      status: "active",
      attendees: 1247,
      impressions: 45200,
    },
    {
      id: "2",
      name: "Innovation Summit",
      date: "April 22-24",
      tier: "Gold",
      status: "upcoming",
      attendees: 850,
      impressions: 0,
    },
  ]

  const notifications = [
    { id: "1", text: "Your sponsorship for TechConf 2025 has been approved", time: "2 hours ago", type: "success" },
    { id: "2", text: "New ROI report available for Innovation Summit", time: "1 day ago", type: "info" },
    { id: "3", text: "Booth setup reminder for upcoming event", time: "2 days ago", type: "warning" },
  ]

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowApplicationForm(false)
    setFormData({ eventName: "", tier: "gold", message: "" })
  }

  return (
    <DashboardLayout role="sponsor" userName="TechCorp Industries">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="font-bold text-3xl text-white">Sponsor Dashboard</h1>
            <p className="text-gray-400">Track your sponsorship performance</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowApplicationForm(!showApplicationForm)}
              className="bg-cyan-500 text-black hover:bg-cyan-400"
            >
              Apply for Event
            </Button>
          </motion.div>
        </motion.div>

        {/* Application Form */}
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-cyan-500/30 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 font-semibold text-xl text-white">Event Sponsorship Application</h2>
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="eventName" className="text-gray-300">
                    Event Name
                  </Label>
                  <Input
                    id="eventName"
                    placeholder="Enter event name"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tier" className="text-gray-300">
                    Sponsorship Tier
                  </Label>
                  <select
                    id="tier"
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
                  >
                    <option value="platinum">Platinum - $50,000</option>
                    <option value="gold">Gold - $25,000</option>
                    <option value="silver">Silver - $10,000</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-300">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your sponsorship goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-cyan-500 text-black hover:bg-cyan-400">
                    Submit Application
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Sponsor Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500 font-bold text-2xl text-black"
              >
                {sponsorProfile.logo}
              </motion.div>
              <div className="flex-1">
                <h2 className="font-bold text-2xl text-white">{sponsorProfile.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    <Award className="mr-1 h-3 w-3" />
                    {sponsorProfile.tier} Sponsor
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">
                    <Check className="mr-1 h-3 w-3" />
                    {sponsorProfile.status}
                  </Badge>
                  <span className="text-gray-400 text-sm">Member since {sponsorProfile.since}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ROI Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roiMetrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                      className="mt-2 font-bold text-3xl text-white"
                    >
                      {metric.value}
                    </motion.p>
                    <p className="mt-1 text-green-400 text-sm">{metric.change}</p>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 p-3">
                    <metric.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROI Analytics Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Performance Analytics</h2>
            </div>

            <div className="space-y-6">
              {[
                { label: "Booth Visits", value: 2847, max: 3000, color: "cyan" },
                { label: "Brand Impressions", value: 45200, max: 50000, color: "blue" },
                { label: "Link Clicks", value: 1234, max: 1500, color: "purple" },
                { label: "Lead Generation", value: 456, max: 500, color: "green" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{item.label}</span>
                    <span className="font-medium text-white text-sm">
                      {item.value.toLocaleString()} / {item.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${
                        item.color === "cyan"
                          ? "from-cyan-500 to-cyan-400"
                          : item.color === "blue"
                            ? "from-blue-500 to-blue-400"
                            : item.color === "purple"
                              ? "from-purple-500 to-purple-400"
                              : "from-green-500 to-green-400"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Sponsored Events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-xl text-white">My Sponsored Events</h2>
            <div className="space-y-4">
              {sponsoredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-white">{event.name}</h3>
                          <Badge
                            className={
                              event.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {event.status === "active" ? (
                              <Check className="mr-1 h-3 w-3" />
                            ) : (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {event.status}
                          </Badge>
                        </div>
                        <p className="mb-3 text-gray-400 text-sm">{event.date}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-300">
                            <Users className="h-4 w-4 text-cyan-400" />
                            <span>{event.attendees.toLocaleString()} attendees</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <Eye className="h-4 w-4 text-cyan-400" />
                            <span>
                              {event.impressions > 0
                                ? `${(event.impressions / 1000).toFixed(1)}K impressions`
                                : "Upcoming"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{event.tier}</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Notifications</h2>
            </div>
            <div className="space-y-3">
              {notifications.map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + idx * 0.1 }}
                  className="flex items-start gap-3 rounded-lg bg-white/5 p-4"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      notification.type === "success"
                        ? "bg-green-500"
                        : notification.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-cyan-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{notification.text}</p>
                    <p className="text-gray-400 text-xs">{notification.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  )
}
