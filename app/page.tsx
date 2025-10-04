import { Navbar } from "@/components/navbar"
import { DashboardStats } from "@/components/dashboard-stats"
import { AlertsCard } from "@/components/alerts-card"
import { NotificationsCard } from "@/components/notifications-card"
import { ActivityChart } from "@/components/activity-chart"
import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Empowering Women Agricultural Engineers
            </div>
            <h1 className="text-5xl font-bold mb-4 text-balance">Agricultural Risk Management for Women Engineers</h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
              A platform built by women engineers, for women engineers in agriculture. Monitor risks, leverage technical
              solutions, and connect with fellow agricultural engineering professionals worldwide.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border shadow-lg">
            <Image
              src="/hero-woman-agricultural-engineer.jpg"
              alt="Woman agricultural engineer using technology in field"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <AlertsCard />
          <NotificationsCard />
        </div>

        <div className="mt-8">
          <ActivityChart />
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4">Empowering Agricultural Innovation</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Our platform is built by and for women agricultural engineers who combine technical expertise with practical
            farming knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/crop-analysis"
              className="relative h-[300px] rounded-2xl overflow-hidden border border-border group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src="/woman-agricultural-engineer-analyzing-crops-with-t.jpg"
                alt="Agricultural engineer analyzing crops"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">Crop Analysis</h3>
                  <p className="text-white/80 text-sm">Advanced monitoring systems</p>
                </div>
              </div>
            </Link>
            <Link
              href="/research-development"
              className="relative h-[300px] rounded-2xl overflow-hidden border border-border group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src="/woman-agricultural-scientist-in-greenhouse-with-pl.jpg"
                alt="Agricultural scientist in greenhouse"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">Research & Development</h3>
                  <p className="text-white/80 text-sm">Sustainable farming solutions</p>
                </div>
              </div>
            </Link>
            <Link
              href="/smart-technology"
              className="relative h-[300px] rounded-2xl overflow-hidden border border-border group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src="/woman-agricultural-engineer-using-drone-technology.jpg"
                alt="Agricultural engineer with drone technology"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">Smart Technology</h3>
                  <p className="text-white/80 text-sm">AI-powered farm management</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
