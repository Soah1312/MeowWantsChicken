"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, Upload, FileText, Clock, Check, AlertCircle, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SOSButton } from "@/components/sos-button"
import { AIChatbot } from "@/components/ai-chatbot"

export default function VendorDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Setup buffet tables in Dining Hall",
      deadline: "09:00 AM",
      status: "completed",
      priority: "high",
      files: ["floor-plan.pdf"],
    },
    {
      id: "2",
      title: "Test all microphones and speakers",
      deadline: "10:30 AM",
      status: "in-progress",
      priority: "high",
      files: [],
    },
    {
      id: "3",
      title: "Install stage backdrop and lighting",
      deadline: "11:00 AM",
      status: "pending",
      priority: "medium",
      files: ["design-specs.pdf"],
    },
    {
      id: "4",
      title: "Prepare lunch service for 500 attendees",
      deadline: "12:00 PM",
      status: "pending",
      priority: "high",
      files: [],
    },
    {
      id: "5",
      title: "Setup networking lounge furniture",
      deadline: "02:00 PM",
      status: "pending",
      priority: "low",
      files: ["layout.jpg"],
    },
  ])

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedTaskForUpload, setSelectedTaskForUpload] = useState<string | null>(null)

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  }

  const updateTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          if (task.status === "pending") return { ...task, status: "in-progress" }
          if (task.status === "in-progress") return { ...task, status: "completed" }
          return task
        }
        return task
      }),
    )
  }

  const handleFileUpload = (taskId: string) => {
    setSelectedTaskForUpload(taskId)
    setShowUploadModal(true)

    // Simulate file upload
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress({ ...uploadProgress, [taskId]: progress })
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setShowUploadModal(false)
          setUploadProgress({ ...uploadProgress, [taskId]: 0 })
        }, 500)
      }
    }, 200)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout role="vendor" userName="Catering Co">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="font-bold text-3xl text-white">Vendor Dashboard</h1>
            <p className="text-gray-400">TechConf 2025 - Service Management</p>
          </div>
          <SOSButton />
        </motion.div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Tasks", value: stats.total, color: "cyan" },
            { label: "Completed", value: stats.completed, color: "green" },
            { label: "In Progress", value: stats.inProgress, color: "yellow" },
            { label: "Pending", value: stats.pending, color: "red" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <motion.p
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                  className="mt-2 font-bold text-3xl text-white"
                >
                  {stat.value}
                </motion.p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Task List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-cyan-400" />
              <h2 className="font-semibold text-xl text-white">My Tasks</h2>
            </div>

            <div className="space-y-4">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  layout
                >
                  <Card
                    className={`border-white/10 bg-white/5 p-5 transition-all ${
                      task.status === "completed" ? "opacity-60" : "hover:border-cyan-500/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Badge
                            className={
                              task.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : task.status === "in-progress"
                                  ? "bg-cyan-500/20 text-cyan-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status.replace("-", " ")}</span>
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority} priority</Badge>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>Due: {task.deadline}</span>
                          </div>
                        </div>

                        <h3
                          className={`mb-2 font-semibold text-lg ${
                            task.status === "completed" ? "text-gray-400 line-through" : "text-white"
                          }`}
                        >
                          {task.title}
                        </h3>

                        {task.files.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.files.map((file, fileIdx) => (
                              <motion.div
                                key={fileIdx}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-gray-400 text-xs"
                              >
                                <FileText className="h-3 w-3" />
                                <span>{file}</span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {task.status !== "completed" && (
                          <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFileUpload(task.id)}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                onClick={() => updateTaskStatus(task.id)}
                                className="bg-cyan-500 text-black hover:bg-cyan-400"
                              >
                                {task.status === "pending" ? "Start" : "Complete"}
                              </Button>
                            </motion.div>
                          </>
                        )}
                        {task.status === "completed" && (
                          <Badge className="bg-green-500/20 text-green-400">
                            <Check className="mr-1 h-3 w-3" />
                            Done
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Progress bar for in-progress tasks */}
                    {task.status === "in-progress" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-cyan-400">In Progress</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 1 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          />
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Real-time Updates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-xl text-white">Recent Updates</h2>
            <div className="space-y-3">
              {[
                { text: 'Task "Setup buffet tables" marked as completed', time: "5 min ago", type: "success" },
                { text: "New file uploaded: floor-plan.pdf", time: "12 min ago", type: "info" },
                { text: "Organizer commented on your task", time: "25 min ago", type: "info" },
              ].map((update, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="flex items-start gap-3 rounded-lg bg-white/5 p-3"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      update.type === "success" ? "bg-green-500" : "bg-cyan-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{update.text}</p>
                    <p className="text-gray-400 text-xs">{update.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && selectedTaskForUpload && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            >
              <Card className="border-white/10 bg-black p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-xl text-white">Uploading File</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowUploadModal(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg bg-white/5 p-4">
                    <FileText className="h-8 w-8 text-cyan-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm">task-completion-photo.jpg</p>
                      <p className="text-gray-400 text-xs">2.4 MB</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-400">Upload Progress</span>
                      <span className="text-cyan-400">{uploadProgress[selectedTaskForUpload] || 0}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${uploadProgress[selectedTaskForUpload] || 0}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                  </div>

                  {uploadProgress[selectedTaskForUpload] === 100 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-lg bg-green-500/20 p-3 text-green-400"
                    >
                      <Check className="h-4 w-4" />
                      <span className="text-sm">File uploaded successfully!</span>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AIChatbot />
    </DashboardLayout>
  )
}
