"use client";

import { useState } from 'react';
import { Persona } from '@/types/persona';
import PersonaCard from './PersonaCard';

interface PersonaGridProps {
  personas: Persona[];
  onEdit: (persona: Persona) => void;
  onDelete: (id: string) => void;
  onChat: (id: string) => void;
}

export default function PersonaGrid({ personas, onEdit, onDelete, onChat }: PersonaGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersonas = personas.filter(persona => {
    const matchesSearch = persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         persona.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         persona.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         persona.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  if (personas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No personas</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating your first persona.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search personas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Uniform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
        {filteredPersonas.map((persona, index) => (
          <div
            key={persona.id}
            className=""
          >
            <PersonaCard
              persona={persona}
              onEdit={() => onEdit(persona)}
              onDelete={() => onDelete(persona.id)}
              onChat={() => onChat(persona.id)}
              isLarge={false}
            />
          </div>
        ))}
      </div>

      {filteredPersonas.length === 0 && personas.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No personas match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
