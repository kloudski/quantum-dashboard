"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Qubit {
  id: number
  alpha: number
  beta: number
  phase: number
  coherence: number
}

function generateQubitState(): Qubit {
  const alpha = Math.random()
  const beta = Math.sqrt(1 - alpha * alpha)
  return {
    id: Math.random(),
    alpha,
    beta,
    phase: Math.random() * Math.PI * 2,
    coherence: 0.7 + Math.random() * 0.3,
  }
}

export default function QubitStates() {
  const [qubits, setQubits] = useState<Qubit[]>([])

  useEffect(() => {
    setQubits(Array.from({ length: 8 }, generateQubitState))

    const interval = setInterval(() => {
      setQubits((prev) =>
        prev.map((q) => ({
          ...q,
          alpha: Math.max(0, Math.min(1, q.alpha + (Math.random() - 0.5) * 0.1)),
          beta: Math.max(0, Math.min(1, q.beta + (Math.random() - 0.5) * 0.1)),
          phase: (q.phase + 0.1) % (Math.PI * 2),
          coherence: Math.max(0.5, Math.min(1, q.coherence - 0.002 + Math.random() * 0.004)),
        }))
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb] mb-1">
            QUBIT ARRAY
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            8-qubit register coherence
          </p>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          T2* DECAY ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {qubits.map((qubit, idx) => (
          <motion.div
            key={idx}
            className="relative aspect-square border border-white/10 bg-white/[0.02] p-3"
            animate={{
              borderColor: qubit.coherence > 0.8 ? "rgba(37, 99, 235, 0.5)" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Qubit visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-full h-full relative"
                animate={{
                  rotate: (qubit.phase * 180) / Math.PI,
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Bloch sphere representation */}
                <div className="absolute inset-2 border border-white/20 rounded-full" />
                <motion.div
                  className="absolute w-2 h-2 bg-[#2563eb] rounded-full"
                  style={{
                    left: `calc(50% + ${Math.cos(qubit.phase) * qubit.alpha * 40}% - 4px)`,
                    top: `calc(50% - ${Math.sin(qubit.phase) * qubit.beta * 40}% - 4px)`,
                  }}
                  animate={{
                    boxShadow: qubit.coherence > 0.8
                      ? "0 0 10px #2563eb, 0 0 20px #2563eb"
                      : "0 0 5px #2563eb",
                  }}
                />
              </motion.div>
            </div>

            {/* Qubit label */}
            <div className="absolute bottom-1 left-1 font-mono text-[8px] text-muted-foreground">
              Q{idx}
            </div>

            {/* Coherence indicator */}
            <div className="absolute bottom-1 right-1 font-mono text-[8px]">
              <span
                className={
                  qubit.coherence > 0.8
                    ? "text-[#10b981]"
                    : qubit.coherence > 0.6
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              >
                {(qubit.coherence * 100).toFixed(0)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* State vector display */}
      <div className="mt-4 p-3 border border-white/10 bg-white/[0.01]">
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground mb-2">
          STATE VECTOR |ψ⟩
        </p>
        <div className="font-mono text-xs text-white/80 overflow-x-auto whitespace-nowrap">
          {qubits.slice(0, 4).map((q, i) => (
            <span key={i}>
              {q.alpha.toFixed(2)}|{i.toString(2).padStart(3, "0")}⟩ +{" "}
            </span>
          ))}
          ...
        </div>
      </div>
    </div>
  )
}
