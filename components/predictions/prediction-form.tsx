"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sprout, MapPin, Thermometer, Droplets, Beaker } from "lucide-react"

interface PredictionFormProps {
  onPredictionComplete: (result: any) => void
}

// Define Farm type explicitly
type Farm = {
  farm_id: string
  name: string
  location: { lat: number; lon: number }
  soil_type: string
  area_ha: number
}

const cropTypes = [
  "Wheat",
  "Rice",
  "Maize",
  "Barley",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Potato",
  "Tomato",
  "Onion",
  "Groundnut",
  "Sunflower",
]

export function PredictionForm({ onPredictionComplete }: PredictionFormProps) {
  const [farms, setFarms] = useState<Farm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingFarms, setIsLoadingFarms] = useState(true)
  const [formData, setFormData] = useState({
    farm_id: "",
    crop: "",
    area: "",
    // Added the missing nutrient and soil pH fields
    N: "",
    P: "",
    K: "",
    ph: "",
    rainfall: "",
    fertilizer: "",
    pesticide: "",
    sowing_date: "",
    temperature: "",
    humidity: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadFarms()
  }, [])

  const loadFarms = async () => {
    try {
      const response = await apiClient.getFarms()
      setFarms(response.farms)
    } catch (error) {
      console.error("Error loading farms:", error)
      toast({
        title: "Error loading farms",
        description: "Please try refreshing the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingFarms(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await apiClient.predictYield({
        farm_id: formData.farm_id,
        crop: formData.crop,
        N: Number.parseFloat(formData.N),
        P: Number.parseFloat(formData.P),
        K: Number.parseFloat(formData.K),
        ph: Number.parseFloat(formData.ph),
        temperature: formData.temperature ? Number.parseFloat(formData.temperature) : undefined,
        humidity: formData.humidity ? Number.parseFloat(formData.humidity) : undefined,
        rainfall: formData.rainfall ? Number.parseFloat(formData.rainfall) : undefined,
        sowing_date: formData.sowing_date,
        area: Number.parseFloat(formData.area),
        fertilizer: Number.parseFloat(formData.fertilizer),
        pesticide: Number.parseFloat(formData.pesticide),
      })

      toast({
        title: "Prediction completed!",
        description: "Your crop yield prediction has been generated successfully.",
      })

      onPredictionComplete(result)
    } catch (error: any) {
      toast({
        title: "Prediction failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingFarms) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (farms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Farms Available</CardTitle>
          <CardDescription>You need to add at least one farm before making predictions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => (window.location.href = "/dashboard/farms")}>Add Farm</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-5 h-5" />
          Crop Yield Prediction
        </CardTitle>
        <CardDescription>Enter your crop and farm details to get an AI-powered yield prediction.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Selection */}
          <div className="space-y-2">
            <Label htmlFor="farm">Select Farm</Label>
            <Select
              value={formData.farm_id}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, farm_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a farm" />
              </SelectTrigger>
              <SelectContent>
                {farms.map((farm) => (
                  <SelectItem key={farm.farm_id} value={farm.farm_id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {farm.name} ({farm.area_ha} ha)
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Crop Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Crop Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select
                  value={formData.crop}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, crop: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sowing_date">Sowing Date</Label>
                <Input
                  id="sowing_date"
                  type="date"
                  value={formData.sowing_date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sowing_date: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Farm Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Farm Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Cultivation Area (hectares)</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 2.5"
                  value={formData.area}
                  onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                  required
                />
              </div>

              {/* Nutrients N, P, K */}
              <div className="space-y-2">
                <Label htmlFor="N">Nitrogen (N) content (kg/ha)</Label>
                <Input
                  id="N"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 50.0"
                  value={formData.N}
                  onChange={(e) => setFormData((prev) => ({ ...prev, N: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="P">Phosphorus (P) content (kg/ha)</Label>
                <Input
                  id="P"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 30.0"
                  value={formData.P}
                  onChange={(e) => setFormData((prev) => ({ ...prev, P: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="K">Potassium (K) content (kg/ha)</Label>
                <Input
                  id="K"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 20.0"
                  value={formData.K}
                  onChange={(e) => setFormData((prev) => ({ ...prev, K: e.target.value }))}
                  required
                />
              </div>

              {/* Soil pH */}
              <div className="space-y-2">
                <Label htmlFor="ph">Soil pH</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 6.5"
                  value={formData.ph}
                  onChange={(e) => setFormData((prev) => ({ ...prev, ph: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Environmental Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Environmental Conditions
            </h3>
            <div className="space-y-2">
              <Label htmlFor="rainfall">Annual Rainfall (mm/year)</Label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="rainfall"
                  type="number"
                  step="0.1"
                  placeholder="Leave empty to use weather data"
                  value={formData.rainfall}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rainfall: e.target.value }))}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                If left empty, we'll use current weather data for your farm location.
              </p>
            </div>
          </div>

          <Separator />

          {/* Agricultural Inputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Beaker className="w-5 h-5" />
              Agricultural Inputs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fertilizer">Fertilizer Usage (kg)</Label>
                <Input
                  id="fertilizer"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 150.5"
                  value={formData.fertilizer}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fertilizer: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pesticide">Pesticide Usage (kg)</Label>
                <Input
                  id="pesticide"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 25.0"
                  value={formData.pesticide}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesticide: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Generate Prediction
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

