"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, Trophy, Award, Zap, QrCode, ThumbsUp, MessageCircle, Bell } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SOSButton } from "@/components/sos-button"
import { AIChatbot } from "@/components/ai-chatbot"
import confetti from "canvas-confetti"

export default function AttendeeDashboard() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [feedback, setFeedback] = useState<{ [key: string]: number }>({})
  const [showConfetti, setShowConfetti] = useState(false)

  const agenda = [
    {
      id: "1",
      time: "09:00 AM",
      title: "Registration & Welcome Coffee",
      location: "Main Lobby",
      type: "networking",
      status: "completed",
    },
    {
      id: "2",
      time: "10:00 AM",
      title: "Keynote: The Future of AI",
      location: "Grand Hall",
      speaker: "Dr. Sarah Chen",
      type: "keynote",
      status: "current",
    },
    {
      id: "3",
      time: "11:30 AM",
      title: "Workshop: Building Scalable Apps",
      location: "Room 201",
      speaker: "Marcus Rodriguez",
      type: "workshop",
      status: "upcoming",
    },
    {
      id: "4",
      time: "01:00 PM",
      title: "Networking Lunch",
      location: "Dining Hall",
      type: "networking",
      status: "upcoming",
    },
  ]

  const [announcements, setAnnouncements] = useState([
    { id: "1", text: "Lunch will be served in 30 minutes!", time: "5 min ago", new: true },
    { id: "2", text: "Workshop room changed to 201", time: "15 min ago", new: false },
  ])

  const leaderboard = [
    { rank: 1, name: "Alex Johnson", points: 850, badge: "gold" },
    { rank: 2, name: "You", points: 720, badge: "silver", isUser: true },
    { rank: 3, name: "Emma Davis", points: 680, badge: "bronze" },
    { rank: 4, name: "Chris Lee", points: 620, badge: "none" },
    { rank: 5, name: "Taylor Swift", points: 580, badge: "none" },
  ]

  const badges = [
    { id: "1", name: "Early Bird", icon: "🌅", earned: true },
    { id: "2", name: "Networker", icon: "🤝", earned: true },
    { id: "3", name: "Knowledge Seeker", icon: "📚", earned: false },
    { id: "4", name: "Super Attendee", icon: "⭐", earned: false },
  ]

  const handleRating = (sessionId: string, rating: number) => {
    setFeedback({ ...feedback, [sessionId]: rating })
    if (rating >= 4) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleCheckIn = () => {
    setShowQR(true)
    setTimeout(() => {
      setShowQR(false)
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      })
    }, 2000)
  }

  return (
    <DashboardLayout role="attendee" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="font-bold text-3xl text-white">My Event Experience</h1>
            <p className="text-gray-400">TechConf 2025 - Day 1</p>
          </div>
          <div className="flex gap-3">
            <SOSButton />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleCheckIn} className="bg-cyan-500 text-black hover:bg-cyan-400">
                <QrCode className="mr-2 h-4 w-4" />
                Check In
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQR && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
              >
                <Card className="border-cyan-500/30 bg-black p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-2xl bg-white"
                  >
                    <QrCode className="h-32 w-32 text-black" />
                  </motion.div>
                  <p className="font-semibold text-lg text-white">Checking you in...</p>
                  <p className="text-gray-400 text-sm">Please wait</p>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Live Announcements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-cyan-500/20 p-2">
                <Bell className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-white">Live Announcements</h3>
                <div className="space-y-2">
                  {announcements.map((announcement, idx) => (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start justify-between rounded-lg bg-white/5 p-3"
                    >
                      <div className="flex-1">
                        <p className="text-white text-sm">{announcement.text}</p>
                        <p className="text-gray-400 text-xs">{announcement.time}</p>
                      </div>
                      {announcement.new && <Badge className="bg-cyan-500/20 text-cyan-400">New</Badge>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Personalized Agenda */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">My Agenda</h2>
            </div>

            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-white/10" />

              {agenda.map((session, idx) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 h-5 w-5 rounded-full border-4 border-black ${
                      session.status === "completed"
                        ? "bg-green-500"
                        : session.status === "current"
                          ? "animate-pulse bg-cyan-500"
                          : "bg-gray-500"
                    }`}
                  />

                  <div className="ml-16">
                    <Card
                      className={`cursor-pointer border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10 ${
                        session.status === "current" ? "border-cyan-500/50 bg-cyan-500/10" : ""
                      }`}
                      onClick={() => setSelectedSession(session.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-cyan-400" />
                            <span className="font-medium text-cyan-400 text-sm">{session.time}</span>
                            {session.status === "current" && (
                              <Badge className="bg-cyan-500/20 text-cyan-400">Live Now</Badge>
                            )}
                          </div>
                          <h3 className="mb-2 font-semibold text-white">{session.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{session.location}</span>
                            </div>
                            {session.speaker && (
                              <div className="flex items-center gap-1">
                                <span>•</span>
                                <span>{session.speaker}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {session.status === "completed" && (
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRating(session.id, star)
                                }}
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    feedback[session.id] >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Gamification - Leaderboard */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">Leaderboard</h2>
              </div>
              <div className="space-y-3">
                {leaderboard.map((entry, idx) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      entry.isUser ? "border border-cyan-500/30 bg-cyan-500/10" : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                          entry.rank === 1
                            ? "bg-yellow-500/20 text-yellow-400"
                            : entry.rank === 2
                              ? "bg-gray-400/20 text-gray-300"
                              : entry.rank === 3
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {entry.rank}
                      </div>
                      <div>
                        <p className={`font-medium ${entry.isUser ? "text-cyan-400" : "text-white"}`}>{entry.name}</p>
                        <p className="text-gray-400 text-sm">{entry.points} points</p>
                      </div>
                    </div>
                    {entry.rank <= 3 && (
                      <Trophy
                        className={`h-5 w-5 ${
                          entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-gray-300" : "text-orange-400"
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Badges & Achievements */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-400" />
                <h2 className="font-semibold text-xl text-white">My Badges</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, idx) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: badge.earned ? 1.05 : 1 }}
                    className={`rounded-lg border p-4 text-center transition-all ${
                      badge.earned ? "border-cyan-500/30 bg-cyan-500/10" : "border-white/10 bg-white/5 opacity-50"
                    }`}
                  >
                    <div className="mb-2 text-4xl">{badge.icon}</div>
                    <p className={`font-medium text-sm ${badge.earned ? "text-white" : "text-gray-400"}`}>
                      {badge.name}
                    </p>
                    {badge.earned && <Badge className="mt-2 bg-green-500/20 text-green-400">Earned</Badge>}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Progress to next level</span>
                  <span className="font-medium text-cyan-400 text-sm">720 / 1000 XP</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-xl text-white">Quick Actions</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-2 border-white/20 bg-white/5 py-4 text-white hover:bg-white/10"
                >
                  <ThumbsUp className="h-6 w-6 text-cyan-400" />
                  <span>Give Feedback</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-2 border-white/20 bg-white/5 py-4 text-white hover:bg-white/10"
                >
                  <MessageCircle className="h-6 w-6 text-cyan-400" />
                  <span>Join Discussion</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-2 border-white/20 bg-white/5 py-4 text-white hover:bg-white/10"
                >
                  <Zap className="h-6 w-6 text-cyan-400" />
                  <span>View Challenges</span>
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  )
}
