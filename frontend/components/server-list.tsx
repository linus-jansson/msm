'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Server, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const mockServers = [
  { id: 1, name: 'Minecraft Survival', type: 'Minecraft', status: 'online' },
  { id: 2, name: 'Minecraft Creative', type: 'Minecraft', status: 'online' },
  { id: 3, name: 'Testing Server', type: 'Minecraft', status: 'offline' },
  { id: 4, name: 'Modded SkyBlock', type: 'Minecraft', status: 'online' },
]

export function ServerList() {
  const [selectedServerId, setSelectedServerId] = useState(1)

  return (
    <div className="space-y-4">
      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        <Plus className="h-4 w-4 mr-2" />
        Add Server
      </Button>

      <Card className="border-border bg-card p-4">
        <div className="space-y-2">
          {mockServers.map((server) => (
            <button
              key={server.id}
              onClick={() => setSelectedServerId(server.id)}
              className={cn(
                'w-full rounded-lg border p-4 text-left transition-all',
                selectedServerId === server.id
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-accent/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-sidebar-primary/10">
                  <Server className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{server.name}</p>
                  <p className="text-xs text-muted-foreground">{server.type}</p>
                </div>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    server.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
