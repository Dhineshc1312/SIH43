"use client"
import React from "react"


import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api"
import { Calendar, TrendingUp, MapPin, Loader2 } from "lucide-react"
import { format } from "date-fns"

// Define Prediction type to match your data structure
type Prediction = {
  farm_id: string
  status: string
  created_at: {
    seconds: number
    nanoseconds?: number
  }
  outputs?: {
    predicted_yield_kg_per_ha: number
    confidence_interval?: {
      lower: number
      upper: number
    }
  }
  inputs?: {
    crop: string
    area: number
    fertilizer: number
    pesticide: number
  }
  error?: string
}

export function PredictionHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPredictions()
  }, [])

  const loadPredictions = async () => {
    try {
      const response = await apiClient.getPredictions()
      setPredictions(response.predictions)
    } catch (error) {
      console.error("Error loading predictions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (predictions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Predictions Yet</CardTitle>
          <CardDescription>You haven't made any yield predictions yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => (window.location.href = "/dashboard/predictions/new")}>
            Make First Prediction
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Farm: {prediction.farm_id}
              </CardTitle>
              <Badge variant={prediction.status === "complete" ? "default" : "secondary"}>
                {prediction.status}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(prediction.created_at.seconds * 1000), "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {prediction.status === "complete" && prediction.outputs ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {prediction.outputs.predicted_yield_kg_per_ha} kg/ha
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Range: {prediction.outputs.confidence_interval?.lower.toFixed(1)} -{" "}
                      {prediction.outputs.confidence_interval?.upper.toFixed(1)} kg/ha
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-muted-foreground" />
                </div>

                {prediction.inputs && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Crop</div>
                      <div className="text-muted-foreground">{prediction.inputs.crop}</div>
                    </div>
                    <div>
                      <div className="font-medium">Area</div>
                      <div className="text-muted-foreground">{prediction.inputs.area} ha</div>
                    </div>
                    <div>
                      <div className="font-medium">Fertilizer</div>
                      <div className="text-muted-foreground">{prediction.inputs.fertilizer} kg</div>
                    </div>
                    <div>
                      <div className="font-medium">Pesticide</div>
                      <div className="text-muted-foreground">{prediction.inputs.pesticide} kg</div>
                    </div>
                  </div>
                )}
              </div>
            ) : prediction.status === "error" ? (
              <div className="text-destructive">
                <p>Prediction failed: {prediction.error}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing prediction...</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

