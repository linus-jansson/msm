import { SidebarNav } from '@/components/sidebar-nav'
import { ServerDetailPanel } from '@/components/server-detail-panel'
import { ServerList } from '@/components/server-list'
import { Activity } from 'lucide-react'

export default function ServersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <Activity className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">GameServ</h1>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Server Management</h2>
            <p className="text-muted-foreground">View and manage all your game servers</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ServerList />
            </div>
            <div className="lg:col-span-2">
              <ServerDetailPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
