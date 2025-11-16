'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Square, RotateCw, Download, Upload, Trash2, HardDrive, Cpu, Zap, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const cpuData = [
  { time: '00:00', cpu: 20 },
  { time: '04:00', cpu: 35 },
  { time: '08:00', cpu: 45 },
  { time: '12:00', cpu: 52 },
  { time: '16:00', cpu: 48 },
  { time: '20:00', cpu: 38 },
  { time: '24:00', cpu: 25 },
]

const ramData = [
  { time: '00:00', ram: 40 },
  { time: '04:00', ram: 52 },
  { time: '08:00', ram: 65 },
  { time: '12:00', ram: 72 },
  { time: '16:00', ram: 68 },
  { time: '20:00', ram: 55 },
  { time: '24:00', ram: 42 },
]

export function ServerDetailPanel() {
  return (
    <div className="space-y-6">
      {/* Server Info Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Minecraft Survival</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-sidebar-accent/5 p-4 border border-border">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">CPU Usage</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">52%</p>
            </div>
            <div className="rounded-lg bg-sidebar-accent/5 p-4 border border-border">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">RAM Usage</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">72%</p>
            </div>
            <div className="rounded-lg bg-sidebar-accent/5 p-4 border border-border">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Players</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">45/50</p>
            </div>
            <div className="rounded-lg bg-sidebar-accent/5 p-4 border border-border">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Uptime</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">28d 4h</p>
            </div>
          </div>

          {/* Server Controls */}
          <div className="flex flex-wrap gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button variant="outline">
              <RotateCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Backup
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-foreground mb-4">CPU Usage (24h)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-4">RAM Usage (24h)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="ram" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Server Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Server Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Server Port</label>
            <input 
              type="number" 
              defaultValue={25565}
              className="mt-2 w-full rounded-lg bg-input px-3 py-2 text-foreground border border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Max Players</label>
            <input 
              type="number" 
              defaultValue={50}
              className="mt-2 w-full rounded-lg bg-input px-3 py-2 text-foreground border border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Difficulty</label>
            <select className="mt-2 w-full rounded-lg bg-input px-3 py-2 text-foreground border border-border">
              <option>Easy</option>
              <option selected>Normal</option>
              <option>Hard</option>
            </select>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
