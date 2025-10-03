"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Calendar,
  Users,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const roleOptions = [
  { key: "organiser", label: "Organiser", icon: Calendar, desc: "Manage events end-to-end" },
  { key: "attendee", label: "Attendee", icon: Users, desc: "Experience seamless events" },
  { key: "vendor", label: "Vendor", icon: Zap, desc: "Deliver services efficiently" },
  { key: "sponsor", label: "Sponsor", icon: BarChart3, desc: "Track your ROI" },
]

export default function LandingPage() {
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if (searchParams.get("selectRole") === "true") {
      setShowRoleDialog(true)
    }
  }, [searchParams])

  const handleDialogOpenChange = (open: boolean) => {
    setShowRoleDialog(open)
    if (!open && searchParams.get("selectRole")) {
      router.replace(pathname)
    }
  }

  const handleRoleSelect = (role: string) => {
    setShowRoleDialog(false)
    router.push(`/auth/signup?role=${role}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Dialog open={showRoleDialog} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="border-white/10 bg-black/95 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">Choose your journey</DialogTitle>
            <DialogDescription className="text-gray-300">
              Select the role that best matches your event experience.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            {roleOptions.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Card
                  className="cursor-pointer border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                  onClick={() => handleRoleSelect(item.key)}
                >
                  <item.icon className="mb-4 h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.label}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Use the new Navbar component */}
      <div className="bg-black">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400"
            >
              The Future of Event Management
            </motion.div>

            <h1 className="mb-6 text-balance font-bold text-5xl leading-tight md:text-7xl">
              Orchestrate events with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                precision
              </span>
            </h1>

            <p className="mb-10 text-pretty text-lg text-gray-400 leading-relaxed md:text-xl">
              Your complete toolkit to manage events seamlessly. Connect organizers, attendees, vendors, and sponsors in
              one unified platform.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group bg-white text-black hover:bg-gray-200"
                onClick={() => setShowRoleDialog(true)}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-20 max-w-3xl text-center"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/70">Trusted by every role in the event ecosystem</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-balance font-bold text-4xl md:text-5xl">Everything you need to succeed</h2>
            <p className="text-gray-400 text-lg">Powerful features designed for modern event management</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                desc: "Drag-and-drop schedule builder with real-time conflict detection and automated notifications.",
              },
              {
                icon: Users,
                title: "Attendee Engagement",
                desc: "Interactive agendas, QR check-ins, live polls, and gamification to boost participation.",
              },
              {
                icon: Zap,
                title: "Vendor Coordination",
                desc: "Streamlined task management with status tracking and file sharing capabilities.",
              },
              {
                icon: Shield,
                title: "Emergency Alerts",
                desc: "Instant SOS notifications to all stakeholders with location tracking and response coordination.",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Comprehensive insights on attendance, engagement, vendor performance, and sponsor ROI.",
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                desc: "Intelligent chatbot for navigation, FAQs, and personalized recommendations.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10">
                  <div className="mb-4 inline-flex rounded-lg bg-cyan-500/10 p-3">
                    <feature.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="mb-3 font-semibold text-xl text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-balance font-bold text-4xl md:text-5xl">Trusted by event professionals</h2>
            <p className="text-gray-400 text-lg">See what our users have to say</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Event Organizer",
                company: "TechConf 2024",
                quote:
                  "SyncSphere transformed how we manage our annual conference. The drag-and-drop scheduler saved us 20+ hours.",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Attendee",
                company: "Innovation Summit",
                quote:
                  "The personalized agenda and gamification features made networking so much more engaging. Best event app I've used!",
                rating: 5,
              },
              {
                name: "Emily Watson",
                role: "Sponsor Manager",
                company: "Global Brands Inc",
                quote:
                  "Real-time ROI tracking gave us unprecedented visibility into our sponsorship performance. Absolutely worth it.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, rotateY: -15 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ rotateY: 5, transition: { duration: 0.3 } }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="h-full border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <svg className="h-5 w-5 fill-cyan-400" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mb-6 text-gray-300 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 font-semibold text-cyan-400">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      <div className="text-cyan-400 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-12 text-center backdrop-blur-sm md:p-16">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div className="relative">
                <h2 className="mb-4 text-balance font-bold text-4xl md:text-5xl">Ready to transform your events?</h2>
                <p className="mb-8 text-gray-300 text-lg">Join thousands of event professionals using SyncSphere</p>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500">
                <Calendar className="h-5 w-5 text-black" />
              </div>
              <span className="font-bold text-lg">SyncSphere</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 SyncSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
