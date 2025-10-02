"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Calendar, Users, Zap, Shield, BarChart3, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500">
              <Calendar className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold">SyncSphere</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Link href="/auth">
              <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

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
              <Link href="/auth?role=organizer">
                <Button size="lg" className="group bg-white text-black hover:bg-gray-200">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth?role=attendee">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Join as Attendee
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-4"
          >
            {[
              { role: "Organizer", icon: Calendar, desc: "Manage events end-to-end", color: "cyan" },
              { role: "Attendee", icon: Users, desc: "Experience seamless events", color: "blue" },
              { role: "Vendor", icon: Zap, desc: "Deliver services efficiently", color: "purple" },
              { role: "Sponsor", icon: BarChart3, desc: "Track your ROI", color: "green" },
            ].map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link href={`/auth?role=${item.role.toLowerCase()}`}>
                  <Card className="group cursor-pointer border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                    <item.icon className="mb-4 h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
                    <h3 className="mb-2 font-semibold text-lg text-white">{item.role}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
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
                <Link href="/auth">
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
