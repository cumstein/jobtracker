
"use client"
import { motion } from "framer-motion";

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="sticky top-0 z-50 w-full bg-background shadow-sm"
    >
      {children}
    </motion.header>
  );
}
