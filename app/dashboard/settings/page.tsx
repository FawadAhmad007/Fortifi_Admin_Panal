"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Settings, Shield, Bell, User, Key, Save, Lock, Mail, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "CryptoAdmin",
    siteDescription: "Admin panel for cryptocurrency management",
    supportEmail: "support@example.com",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    kycAlerts: true,
    securityAlerts: true,
    marketAlerts: false,
    newsAlerts: true,
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings</p>
        </div>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary-600 p-1">
            <TabsTrigger
              value="general"
              className={
                activeTab === "general"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className={
                activeTab === "security"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className={
                activeTab === "notifications"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName" className="text-gray-300">
                      Site Name
                    </Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralSettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail" className="text-gray-300">
                      Support Email
                    </Label>
                    <Input
                      id="supportEmail"
                      name="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={handleGeneralSettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription" className="text-gray-300">
                    Site Description
                  </Label>
                  <Input
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralSettingsChange}
                    className="bg-secondary-500 border-white/10"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-300">
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      name="timezone"
                      value={generalSettings.timezone}
                      onChange={handleGeneralSettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat" className="text-gray-300">
                      Date Format
                    </Label>
                    <Input
                      id="dateFormat"
                      name="dateFormat"
                      value={generalSettings.dateFormat}
                      onChange={handleGeneralSettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button onClick={handleSaveSettings} className="ml-auto bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Admin Profile</CardTitle>
                <CardDescription className="text-gray-400">Update your admin profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adminName" className="text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminName"
                        placeholder="Admin User"
                        className="bg-secondary-500 border-white/10 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail" className="text-gray-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@example.com"
                        className="bg-secondary-500 border-white/10 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-secondary-500 border-white/10 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPhone" className="text-gray-300">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminPhone"
                        placeholder="+1234567890"
                        className="bg-secondary-500 border-white/10 pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button onClick={handleSaveSettings} className="ml-auto bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg glass-effect p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                      <Lock className="h-5 w-5 text-primary-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Require 2FA for all admin logins</p>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={() =>
                      setSecuritySettings((prev) => ({
                        ...prev,
                        twoFactorAuth: !prev.twoFactorAuth,
                      }))
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-gray-300">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      name="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={handleSecuritySettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry" className="text-gray-300">
                      Password Expiry (days)
                    </Label>
                    <Input
                      id="passwordExpiry"
                      name="passwordExpiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={handleSecuritySettingsChange}
                      className="bg-secondary-500 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loginAttempts" className="text-gray-300">
                    Max Failed Login Attempts
                  </Label>
                  <Input
                    id="loginAttempts"
                    name="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecuritySettingsChange}
                    className="bg-secondary-500 border-white/10"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button onClick={handleSaveSettings} className="ml-auto bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg glass-effect p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/50">
                      <Mail className="h-5 w-5 text-primary-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Types</h3>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="font-medium text-white">KYC Alerts</p>
                      <p className="text-sm text-gray-400">New KYC submissions and status changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.kycAlerts}
                      onCheckedChange={() => handleNotificationToggle("kycAlerts")}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="font-medium text-white">Security Alerts</p>
                      <p className="text-sm text-gray-400">Login attempts and security events</p>
                    </div>
                    <Switch
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={() => handleNotificationToggle("securityAlerts")}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="font-medium text-white">Market Alerts</p>
                      <p className="text-sm text-gray-400">Significant market price changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketAlerts}
                      onCheckedChange={() => handleNotificationToggle("marketAlerts")}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-white">News Alerts</p>
                      <p className="text-sm text-gray-400">New articles and content updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newsAlerts}
                      onCheckedChange={() => handleNotificationToggle("newsAlerts")}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <Button onClick={handleSaveSettings} className="ml-auto bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

