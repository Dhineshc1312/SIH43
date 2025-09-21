import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, BarChart3, Calendar } from "lucide-react"

interface PredictionResultProps {
  result: {
    request_id: string
    farm_id: string
    crop_yield_prediction: {
      predicted_yield_kg_per_ha: number
      confidence_interval: {
        lower: number
        upper: number
      }
      model_version: string
      feature_importance?: Array<{
        feature: string
        importance: number
      }>
      weather_data?: {
        rainfall: number
        temperature?: number
        humidity?: number
        moisture?: number
      }
    }
    fertilizer_recommendation?: {
      recommended_fertilizer: string
      confidence?: number
    }
  }
}

export function PredictionResult({ result }: PredictionResultProps) {
  const { crop_yield_prediction, fertilizer_recommendation } = result

  const confidenceRange = crop_yield_prediction.confidence_interval.upper - crop_yield_prediction.confidence_interval.lower
  const confidencePercentage =
    ((crop_yield_prediction.predicted_yield_kg_per_ha - crop_yield_prediction.confidence_interval.lower) / confidenceRange) * 100

  return (
    <div className="space-y-6">
      {/* Crop Yield Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Crop Yield Prediction
          </CardTitle>
          <CardDescription>AI-powered crop yield prediction for your farm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary">{crop_yield_prediction.predicted_yield_kg_per_ha}</div>
              <div className="text-lg text-muted-foreground">kg per hectare</div>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>
                Range: {crop_yield_prediction.confidence_interval.lower.toFixed(1)} - {crop_yield_prediction.confidence_interval.upper.toFixed(1)} kg/ha
              </span>
              <Badge variant="secondary">{crop_yield_prediction.model_version}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence Range */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Confidence Range
          </CardTitle>
          <CardDescription>Prediction confidence interval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Lower bound: {crop_yield_prediction.confidence_interval.lower.toFixed(1)} kg/ha</span>
              <span>Upper bound: {crop_yield_prediction.confidence_interval.upper.toFixed(1)} kg/ha</span>
            </div>
            <Progress value={confidencePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              The predicted yield falls within this confidence range based on the model&apos;s analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      {crop_yield_prediction.feature_importance && crop_yield_prediction.feature_importance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Key Factors
            </CardTitle>
            <CardDescription>Most important factors affecting your yield prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crop_yield_prediction.feature_importance.slice(0, 5).map((factor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{factor.feature.replace("_", " ")}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={factor.importance * 100} className="w-20 h-2" />
                    <span className="text-xs text-muted-foreground w-12">{(factor.importance * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weather Data */}
      {crop_yield_prediction.weather_data && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weather Conditions
            </CardTitle>
            <CardDescription>Environmental data used in the prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{crop_yield_prediction.weather_data.rainfall}</div>
                <div className="text-sm text-muted-foreground">mm/year rainfall</div>
              </div>
              {crop_yield_prediction.weather_data.temperature && (
                <div className="text-center">
                  <div className="text-2xl font-bold">{crop_yield_prediction.weather_data.temperature}°</div>
                  <div className="text-sm text-muted-foreground">Temperature (°C)</div>
                </div>
              )}
              {crop_yield_prediction.weather_data.humidity && (
                <div className="text-center">
                  <div className="text-2xl font-bold">{crop_yield_prediction.weather_data.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fertilizer Recommendation */}
      {fertilizer_recommendation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Fertilizer Recommendation
            </CardTitle>
            <CardDescription>Recommended fertilizer and confidence</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                Recommended Fertilizer: <strong>{fertilizer_recommendation.recommended_fertilizer}</strong>
              </p>
              {fertilizer_recommendation.confidence && (
                <p>Confidence: {(fertilizer_recommendation.confidence * 100).toFixed(1)}%</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

