'use client';

import { Persona } from '@/types/persona';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle, Users, Clock, Edit, Trash2, Play } from 'lucide-react';

interface PersonaCardProps {
  persona: Persona;
  onChat?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isLarge?: boolean;
}

export default function PersonaCard({ persona, onChat, onEdit, onDelete, isLarge = false }: PersonaCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPersonaTypeColor = (type: string) => {
    const colors = {
      assistant: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      mentor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      friend: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      expert: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      creative: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      therapist: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
    };
    return colors[type as keyof typeof colors] || colors.assistant;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{persona.avatar}</div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {persona.name}
              </CardTitle>
              <Badge className={`mt-1 ${getPersonaTypeColor(persona.type)}`}>
                {persona.type}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(persona.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              ({persona.rating || 0})
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            <span>{(persona.totalChats || 0).toLocaleString()} chats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4 text-green-500" />
            <span>{persona.favoriteCount || 0} favorites</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{persona.avgChatDuration || 0}min avg • Last used: {formatDate(persona.lastUsed)}</span>
          </div>
        </div>

        {isLarge && (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Specialty:</span> {persona.specialty}
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Personality</div>
              <div className="flex flex-wrap gap-1">
                {(persona.personality || []).slice(0, 4).map((trait, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topics</div>
              <div className="flex flex-wrap gap-1">
                {(persona.topics || []).slice(0, 4).map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Greeting</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "{persona.greeting}"
              </p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {!isLarge && (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Specialty:</span> {persona.specialty}
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Personality</div>
                <div className="flex flex-wrap gap-1">
                  {(persona.personality || []).slice(0, 3).map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {persona.description}
          </p>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={onChat}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Play className="w-4 h-4 mr-1" />
              Start Chat
            </Button>
            
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600"
            >
              <Edit className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLarge && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Catchphrase</div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {persona.catchphrase}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}