"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ProbabilityHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [probabilities, setProbabilities] = useState<number[][]>([])

  useEffect(() => {
    // Initialize probabilities
    const initial: number[][] = []
    for (let i = 0; i < 16; i++) {
      const row: number[] = []
      for (let j = 0; j < 16; j++) {
        row.push(Math.random())
      }
      initial.push(row)
    }
    setProbabilities(initial)

    // Update periodically
    const interval = setInterval(() => {
      setProbabilities((prev) =>
        prev.map((row) =>
          row.map((p) => Math.max(0, Math.min(1, p + (Math.random() - 0.5) * 0.1)))
        )
      )
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || probabilities.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellWidth = canvas.width / 16
    const cellHeight = canvas.height / 16

    probabilities.forEach((row, i) => {
      row.forEach((p, j) => {
        // Blue to cyan gradient based on probability
        const r = Math.floor(37 + (6 - 37) * p)
        const g = Math.floor(99 + (182 - 99) * p)
        const b = Math.floor(235 + (212 - 235) * p)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.2 + p * 0.8})`
        ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth - 1, cellHeight - 1)
      })
    })
  }, [probabilities])

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#2563eb] mb-1">
            PROBABILITY DISTRIBUTION
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            256-state amplitude heatmap
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gradient-to-r from-[#2563eb]/20 to-[#06b6d4]" />
          <span className="font-mono text-[10px] text-muted-foreground">0 → 1</span>
        </div>
      </div>

      <div className="relative aspect-square border border-white/10">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full"
        />

        {/* Axis labels */}
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between font-mono text-[8px] text-muted-foreground">
          <span>|0000⟩</span>
          <span>|1111⟩</span>
        </div>
        <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-between font-mono text-[8px] text-muted-foreground writing-mode-vertical">
          <span style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>|0000⟩</span>
          <span style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>|1111⟩</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/10">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground mb-1">MAX PROB</p>
          <p className="font-mono text-sm text-[#06b6d4]">
            {probabilities.length > 0
              ? (Math.max(...probabilities.flat()) * 100).toFixed(2)
              : 0}%
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground mb-1">MIN PROB</p>
          <p className="font-mono text-sm text-[#2563eb]">
            {probabilities.length > 0
              ? (Math.min(...probabilities.flat()) * 100).toFixed(2)
              : 0}%
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground mb-1">ENTROPY</p>
          <p className="font-mono text-sm text-white">
            {probabilities.length > 0
              ? (
                  -probabilities.flat().reduce((sum, p) => {
                    const normalized = p / probabilities.flat().reduce((a, b) => a + b, 0)
                    return sum + (normalized > 0 ? normalized * Math.log2(normalized) : 0)
                  }, 0)
                ).toFixed(3)
              : 0}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground mb-1">PURITY</p>
          <p className="font-mono text-sm text-[#10b981]">
            {probabilities.length > 0
              ? (
                  probabilities.flat().reduce((sum, p) => sum + p * p, 0) /
                  Math.pow(probabilities.flat().reduce((a, b) => a + b, 0), 2) *
                  256
                ).toFixed(4)
              : 0}
          </p>
        </div>
      </div>
    </div>
  )
}
