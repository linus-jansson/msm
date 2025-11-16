'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server, Play, Square, RotateCw, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const mockServers = [
  {
    id: 1,
    name: 'Minecraft Survival',
    type: 'Minecraft',
    status: 'online',
    players: '45/50',
    uptime: '28d 4h',
    port: 25565,
  },
  {
    id: 2,
    name: 'Minecraft Creative',
    type: 'Minecraft',
    status: 'online',
    players: '12/30',
    uptime: '15d 2h',
    port: 25566,
  },
  {
    id: 3,
    name: 'Testing Server',
    type: 'Minecraft',
    status: 'offline',
    players: '0/20',
    uptime: '0h',
    port: 25567,
  },
  {
    id: 4,
    name: 'Modded SkyBlock',
    type: 'Minecraft',
    status: 'online',
    players: '8/15',
    uptime: '7d 18h',
    port: 25568,
  },
]

export function ServerGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockServers.map((server) => (
        <Card
          key={server.id}
          className="border-border bg-card p-6 hover:border-accent/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-sidebar-primary/10 p-3">
                <Server className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-card-foreground">{server.name}</h4>
                <p className="text-sm text-muted-foreground">{server.type} • Port {server.port}</p>
              </div>
            </div>
            <div
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                server.status === 'online'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              )}
            >
              {server.status === 'online' ? '● Online' : '● Offline'}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Players</p>
              <p className="mt-1 font-semibold text-foreground">{server.players}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Uptime</p>
              <p className="mt-1 font-semibold text-foreground">{server.uptime}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {server.status === 'online' ? (
              <>
                <Button size="sm" variant="outline" className="flex-1">
                  <Square className="h-3 w-3 mr-2" />
                  Stop
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <RotateCw className="h-3 w-3 mr-2" />
                  Restart
                </Button>
              </>
            ) : (
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Play className="h-3 w-3 mr-2" />
                Start
              </Button>
            )}
            <Button size="sm" variant="outline">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
