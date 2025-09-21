"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sprout, MapPin, Languages, TrendingUp, Smartphone, AlertTriangle, Leaf, Sun, Droplets } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showFirebaseWarning, setShowFirebaseWarning] = useState(false)
  const [language, setLanguage] = useState<"en" | "hi" | "od">("en")

  useEffect(() => {
    const hasFirebaseConfig = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    )

    setShowFirebaseWarning(!hasFirebaseConfig)
  }, [])

  const content = {
    en: {
      title: "AI-Powered Crop Yield Prediction for Odisha Farmers",
      subtitle:
        "Make smarter farming decisions with machine learning. Predict crop yields, optimize resources, and maximize your harvest using local weather and soil data.",
      predictYield: "Predict Yield",
      signIn: "Sign In",
      accurateTitle: "Accurate Predictions",
      accurateDesc:
        "Advanced AI models trained on Odisha's agricultural data provide reliable yield forecasts for rice, wheat, and other local crops.",
      locationTitle: "Location-Based",
      locationDesc:
        "Get predictions tailored to your specific district and soil conditions across Odisha's diverse agricultural zones.",
      bilingualTitle: "Multilingual Support",
      bilingualDesc:
        "Use the app in English, Hindi, or Odia language for better accessibility and understanding by local farmers.",
      trustedTitle: "Trusted by Farmers Across Odisha",
      trustedDesc:
        "Join thousands of farmers who are already using AI to make better farming decisions and increase their crop yields.",
    },
    hi: {
      title: "ओडिशा के किसानों के लिए AI-संचालित फसल उत्पादन पूर्वानुमान",
      subtitle:
        "मशीन लर्निंग के साथ स्मार्ट खेती के फैसले लें। स्थानीय मौसम और मिट्टी के डेटा का उपयोग करके फसल की पैदावार का पूर्वानुमान लगाएं।",
      predictYield: "उत्पादन पूर्वानुमान",
      signIn: "साइन इन",
      accurateTitle: "सटीक पूर्वानुमान",
      accurateDesc:
        "ओडिशा के कृषि डेटा पर प्रशिक्षित उन्नत AI मॉडल चावल, गेहूं और अन्य स्थानीय फसलों के लिए विश्वसनीय उत्पादन पूर्वानुमान प्रदान करते हैं।",
      locationTitle: "स्थान-आधारित",
      locationDesc: "ओडिशा के विविध कृषि क्षेत्रों में अपने विशिष्ट जिले और मिट्टी की स्थिति के अनुकूल पूर्वानुमान प्राप्त करें।",
      bilingualTitle: "बहुभाषी सहायता",
      bilingualDesc: "स्थानीय किसानों द्वारा बेहतर पहुंच और समझ के लिए अंग्रेजी, हिंदी या ओडिया भाषा में ऐप का उपयोग करें।",
      trustedTitle: "ओडिशा भर के किसानों द्वारा भरोसेमंद",
      trustedDesc:
        "हजारों किसानों के साथ जुड़ें जो पहले से ही बेहतर खेती के फैसले लेने और अपनी फसल की पैदावार बढ़ाने के लिए AI का उपयोग कर रहे हैं।",
    },
    od: {
      title: "ଓଡ଼ିଶା କୃଷକଙ୍କ ପାଇଁ AI-ଚାଳିତ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      subtitle: "ମେସିନ୍ ଲର୍ନିଂ ସହିତ ସ୍ମାର୍ଟ କୃଷି ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ। ସ୍ଥାନୀୟ ପାଣିପାଗ ଏବଂ ମାଟି ତଥ୍ୟ ବ୍ୟବହାର କରି ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ କରନ୍ତୁ।",
      predictYield: "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      signIn: "ସାଇନ୍ ଇନ୍",
      accurateTitle: "ସଠିକ୍ ପୂର୍ବାନୁମାନ",
      accurateDesc: "ଓଡ଼ିଶାର କୃଷି ତଥ୍ୟରେ ତାଲିମପ୍ରାପ୍ତ ଉନ୍ନତ AI ମଡେଲ୍ ଧାନ, ଗହମ ଏବଂ ଅନ୍ୟ ସ୍ଥାନୀୟ ଫସଲ ପାଇଁ ନିର୍ଭରଯୋଗ୍ୟ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ପ୍ରଦାନ କରେ।",
      locationTitle: "ସ୍ଥାନ-ଆଧାରିତ",
      locationDesc: "ଓଡ଼ିଶାର ବିବିଧ କୃଷି ଅଞ୍ଚଳରେ ଆପଣଙ୍କ ନିର୍ଦ୍ଦିଷ୍ଟ ଜିଲ୍ଲା ଏବଂ ମାଟି ଅବସ୍ଥା ଅନୁଯାୟୀ ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ।",
      bilingualTitle: "ବହୁଭାଷିକ ସହାୟତା",
      bilingualDesc: "ସ୍ଥାନୀୟ କୃଷକଙ୍କ ଦ୍ୱାରା ଉତ୍ତମ ଅଭିଗମ୍ୟତା ଏବଂ ବୁଝାମଣା ପାଇଁ ଇଂରାଜୀ, ହିନ୍ଦୀ କିମ୍ବା ଓଡ଼ିଆ ଭାଷାରେ ଆପ୍ ବ୍ୟବହାର କରନ୍ତୁ।",
      trustedTitle: "ଓଡ଼ିଶାର କୃଷକମାନଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ",
      trustedDesc: "ହଜାର ହଜାର କୃଷକଙ୍କ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ ଯେଉଁମାନେ ଉତ୍ତମ କୃଷି ନିଷ୍ପତ୍ତି ନେବା ଏବଂ ସେମାନଙ୍କ ଫସଲ ଉତ୍ପାଦନ ବୃଦ୍ଧି ପାଇଁ AI ବ୍ୟବହାର କରୁଛନ୍ତି।",
    },
  }

  const currentContent = content[language]

  const getNextLanguage = () => {
    if (language === "en") return "hi"
    if (language === "hi") return "od"
    return "en"
  }

  const getLanguageLabel = () => {
    if (language === "en") return "हिन्दी"
    if (language === "hi") return "ଓଡ଼ିଆ"
    return "English"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-primary/10">
      {showFirebaseWarning && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-4 py-3">
            <Alert className="border-destructive/20 bg-transparent">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Firebase Configuration Required:</strong> Please set up your Firebase environment variables in
                Project Settings to enable authentication and database features.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">CropPredict</span>
                <p className="text-xs text-muted-foreground">ଓଡ଼ିଶା କୃଷି AI</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(getNextLanguage())}
                className="flex items-center gap-2 bg-card hover:bg-muted"
              >
                <Languages className="w-4 h-4" />
                {getLanguageLabel()}
              </Button>

              <Link href="/login">
                <Button variant="ghost" disabled={showFirebaseWarning} className="hover:bg-muted">
                  {currentContent.signIn}
                </Button>
              </Link>
              <Link href="/register">
                <Button disabled={showFirebaseWarning} className="bg-primary hover:bg-primary/90 shadow-lg">
                  {currentContent.predictYield}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
                  {currentContent.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 text-balance leading-relaxed">
                  {currentContent.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-xl">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      {currentContent.predictYield}
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-card hover:bg-muted border-2">
                      {currentContent.signIn}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl p-8 shadow-2xl">
                  <img
                    src="/indian-farmer-in-odisha-using-smartphone-in-rice-f.jpg"
                    alt="Farmer using AI technology"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground p-3 rounded-full shadow-lg">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                    <Leaf className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">{currentContent.accurateTitle}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">{currentContent.accurateDesc}</p>
            </div>

            <div className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">{currentContent.locationTitle}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">{currentContent.locationDesc}</p>
            </div>

            <div className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Languages className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">{currentContent.bilingualTitle}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">{currentContent.bilingualDesc}</p>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 border border-border/30">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-primary">
                <Sun className="w-6 h-6" />
                <span className="font-medium">Weather Data</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Droplets className="w-6 h-6" />
                <span className="font-medium">Soil Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Leaf className="w-6 h-6" />
                <span className="font-medium">Crop Health</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{currentContent.trustedTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{currentContent.trustedDesc}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
