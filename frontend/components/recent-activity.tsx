'use client'

import { Card } from '@/components/ui/card'
import { Clock, AlertCircle, CheckCircle, Settings } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'restart',
    message: 'Minecraft Survival restarted',
    timestamp: '2 hours ago',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    id: 2,
    type: 'alert',
    message: 'Low disk space on Testing Server',
    timestamp: '4 hours ago',
    icon: AlertCircle,
    color: 'text-yellow-400',
  },
  {
    id: 3,
    type: 'backup',
    message: 'Backup completed for Minecraft Creative',
    timestamp: '1 day ago',
    icon: CheckCircle,
    color: 'text-blue-400',
  },
  {
    id: 4,
    type: 'update',
    message: 'Server configuration updated',
    timestamp: '2 days ago',
    icon: Settings,
    color: 'text-accent',
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-sidebar-accent/5 transition-colors">
              <Icon className={`h-5 w-5 flex-shrink-0 ${activity.color}`} />
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.message}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
