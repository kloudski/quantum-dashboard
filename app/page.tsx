"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Activity, Cpu, Zap, Clock } from "lucide-react"
import dynamic from "next/dynamic"

const QubitStates = dynamic(() => import("@/components/QubitStates"), {
  ssr: false,
  loading: () => <div className="h-64 border border-white/10 animate-pulse" />,
})

const CoherenceChart = dynamic(() => import("@/components/CoherenceChart"), {
  ssr: false,
  loading: () => <div className="h-96 border border-white/10 animate-pulse" />,
})

const GateSequence = dynamic(() => import("@/components/GateSequence"), {
  ssr: false,
  loading: () => <div className="h-80 border border-white/10 animate-pulse" />,
})

const ProbabilityHeatmap = dynamic(() => import("@/components/ProbabilityHeatmap"), {
  ssr: false,
  loading: () => <div className="h-96 border border-white/10 animate-pulse" />,
})

export default function Home() {
  const [systemTime, setSystemTime] = useState("")
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setSystemTime(now.toISOString().replace("T", " ").slice(0, 19))
      setUptime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb]">
              OBARO LABS
            </span>
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
              // QUANTUM DASHBOARD v1.0
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="font-mono text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3 inline mr-1" />
              {systemTime}
            </div>
            <a
              href="https://github.com/kloudski/obaro-quantum-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              SOURCE
            </a>
            <a
              href="https://kloudski.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
            >
              PORTFOLIO
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
              QUANTUM PROCESSOR ONLINE
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span className="text-muted-foreground">
              <Activity className="w-3 h-3 inline mr-1" />
              FIDELITY: <span className="text-[#10b981]">99.2%</span>
            </span>
            <span className="text-muted-foreground">
              <Cpu className="w-3 h-3 inline mr-1" />
              QUBITS: <span className="text-[#06b6d4]">8</span>
            </span>
            <span className="text-muted-foreground">
              <Zap className="w-3 h-3 inline mr-1" />
              TEMP: <span className="text-[#8b5cf6]">15mK</span>
            </span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          UPTIME: <span className="text-white">{formatUptime(uptime)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb] mb-2">
            01 — QUANTUM SYSTEM MONITOR
          </p>
          <h1 className="text-4xl font-light tracking-tight text-white">
            Probabilistic State Dashboard
          </h1>
          <p className="font-mono text-sm text-muted-foreground mt-2">
            Real-time visualization of quantum qubit coherence and gate operations
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QubitStates />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CoherenceChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GateSequence />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ProbabilityHeatmap />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-4 mt-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
            OBARO LABS // QUANTUM DASHBOARD EPOCH V.1
          </p>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  )
}
