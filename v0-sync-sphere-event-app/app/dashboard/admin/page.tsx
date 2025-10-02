"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, DollarSign, Star, Activity, Calendar, Download } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const overviewStats = [
    { label: "Total Events", value: "24", change: "+4 this month", icon: Calendar, color: "cyan" },
    { label: "Total Attendees", value: "12.5K", change: "+18%", icon: Users, color: "blue" },
    { label: "Revenue", value: "$485K", change: "+23%", icon: DollarSign, color: "green" },
    { label: "Avg Rating", value: "4.8", change: "+0.3", icon: Star, color: "yellow" },
  ]

  const attendanceData = [
    { month: "Jan", value: 850 },
    { month: "Feb", value: 1200 },
    { month: "Mar", value: 1450 },
    { month: "Apr", value: 1100 },
    { month: "May", value: 1650 },
    { month: "Jun", value: 1890 },
  ]

  const vendorPerformance = [
    { name: "Catering Co", tasks: 45, completed: 43, rating: 4.9, status: "excellent" },
    { name: "AV Solutions", tasks: 38, completed: 36, rating: 4.7, status: "good" },
    { name: "Decor Plus", tasks: 52, completed: 48, rating: 4.8, status: "excellent" },
    { name: "Security Pro", tasks: 28, completed: 25, rating: 4.5, status: "good" },
  ]

  const sponsorROI = [
    { name: "TechCorp", tier: "Platinum", investment: 50000, impressions: 125000, roi: 8.5 },
    { name: "InnovateLabs", tier: "Gold", investment: 25000, impressions: 68000, roi: 7.8 },
    { name: "StartupHub", tier: "Silver", investment: 10000, impressions: 32000, roi: 7.2 },
    { name: "FutureTech", tier: "Gold", investment: 25000, impressions: 71000, roi: 8.1 },
  ]

  const feedbackInsights = [
    { category: "Event Organization", score: 4.8, responses: 1247 },
    { category: "Venue Quality", score: 4.6, responses: 1189 },
    { category: "Content Quality", score: 4.9, responses: 1305 },
    { category: "Networking Opportunities", score: 4.7, responses: 1156 },
  ]

  const maxAttendance = Math.max(...attendanceData.map((d) => d.value))

  return (
    <DashboardLayout role="organizer" userName="Admin">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="font-bold text-3xl text-white">Analytics Dashboard</h1>
            <p className="text-gray-400">Comprehensive insights across all events</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
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
                    <p className="mt-1 text-green-400 text-sm">{stat.change}</p>
                  </div>
                  <div className="rounded-lg bg-cyan-500/10 p-3">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Attendance Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Attendance Trends</h2>
            </div>
            <div className="flex items-end justify-between gap-4 h-64">
              {attendanceData.map((data, idx) => (
                <motion.div
                  key={data.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxAttendance) * 100}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="group relative flex flex-1 flex-col items-center justify-end"
                >
                  <div className="absolute -top-8 hidden rounded-lg bg-black/90 px-2 py-1 text-white text-xs group-hover:block">
                    {data.value.toLocaleString()}
                  </div>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-blue-500 transition-all group-hover:from-cyan-400 group-hover:to-blue-400" />
                  <p className="mt-2 text-gray-400 text-sm">{data.month}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vendor Performance */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Vendor Performance</h2>
              </div>
              <div className="space-y-4">
                {vendorPerformance.map((vendor, idx) => (
                  <motion.div
                    key={vendor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{vendor.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {vendor.completed}/{vendor.tasks} tasks completed
                        </p>
                      </div>
                      <Badge
                        className={
                          vendor.status === "excellent"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-cyan-500/20 text-cyan-400"
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-white text-sm">{vendor.rating}</span>
                      </div>
                      <div className="h-2 flex-1 mx-4 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(vendor.completed / vendor.tasks) * 100}%` }}
                          transition={{ delay: 1.1 + idx * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                      </div>
                      <span className="text-gray-400 text-sm">
                        {Math.round((vendor.completed / vendor.tasks) * 100)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Sponsor ROI */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Sponsor ROI</h2>
              </div>
              <div className="space-y-4">
                {sponsorROI.map((sponsor, idx) => (
                  <motion.div
                    key={sponsor.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{sponsor.name}</h3>
                        <p className="text-gray-400 text-sm">${(sponsor.investment / 1000).toFixed(0)}K investment</p>
                      </div>
                      <Badge
                        className={
                          sponsor.tier === "Platinum"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : sponsor.tier === "Gold"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {sponsor.tier}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Impressions</p>
                        <p className="font-medium text-white">{(sponsor.impressions / 1000).toFixed(1)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-400">ROI Score</p>
                        <p className="font-medium text-cyan-400">{sponsor.roi}/10</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Feedback Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">Feedback Insights</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {feedbackInsights.map((insight, idx) => (
                <motion.div
                  key={insight.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + idx * 0.1 }}
                  className="rounded-lg bg-white/5 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-white">{insight.category}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-white">{insight.score}</span>
                    </div>
                  </div>
                  <p className="mb-2 text-gray-400 text-sm">{insight.responses} responses</p>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(insight.score / 5) * 100}%` }}
                      transition={{ delay: 1.6 + idx * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
