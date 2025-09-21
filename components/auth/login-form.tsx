"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Chrome, Loader2, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { firebaseConfigured } = useAuth()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firebaseConfigured) {
      toast({
        title: "Configuration Required",
        description: "Firebase authentication is not configured. Please check your environment variables.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { signInWithEmail } = await import("@/lib/auth")
      await signInWithEmail(email, password)
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      })
      router.push('/dashboard')  // Redirect added here
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!firebaseConfigured) {
      toast({
        title: "Configuration Required",
        description: "Firebase authentication is not configured. Please check your environment variables.",
        variant: "destructive",
      })
      return
    }

    setIsGoogleLoading(true)

    try {
      const { signInWithGoogle } = await import("@/lib/auth")
      await signInWithGoogle()
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in with Google.",
      })
      router.push('/dashboard')  // Redirect added here
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      })
      setIsGoogleLoading(false)
    }
  }

  if (!firebaseConfigured) {
    return (
      <div className="space-y-6">
        <Alert className="border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Firebase Configuration Required</strong>
            <br />
            Authentication is currently disabled because Firebase environment variables are not configured.
            <br />
            <span className="text-sm">Please set up your Firebase project in Project Settings.</span>
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        variant="outline"
        className="w-full h-12 text-base bg-transparent"
      >
        {isGoogleLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Chrome className="w-5 h-5 mr-2" />}
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-medium">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">{"Don't have an account? "}</span>
        <Link href="/register" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  )
}

