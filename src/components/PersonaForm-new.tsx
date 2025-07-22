'use client';

import { useState, useEffect } from 'react';
import { Persona } from '@/types/persona';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface PersonaFormProps {
  persona?: Persona | null;
  onSubmit: (persona: Omit<Persona, 'id' | 'createdAt' | 'lastUsed' | 'totalChats' | 'totalMessages' | 'avgChatDuration' | 'favoriteCount'>) => void;
  onCancel: () => void;
}

const personaTypes = ['assistant', 'mentor', 'friend', 'expert', 'creative', 'therapist'];
const responseStyles = ['formal', 'casual', 'playful', 'professional', 'empathetic'];
const moods = ['Energetic', 'Calm', 'Cheerful', 'Focused', 'Dreamy', 'Serene', 'Contemplative'];

export default function PersonaForm({ persona, onSubmit, onCancel }: PersonaFormProps) {
  const [formData, setFormData] = useState<{
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
    status: 'active' | 'inactive' | 'archived';
    tags: string[];
    rating: number;
  }>({
    name: '',
    description: '',
    avatar: '',
    type: 'assistant',
    specialty: '',
    personality: [],
    conversationStyle: '',
    expertise: [],
    mood: '',
    responseStyle: 'professional',
    languages: [],
    topics: [],
    greeting: '',
    catchphrase: '',
    status: 'active',
    tags: [],
    rating: 4.5
  });

  const [currentInput, setCurrentInput] = useState({
    personality: '',
    expertise: '',
    languages: '',
    topics: '',
    tags: ''
  });

  useEffect(() => {
    if (persona) {
      setFormData({
        name: persona.name,
        description: persona.description,
        avatar: persona.avatar,
        type: persona.type,
        specialty: persona.specialty,
        personality: persona.personality,
        conversationStyle: persona.conversationStyle,
        expertise: persona.expertise,
        mood: persona.mood,
        responseStyle: persona.responseStyle,
        languages: persona.languages,
        topics: persona.topics,
        greeting: persona.greeting,
        catchphrase: persona.catchphrase,
        status: persona.status,
        tags: persona.tags,
        rating: persona.rating
      });
    }
  }, [persona]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleArrayInput = (field: keyof typeof currentInput, value: string) => {
    setCurrentInput({ ...currentInput, [field]: value });
  };

  const addToArray = (field: 'personality' | 'expertise' | 'languages' | 'topics' | 'tags', inputField: keyof typeof currentInput) => {
    const value = currentInput[inputField].trim();
    const currentArray = formData[field] as string[];
    if (value && !currentArray.includes(value)) {
      setFormData({
        ...formData,
        [field]: [...currentArray, value]
      });
      setCurrentInput({ ...currentInput, [inputField]: '' });
    }
  };

  const removeFromArray = (field: 'personality' | 'expertise' | 'languages' | 'topics' | 'tags', index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const renderArrayField = (
    label: string,
    field: 'personality' | 'expertise' | 'languages' | 'topics' | 'tags',
    inputField: keyof typeof currentInput,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={currentInput[inputField]}
          onChange={(e) => handleArrayInput(inputField, e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray(field, inputField))}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addToArray(field, inputField)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {(formData[field] as string[]).map((item: string, index: number) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {item}
            <button
              type="button"
              onClick={() => removeFromArray(field, index)}
              className="ml-1 hover:bg-red-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{persona ? 'Edit AI Persona' : 'Create New AI Persona'}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Alex the Assistant"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar (Emoji) *</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="🤖"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the persona's purpose and characteristics..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Persona Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {personaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty *</Label>
            <Input
              id="specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="e.g., Productivity & Organization"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Select
              value={formData.mood}
              onValueChange={(value) => setFormData({ ...formData, mood: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responseStyle">Response Style</Label>
            <Select
              value={formData.responseStyle}
              onValueChange={(value) => setFormData({ ...formData, responseStyle: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {responseStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="conversationStyle">Conversation Style</Label>
          <Input
            id="conversationStyle"
            value={formData.conversationStyle}
            onChange={(e) => setFormData({ ...formData, conversationStyle: e.target.value })}
            placeholder="e.g., Clear and supportive"
          />
        </div>

        {renderArrayField('Personality Traits', 'personality', 'personality', 'Add personality trait')}
        {renderArrayField('Expertise Areas', 'expertise', 'expertise', 'Add expertise area')}
        {renderArrayField('Languages', 'languages', 'languages', 'Add language')}
        {renderArrayField('Topics', 'topics', 'topics', 'Add topic')}

        <div className="space-y-2">
          <Label htmlFor="greeting">Greeting Message</Label>
          <Textarea
            id="greeting"
            value={formData.greeting}
            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
            placeholder="The initial message this persona will send to users..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="catchphrase">Catchphrase</Label>
          <Input
            id="catchphrase"
            value={formData.catchphrase}
            onChange={(e) => setFormData({ ...formData, catchphrase: e.target.value })}
            placeholder="A memorable phrase this persona uses"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.5 })}
            />
          </div>
        </div>

        {renderArrayField('Tags', 'tags', 'tags', 'Add tag')}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {persona ? 'Update Persona' : 'Create Persona'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
