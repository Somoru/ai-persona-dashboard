'use client';

import { Plus, Users, BarChart3, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardHeaderProps {
  activeTab: 'personas' | 'analytics';
  onTabChange: (tab: 'personas' | 'analytics') => void;
  onAddPersona: () => void;
}

export default function DashboardHeader({ activeTab, onTabChange, onAddPersona }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Persona Dashboard
            </h1>
            
            <nav className="flex space-x-4">
              <button
                onClick={() => onTabChange('personas')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'personas'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users size={20} />
                <span>Personas</span>
              </button>
              
              <button
                onClick={() => onTabChange('analytics')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 size={20} />
                <span>Analytics</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>

            {activeTab === 'personas' && (
              <Button onClick={onAddPersona} className="flex items-center space-x-2">
                <Plus size={20} />
                <span>Add Persona</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
