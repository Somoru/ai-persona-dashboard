'use client';

import { useState, useEffect } from 'react';
import { Persona } from '@/types/persona';
import { PersonaStorage } from '@/lib/storage';
import { mockPersonas, mockDashboardStats, mockUsageData } from '@/data/mockData';
import PersonaGrid from '@/components/PersonaGrid';
import DashboardHeader from '@/components/DashboardHeader';
import Analytics from '@/components/Analytics';
import PersonaForm from '@/components/PersonaForm';
import { Dialog } from '@/components/ui/dialog';

export default function PersonaDashboard() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [activeTab, setActiveTab] = useState<'personas' | 'analytics'>('personas');

  // Generate real stats from actual personas
  const generateStats = (personaList: Persona[]) => {
    const totalChats = personaList.reduce((sum, p) => sum + (p.totalChats || 0), 0);
    const totalMessages = personaList.reduce((sum, p) => sum + (p.totalMessages || 0), 0);
    const avgMessagesPerChat = totalChats > 0 ? Number((totalMessages / totalChats).toFixed(1)) : 0;
    const topRated = [...personaList]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);

    return {
      totalPersonas: personaList.length,
      activePersonas: personaList.filter(p => p.status === 'active').length,
      totalChats,
      totalMessages,
      avgMessagesPerChat,
      mostPopularPersona: personaList.length > 0 ? personaList[0]?.name || 'None' : 'None',
      recentActivity: mockUsageData.slice(-7),
      topRatedPersonas: topRated
    };
  };

  useEffect(() => {
    // Load personas from localStorage or use mock data
    const storedPersonas = PersonaStorage.getPersonas();
    if (storedPersonas.length === 0) {
      // If no stored personas, use mock data
      mockPersonas.forEach(persona => PersonaStorage.addPersona(persona));
      setPersonas(mockPersonas);
    } else {
      setPersonas(storedPersonas);
    }
  }, []);

  const handleAddPersona = (personaData: Omit<Persona, 'id' | 'createdAt' | 'lastUsed' | 'totalChats' | 'totalMessages' | 'avgChatDuration' | 'favoriteCount'>) => {
    const newPersona: Persona = {
      ...personaData,
      id: PersonaStorage.generateId(),
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      totalChats: 0,
      totalMessages: 0,
      avgChatDuration: 0,
      favoriteCount: 0
    };
    
    PersonaStorage.addPersona(newPersona);
    setPersonas(PersonaStorage.getPersonas());
    setShowForm(false);
  };

  const handleEditPersona = (personaData: Omit<Persona, 'id' | 'createdAt' | 'lastUsed' | 'totalChats' | 'totalMessages' | 'avgChatDuration' | 'favoriteCount'>) => {
    if (editingPersona) {
      const updatedPersona = {
        ...editingPersona,
        ...personaData
      };
      PersonaStorage.updatePersona(editingPersona.id, updatedPersona);
      setPersonas(PersonaStorage.getPersonas());
      setEditingPersona(null);
      setShowForm(false);
    }
  };

  const handleDeletePersona = (id: string) => {
    PersonaStorage.deletePersona(id);
    setPersonas(PersonaStorage.getPersonas());
  };

  const handleChatWithPersona = (id: string) => {
    // Simulate starting a chat - increment usage stats
    const persona = personas.find(p => p.id === id);
    if (persona) {
      const updatedPersona = {
        ...persona,
        totalChats: persona.totalChats + 1,
        totalMessages: persona.totalMessages + Math.floor(Math.random() * 10) + 3, // Random 3-12 messages
        lastUsed: new Date().toISOString(),
        favoriteCount: persona.favoriteCount + (Math.random() > 0.8 ? 1 : 0) // 20% chance to favorite
      };
      PersonaStorage.updatePersona(id, updatedPersona);
      setPersonas(PersonaStorage.getPersonas());
      
      // Here you would typically open a chat interface
      console.log(`Starting chat with ${persona.name}`);
    }
  };

  const startEdit = (persona: Persona) => {
    setEditingPersona(persona);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingPersona(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onAddPersona={() => setShowForm(true)}
      />
      
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'personas' ? (
          <PersonaGrid 
            personas={personas}
            onEdit={startEdit}
            onDelete={handleDeletePersona}
            onChat={handleChatWithPersona}
          />
        ) : (
          <Analytics 
            stats={generateStats(personas)}
            usageData={mockUsageData || []}
          />
        )}
      </main>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <PersonaForm
          persona={editingPersona}
          onSubmit={editingPersona ? handleEditPersona : handleAddPersona}
          onCancel={cancelEdit}
        />
      </Dialog>
    </div>
  );
}
