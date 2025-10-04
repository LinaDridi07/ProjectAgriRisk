// Authentication utility functions using localStorage

export interface User {
  id: string
  name: string
  email: string
  password: string // In production, this would be hashed
  createdAt: string
}

export interface AuthSession {
  user: Omit<User, "password">
  token: string
}

// Get all users from localStorage
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("agriRisk_users")
  return users ? JSON.parse(users) : []
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  localStorage.setItem("agriRisk_users", JSON.stringify(users))
}

// Register a new user
export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = getUsers()

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    return { success: false, error: "Email already registered" }
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // In production, hash this!
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return { success: true }
}

// Login user
export function loginUser(
  email: string,
  password: string,
): { success: boolean; error?: string; session?: AuthSession } {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  const session: AuthSession = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token: crypto.randomUUID(),
  }

  // Save session
  localStorage.setItem("agriRisk_session", JSON.stringify(session))

  return { success: true, session }
}

// Get current session
export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null
  const session = localStorage.getItem("agriRisk_session")
  return session ? JSON.parse(session) : null
}

// Logout
export function logout(): void {
  localStorage.removeItem("agriRisk_session")
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession() !== null
}
