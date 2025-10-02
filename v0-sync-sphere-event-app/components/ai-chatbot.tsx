"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send } from "lucide-react"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", text: input }])
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "I can help you navigate the dashboard, answer FAQs, and provide event information. What would you like to know?",
          },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="h-14 w-14 rounded-full bg-cyan-500 shadow-lg hover:bg-cyan-400"
          >
            {isOpen ? <X className="h-6 w-6 text-black" /> : <MessageSquare className="h-6 w-6 text-black" />}
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="flex h-[500px] flex-col border-white/10 bg-black/95 backdrop-blur-xl">
              <div className="border-b border-white/10 p-4">
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-gray-400 text-sm">Always here to help</p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-cyan-500 text-black" : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                  />
                  <Button onClick={handleSend} size="icon" className="bg-cyan-500 hover:bg-cyan-400">
                    <Send className="h-4 w-4 text-black" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
