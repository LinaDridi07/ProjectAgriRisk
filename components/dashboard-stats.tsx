import { Card } from "@/components/ui/card"
import { AlertTriangle, Bell, CheckCircle, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      label: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "+2 from yesterday",
      color: "text-destructive",
    },
    {
      label: "Notifications",
      value: "12",
      icon: Bell,
      trend: "5 unread",
      color: "text-primary",
    },
    {
      label: "Tasks Completed",
      value: "24",
      icon: CheckCircle,
      trend: "+8 this week",
      color: "text-secondary",
    },
    {
      label: "Risk Score",
      value: "68%",
      icon: TrendingUp,
      trend: "Moderate risk",
      color: "text-chart-3",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
