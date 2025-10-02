export interface OrganizerEvent {
  slug: string
  status: "Live" | "Planning" | "Draft"
  dateRange: string
  name: string
  subtitle: string
  location: string
  heroHighlight: string
  metrics: {
    attendees: { value: string; change: string }
    activeSessions: { value: string }
    pendingTasks: { value: string; change: string }
    checkinsToday: { value: string }
  }
}

export const organizerEvents: OrganizerEvent[] = [
  {
    slug: "techconf-2025",
    status: "Live",
    dateRange: "Jan 15-17, 2025",
    name: "TechConf 2025",
    subtitle: "The Future of Technology",
    location: "San Francisco, CA",
    heroHighlight: "AI and machine learning dominate the conversation with 500+ attendees engaged.",
    metrics: {
      attendees: { value: "2,847", change: "+12%" },
      activeSessions: { value: "23" },
      pendingTasks: { value: "8", change: "-2" },
      checkinsToday: { value: "156" }
    }
  },
  {
    slug: "future-health-summit",
    status: "Planning",
    dateRange: "Mar 10-12, 2025",
    name: "Future of Health Summit",
    subtitle: "Advancing Healthcare Innovation",
    location: "Boston, MA",
    heroHighlight: "Breakthrough research in personalized medicine and telemedicine.",
    metrics: {
      attendees: { value: "1,523", change: "+8%" },
      activeSessions: { value: "12" },
      pendingTasks: { value: "15", change: "+3" },
      checkinsToday: { value: "89" }
    }
  },
  {
    slug: "green-innovations-expo",
    status: "Draft",
    dateRange: "Apr 22-24, 2025",
    name: "Green Innovations Expo",
    subtitle: "Sustainable Solutions for Tomorrow",
    location: "Seattle, WA",
    heroHighlight: "Cutting-edge technologies for environmental conservation and renewable energy.",
    metrics: {
      attendees: { value: "987", change: "+5%" },
      activeSessions: { value: "7" },
      pendingTasks: { value: "22", change: "+7" },
      checkinsToday: { value: "34" }
    }
  }
]
