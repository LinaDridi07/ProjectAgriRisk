import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CloudRain, FileText } from "lucide-react"

export function NotificationsCard() {
  const notifications = [
    {
      id: 1,
      message: "Reminder: Check the safety protocols for pesticide application.",
      icon: Bell,
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      message: "Update: New regulations on fertilizer usage have been implemented.",
      icon: FileText,
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      message: "Alert: Severe weather warning in your area. Please take precautions.",
      icon: CloudRain,
      time: "1 day ago",
      unread: false,
    },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          {notifications.filter((n) => n.unread).length} Unread
        </Badge>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div
              key={notification.id}
              className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                notification.unread
                  ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                  : "bg-accent/50 border-border hover:bg-accent"
              }`}
            >
              <Icon
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  notification.unread ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-2">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {notification.unread && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
