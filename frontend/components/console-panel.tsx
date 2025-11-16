'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SendHorizontal, Copy, Trash2 } from 'lucide-react'

const initialLogs = [
  { id: 1, type: 'info', message: '[00:12:45] Starting Minecraft server...', timestamp: '00:12:45' },
  { id: 2, type: 'info', message: '[00:12:46] Loading properties', timestamp: '00:12:46' },
  { id: 3, type: 'success', message: '[00:12:48] Loaded 2 spawn chunks in 0.045s', timestamp: '00:12:48' },
  { id: 4, type: 'info', message: '[00:12:50] Preparing spawn area: 0%', timestamp: '00:12:50' },
  { id: 5, type: 'success', message: '[00:12:55] Done! Server running on 0.0.0.0:25565', timestamp: '00:12:55' },
  { id: 6, type: 'info', message: '[00:15:12] Player1 joined the game', timestamp: '00:15:12' },
  { id: 7, type: 'info', message: '[00:15:15] Player2 joined the game', timestamp: '00:15:15' },
  { id: 8, type: 'warning', message: '[00:18:30] [WARNING] Can\'t keep up! Is the server overloaded?', timestamp: '00:18:30' },
]

export function ConsolePanel() {
  const [logs, setLogs] = useState(initialLogs)
  const [command, setCommand] = useState('')
  const logsEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [logs])

  const handleSendCommand = () => {
    if (!command.trim()) return

    const newLog = {
      id: logs.length + 1,
      type: 'command',
      message: `> ${command}`,
      timestamp: new Date().toLocaleTimeString(),
    }

    setLogs([...logs, newLog])
    setCommand('')
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      case 'command':
        return 'text-accent'
      default:
        return 'text-foreground'
    }
  }

  return (
    <div className="space-y-4">
      {/* Console Output */}
      <Card className="border-border bg-card overflow-hidden flex flex-col h-96">
        <div className="bg-sidebar-accent/10 border-b border-border px-4 py-3 flex justify-between items-center">
          <h3 className="font-semibold text-foreground">Console Output</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLogs([])}
            className="text-xs"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-black/20 font-mono text-sm space-y-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex gap-2 hover:bg-sidebar-accent/10 px-2 py-1 rounded transition-colors"
            >
              <span className="text-muted-foreground flex-shrink-0 w-20">{log.timestamp}</span>
              <span className={`flex-1 ${getLogColor(log.type)}`}>{log.message}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </Card>

      {/* Command Input */}
      <Card className="border-border bg-card p-4">
        <label className="text-sm font-medium text-foreground block mb-3">Send Command</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
            placeholder="Enter server command..."
            className="flex-1 rounded-lg bg-input px-3 py-2 text-foreground border border-border placeholder-muted-foreground font-mono text-sm"
          />
          <Button
            onClick={handleSendCommand}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Examples: say Hello world, stop, save-all
        </p>
      </Card>

      {/* Filters */}
      <Card className="border-border bg-card p-4">
        <label className="text-sm font-medium text-foreground block mb-3">Log Filters</label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Info', 'Success', 'Warning', 'Error'].map((filter) => (
            <Button
              key={filter}
              variant={filter === 'All' ? 'default' : 'outline'}
              size="sm"
              className={filter === 'All' ? 'bg-accent text-accent-foreground' : ''}
            >
              {filter}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
