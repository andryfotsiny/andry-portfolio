'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Loader2, Folder, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  titre: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export default function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({
    titre: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
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
      const url = '/api/projects';
      const method = editing ? 'PUT' : 'POST';
      
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
        description: editing ? 'Projet modifié' : 'Projet ajouté',
      });

      setDialogOpen(false);
      setEditing(null);
      setForm({ titre: '', description: '', technologies: '', githubUrl: '', liveUrl: '', featured: false, order: 0 });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Projet supprimé' });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    
    let techString = '';
    try {
      const techArray = JSON.parse(project.technologies);
      techString = techArray.join(', ');
    } catch {
      techString = project.technologies;
    }
    
    setForm({
      titre: project.titre,
      description: project.description,
      technologies: techString,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      order: project.order,
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
          <h2 className="text-3xl font-bold text-white mb-2">Projets</h2>
          <p className="text-slate-400">Gérer vos projets personnels</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditing(null);
                setForm({ titre: '', description: '', technologies: '', githubUrl: '', liveUrl: '', featured: false, order: 0 });
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un projet
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing ? 'Modifier' : 'Ajouter'} un projet</DialogTitle>
              <DialogDescription>Remplissez les informations du projet</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <Label htmlFor="titre">Titre *</Label>
                <Input
                  id="titre"
                  placeholder="Portfolio Interactif"
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Description du projet..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-slate-900 border-slate-700 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (séparées par des virgules) *</Label>
                <Input
                  id="technologies"
                  placeholder="Next.js, TypeScript, Tailwind CSS"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="githubUrl">URL GitHub</Label>
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/..."
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="liveUrl">URL Live/Demo</Label>
                  <Input
                    id="liveUrl"
                    placeholder="https://demo.example.com"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) => setForm({ ...form, featured: checked })}
                />
                <Label htmlFor="featured" className="cursor-pointer flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Projet mis en avant (Featured)
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
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                {editing ? 'Modifier' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="w-5 h-5 text-purple-400" />
                  <CardTitle className="text-white">{project.titre}</CardTitle>
                  {project.featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(project)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {(() => {
                  try {
                    return JSON.parse(project.technologies).map((tech: string, i: number) => (
                      <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ));
                  } catch {
                    return null;
                  }
                })()}
              </div>
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex gap-2 mt-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      🔗 GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-slate-500 py-8 col-span-2">Aucun projet</p>
        )}
      </div>
    </div>
  );
}
