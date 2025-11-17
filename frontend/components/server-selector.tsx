'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server, Download, RotateCw } from 'lucide-react'

const servers = [
  { id: 1, name: 'Minecraft Survival' },
  { id: 2, name: 'Minecraft Creative' },
  { id: 3, name: 'Testing Server' },
  { id: 4, name: 'Modded SkyBlock' },
]

export function ServerSelector() {
  const [selectedId, setSelectedId] = useState(1)

  return (
    <Card className="border-border bg-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground">Select Server</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="mt-2 w-full rounded-lg bg-input px-3 py-2 text-foreground border border-border"
          >
            {servers.map((server) => (
              <option key={server.id} value={server.id}>
                <Server className="h-4 w-4 inline mr-2" />
                {server.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Export</span>
          </Button>
          <Button variant="outline" size="sm">
            <RotateCw className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
