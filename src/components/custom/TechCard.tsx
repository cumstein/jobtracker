'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function TechCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-muted rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm"
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </motion.div>
  )
}