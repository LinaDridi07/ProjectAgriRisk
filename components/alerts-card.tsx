import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShieldAlert, Info } from "lucide-react"

export function AlertsCard() {
  const alerts = [
    {
      id: 1,
      message: "Warning: Pesticide X is hazardous to health. Use protective gear.",
      severity: "high",
      icon: AlertTriangle,
    },
    {
      id: 2,
      message: "Alert: Fertilizer Y has been recalled due to contamination.",
      severity: "critical",
      icon: ShieldAlert,
    },
    {
      id: 3,
      message: "Notice: Equipment Z may pose safety risks if not handled properly.",
      severity: "medium",
      icon: Info,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "medium":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Alerts</h2>
        <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
          {alerts.length} Active
        </Badge>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon
          return (
            <div
              key={alert.id}
              className="flex gap-4 p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent transition-colors"
            >
              <Icon
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  alert.severity === "critical"
                    ? "text-destructive"
                    : alert.severity === "high"
                      ? "text-chart-3"
                      : "text-primary"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{alert.message}</p>
                <Badge className={`mt-2 ${getSeverityColor(alert.severity)}`}>{alert.severity.toUpperCase()}</Badge>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
