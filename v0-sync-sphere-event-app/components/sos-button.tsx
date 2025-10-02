"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"
import { Card } from "@/components/ui/card"

export function SOSButton() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertSent, setAlertSent] = useState(false)

  const handleSOS = () => {
    setShowAlert(true)
  }

  const confirmSOS = () => {
    setAlertSent(true)
    setTimeout(() => {
      setShowAlert(false)
      setAlertSent(false)
    }, 3000)
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={handleSOS} variant="destructive" className="bg-red-500 hover:bg-red-600">
          <AlertTriangle className="mr-2 h-4 w-4" />
          SOS
        </Button>
      </motion.div>

      <AnimatePresence>
        {showAlert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => !alertSent && setShowAlert(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            >
              <Card className="border-red-500/30 bg-black p-6">
                {!alertSent ? (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-500/20 p-2">
                          <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                        <h3 className="font-semibold text-xl text-white">Emergency Alert</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowAlert(false)}
                        className="text-white hover:bg-white/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mb-6 text-gray-300">
                      This will send an emergency notification to all event stakeholders. Are you sure?
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowAlert(false)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                      <Button onClick={confirmSOS} className="flex-1 bg-red-500 hover:bg-red-600">
                        Confirm SOS
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20"
                    >
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <h3 className="mb-2 font-semibold text-xl text-white">Alert Sent!</h3>
                    <p className="text-gray-300">Emergency notification has been sent to all stakeholders.</p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
