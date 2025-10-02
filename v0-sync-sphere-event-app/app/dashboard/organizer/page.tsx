"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Plus, Filter, Users, CheckSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AIChatbot } from "@/components/ai-chatbot"
import { organizerEvents, type OrganizerEvent } from "@/lib/organizer-events"

const statusBadgeStyles: Record<OrganizerEvent["status"], string> = {
  Live: "bg-green-500/20 text-green-400 border border-green-400/40",
  Planning: "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40",
  Draft: "bg-white/10 text-gray-300 border border-white/10",
}

const sanitizeNumber = (value: string) => Number(value.replace(/[^0-9.]/g, "")) || 0

export default function OrganizerDashboardLanding() {
  const totalEvents = organizerEvents.length
  const liveCount = organizerEvents.filter((event) => event.status === "Live").length
  const totalAttendees = organizerEvents.reduce((sum, event) => sum + sanitizeNumber(event.metrics.attendees.value), 0)
  const totalActiveSessions = organizerEvents.reduce((sum, event) => sum + sanitizeNumber(event.metrics.activeSessions.value), 0)
  const totalPendingTasks = organizerEvents.reduce((sum, event) => sum + sanitizeNumber(event.metrics.pendingTasks.value), 0)

  return (
    <DashboardLayout role="organizer" userName="Sarah Chen">
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Welcome back, Sarah</p>
            <h1 className="font-bold text-3xl text-white md:text-4xl">Your Hosted Events</h1>
            <p className="text-gray-400 md:text-lg">
              {totalEvents} experiences under your leadership  {liveCount} currently live
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Attendees</p>
                <p className="mt-1 text-2xl font-semibold text-white">{totalAttendees.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Combined projections across all events, updated in real time.
            </p>
          </Card>
          <Card className="border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Sessions</p>
                <p className="mt-1 text-2xl font-semibold text-white">{totalActiveSessions.toLocaleString()}</p>
              </div>
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Sessions happening this week across your portfolio.
            </p>
          </Card>
          <Card className="border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Tasks</p>
                <p className="mt-1 text-2xl font-semibold text-white">{totalPendingTasks.toLocaleString()}</p>
              </div>
              <CheckSquare className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Stay on top of vendor coordination and sponsor deliverables.
            </p>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {organizerEvents.map((event, index) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex h-full flex-col justify-between border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className={`px-3 py-1 text-xs uppercase tracking-wide ${statusBadgeStyles[event.status] ?? ""}`}>
                      {event.status}
                    </Badge>
                    <span className="text-xs text-gray-400">{event.dateRange}</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-white">{event.name}</h2>
                    <p className="text-sm text-cyan-200/80">{event.subtitle}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>{event.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                    <div className="flex items-start gap-3 text-sm text-cyan-200/90">
                      <Sparkles className="mt-0.5 h-4 w-4 text-cyan-400" />
                      <span>{event.heroHighlight}</span>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md bg-white/5 p-3">
                      <p className="text-xs text-gray-400">Attendees</p>
                      <p className="text-xl font-semibold text-white">{event.metrics.attendees.value}</p>
                      <p className="text-xs text-green-400">{event.metrics.attendees.change}</p>
                    </div>
                    <div className="rounded-md bg-white/5 p-3">
                      <p className="text-xs text-gray-400">Pending Tasks</p>
                      <p className="text-xl font-semibold text-white">{event.metrics.pendingTasks.value}</p>
                      <p className="text-xs text-cyan-300">{event.metrics.pendingTasks.change}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4 text-cyan-400" />
                    <span>{event.metrics.activeSessions.value} active sessions</span>
                  </div>
                  <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
                    <Link href={`/dashboard/organizer/${event.slug}`} className="flex items-center gap-2">
                      View Event
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">Engagement Insights</h3>
            <p className="mt-2 text-sm text-gray-400">
              TechConf 2025 drives the highest check-ins, while Future of Health Summit shows a steady rise in interest.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {organizerEvents.slice(0, 2).map((event) => (
                <div key={event.slug} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-sm font-medium text-white">{event.name}</p>
                  <p className="mt-2 text-xs text-gray-400">Check-ins Today</p>
                  <p className="text-lg font-semibold text-cyan-300">{event.metrics.checkinsToday.value}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">Automation Feed</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>- Follow up with pending sponsors before end of week.</li>
              <li>- Schedule a technical rehearsal for Green Innovations Expo main stage.</li>
              <li>- Health Summit requires updated attendee dietary preferences.</li>
            </ul>
          </Card>
        </div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  )
}
