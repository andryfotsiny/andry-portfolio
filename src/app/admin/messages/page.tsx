'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Mail, Trash2, Eye, EyeOff, Calendar, User, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de charger les messages', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read }),
      });

      if (!response.ok) throw new Error('Erreur');

      toast({ 
        title: 'Succès', 
        description: read ? 'Message marqué comme lu' : 'Message marqué comme non lu' 
      });
      
      fetchData();
    } catch  {
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de modifier le message', 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const response = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Message supprimé' });
      
      if (selectedMessage?.id === id) {
        setDialogOpen(false);
        setSelectedMessage(null);
      }
      
      fetchData();
    } catch  {
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de supprimer', 
        variant: 'destructive' 
      });
    }
  };

  const handleOpenMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setDialogOpen(true);
    
    // Marquer comme lu automatiquement
    if (!message.read) {
      await handleMarkAsRead(message.id, true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Messages</h2>
          <p className="text-slate-400">
            {messages.length} message{messages.length > 1 ? 's' : ''} au total
            {unreadCount > 0 && ` • ${unreadCount} non lu${unreadCount > 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            <Mail className="w-3 h-3 mr-1" />
            {messages.length} Total
          </Badge>
          {unreadCount > 0 && (
            <Badge className="bg-orange-500 hover:bg-orange-600">
              {unreadCount} Non lu{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="w-16 h-16 text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">Aucun message reçu</p>
            <p className="text-slate-500 text-sm">Les messages du formulaire de contact apparaîtront ici</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-cyan-500/50 ${
                !message.read ? 'border-l-4 border-l-orange-500' : ''
              }`}
              onClick={() => handleOpenMessage(message)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <CardTitle className="text-white text-lg">{message.name}</CardTitle>
                      {!message.read && (
                        <Badge className="bg-orange-500 text-xs">Nouveau</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <AtSign className="w-3 h-3" />
                        {message.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMarkAsRead(message.id, !message.read)}
                      className="text-cyan-400 hover:text-cyan-300"
                      title={message.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                    >
                      {message.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(message.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 line-clamp-2">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog pour voir le message complet */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Message de {selectedMessage.name}
                </DialogTitle>
                <DialogDescription>
                  Reçu le {formatDate(selectedMessage.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Nom</p>
                    <p className="text-white font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Email</p>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Message</p>
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: Message depuis le portfolio`)}
                    className="bg-cyan-600 hover:bg-cyan-700 flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Répondre par email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.read)}
                    className="border-slate-600"
                  >
                    {selectedMessage.read ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Marquer non lu
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Marquer lu
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="border-red-600 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
