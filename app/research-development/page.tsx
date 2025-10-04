import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, Sprout, Beaker, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ResearchDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Research & Development</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Sustainable agricultural solutions based on scientific research and continuous innovation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Sustainable Agricultural Innovation</h2>
            <p className="text-muted-foreground mb-6">
              Our team of researchers and agronomists works in collaboration with universities and research institutes
              to develop innovative and environmentally friendly agricultural solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Genetic Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    Development of disease-resistant varieties adapted to climate change
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Precision Agriculture</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced techniques to optimize resource use and reduce environmental impact
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Biocontrol</h3>
                  <p className="text-sm text-muted-foreground">
                    Biological alternatives to chemical pesticides for healthier agriculture
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden border border-border">
            <Image
              src="/woman-agricultural-scientist-in-greenhouse-with-pl.jpg"
              alt="Research and development"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Microscope className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Laboratory</CardTitle>
              <CardDescription>Scientific analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Soil analysis, resistance testing, and microbiological studies to understand agricultural ecosystems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sprout className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Field Trials</CardTitle>
              <CardDescription>Practical validation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-world testing to validate the effectiveness of new techniques and varieties developed.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Beaker className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Biotechnology</CardTitle>
              <CardDescription>Genetic innovation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Using modern techniques to naturally improve crop characteristics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Publications</CardTitle>
              <CardDescription>Knowledge sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dissemination of research results through scientific publications and training programs.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-secondary/50 border-secondary">
          <CardHeader>
            <CardTitle className="text-2xl">Our Research Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Regenerative Agriculture</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Development of practices that restore soil health, increase biodiversity, and sequester carbon. Our
                  research focuses on cover crops, advanced composting, and agroforestry.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Optimized crop rotation</li>
                  <li>• Integrated fertility management</li>
                  <li>• Agroforestry systems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Climate Adaptation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Creation of drought-resistant varieties, tolerant to extreme temperatures and emerging diseases. We
                  work on solutions to ensure food security in the face of climate change.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Water stress-tolerant varieties</li>
                  <li>• Smart irrigation systems</li>
                  <li>• Climate risk forecasting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Soil Health</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Study of soil microbiome and development of biofertilizers to naturally improve fertility. Our
                  research aims to reduce dependence on chemical inputs.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Microbiome analysis</li>
                  <li>• Innovative biofertilizers</li>
                  <li>• Degraded soil regeneration</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Biological Protection</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Development of biocontrol solutions using beneficial organisms, plant extracts, and pheromones to
                  protect crops ecologically.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Beneficial insects</li>
                  <li>• Natural biopesticides</li>
                  <li>• Integrated pest management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
