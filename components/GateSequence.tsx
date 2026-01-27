"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const gates = ["H", "X", "Y", "Z", "CNOT", "T", "S", "RX", "RY", "RZ"]

interface GateOp {
  id: number
  gate: string
  qubit: number
  controlQubit?: number
  timestamp: number
}

export default function GateSequence() {
  const [operations, setOperations] = useState<GateOp[]>([])
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const gate = gates[Math.floor(Math.random() * gates.length)]
      const newOp: GateOp = {
        id: Date.now(),
        gate,
        qubit: Math.floor(Math.random() * 8),
        controlQubit: gate === "CNOT" ? Math.floor(Math.random() * 8) : undefined,
        timestamp: Date.now(),
      }

      setOperations((prev) => [...prev.slice(-15), newOp])
    }, 300)

    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb] mb-1">
            GATE SEQUENCE
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Real-time quantum circuit operations
          </p>
        </div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-3 py-1 font-mono text-[10px] tracking-wider border transition-colors ${
            isRunning
              ? "border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10"
              : "border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10"
          }`}
        >
          {isRunning ? "PAUSE" : "RESUME"}
        </button>
      </div>

      {/* Circuit visualization */}
      <div className="relative overflow-hidden h-[200px] border border-white/10 bg-white/[0.01]">
        {/* Qubit lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-white/10"
            style={{ top: `${12.5 + i * 12.5}%` }}
          >
            <span className="absolute -left-2 -translate-x-full font-mono text-[8px] text-muted-foreground -translate-y-1/2">
              q{i}
            </span>
          </div>
        ))}

        {/* Gate operations */}
        <AnimatePresence>
          {operations.map((op, idx) => (
            <motion.div
              key={op.id}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: `${(15 - idx) * 60}px`, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute"
              style={{ top: `${12.5 + op.qubit * 12.5}%`, transform: "translateY(-50%)" }}
            >
              <div
                className={`px-2 py-1 font-mono text-[10px] border ${
                  op.gate === "CNOT"
                    ? "border-[#8b5cf6] bg-[#8b5cf6]/20 text-[#8b5cf6]"
                    : op.gate === "H"
                    ? "border-[#2563eb] bg-[#2563eb]/20 text-[#2563eb]"
                    : "border-white/30 bg-white/5 text-white/80"
                }`}
              >
                {op.gate}
              </div>
              {op.controlQubit !== undefined && (
                <div
                  className="absolute w-px bg-[#8b5cf6]"
                  style={{
                    height: `${Math.abs(op.controlQubit - op.qubit) * 12.5}%`,
                    top: op.controlQubit > op.qubit ? "100%" : "auto",
                    bottom: op.controlQubit < op.qubit ? "100%" : "auto",
                    left: "50%",
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Operation log */}
      <div className="mt-4 p-3 border border-white/10 bg-white/[0.01] h-24 overflow-y-auto">
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground mb-2">
          OPERATION LOG
        </p>
        <div className="space-y-1">
          {operations.slice(-5).reverse().map((op) => (
            <div key={op.id} className="font-mono text-[10px] text-white/60">
              <span className="text-muted-foreground">
                {new Date(op.timestamp).toISOString().split("T")[1].slice(0, 12)}
              </span>
              {" "}
              <span className="text-[#2563eb]">{op.gate}</span>
              {" "}on Q{op.qubit}
              {op.controlQubit !== undefined && ` (ctrl: Q${op.controlQubit})`}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
