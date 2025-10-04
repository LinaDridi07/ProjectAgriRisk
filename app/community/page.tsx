"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { Users, MessageCircle, Heart, Share2, Send, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  author: string
  authorInitials: string
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
}

export default function CommunityPage() {
  const { user, isLoading } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")

  useEffect(() => {
    if (user) {
      const savedPosts = localStorage.getItem(`community_posts`)
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      } else {
        // Default community posts
        const defaultPosts: Post[] = [
          {
            id: "1",
            author: "Sarah Martinez",
            authorInitials: "SM",
            content:
              "Just implemented a new irrigation system using IoT sensors. Water usage down 30%! Happy to share my experience with anyone interested. 💧🌱",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            tags: ["Irrigation", "IoT", "Water Management"],
          },
          {
            id: "2",
            author: "Emily Chen",
            authorInitials: "EC",
            content:
              "Looking for advice on organic pest control for tomatoes. What methods have worked best for you? 🍅",
            timestamp: "5 hours ago",
            likes: 15,
            comments: 12,
            tags: ["Organic Farming", "Pest Control", "Tomatoes"],
          },
          {
            id: "3",
            author: "Maria Rodriguez",
            authorInitials: "MR",
            content:
              "Excited to announce I'm starting a mentorship program for young women entering agriculture! DM me if you're interested in joining. 🌾👩‍🌾",
            timestamp: "1 day ago",
            likes: 45,
            comments: 18,
            tags: ["Mentorship", "Women in Ag", "Community"],
          },
          {
            id: "4",
            author: "Aisha Patel",
            authorInitials: "AP",
            content:
              "Harvest season is here! Our yield increased 25% this year thanks to precision agriculture techniques. Data-driven farming really works! 📊🚜",
            timestamp: "2 days ago",
            likes: 32,
            comments: 10,
            tags: ["Precision Agriculture", "Harvest", "Data Analytics"],
          },
        ]
        setPosts(defaultPosts)
        localStorage.setItem(`community_posts`, JSON.stringify(defaultPosts))
      }
    }
  }, [user])

  const handlePostSubmit = () => {
    if (!newPost.trim() || !user) return

    const post: Post = {
      id: Date.now().toString(),
      author: user.name,
      authorInitials: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      tags: [],
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem(`community_posts`, JSON.stringify(updatedPosts))
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    setPosts(updatedPosts)
    localStorage.setItem(`community_posts`, JSON.stringify(updatedPosts))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>Please log in to connect with other women agricultural engineers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/login">Log In to Continue</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Community</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Connect, share, and grow together with women agricultural engineers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-secondary" />
                <div>
                  <div className="text-2xl font-bold">3,892</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-chart-3" />
                <div>
                  <div className="text-2xl font-bold">+156</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Share with the Community</CardTitle>
            <CardDescription>Ask questions, share insights, or celebrate your wins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your farming experiences, ask for advice, or celebrate your achievements..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{post.author}</span>
                      <span className="text-sm text-muted-foreground">• {post.timestamp}</span>
                    </div>
                    <p className="text-foreground mb-3">{post.content}</p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
