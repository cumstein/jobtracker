import { motion } from "framer-motion";

export function AnimatedSheetContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="h-full bg-background p-4"
    >
      {children}
    </motion.div>
  );
}