import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Award, TrendingUp, Users, Sparkles } from "lucide-react"

const successStories = [
  {
    id: 1,
    name: "Dr. Amina Hassan",
    title: "Agricultural Engineer & Innovator",
    location: "Kenya",
    achievement: "Increased crop yields by 40% using precision agriculture",
    story:
      "After completing my agricultural engineering degree, I returned to my family's farm with a mission to modernize our practices. By implementing IoT sensors, drone monitoring, and data analytics, we've not only increased our yields by 40% but also reduced water usage by 35%. Now I'm helping other women farmers in my region adopt these technologies.",
    impact: ["500+ farmers trained", "40% yield increase", "35% water savings"],
    tags: ["Precision Agriculture", "IoT", "Sustainability"],
    initials: "AH",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Maria Santos",
    title: "Organic Farm Owner",
    location: "Brazil",
    achievement: "Built a thriving organic farm cooperative with 50 women",
    story:
      "Starting with just 2 hectares and a dream, I've built a cooperative that now includes 50 women farmers across our region. We focus on organic, sustainable practices and direct-to-consumer sales. Our cooperative has become a model for women's empowerment in agriculture, generating stable income for all our members.",
    impact: ["50 women employed", "100 hectares managed", "$500K annual revenue"],
    tags: ["Organic Farming", "Cooperative", "Women's Empowerment"],
    initials: "MS",
    color: "bg-secondary",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    title: "Agricultural Researcher",
    location: "India",
    achievement: "Developed drought-resistant crop varieties",
    story:
      "My research in plant genetics has led to the development of three drought-resistant crop varieties that are now being used by thousands of farmers across India. These varieties require 50% less water while maintaining yields, making farming viable in water-scarce regions. I'm particularly proud that 60% of the farmers using our varieties are women.",
    impact: ["3 new varieties", "5,000+ farmers benefiting", "50% water reduction"],
    tags: ["Research", "Genetics", "Climate Adaptation"],
    initials: "PS",
    color: "bg-chart-4",
  },
  {
    id: 4,
    name: "Sophie Dubois",
    title: "AgriTech Entrepreneur",
    location: "France",
    achievement: "Founded successful farm management software company",
    story:
      "As a third-generation farmer, I saw firsthand how technology could transform agriculture. I founded FarmSmart, a farm management platform now used by over 10,000 farms across Europe. Our platform helps farmers optimize operations, reduce costs, and increase sustainability. We've raised €5M in funding and employ 30 people, 70% of whom are women.",
    impact: ["10,000+ farms using platform", "€5M funding raised", "70% women team"],
    tags: ["AgriTech", "Entrepreneurship", "Software"],
    initials: "SD",
    color: "bg-chart-5",
  },
  {
    id: 5,
    name: "Fatima Al-Rashid",
    title: "Sustainable Agriculture Consultant",
    location: "UAE",
    achievement: "Pioneered vertical farming in desert regions",
    story:
      "I've dedicated my career to making agriculture viable in challenging environments. By implementing vertical farming and hydroponics systems, we're now growing fresh produce in the desert with 95% less water than traditional farming. My consultancy has helped establish 20 vertical farms across the Middle East, creating jobs and food security.",
    impact: ["20 vertical farms established", "95% water savings", "200+ jobs created"],
    tags: ["Vertical Farming", "Hydroponics", "Innovation"],
    initials: "FA",
    color: "bg-chart-3",
  },
  {
    id: 6,
    name: "Elena Popescu",
    title: "Agricultural Policy Advocate",
    location: "Romania",
    achievement: "Championed policies supporting women farmers",
    story:
      "Through years of advocacy work, I've helped shape agricultural policies that specifically support women farmers. Our efforts led to the creation of a €50M fund for women-led agricultural businesses, improved access to land ownership for women, and mandatory representation of women in agricultural decision-making bodies. Over 5,000 women have directly benefited from these policy changes.",
    impact: ["€50M fund created", "5,000+ women benefited", "Policy reforms enacted"],
    tags: ["Policy", "Advocacy", "Women's Rights"],
    initials: "EP",
    color: "bg-primary",
  },
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Inspiring Stories
          </div>
          <h1 className="text-5xl font-bold mb-4 text-balance">Women Agricultural Engineers Leading Innovation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Celebrating the achievements of women agricultural engineers who are transforming agriculture through
            technical innovation, engineering solutions, and professional leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-6 w-6 text-primary" />
                <div className="text-3xl font-bold">1,000+</div>
              </div>
              <p className="text-sm text-muted-foreground">Women Engineers Recognized</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-secondary" />
                <div className="text-3xl font-bold">50,000+</div>
              </div>
              <p className="text-sm text-muted-foreground">Farmers Impacted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-chart-3" />
                <div className="text-3xl font-bold">85+</div>
              </div>
              <p className="text-sm text-muted-foreground">Countries Represented</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {successStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex flex-col items-center justify-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className={`${story.color} text-white text-2xl`}>{story.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{story.title}</p>
                  <p className="text-sm text-muted-foreground mb-4">{story.location}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <h4 className="text-lg font-semibold text-primary">{story.achievement}</h4>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{story.story}</p>
                  <div>
                    <h5 className="font-semibold mb-3 text-sm uppercase tracking-wide">Impact Highlights</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {story.impact.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 bg-accent/50 rounded-lg p-3">
                          <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Share Your Success Story</CardTitle>
            <CardDescription className="text-base">
              Are you a woman agricultural engineer making an impact? We'd love to feature your story and inspire
              others.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Contact us at <span className="font-semibold text-primary">stories@agririsk.com</span> to share your
              journey
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
