"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sprout, BarChart3, Users, Shield, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showFirebaseWarning, setShowFirebaseWarning] = useState(false)

  useEffect(() => {
    const hasFirebaseConfig = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    )

    setShowFirebaseWarning(!hasFirebaseConfig)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-accent/10">
      {showFirebaseWarning && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-4 py-3">
            <Alert className="border-destructive/20 bg-transparent">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Firebase Configuration Required:</strong> Please set up your Firebase environment variables in
                Project Settings to enable authentication and database features.
                <br />
                <span className="text-sm">
                  Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                  NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID
                </span>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CropPredict</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" disabled={showFirebaseWarning}>
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button disabled={showFirebaseWarning}>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            AI-Powered Crop Yield Prediction
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Make data-driven farming decisions with machine learning. Predict crop yields, optimize resources, and
            maximize your harvest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Predicting
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Accurate Predictions</h3>
            <p className="text-muted-foreground">
              Advanced machine learning models trained on comprehensive agricultural data to provide reliable yield
              forecasts.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Farm Management</h3>
            <p className="text-muted-foreground">
              Manage multiple farms, track soil conditions, weather data, and maintain detailed records of your
              agricultural operations.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your farm data is protected with enterprise-grade security. Only you have access to your predictions and
              farm information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
