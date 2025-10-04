"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ActivityChart() {
  const data = [
    { date: "Mon", alerts: 4, tasks: 12 },
    { date: "Tue", alerts: 3, tasks: 15 },
    { date: "Wed", alerts: 5, tasks: 10 },
    { date: "Thu", alerts: 2, tasks: 18 },
    { date: "Fri", alerts: 6, tasks: 14 },
    { date: "Sat", alerts: 3, tasks: 8 },
    { date: "Sun", alerts: 4, tasks: 11 },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Weekly Activity</h2>
        <p className="text-sm text-muted-foreground">Alerts and tasks over the past 7 days</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="alerts"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorAlerts)"
          />
          <Area type="monotone" dataKey="tasks" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorTasks)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
