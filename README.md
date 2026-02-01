# Quantum Dashboard

High-density data interface visualizing probabilistic states and quantum qubit coherence.

## Overview

A real-time dashboard for monitoring simulated quantum computing systems. Features animated charts, qubit state visualization, and gate operation tracking with a dark mode aesthetic and neon accents.

## Features

- **Qubit State Visualization** - 8-qubit register with Bloch sphere representations
- **Coherence Monitoring** - Real-time T2 decay and fidelity tracking
- **Gate Sequence Display** - Live quantum circuit operations
- **Probability Heatmap** - 256-state amplitude distribution visualization

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Charts**: Recharts, D3.js
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
├── app/
│   ├── globals.css           # Tech-mono styling
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main dashboard
├── components/
│   ├── QubitStates.tsx       # Qubit array visualization
│   ├── CoherenceChart.tsx    # T2 decay charts
│   ├── GateSequence.tsx      # Circuit operations
│   └── ProbabilityHeatmap.tsx # Amplitude distribution
```

## Design System

This project follows the **tech-mono** design language:
- Near-black backgrounds (`#0a0a0a`)
- Neon accents (blue `#2563eb`, cyan `#06b6d4`, purple `#8b5cf6`)
- Monospace typography
- Sharp corners (0 border-radius)
- Animated data visualizations

---

**EPOCH V.1**
