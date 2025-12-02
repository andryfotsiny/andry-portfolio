'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Loader2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  periode: string;
  description: string;
  technologies: string;
  current: boolean;
  order: number;
}

export default function ExperiencePage() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState({
    poste: '',
    entreprise: '',
    periode: '',
    description: '',
    technologies: '',
    current: false,
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Erreur', description: 'Impossible de charger les données', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = '/api/experience';
      const method = editing ? 'PUT' : 'POST';
      
      // Convertir le tableau de technologies en JSON string
      const techArray = form.technologies.split(',').map(t => t.trim()).filter(t => t);
      const body = editing
        ? { id: editing.id, ...form, technologies: JSON.stringify(techArray) }
        : { ...form, technologies: JSON.stringify(techArray) };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      toast({
        title: 'Succès',
        description: editing ? 'Expérience modifiée' : 'Expérience ajoutée',
      });

      setDialogOpen(false);
      setEditing(null);
      setForm({ poste: '', entreprise: '', periode: '', description: '', technologies: '', current: false, order: 0 });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) return;

    try {
      const response = await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Expérience supprimée' });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditing(exp);
    
    // Convertir le JSON string en liste séparée par virgules
    let techString = '';
    try {
      const techArray = JSON.parse(exp.technologies);
      techString = techArray.join(', ');
    } catch {
      techString = exp.technologies;
    }
    
    setForm({
      poste: exp.poste,
      entreprise: exp.entreprise,
      periode: exp.periode,
      description: exp.description,
      technologies: techString,
      current: exp.current,
      order: exp.order,
    });
    setDialogOpen(true);
  };

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
          <h2 className="text-3xl font-bold text-white mb-2">Expériences</h2>
          <p className="text-slate-400">Gérer les expériences professionnelles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditing(null);
                setForm({ poste: '', entreprise: '', periode: '', description: '', technologies: '', current: false, order: 0 });
              }}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une expérience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing ? 'Modifier' : 'Ajouter'} une expérience</DialogTitle>
              <DialogDescription>Remplissez les informations de l&#39;expérience professionnelle</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="poste">Poste *</Label>
                  <Input
                    id="poste"
                    placeholder="Développeur Full-stack"
                    value={form.poste}
                    onChange={(e) => setForm({ ...form, poste: e.target.value })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="entreprise">Entreprise *</Label>
                  <Input
                    id="entreprise"
                    placeholder="Relia Consulting"
                    value={form.entreprise}
                    onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="periode">Période *</Label>
                <Input
                  id="periode"
                  placeholder="Août 2024 - Février 2025"
                  value={form.periode}
                  onChange={(e) => setForm({ ...form, periode: e.target.value })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Description de l'expérience..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-slate-900 border-slate-700 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (séparées par des virgules) *</Label>
                <Input
                  id="technologies"
                  placeholder="React, Node.js, MongoDB, Docker"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="bg-slate-900 border-slate-700"
                />
                <p className="text-xs text-slate-500 mt-1">Exemple: React, Node.js, MongoDB</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={form.current}
                  onCheckedChange={(checked) => setForm({ ...form, current: checked })}
                />
                <Label htmlFor="current" className="cursor-pointer">
                  Poste actuel (en cours)
                </Label>
              </div>
              <div>
                <Label htmlFor="order">Ordre d&#39;affichage</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700">
                {editing ? 'Modifier' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Liste des expériences</CardTitle>
          <CardDescription>Toutes vos expériences professionnelles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex items-start justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
              >
                <div className="flex items-start gap-3 flex-1">
                  <Briefcase className="w-5 h-5 text-cyan-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{exp.poste}</h4>
                      {exp.current && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          En cours
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{exp.entreprise}</p>
                    <p className="text-xs text-slate-500">{exp.periode}</p>
                    <p className="text-sm text-slate-300 mt-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(() => {
                        try {
                          return JSON.parse(exp.technologies).map((tech: string, i: number) => (
                            <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ));
                        } catch {
                          return null;
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(exp)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && (
              <p className="text-center text-slate-500 py-8">Aucune expérience</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
