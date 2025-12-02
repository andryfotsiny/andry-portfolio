'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Loader2, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  categoryId: string;
  order: number;
}

interface Language {
  id: string;
  name: string;
  level: string;
  order: number;
}

export default function SkillsPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  // Category dialog
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: 'Code', order: 0 });

  // Skill dialog
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', categoryId: '', order: 0 });

  // Language dialog
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [languageForm, setLanguageForm] = useState({ name: '', level: '', order: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, languagesRes] = await Promise.all([
        fetch('/api/skill-category'),
        fetch('/api/language'),
      ]);

      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (languagesRes.ok) setLanguages(await languagesRes.json());
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Erreur', description: 'Impossible de charger les données', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Category handlers
  const handleSaveCategory = async () => {
    try {
      const url = '/api/skill-category';
      const method = editingCategory ? 'PUT' : 'POST';
      const body = editingCategory ? { id: editingCategory.id, ...categoryForm } : categoryForm;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: editingCategory ? 'Catégorie modifiée' : 'Catégorie ajoutée' });
      setCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', icon: 'Code', order: 0 });
      fetchData();
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie supprimera aussi toutes ses compétences. Continuer ?')) return;

    try {
      const response = await fetch(`/api/skill-category?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Catégorie supprimée' });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
    }
  };

  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, icon: category.icon, order: category.order });
    setCategoryDialogOpen(true);
  };

  // Skill handlers
  const handleSaveSkill = async () => {
    try {
      const url = '/api/skill';
      const method = editingSkill ? 'PUT' : 'POST';
      const body = editingSkill ? { id: editingSkill.id, ...skillForm } : skillForm;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: editingSkill ? 'Compétence modifiée' : 'Compétence ajoutée' });
      setSkillDialogOpen(false);
      setEditingSkill(null);
      setSkillForm({ name: '', categoryId: '', order: 0 });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) return;

    try {
      const response = await fetch(`/api/skill?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Compétence supprimée' });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, categoryId: skill.categoryId, order: skill.order });
    setSkillDialogOpen(true);
  };

  // Language handlers
  const handleSaveLanguage = async () => {
    try {
      const url = '/api/language';
      const method = editingLanguage ? 'PUT' : 'POST';
      const body = editingLanguage ? { id: editingLanguage.id, ...languageForm } : languageForm;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: editingLanguage ? 'Langue modifiée' : 'Langue ajoutée' });
      setLanguageDialogOpen(false);
      setEditingLanguage(null);
      setLanguageForm({ name: '', level: '', order: 0 });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
    }
  };

  const handleDeleteLanguage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette langue ?')) return;

    try {
      const response = await fetch(`/api/language?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erreur');

      toast({ title: 'Succès', description: 'Langue supprimée' });
      fetchData();
    } catch  {
      toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
    }
  };

  const handleEditLanguage = (language: Language) => {
    setEditingLanguage(language);
    setLanguageForm({ name: language.name, level: language.level, order: language.order });
    setLanguageDialogOpen(true);
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
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Compétences</h2>
        <p className="text-slate-400">Gérer les compétences techniques et langues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories + Skills */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Catégories & Compétences</h3>
            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryForm({ name: '', icon: 'Code', order: 0 });
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Catégorie
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Modifier' : 'Ajouter'} une catégorie</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nom</Label>
                    <Input
                      placeholder="Frontend"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>
                  <div>
                    <Label>Icône</Label>
                    <Select value={categoryForm.icon} onValueChange={(v) => setCategoryForm({ ...categoryForm, icon: v })}>
                      <SelectTrigger className="bg-slate-900 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="Code">Code</SelectItem>
                        <SelectItem value="Terminal">Terminal</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Cpu">Cpu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ordre</Label>
                    <Input
                      type="number"
                      value={categoryForm.order}
                      onChange={(e) => setCategoryForm({ ...categoryForm, order: parseInt(e.target.value) || 0 })}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleSaveCategory} className="bg-cyan-600">
                    {editingCategory ? 'Modifier' : 'Ajouter'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {categories.map((category) => (
            <Card key={category.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-cyan-400" />
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <span className="text-xs text-slate-500">({category.skills.length})</span>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingSkill(null);
                            setSkillForm({ name: '', categoryId: category.id, order: 0 });
                          }}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-white">
                        <DialogHeader>
                          <DialogTitle>{editingSkill ? 'Modifier' : 'Ajouter'} une compétence</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nom</Label>
                            <Input
                              placeholder="React.js"
                              value={skillForm.name}
                              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                              className="bg-slate-900 border-slate-700"
                            />
                          </div>
                          <div>
                            <Label>Catégorie</Label>
                            <Select value={skillForm.categoryId} onValueChange={(v) => setSkillForm({ ...skillForm, categoryId: v })}>
                              <SelectTrigger className="bg-slate-900 border-slate-700">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900 border-slate-700">
                                {categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Ordre</Label>
                            <Input
                              type="number"
                              value={skillForm.order}
                              onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) || 0 })}
                              className="bg-slate-900 border-slate-700"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSkillDialogOpen(false)}>Annuler</Button>
                          <Button onClick={handleSaveSkill} className="bg-green-600">
                            {editingSkill ? 'Modifier' : 'Ajouter'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" onClick={() => handleEditCategory(category)} className="text-cyan-400">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteCategory(category.id)} className="text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-1 px-3 py-1 bg-slate-900/50 rounded-full border border-slate-700">
                      <span className="text-sm text-slate-300">{skill.name}</span>
                      <button onClick={() => handleEditSkill(skill)} className="text-cyan-400 hover:text-cyan-300 ml-1">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {category.skills.length === 0 && (
                    <p className="text-sm text-slate-500">Aucune compétence</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Languages */}
        <div>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-white">Langues</CardTitle>
                </div>
                <Dialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingLanguage(null);
                        setLanguageForm({ name: '', level: '', order: 0 });
                      }}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-white">
                    <DialogHeader>
                      <DialogTitle>{editingLanguage ? 'Modifier' : 'Ajouter'} une langue</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Nom</Label>
                        <Input
                          placeholder="Français"
                          value={languageForm.name}
                          onChange={(e) => setLanguageForm({ ...languageForm, name: e.target.value })}
                          className="bg-slate-900 border-slate-700"
                        />
                      </div>
                      <div>
                        <Label>Niveau</Label>
                        <Input
                          placeholder="Courant"
                          value={languageForm.level}
                          onChange={(e) => setLanguageForm({ ...languageForm, level: e.target.value })}
                          className="bg-slate-900 border-slate-700"
                        />
                      </div>
                      <div>
                        <Label>Ordre</Label>
                        <Input
                          type="number"
                          value={languageForm.order}
                          onChange={(e) => setLanguageForm({ ...languageForm, order: parseInt(e.target.value) || 0 })}
                          className="bg-slate-900 border-slate-700"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setLanguageDialogOpen(false)}>Annuler</Button>
                      <Button onClick={handleSaveLanguage} className="bg-blue-600">
                        {editingLanguage ? 'Modifier' : 'Ajouter'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div>
                      <p className="text-white font-medium">{lang.name}</p>
                      <p className="text-sm text-slate-400">{lang.level}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditLanguage(lang)} className="text-cyan-400">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteLanguage(lang.id)} className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {languages.length === 0 && (
                  <p className="text-center text-slate-500 py-4">Aucune langue</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
