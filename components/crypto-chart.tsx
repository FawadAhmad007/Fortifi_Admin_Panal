"use client"

import { useEffect, useRef } from "react"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
    fill?: boolean
    tension?: number
  }[]
}

interface CryptoChartProps {
  type: "line" | "bar" | "pie" | "doughnut" | "area"
  height?: number
  data: ChartData
  options?: any
  className?: string
}

export function CryptoChart({ type = "line", height = 300, data, options = {}, className = "" }: CryptoChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chartElement = chartRef.current

      // This is a visual representation of a chart since we can't use actual chart libraries in this environment
      // In a real implementation, you would use a charting library like Chart.js or ApexCharts

      // Create a canvas element
      const canvas = document.createElement("canvas")
      canvas.width = chartElement.clientWidth
      canvas.height = height
      canvas.style.width = "100%"
      canvas.style.height = `${height}px`

      // Clear previous content
      chartElement.innerHTML = ""
      chartElement.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set background
      ctx.fillStyle = "rgba(30, 30, 45, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw chart based on type
      if (type === "line" || type === "area") {
        drawLineChart(ctx, canvas.width, canvas.height, data)
      } else if (type === "bar") {
        drawBarChart(ctx, canvas.width, canvas.height, data)
      } else if (type === "pie" || type === "doughnut") {
        drawPieChart(ctx, canvas.width, canvas.height, data, type === "doughnut")
      }
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = ""
      }
    }
  }, [type, data, options, height])

  // Function to draw a line chart
  const drawLineChart = (ctx: CanvasRenderingContext2D, width: number, height: number, data: ChartData) => {
    const { labels, datasets } = data
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 1; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, height - y)
      ctx.lineTo(width - padding, height - y)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    const labelStep = Math.max(1, Math.floor(labels.length / 10))
    for (let i = 0; i < labels.length; i += labelStep) {
      const x = padding + (chartWidth / (labels.length - 1)) * i
      ctx.fillText(labels[i], x, height - padding + 15)
    }

    // Draw datasets
    datasets.forEach((dataset, datasetIndex) => {
      const { data: values, borderColor = "#A700E6" } = dataset

      ctx.strokeStyle = Array.isArray(borderColor) ? borderColor[0] : borderColor
      ctx.lineWidth = 2
      ctx.beginPath()

      // Draw line
      for (let i = 0; i < values.length; i++) {
        const x = padding + (chartWidth / (values.length - 1)) * i
        const normalizedValue = Math.min(1, Math.max(0, values[i] / Math.max(...values)))
        const y = height - padding - normalizedValue * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Fill area if it's an area chart
      if (type === "area") {
        const lastX = padding + chartWidth
        const lastY = height - padding
        const firstX = padding

        ctx.lineTo(lastX, lastY)
        ctx.lineTo(firstX, lastY)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, "rgba(167, 0, 230, 0.5)")
        gradient.addColorStop(1, "rgba(167, 0, 230, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw points
      ctx.fillStyle = Array.isArray(borderColor) ? borderColor[0] : borderColor
      for (let i = 0; i < values.length; i++) {
        const x = padding + (chartWidth / (values.length - 1)) * i
        const normalizedValue = Math.min(1, Math.max(0, values[i] / Math.max(...values)))
        const y = height - padding - normalizedValue * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }

  // Function to draw a bar chart
  const drawBarChart = (ctx: CanvasRenderingContext2D, width: number, height: number, data: ChartData) => {
    const { labels, datasets } = data
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 1; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, height - y)
      ctx.lineTo(width - padding, height - y)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    const barWidth = chartWidth / labels.length / datasets.length

    for (let i = 0; i < labels.length; i++) {
      const x = padding + (chartWidth / labels.length) * (i + 0.5)
      ctx.fillText(labels[i], x, height - padding + 15)
    }

    // Draw datasets
    datasets.forEach((dataset, datasetIndex) => {
      const { data: values, backgroundColor = "#A700E6" } = dataset

      for (let i = 0; i < values.length; i++) {
        const barX = padding + (chartWidth / labels.length) * i + barWidth * datasetIndex
        const normalizedValue = Math.min(1, Math.max(0, values[i] / Math.max(...values)))
        const barHeight = normalizedValue * chartHeight

        ctx.fillStyle = Array.isArray(backgroundColor) ? backgroundColor[i % backgroundColor.length] : backgroundColor
        ctx.fillRect(barX, height - padding - barHeight, barWidth * 0.8, barHeight)
      }
    })
  }

  // Function to draw a pie/doughnut chart
  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: ChartData,
    isDoughnut: boolean,
  ) => {
    const { labels, datasets } = data
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    const values = datasets[0].data
    const colors = Array.isArray(datasets[0].backgroundColor)
      ? datasets[0].backgroundColor
      : generateColors(values.length)

    const total = values.reduce((sum, value) => sum + value, 0)
    let startAngle = -Math.PI / 2

    // Draw slices
    for (let i = 0; i < values.length; i++) {
      const sliceAngle = (values[i] / total) * Math.PI * 2
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Draw slice border
      ctx.strokeStyle = "rgba(30, 30, 45, 1)"
      ctx.lineWidth = 1
      ctx.stroke()

      startAngle = endAngle
    }

    // Draw doughnut hole
    if (isDoughnut) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(30, 30, 45, 1)"
      ctx.fill()
    }

    // Draw legend
    const legendX = width - 120
    const legendY = 30

    ctx.font = "10px Arial"
    ctx.textAlign = "left"

    for (let i = 0; i < Math.min(labels.length, 5); i++) {
      const y = legendY + i * 20

      // Draw color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(legendX, y, 10, 10)

      // Draw label
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.fillText(labels[i], legendX + 15, y + 8)
    }
  }

  // Helper function to generate colors
  const generateColors = (count: number) => {
    const colors = [
      "#A700E6",
      "#00E396",
      "#FEB019",
      "#FF3B5F",
      "#775DD0",
      "#3F51B5",
      "#03A9F4",
      "#4CAF50",
      "#F9CE1D",
      "#FF9800",
    ]

    return Array(count)
      .fill(0)
      .map((_, i) => colors[i % colors.length])
  }

  return <div ref={chartRef} className={`chart-container ${className}`} style={{ height: `${height}px` }}></div>
}

