import { SidebarNav } from '@/components/sidebar-nav'
import { StatusCard } from '@/components/status-card'
import { ServerGrid } from '@/components/server-grid'
import { RecentActivity } from '@/components/recent-activity'
import { Activity, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
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
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground">Monitor and manage your game servers</p>
          </div>

          {/* Status Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <StatusCard
              title="Total Servers"
              value="12"
              metric="+2 this month"
              status="online"
            />
            <StatusCard
              title="Online Servers"
              value="10"
              metric="83.3%"
              status="online"
            />
            <StatusCard
              title="Total Players"
              value="247"
              metric="+32 online"
              status="online"
            />
            <StatusCard
              title="Alerts"
              value="1"
              metric="Low disk space"
              status="warning"
              icon={<AlertCircle className="h-4 w-4" />}
            />
          </div>

          {/* Server Grid */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Your Servers</h3>
            <ServerGrid />
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-foreground">Recent Activity</h3>
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
