"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, TrendingUp, CheckCircle2, Droplets, Bug, CloudRain, Thermometer, Sprout } from "lucide-react"
import { useRouter } from "next/navigation"

interface RiskAssessment {
  id: string
  date: string
  cropType: string
  fieldSize: number
  soilType: string
  irrigationSystem: string
  lastRainfall: number
  temperature: string
  pestHistory: string
  riskLevel: string
  risks: string[]
  recommendations: string[]
}

export default function DiagnosticPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [cropType, setCropType] = useState("")
  const [fieldSize, setFieldSize] = useState("")
  const [soilType, setSoilType] = useState("")
  const [irrigationSystem, setIrrigationSystem] = useState("")
  const [lastRainfall, setLastRainfall] = useState("")
  const [temperature, setTemperature] = useState("")
  const [pestHistory, setPestHistory] = useState("")
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [currentResult, setCurrentResult] = useState<RiskAssessment | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const savedAssessments = localStorage.getItem(`risk_assessments_${user.email}`)
      if (savedAssessments) {
        setAssessments(JSON.parse(savedAssessments))
      }
    }
  }, [user])

  const assessRisks = (data: {
    cropType: string
    fieldSize: number
    soilType: string
    irrigationSystem: string
    lastRainfall: number
    temperature: string
    pestHistory: string
  }) => {
    const risks: string[] = []
    const recommendations: string[] = []
    let riskScore = 0

    // Rainfall risk assessment
    if (data.lastRainfall > 30) {
      risks.push("High rainfall - Risk of waterlogging and fungal diseases")
      recommendations.push("Ensure proper drainage systems are in place")
      recommendations.push("Monitor for signs of root rot and fungal infections")
      riskScore += 2
    } else if (data.lastRainfall < 5) {
      risks.push("Low rainfall - Drought stress risk")
      recommendations.push("Increase irrigation frequency")
      recommendations.push("Consider drought-resistant crop varieties for next season")
      riskScore += 2
    }

    // Temperature risk assessment
    if (data.temperature === "very-hot") {
      risks.push("Extreme heat - Risk of heat stress and reduced yields")
      recommendations.push("Provide shade or cooling systems if possible")
      recommendations.push("Adjust irrigation schedule to early morning or evening")
      riskScore += 2
    } else if (data.temperature === "very-cold") {
      risks.push("Cold temperatures - Risk of frost damage")
      recommendations.push("Use frost protection methods (covers, heaters)")
      recommendations.push("Delay planting until temperatures stabilize")
      riskScore += 2
    }

    // Pest history risk assessment
    if (data.pestHistory === "frequent") {
      risks.push("High pest pressure - Increased risk of crop damage")
      recommendations.push("Implement integrated pest management (IPM) strategies")
      recommendations.push("Consider biological control methods")
      recommendations.push("Regular monitoring and early intervention")
      riskScore += 3
    } else if (data.pestHistory === "occasional") {
      risks.push("Moderate pest activity detected")
      recommendations.push("Maintain regular pest monitoring schedule")
      recommendations.push("Keep preventive measures in place")
      riskScore += 1
    }

    // Soil type risk assessment
    if (data.soilType === "clay") {
      risks.push("Clay soil - Risk of poor drainage and compaction")
      recommendations.push("Add organic matter to improve soil structure")
      recommendations.push("Avoid working soil when wet to prevent compaction")
      riskScore += 1
    } else if (data.soilType === "sandy") {
      risks.push("Sandy soil - Risk of nutrient leaching and water retention issues")
      recommendations.push("Increase organic matter content")
      recommendations.push("Apply fertilizers in smaller, more frequent doses")
      riskScore += 1
    }

    // Irrigation system assessment
    if (data.irrigationSystem === "none") {
      risks.push("No irrigation system - Dependent on rainfall")
      recommendations.push("Consider installing drip or sprinkler irrigation")
      recommendations.push("Implement water harvesting techniques")
      riskScore += 2
    } else if (data.irrigationSystem === "flood") {
      risks.push("Flood irrigation - Risk of water waste and disease spread")
      recommendations.push("Consider upgrading to drip irrigation for efficiency")
      recommendations.push("Monitor for waterborne diseases")
      riskScore += 1
    }

    // Field size considerations
    if (data.fieldSize > 10) {
      recommendations.push("Large field size - Consider zone-based management")
      recommendations.push("Use precision agriculture tools for monitoring")
    }

    // Crop-specific recommendations
    if (data.cropType === "tomatoes" || data.cropType === "peppers") {
      recommendations.push("Monitor for blight and wilt diseases regularly")
      recommendations.push("Ensure adequate spacing for air circulation")
    } else if (data.cropType === "wheat" || data.cropType === "corn") {
      recommendations.push("Watch for rust and smut diseases")
      recommendations.push("Implement crop rotation to prevent soil depletion")
    }

    // Determine overall risk level
    let riskLevel = "Low"
    if (riskScore >= 6) {
      riskLevel = "High"
    } else if (riskScore >= 3) {
      riskLevel = "Medium"
    }

    // Add general recommendations if no risks detected
    if (risks.length === 0) {
      risks.push("No immediate risks detected")
      recommendations.push("Continue current management practices")
      recommendations.push("Maintain regular monitoring schedule")
    }

    return { risks, recommendations, riskLevel }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low":
        return CheckCircle2
      case "Medium":
        return AlertTriangle
      case "High":
        return AlertTriangle
      default:
        return AlertTriangle
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const fieldSizeNum = Number.parseFloat(fieldSize)
    const lastRainfallNum = Number.parseFloat(lastRainfall)

    if (
      !cropType ||
      !soilType ||
      !irrigationSystem ||
      !temperature ||
      !pestHistory ||
      isNaN(fieldSizeNum) ||
      isNaN(lastRainfallNum)
    ) {
      alert("Please fill in all fields with valid values")
      return
    }

    const { risks, recommendations, riskLevel } = assessRisks({
      cropType,
      fieldSize: fieldSizeNum,
      soilType,
      irrigationSystem,
      lastRainfall: lastRainfallNum,
      temperature,
      pestHistory,
    })

    const newAssessment: RiskAssessment = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      cropType,
      fieldSize: fieldSizeNum,
      soilType,
      irrigationSystem,
      lastRainfall: lastRainfallNum,
      temperature,
      pestHistory,
      riskLevel,
      risks,
      recommendations,
    }

    const updatedAssessments = [newAssessment, ...assessments]
    setAssessments(updatedAssessments)
    setCurrentResult(newAssessment)
    localStorage.setItem(`risk_assessments_${user.email}`, JSON.stringify(updatedAssessments))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const RiskIcon = currentResult ? getRiskIcon(currentResult.riskLevel) : AlertTriangle

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-balance">Agricultural Risk Diagnostic</h1>
            <p className="text-muted-foreground text-lg">
              Assess potential risks and get personalized recommendations for your crops
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                Enter Your Farm Data
              </CardTitle>
              <CardDescription>Provide information about your crops and field conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Input
                      id="cropType"
                      type="text"
                      placeholder="e.g., Tomatoes, Wheat, Corn"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fieldSize">Field Size (hectares)</Label>
                    <Input
                      id="fieldSize"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5.5"
                      value={fieldSize}
                      onChange={(e) => setFieldSize(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="silty">Silty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="irrigationSystem" className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Irrigation System
                    </Label>
                    <Select value={irrigationSystem} onValueChange={setIrrigationSystem} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select irrigation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drip">Drip Irrigation</SelectItem>
                        <SelectItem value="sprinkler">Sprinkler</SelectItem>
                        <SelectItem value="flood">Flood Irrigation</SelectItem>
                        <SelectItem value="none">No Irrigation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastRainfall" className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4" />
                      Last Rainfall (days ago)
                    </Label>
                    <Input
                      id="lastRainfall"
                      type="number"
                      placeholder="e.g., 7"
                      value={lastRainfall}
                      onChange={(e) => setLastRainfall(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Temperature Conditions
                    </Label>
                    <Select value={temperature} onValueChange={setTemperature} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select temperature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-cold">Very Cold (&lt; 10°C)</SelectItem>
                        <SelectItem value="cold">Cold (10-15°C)</SelectItem>
                        <SelectItem value="moderate">Moderate (15-25°C)</SelectItem>
                        <SelectItem value="hot">Hot (25-35°C)</SelectItem>
                        <SelectItem value="very-hot">Very Hot (&gt; 35°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="pestHistory" className="flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Pest History
                    </Label>
                    <Select value={pestHistory} onValueChange={setPestHistory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pest activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Pest Issues</SelectItem>
                        <SelectItem value="occasional">Occasional Pest Activity</SelectItem>
                        <SelectItem value="frequent">Frequent Pest Problems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Assess Agricultural Risks
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Result */}
          {currentResult && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RiskIcon className={`h-5 w-5 ${getRiskColor(currentResult.riskLevel)}`} />
                  Risk Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                    <p className={`text-3xl font-bold ${getRiskColor(currentResult.riskLevel)}`}>
                      {currentResult.riskLevel}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Crop Type</p>
                    <p className="text-xl font-semibold capitalize">{currentResult.cropType}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Field Size</p>
                    <p className="text-xl font-semibold">{currentResult.fieldSize} ha</p>
                  </div>
                </div>

                {/* Identified Risks */}
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Identified Risks:</p>
                    <ul className="space-y-1 text-sm">
                      {currentResult.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">⚠</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* Recommendations */}
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Recommended Actions:</p>
                    <ul className="space-y-1 text-sm">
                      {currentResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* History */}
          {assessments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Assessment History
                </CardTitle>
                <CardDescription>Track your farm risk assessments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessments.slice(0, 5).map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(assessment.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium capitalize">{assessment.cropType}</span>
                          <span className="text-muted-foreground mx-2">•</span>
                          <span className="font-medium">{assessment.fieldSize} ha</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-lg font-semibold ${getRiskColor(assessment.riskLevel)}`}>
                            {assessment.riskLevel} Risk
                          </p>
                          <p className="text-sm text-muted-foreground">{assessment.risks.length} risks identified</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
