/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Globe } from "lucide-react";

export default function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="relative mb-6"
      >
        <Globe className="w-24 h-24 text-blue-500 animate-pulse" strokeWidth={1.5} />
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full -z-10" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white overflow-hidden relative"
      >
        <span className="relative z-10">WORLD INFORMAT STUDIO</span>
        <div className="absolute inset-0 shimmer opacity-30" />
      </motion.h1>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ delay: 1, duration: 1 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4"
      />
    </motion.div>
  );
}
