'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, Shield, Ban, Trash2, UserPlus, Search } from 'lucide-react'

const mockPlayers = [
  {
    id: 1,
    name: 'Player1',
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    joinDate: '2024-01-15',
    playtime: '156h 45m',
    status: 'online',
    role: 'admin',
    lastSeen: 'now',
  },
  {
    id: 2,
    name: 'Player2',
    uuid: '223e4567-e89b-12d3-a456-426614174000',
    joinDate: '2024-02-10',
    playtime: '89h 20m',
    status: 'online',
    role: 'member',
    lastSeen: 'now',
  },
  {
    id: 3,
    name: 'Player3',
    uuid: '323e4567-e89b-12d3-a456-426614174000',
    joinDate: '2024-01-01',
    playtime: '432h 15m',
    status: 'offline',
    role: 'moderator',
    lastSeen: '2 hours ago',
  },
  {
    id: 4,
    name: 'Player4',
    uuid: '423e4567-e89b-12d3-a456-426614174000',
    joinDate: '2024-03-05',
    playtime: '12h 30m',
    status: 'offline',
    role: 'member',
    lastSeen: '1 day ago',
  },
  {
    id: 5,
    name: 'Player5',
    uuid: '523e4567-e89b-12d3-a456-426614174000',
    joinDate: '2024-02-20',
    playtime: '45h 10m',
    status: 'online',
    role: 'member',
    lastSeen: 'now',
  },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-500/10 text-red-400'
    case 'moderator':
      return 'bg-yellow-500/10 text-yellow-400'
    case 'member':
      return 'bg-blue-500/10 text-blue-400'
    default:
      return 'bg-gray-500/10 text-gray-400'
  }
}

export function PlayerManager() {
  const [players, setPlayers] = useState(mockPlayers)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Players</p>
            <p className="text-2xl font-bold text-foreground mt-2">{players.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Online Now</p>
            <p className="text-2xl font-bold text-green-400 mt-2">
              {players.filter((p) => p.status === 'online').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Admins</p>
            <p className="text-2xl font-bold text-red-400 mt-2">
              {players.filter((p) => p.role === 'admin').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Moderators</p>
            <p className="text-2xl font-bold text-yellow-400 mt-2">
              {players.filter((p) => p.role === 'moderator').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="border-border bg-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Whitelist
          </Button>
        </div>
      </Card>

      {/* Players Table */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/5">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Playtime</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Seen</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPlayers.map((player) => (
                <tr
                  key={player.id}
                  className="hover:bg-sidebar-accent/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{player.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{player.uuid}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          player.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm capitalize text-foreground">{player.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getRoleBadgeColor(player.role)}`}>
                      {player.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{player.playtime}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{player.lastSeen}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedId(expandedId === player.id ? null : player.id)}
                      className="p-1 hover:bg-sidebar-accent/10 rounded transition-colors"
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expanded Actions */}
        {expandedId && (
          <div className="border-t border-border bg-sidebar-accent/5 p-6">
            <div className="max-w-2xl">
              <h4 className="font-semibold text-foreground mb-4">
                Actions for {players.find((p) => p.id === expandedId)?.name}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="outline" className="text-accent border-accent/50">
                  <Shield className="h-4 w-4 mr-2" />
                  Promote
                </Button>
                <Button variant="outline" className="text-yellow-400 border-yellow-400/50">
                  <Ban className="h-4 w-4 mr-2" />
                  Mute
                </Button>
                <Button variant="outline" className="text-red-400 border-red-400/50">
                  <Ban className="h-4 w-4 mr-2" />
                  Ban
                </Button>
                <Button variant="outline" className="text-red-500 border-red-500/50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Kick
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
