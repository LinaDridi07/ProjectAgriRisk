import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Satellite, Smartphone, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SmartTechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Smart Technology</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            AI-powered farm management optimized with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px] rounded-xl overflow-hidden border border-border">
            <Image
              src="/woman-agricultural-engineer-using-drone-technology.jpg"
              alt="Smart technology"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">The Future of Agriculture</h2>
            <p className="text-muted-foreground mb-6">
              Our technological solutions transform farm management by combining artificial intelligence, IoT, and data
              analysis to optimize every aspect of your operation.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Smart Automation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Automated irrigation, fertilization, and monitoring systems that adapt in real-time to your crop
                  conditions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Artificial Intelligence
                </h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms that learn from your data to provide personalized recommendations and predict
                  problems before they occur.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Mobile Control
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your farm from anywhere with our intuitive mobile app and real-time dashboards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Satellite className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Satellite Imagery</CardTitle>
              <CardDescription>Overview of your fields</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Continuous satellite monitoring of your crops with multispectral analysis to detect variations in plant
                health.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• NDVI mapping</li>
                <li>• Water stress detection</li>
                <li>• Evolution history</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cpu className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Agricultural Drones</CardTitle>
              <CardDescription>Centimeter-level precision</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed inspection of your fields with drones equipped with high-resolution cameras and multispectral
                sensors.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 3D field mapping</li>
                <li>• Plant counting</li>
                <li>• Precision spraying</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="h-10 w-10 text-primary mb-2" />
              <CardTitle>IoT Sensors</CardTitle>
              <CardDescription>Real-time data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Network of connected sensors continuously measuring essential parameters of your crops and environment.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Soil moisture</li>
                <li>• Temperature and weather</li>
                <li>• Water quality</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Integrated Management Platform</CardTitle>
            <CardDescription className="text-base">
              All your agricultural data centralized in a single interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Smart Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualize all your data at a glance: weather, crop status, alerts, tasks to perform, and forecasts.
                  Our intuitive interface gives you a complete view of your operation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Real-time alerts and notifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Customizable reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>History and trends</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Personal AI Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our intelligent chatbot answers your questions, advises you on best practices, and helps you make
                  informed decisions based on your data and current conditions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <span>Personalized agronomic advice</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <span>Problem diagnosis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <span>Intervention planning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-background/50 border border-border">
              <h3 className="font-semibold text-lg mb-3">Integrations and Compatibility</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our platform integrates with your existing equipment and major market solutions for a unified
                experience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                <div className="p-3 rounded bg-background border border-border">
                  <p className="font-medium">Connected tractors</p>
                </div>
                <div className="p-3 rounded bg-background border border-border">
                  <p className="font-medium">Weather stations</p>
                </div>
                <div className="p-3 rounded bg-background border border-border">
                  <p className="font-medium">Irrigation systems</p>
                </div>
                <div className="p-3 rounded bg-background border border-border">
                  <p className="font-medium">Management software</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
