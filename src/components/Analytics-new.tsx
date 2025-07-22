'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { DashboardStats } from '@/types/persona';
import { MessageCircle, Users, Clock, TrendingUp, Star, Bot } from 'lucide-react';

interface AnalyticsProps {
  stats: DashboardStats;
  usageData: any[];
}

export default function Analytics({ stats, usageData }: AnalyticsProps) {
  // Prepare chart data
  const weeklyData = usageData.slice(-7).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    chats: item.chats,
    messages: item.messages
  }));

  const personaTypeData = [
    { name: 'Assistant', value: 25, color: '#3B82F6' },
    { name: 'Creative', value: 20, color: '#EC4899' },
    { name: 'Friend', value: 30, color: '#10B981' },
    { name: 'Expert', value: 15, color: '#F59E0B' },
    { name: 'Mentor', value: 8, color: '#8B5CF6' },
    { name: 'Therapist', value: 2, color: '#6366F1' }
  ];

  const topPersonas = stats.topRatedPersonas?.map(persona => ({
    name: persona.name.split(' ')[0], // Just first name for chart
    chats: persona.totalChats,
    rating: persona.rating
  })) || [];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Personas</p>
                <p className="text-2xl font-bold">{stats.totalPersonas}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Chats</p>
                <p className="text-2xl font-bold">{stats.totalChats.toLocaleString()}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{stats.totalMessages.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Messages/Chat</p>
                <p className="text-2xl font-bold">{stats.avgMessagesPerChat}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Weekly Chat Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chats" fill="#3B82F6" name="Chats" />
                <Bar dataKey="messages" fill="#10B981" name="Messages" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Persona Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Persona Types Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={personaTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {personaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Personas Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Rated Personas Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPersonas} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="chats" fill="#8B5CF6" name="Total Chats" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Daily Message Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                name="Messages"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.mostPopularPersona}
            </div>
            <p className="text-sm text-muted-foreground">Most Popular Persona</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.activePersonas}
            </div>
            <p className="text-sm text-muted-foreground">Active Personas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(stats.totalMessages / stats.totalChats * 10) / 10}
            </div>
            <p className="text-sm text-muted-foreground">Avg Engagement Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
