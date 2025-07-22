import { Persona, PersonaUsageData, DashboardStats } from '@/types/persona';
import { mockPersonas, mockUsageData, mockDashboardStats } from '@/data/mockData';

const STORAGE_KEYS = {
  PERSONAS: 'personas',
  USAGE_DATA: 'personaUsageData',
  DASHBOARD_STATS: 'dashboardStats'
};

export class PersonaStorage {
  static getPersonas(): Persona[] {
    if (typeof window === 'undefined') return mockPersonas;
    
    const stored = localStorage.getItem(STORAGE_KEYS.PERSONAS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing personas from localStorage:', error);
      }
    }
    
    // Initialize with mock data if nothing in storage
    this.setPersonas(mockPersonas);
    return mockPersonas;
  }

  static setPersonas(personas: Persona[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
  }

  static addPersona(persona: Persona): void {
    const personas = this.getPersonas();
    personas.push(persona);
    this.setPersonas(personas);
  }

  static updatePersona(id: string, updates: Partial<Persona>): void {
    const personas = this.getPersonas();
    const index = personas.findIndex(p => p.id === id);
    if (index !== -1) {
      personas[index] = { ...personas[index], ...updates };
      this.setPersonas(personas);
    }
  }

  static deletePersona(id: string): void {
    const personas = this.getPersonas();
    const filtered = personas.filter(p => p.id !== id);
    this.setPersonas(filtered);
  }

  static getUsageData(): PersonaUsageData[] {
    if (typeof window === 'undefined') return mockUsageData;
    
    const stored = localStorage.getItem(STORAGE_KEYS.USAGE_DATA);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing usage data from localStorage:', error);
      }
    }
    
    this.setUsageData(mockUsageData);
    return mockUsageData;
  }

  static setUsageData(data: PersonaUsageData[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USAGE_DATA, JSON.stringify(data));
  }

  static addUsageEntry(entry: PersonaUsageData): void {
    const data = this.getUsageData();
    data.push(entry);
    this.setUsageData(data);
  }

  static getDashboardStats(): DashboardStats {
    if (typeof window === 'undefined') return mockDashboardStats;
    
    const stored = localStorage.getItem(STORAGE_KEYS.DASHBOARD_STATS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing dashboard stats from localStorage:', error);
      }
    }
    
    this.setDashboardStats(mockDashboardStats);
    return mockDashboardStats;
  }

  static setDashboardStats(stats: DashboardStats): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DASHBOARD_STATS, JSON.stringify(stats));
  }

  static incrementPersonaUsage(personaId: string): void {
    const personas = this.getPersonas();
    const persona = personas.find(p => p.id === personaId);
    if (persona) {
      persona.totalChats++;
      persona.lastUsed = new Date().toISOString();
      this.setPersonas(personas);
      
      // Add usage entry
      this.addUsageEntry({
        date: new Date().toISOString().split('T')[0],
        chats: 1,
        messages: 5, // Assume average of 5 messages per chat
        personaId: persona.id,
        personaName: persona.name
      });
    }
  }

  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
