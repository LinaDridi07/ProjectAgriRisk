"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Edit2,
  LogIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Task {
  id: string
  date: string
  task: string
  priority: boolean
  time?: string
  userId: string
}

const createDefaultTasks = (userId: string): Task[] => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  return [
    {
      id: crypto.randomUUID(),
      date: formatDate(today),
      task: "Check irrigation system",
      priority: true,
      time: "08:00",
      userId,
    },
    {
      id: crypto.randomUUID(),
      date: formatDate(today),
      task: "Monitor crop health in field A",
      priority: false,
      time: "10:30",
      userId,
    },
    {
      id: crypto.randomUUID(),
      date: formatDate(tomorrow),
      task: "Apply fertilizer to field B",
      priority: true,
      time: "07:00",
      userId,
    },
    {
      id: crypto.randomUUID(),
      date: formatDate(tomorrow),
      task: "Inspect greenhouse temperature controls",
      priority: false,
      time: "14:00",
      userId,
    },
    {
      id: crypto.randomUUID(),
      date: formatDate(nextWeek),
      task: "Schedule equipment maintenance",
      priority: false,
      time: "09:00",
      userId,
    },
  ]
}

export default function SchedulerPage() {
  const { user, isLoading } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const [formData, setFormData] = useState({
    task: "",
    date: selectedDate,
    time: "",
    priority: false,
  })

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`agriRisk_tasks_${user.id}`)
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      } else {
        // First time user - create default example tasks
        const defaultTasks = createDefaultTasks(user.id)
        setTasks(defaultTasks)
        localStorage.setItem(`agriRisk_tasks_${user.id}`, JSON.stringify(defaultTasks))
      }
    }
  }, [user])

  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(`agriRisk_tasks_${user.id}`, JSON.stringify(tasks))
    }
  }, [tasks, user])

  const handleAddTask = () => {
    if (!user || !formData.task || !formData.date) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      task: formData.task,
      date: formData.date,
      time: formData.time,
      priority: formData.priority,
      userId: user.id,
    }

    setTasks([...tasks, newTask])
    setFormData({ task: "", date: selectedDate, time: "", priority: false })
    setIsAddDialogOpen(false)
  }

  const handleEditTask = () => {
    if (!editingTask || !formData.task || !formData.date) return

    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id
          ? { ...t, task: formData.task, date: formData.date, time: formData.time, priority: formData.priority }
          : t,
      ),
    )
    setEditingTask(null)
    setFormData({ task: "", date: selectedDate, time: "", priority: false })
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setFormData({
      task: task.task,
      date: task.date,
      time: task.time || "",
      priority: task.priority,
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getTasksForDate = (dateStr: string) => {
    return tasks.filter((task) => task.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setSelectedDate(today.toISOString().split("T")[0])
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  const today = new Date().toISOString().split("T")[0]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to access the task scheduler and manage your farm activities.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const selectedDateTasks = getTasksForDate(selectedDate)
  const priorityAlerts = selectedDateTasks.filter((task) => task.priority)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Task Scheduler</h1>
              <p className="text-muted-foreground">Manage your farm activities and tasks</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new task for your farm schedule</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task">Task Description</Label>
                  <Input
                    id="task"
                    placeholder="e.g., Inspect irrigation system"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time (Optional)</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority"
                    checked={formData.priority}
                    onCheckedChange={(checked) => setFormData({ ...formData, priority: checked as boolean })}
                  />
                  <Label htmlFor="priority" className="text-sm font-normal cursor-pointer">
                    Mark as priority task
                  </Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar View */}
          <Card className="lg:col-span-2 border-border/50 bg-card/50 p-6 backdrop-blur">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const dayTasks = getTasksForDate(dateStr)
                const isSelected = dateStr === selectedDate
                const isToday = dateStr === today
                const hasPriority = dayTasks.some((t) => t.priority)

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      aspect-square p-2 rounded-lg border transition-all
                      ${isSelected ? "bg-primary text-primary-foreground border-primary" : "border-border/50 hover:border-primary/50"}
                      ${isToday && !isSelected ? "border-primary/50 bg-primary/5" : ""}
                    `}
                  >
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-medium ${isSelected ? "" : "text-foreground"}`}>{day}</span>
                      {dayTasks.length > 0 && (
                        <div className="mt-auto flex items-center justify-center gap-1">
                          {hasPriority && (
                            <AlertTriangle
                              className={`h-3 w-3 ${isSelected ? "text-primary-foreground" : "text-destructive"}`}
                            />
                          )}
                          <span
                            className={`text-xs ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                          >
                            {dayTasks.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Tasks for Selected Date */}
          <div className="space-y-4">
            <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
              <h3 className="mb-4 text-lg font-semibold">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>

              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No tasks for this day</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`rounded-lg border p-3 transition-colors ${
                        task.priority ? "border-destructive/50 bg-destructive/5" : "border-border/50 bg-background/50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {task.priority ? (
                          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        ) : (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{task.task}</p>
                          {task.time && (
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {task.time}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Dialog
                          open={editingTask?.id === task.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setEditingTask(null)
                              setFormData({ task: "", date: selectedDate, time: "", priority: false })
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => openEditDialog(task)}
                            >
                              <Edit2 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Task</DialogTitle>
                              <DialogDescription>Update your task details</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-task">Task Description</Label>
                                <Input
                                  id="edit-task"
                                  value={formData.task}
                                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-date">Date</Label>
                                  <Input
                                    id="edit-date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-time">Time (Optional)</Label>
                                  <Input
                                    id="edit-time"
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="edit-priority"
                                  checked={formData.priority}
                                  onCheckedChange={(checked) =>
                                    setFormData({ ...formData, priority: checked as boolean })
                                  }
                                />
                                <Label htmlFor="edit-priority" className="text-sm font-normal cursor-pointer">
                                  Mark as priority task
                                </Label>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingTask(null)
                                  setFormData({ task: "", date: selectedDate, time: "", priority: false })
                                }}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleEditTask}>Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-destructive hover:text-destructive"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Priority Alerts */}
            {priorityAlerts.length > 0 && (
              <Card className="border-destructive/50 bg-destructive/5 p-4 backdrop-blur">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Priority Tasks
                </h4>
                <ul className="space-y-1">
                  {priorityAlerts.map((task) => (
                    <li key={task.id} className="flex items-start gap-2 text-xs">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                      {task.task}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
