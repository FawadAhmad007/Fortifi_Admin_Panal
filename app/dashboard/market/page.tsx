"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CryptoChart } from "@/components/crypto-chart"
import { cryptoMarketData } from "@/lib/data"
import { Search, TrendingUp, TrendingDown, Star, ArrowUpDown, RefreshCw } from "lucide-react"

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter crypto data based on search term
  const filteredCrypto = cryptoMarketData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Bitcoin price chart data
  const bitcoinPriceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: [42000, 38000, 41000, 45000, 52000, 58000, 63000, 61000, 59000, 64000, 67000, 68432],
        borderColor: "#FEB019",
        backgroundColor: "rgba(254, 176, 25, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // Market cap distribution chart data
  const marketCapData = {
    labels: cryptoMarketData.map((crypto) => crypto.name),
    datasets: [
      {
        label: "Market Cap",
        data: cryptoMarketData.map((crypto) => crypto.marketCap / 1000000000), // Convert to billions
        backgroundColor: ["#A700E6", "#00E396", "#FEB019", "#FF3B5F", "#775DD0"],
        borderWidth: 0,
      },
    ],
  }

  // 24h volume chart data
  const volumeData = {
    labels: cryptoMarketData.map((crypto) => crypto.symbol),
    datasets: [
      {
        label: "24h Volume (USD)",
        data: cryptoMarketData.map((crypto) => crypto.volume24h / 1000000000), // Convert to billions
        backgroundColor: "#A700E6",
        borderWidth: 0,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Market Data</h1>
            <p className="text-muted-foreground">Cryptocurrency market information and trends</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-secondary-600 text-primary-300 border-primary-700 px-3 py-1">
              <RefreshCw className="mr-1 h-3 w-3" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary-600 p-1">
            <TabsTrigger
              value="overview"
              className={
                activeTab === "overview"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Market Overview
            </TabsTrigger>
            <TabsTrigger
              value="watchlist"
              className={
                activeTab === "watchlist"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Watchlist
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className={
                activeTab === "trends"
                  ? "bg-primary text-white data-[state=active]:bg-primary"
                  : "text-gray-400 hover:text-white"
              }
            >
              Market Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search cryptocurrencies..."
                className="w-full pl-8 bg-secondary-500 border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Cryptocurrency Market</CardTitle>
                <CardDescription className="text-gray-400">Latest prices and market data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg glass-effect overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Coin
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            24h Change
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            24h Volume
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Market Cap
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Last 7 Days
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCrypto.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                              No cryptocurrencies found matching your search.
                            </td>
                          </tr>
                        ) : (
                          filteredCrypto.map((crypto) => (
                            <tr key={crypto.id} className="border-b border-white/10 hover:bg-white/5">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    {crypto.symbol.charAt(0)}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-white">{crypto.name}</div>
                                    <div className="text-xs text-gray-400">{crypto.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="text-sm font-medium text-white">
                                  $
                                  {crypto.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div
                                  className={`text-sm font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                                >
                                  <div className="flex items-center justify-end">
                                    {crypto.change24h >= 0 ? (
                                      <TrendingUp className="mr-1 h-3 w-3" />
                                    ) : (
                                      <TrendingDown className="mr-1 h-3 w-3" />
                                    )}
                                    {crypto.change24h >= 0 ? "+" : ""}
                                    {crypto.change24h.toFixed(2)}%
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="text-sm text-gray-300">
                                  ${(crypto.volume24h / 1000000000).toFixed(2)}B
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="text-sm text-gray-300">
                                  ${(crypto.marketCap / 1000000000).toFixed(2)}B
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <div className="h-8 w-24 ml-auto">
                                  <CryptoChart
                                    type="line"
                                    height={30}
                                    className="ml-auto"
                                    data={{
                                      labels: ["", "", "", "", "", "", ""],
                                      datasets: [
                                        {
                                          label: "Price",
                                          data: crypto.sparkline,
                                          borderColor: crypto.change24h >= 0 ? "#00E396" : "#FF3B5F",
                                          borderWidth: 2,
                                          tension: 0.4,
                                        },
                                      ],
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Bitcoin Price History</CardTitle>
                  <CardDescription className="text-gray-400">BTC price over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="line" height={300} data={bitcoinPriceData} />
                </CardContent>
              </Card>

              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="text-white">Market Cap Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Market cap share by cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="pie" height={300} data={marketCapData} />
                </CardContent>
              </Card>

              <Card className="crypto-card col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">24h Trading Volume</CardTitle>
                  <CardDescription className="text-gray-400">Trading volume by cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent>
                  <CryptoChart type="bar" height={300} data={volumeData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Your Watchlist</CardTitle>
                <CardDescription className="text-gray-400">Cryptocurrencies you're monitoring</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Star className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-white">Watchlist is empty</p>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                    You haven't added any cryptocurrencies to your watchlist yet. Use the star icon to add coins to your
                    watchlist.
                  </p>
                  <Button className="mt-4 bg-primary hover:bg-primary/90">Browse Market</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-white">Market Trends</CardTitle>
                <CardDescription className="text-gray-400">Current market trends and analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <ArrowUpDown className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-white">Coming Soon</p>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                    Market trends analysis is currently under development and will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

