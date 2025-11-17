import { SidebarNav } from '@/components/sidebar-nav'
import { ServerSelector } from '@/components/server-selector'
import { ConsolePanel } from '@/components/console-panel'
import { Activity } from 'lucide-react'

export default function ConsolePage() {
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
            <h2 className="text-3xl font-bold text-foreground">Server Console</h2>
            <p className="text-muted-foreground">View logs and send commands to your servers</p>
          </div>

          <div className="space-y-6">
            <ServerSelector />
            <ConsolePanel />
          </div>
        </div>
      </main>
    </div>
  )
}
