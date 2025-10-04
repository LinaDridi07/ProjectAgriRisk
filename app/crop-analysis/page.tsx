import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Leaf, TrendingUp, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CropAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Crop Analysis</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Advanced monitoring systems to optimize the health and yield of your crops
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px] rounded-xl overflow-hidden border border-border">
            <Image
              src="/woman-agricultural-engineer-analyzing-crops-with-t.jpg"
              alt="Crop analysis"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h2>
            <p className="text-muted-foreground mb-6">
              Our crop analysis system uses IoT sensors and artificial intelligence to continuously monitor the health
              of your plantations. Detect problems before they become critical.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Early Disease Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify signs of stress or disease before they are visible to the naked eye
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Resource Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce water and fertilizer usage with precise recommendations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Yield Forecasting</h3>
                  <p className="text-sm text-muted-foreground">Accurately estimate your harvests for better planning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Leaf className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Crop Health</CardTitle>
              <CardDescription>NDVI monitoring and vegetation indices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze crop vigor through satellite imagery and drones to identify areas requiring special attention.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Growth Analysis</CardTitle>
              <CardDescription>Plant development tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compare actual growth with predictive models to adjust your farming practices and maximize yield.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <AlertTriangle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Alerts</CardTitle>
              <CardDescription>Proactive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive instant alerts about adverse weather conditions, disease risks, or irrigation needs.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Technologies Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Multispectral Imaging</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced sensors capturing data beyond the visible spectrum to detect water stress, nutritional
                  deficiencies, and diseases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Artificial Intelligence</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Machine learning algorithms trained on millions of images to automatically identify problems and
                  suggest solutions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">IoT Sensors</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Network of ground sensors measuring moisture, temperature, pH, and nutrients in real-time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Weather and agronomic models to anticipate risks and optimize interventions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
