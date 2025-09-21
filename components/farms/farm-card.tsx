import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Ruler } from "lucide-react"

interface Farm {
  farm_id: string
  name: string
  location: { lat: number; lon: number }
  soil_type: string
  area_ha: number
  created_at: any
}

interface FarmCardProps {
  farm: Farm
}

export function FarmCard({ farm }: FarmCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{farm.name}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            {farm.soil_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>
            {farm.location.lat.toFixed(4)}, {farm.location.lon.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Ruler className="w-4 h-4" />
          <span>{farm.area_ha} hectares</span>
        </div>
      </CardContent>
    </Card>
  )
}
