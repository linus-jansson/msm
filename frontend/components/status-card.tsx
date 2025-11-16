import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StatusCardProps {
  title: string
  value: string
  metric: string
  status?: 'online' | 'offline' | 'warning'
  icon?: ReactNode
}

export function StatusCard({
  title,
  value,
  metric,
  status = 'online',
  icon,
}: StatusCardProps) {
  const statusColors = {
    online: 'border-green-500/20 bg-green-500/5',
    offline: 'border-red-500/20 bg-red-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-6 backdrop-blur',
        statusColors[status]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{metric}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}
