"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Calendar, Users, Zap, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const roleParam = searchParams.get("role")

  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState<string | null>(roleParam)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const roles = [
    { id: "organizer", name: "Organizer", icon: Calendar, color: "cyan", desc: "Manage events" },
    { id: "attendee", name: "Attendee", icon: Users, color: "blue", desc: "Join events" },
    { id: "vendor", name: "Vendor", icon: Zap, color: "purple", desc: "Provide services" },
    { id: "sponsor", name: "Sponsor", icon: BarChart3, color: "green", desc: "Track ROI" },
  ]

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user && selectedRole) {
        router.push(`/dashboard/${selectedRole}`)
      }
    }
    checkUser()
  }, [selectedRole, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isLogin) {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          setError(error.message)
        } else if (data.user) {
          setSuccess('✅ Successfully signed in!')
          console.log('User signed in:', data.user)
          
          // Store user role in user metadata or local storage
          localStorage.setItem('userRole', selectedRole || 'attendee')
          
          // Redirect to dashboard
          setTimeout(() => {
            router.push(`/dashboard/${selectedRole || 'attendee'}`)
          }, 1000)
        }
      } else {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              role: selectedRole,
            }
          }
        })

        if (error) {
          setError(error.message)
        } else if (data.user) {
          if (data.user.email_confirmed_at) {
            setSuccess('🎉 Account created successfully! Signing you in...')
            localStorage.setItem('userRole', selectedRole || 'attendee')
            setTimeout(() => {
              router.push(`/dashboard/${selectedRole || 'attendee'}`)
            }, 1000)
          } else {
            setSuccess('🎉 Account created! Please check your email for confirmation.')
          }
          console.log('New user created:', data.user)
        }
      }
    } catch (err) {
      setError(`Authentication failed: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* Animated background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="absolute -top-16 left-0 text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-white/10 bg-black/50 p-8 backdrop-blur-xl">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500"
              >
                <Calendar className="h-8 w-8 text-black" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-center font-bold text-3xl text-white"
            >
              {isLogin ? "Welcome back" : "Get started"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center text-gray-400"
            >
              {isLogin ? "Sign in to your account" : "Create your account"}
            </motion.p>

            <AnimatePresence mode="wait">
              {!selectedRole ? (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4 text-center text-gray-300 text-sm">Select your role</p>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role, idx) => (
                      <motion.button
                        key={role.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRole(role.id)}
                        className="group flex flex-col items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/50 hover:bg-white/10"
                      >
                        <role.icon className="h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
                        <div className="text-center">
                          <div className="font-semibold text-sm text-white">{role.name}</div>
                          <div className="text-gray-400 text-xs">{role.desc}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="auth-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Selected Role Display */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const role = roles.find((r) => r.id === selectedRole)
                        if (!role) return null
                        return (
                          <>
                            <role.icon className="h-5 w-5 text-cyan-400" />
                            <span className="font-medium text-sm text-white">{role.name}</span>
                          </>
                        )
                      })()}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedRole(null)}
                      className="text-cyan-400 text-xs hover:text-cyan-300"
                    >
                      Change
                    </button>
                  </motion.div>

                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                        required={!isLogin}
                      />
                    </motion.div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-1 border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400 text-sm"
                    >
                      ❌ {error}
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-green-400 text-sm"
                    >
                      {success}
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </div>
                      ) : (
                        isLogin ? "Sign In" : "Create Account"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {selectedRole && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 text-sm hover:text-cyan-300">
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  )
}
