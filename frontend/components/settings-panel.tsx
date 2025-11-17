'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Lock, Palette, Server, AlertCircle, Check } from 'lucide-react'

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Settings Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Server },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'appearance', label: 'Appearance', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Application Name</label>
                <Input
                  type="text"
                  defaultValue="GameServ Manager"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Default Language</label>
                <select className="w-full mt-2 rounded-lg bg-input px-3 py-2 text-foreground border border-border">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Timezone</label>
                <select className="w-full mt-2 rounded-lg bg-input px-3 py-2 text-foreground border border-border">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>CST</option>
                  <option>PST</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Auto-backup Interval</label>
                <select className="w-full mt-2 rounded-lg bg-input px-3 py-2 text-foreground border border-border">
                  <option>Every 1 hour</option>
                  <option>Every 4 hours</option>
                  <option>Every 12 hours</option>
                  <option>Daily</option>
                  <option>Disabled</option>
                </select>
              </div>
              <Button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Server Down Alerts', desc: 'Get notified when servers go offline' },
                { label: 'High Resource Usage', desc: 'Alert when CPU/RAM usage exceeds 80%' },
                { label: 'Player Joined/Left', desc: 'Notify on significant player events' },
                { label: 'Backup Completion', desc: 'Alert when backups finish' },
                { label: 'Error Logs', desc: 'Get error and warning notifications' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent/5 border border-border">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              ))}
              <Button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-400">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                Enable 2FA
              </Button>

              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-4">API Keys</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-sidebar-accent/5 border border-border flex justify-between items-center">
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">sk_live_••••••••••••••••</p>
                      <p className="text-xs text-muted-foreground mt-1">Created 2024-10-15</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate New Key
                </Button>
              </div>

              <Button
                onClick={handleSave}
                className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Dark', value: 'dark', color: 'bg-gray-950' },
                    { name: 'Light', value: 'light', color: 'bg-white' },
                    { name: 'Auto', value: 'auto', color: 'bg-gradient-to-r from-gray-950 to-white' },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      className="p-4 rounded-lg border-2 border-border hover:border-accent transition-colors"
                    >
                      <div className={`w-full h-12 rounded-md ${theme.color} mb-2 border border-border`} />
                      <p className="text-sm font-medium text-foreground">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Accent Color</label>
                <div className="flex gap-3 mt-3">
                  {[
                    { name: 'Cyan', value: '#00d4ff' },
                    { name: 'Blue', value: '#3b82f6' },
                    { name: 'Purple', value: '#a855f7' },
                    { name: 'Green', value: '#10b981' },
                  ].map((color) => (
                    <button
                      key={color.value}
                      className="w-10 h-10 rounded-lg border-2 border-border hover:border-foreground transition-colors"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium text-foreground">Compact Mode</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-sm font-medium text-foreground">Animations</span>
                </label>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
