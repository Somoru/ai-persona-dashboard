export interface Persona {
  id: string;
  name: string;
  description: string;
  avatar: string;
  type: 'assistant' | 'mentor' | 'friend' | 'expert' | 'creative' | 'therapist';
  specialty: string;
  personality: string[];
  conversationStyle: string;
  expertise: string[];
  mood: string;
  responseStyle: 'formal' | 'casual' | 'playful' | 'professional' | 'empathetic';
  languages: string[];
  topics: string[];
  greeting: string;
  catchphrase: string;
  createdAt: string;
  lastUsed: string;
  totalChats: number;
  totalMessages: number;
  avgChatDuration: number; // in minutes
  status: 'active' | 'inactive' | 'archived';
  tags: string[];
  rating: number; // 1-5 stars
  favoriteCount: number;
}

export interface PersonaUsageData {
  date: string;
  chats: number;
  messages: number;
  personaId: string;
  personaName: string;
}

export interface DashboardStats {
  totalPersonas: number;
  activePersonas: number;
  totalChats: number;
  totalMessages: number;
  avgMessagesPerChat: number;
  mostPopularPersona: string;
  recentActivity: PersonaUsageData[];
  topRatedPersonas: Persona[];
}
