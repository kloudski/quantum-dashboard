"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface DataPoint {
  time: number
  coherence: number
  fidelity: number
  errorRate: number
}

export default function CoherenceChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // Initialize with some data
    const initialData: DataPoint[] = []
    for (let i = 0; i < 50; i++) {
      initialData.push({
        time: i,
        coherence: 0.95 - i * 0.008 + Math.random() * 0.05,
        fidelity: 0.99 - i * 0.002 + Math.random() * 0.02,
        errorRate: 0.01 + i * 0.001 + Math.random() * 0.005,
      })
    }
    setData(initialData)

    // Update data periodically
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1]
        const newPoint: DataPoint = {
          time: last.time + 1,
          coherence: Math.max(0.3, last.coherence - 0.008 + Math.random() * 0.01),
          fidelity: Math.max(0.7, last.fidelity - 0.002 + Math.random() * 0.004),
          errorRate: Math.min(0.15, last.errorRate + 0.001 + Math.random() * 0.002),
        }
        return [...prev.slice(1), newPoint]
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb] mb-1">
            COHERENCE DECAY
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Real-time decoherence monitoring
          </p>
        </div>
        <div className="flex gap-4 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-[#2563eb]" />
            <span className="text-muted-foreground">COHERENCE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-[#06b6d4]" />
            <span className="text-muted-foreground">FIDELITY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-[#ef4444]" />
            <span className="text-muted-foreground">ERROR</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.3)"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)" }}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)" }}
              tickLine={false}
              domain={[0, 1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 0,
                fontFamily: "monospace",
                fontSize: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="coherence"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="fidelity"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="errorRate"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
        {data.length > 0 && (
          <>
            <motion.div
              animate={{
                color: data[data.length - 1].coherence > 0.7 ? "#10b981" : "#ef4444",
              }}
            >
              <p className="font-mono text-[10px] text-muted-foreground mb-1">
                CURRENT T2
              </p>
              <p className="font-mono text-xl">
                {(data[data.length - 1].coherence * 100).toFixed(1)}%
              </p>
            </motion.div>
            <div>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">
                GATE FIDELITY
              </p>
              <p className="font-mono text-xl text-[#06b6d4]">
                {(data[data.length - 1].fidelity * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">
                ERROR RATE
              </p>
              <p className="font-mono text-xl text-[#ef4444]">
                {(data[data.length - 1].errorRate * 100).toFixed(3)}%
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
