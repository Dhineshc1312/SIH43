"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, BarChart3, MapPin } from "lucide-react"

// Types
type Farm = {
  id: string
  name?: string
  location?: string
}

type FirestoreTimestamp = {
  seconds: number
  nanoseconds: number
}

type Prediction = {
  farm_id: string
  created_at: FirestoreTimestamp
  outputs?: {
    predicted_yield_kg_per_ha?: number
  }
}

// Optional: type API responses if apiClient isn’t already generic
type FarmsResponse = { farms: Farm[] }
type PredictionsResponse = { predictions: Prediction[] }

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const [farms, setFarms] = useState<Farm[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }
    if (user) {
      loadDashboardData()
    }
  }, [user, loading, router])

  const loadDashboardData = async () => {
    try {
      const [farmsResponse, predictionsResponse] = await Promise.all([
        apiClient.getFarms() as Promise<FarmsResponse>,
        apiClient.getPredictions() as Promise<PredictionsResponse>,
      ])
      setFarms(farmsResponse.farms)
      setPredictions(predictionsResponse.predictions)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setIsLoadingData(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login via useEffect
  }

  const avgYield =
    predictions.length > 0
      ? predictions.reduce((sum, pred) => {
          const val = pred.outputs?.predicted_yield_kg_per_ha ?? 0
          return sum + val
        }, 0) / predictions.length
      : 0

  const lastPredictionDate =
    predictions.length > 0
      ? Math.floor(
          (Date.now() - new Date(predictions[0].created_at.seconds * 1000).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.name}!</h1>
          <p className="text-muted-foreground mt-2">Here's an overview of your farms and recent predictions.</p>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalFarms={farms.length}
          totalPredictions={predictions.length}
          avgYield={avgYield}
          lastPrediction={lastPredictionDate.toString()}
        />

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Farm Management
              </CardTitle>
              <CardDescription>
                Manage your farm locations and view detailed information about each property.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href="/dashboard/farms">
                  <Button variant="outline">View Farms</Button>
                </Link>
                <Link href="/dashboard/farms">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Farm
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Yield Predictions
              </CardTitle>
              <CardDescription>Make new predictions or view your prediction history and analytics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href="/dashboard/predictions">
                  <Button variant="outline">View History</Button>
                </Link>
                <Link href="/dashboard/predictions/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Prediction
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {predictions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions</CardTitle>
              <CardDescription>Your latest yield predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.slice(0, 3).map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Farm: {prediction.farm_id}</p>
                      <p className="text-sm text-muted-foreground">
                        Predicted: {(prediction.outputs?.predicted_yield_kg_per_ha ?? 0).toFixed(1)} kg/ha
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(prediction.created_at.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}


