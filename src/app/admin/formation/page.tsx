'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Loader2, GraduationCap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Formation {
    id: string;
    periode: string;
    titre: string;
    ecole: string;
    icon: string;
    description?: string;
    order: number;
}

interface Certification {
    id: string;
    date: string;
    titre: string;
    organisme: string;
    icon: string;
    order: number;
}

export default function FormationPage() {
    const { toast } = useToast();
    const [formations, setFormations] = useState<Formation[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    // Formation modal
    const [formationDialogOpen, setFormationDialogOpen] = useState(false);
    const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
    const [formationForm, setFormationForm] = useState({
        periode: '',
        titre: '',
        ecole: '',
        icon: 'GraduationCap',
        description: '',
        order: 0,
    });

    // Certification modal
    const [certificationDialogOpen, setCertificationDialogOpen] = useState(false);
    const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
    const [certificationForm, setCertificationForm] = useState({
        date: '',
        titre: '',
        organisme: '',
        icon: 'Award',
        order: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [formationsRes, certificationsRes] = await Promise.all([
                fetch('/api/formation'),
                fetch('/api/certification'),
            ]);

            if (formationsRes.ok) {
                const data = await formationsRes.json();
                setFormations(data);
            }

            if (certificationsRes.ok) {
                const data = await certificationsRes.json();
                setCertifications(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Erreur',
                description: 'Impossible de charger les données',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    // Formation handlers
    const handleSaveFormation = async () => {
        try {
            const url = '/api/formation';
            const method = editingFormation ? 'PUT' : 'POST';
            const body = editingFormation
                ? { id: editingFormation.id, ...formationForm }
                : formationForm;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

            toast({
                title: 'Succès',
                description: editingFormation ? 'Formation modifiée' : 'Formation ajoutée',
            });

            setFormationDialogOpen(false);
            setEditingFormation(null);
            setFormationForm({ periode: '', titre: '', ecole: '', icon: 'GraduationCap', description: '', order: 0 });
            fetchData();
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de sauvegarder la formation',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteFormation = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;

        try {
            const response = await fetch(`/api/formation?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erreur lors de la suppression');

            toast({
                title: 'Succès',
                description: 'Formation supprimée',
            });

            fetchData();
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer la formation',
                variant: 'destructive',
            });
        }
    };

    const handleEditFormation = (formation: Formation) => {
        setEditingFormation(formation);
        setFormationForm({
            periode: formation.periode,
            titre: formation.titre,
            ecole: formation.ecole,
            icon: formation.icon,
            description: formation.description || '',
            order: formation.order,
        });
        setFormationDialogOpen(true);
    };

    // Certification handlers
    const handleSaveCertification = async () => {
        try {
            const url = '/api/certification';
            const method = editingCertification ? 'PUT' : 'POST';
            const body = editingCertification
                ? { id: editingCertification.id, ...certificationForm }
                : certificationForm;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

            toast({
                title: 'Succès',
                description: editingCertification ? 'Certification modifiée' : 'Certification ajoutée',
            });

            setCertificationDialogOpen(false);
            setEditingCertification(null);
            setCertificationForm({ date: '', titre: '', organisme: '', icon: 'Award', order: 0 });
            fetchData();
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de sauvegarder la certification',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteCertification = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) return;

        try {
            const response = await fetch(`/api/certification?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erreur lors de la suppression');

            toast({
                title: 'Succès',
                description: 'Certification supprimée',
            });

            fetchData();
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer la certification',
                variant: 'destructive',
            });
        }
    };

    const handleEditCertification = (certification: Certification) => {
        setEditingCertification(certification);
        setCertificationForm({
            date: certification.date,
            titre: certification.titre,
            organisme: certification.organisme,
            icon: certification.icon,
            order: certification.order,
        });
        setCertificationDialogOpen(true);
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
                <h2 className="text-3xl font-bold text-white mb-2">Formations</h2>
                <p className="text-slate-400">Gérer les formations et certifications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formations */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-white">Formations académiques</CardTitle>
                                <CardDescription>Parcours académique</CardDescription>
                            </div>
                            <Dialog open={formationDialogOpen} onOpenChange={setFormationDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setEditingFormation(null);
                                            setFormationForm({ periode: '', titre: '', ecole: '', icon: 'GraduationCap', description: '', order: 0 });
                                        }}
                                        className="bg-cyan-600 hover:bg-cyan-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Ajouter
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                                    <DialogHeader>
                                        <DialogTitle>{editingFormation ? 'Modifier' : 'Ajouter'} une formation</DialogTitle>
                                        <DialogDescription>Remplissez les informations de la formation</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="periode">Période</Label>
                                            <Input
                                                id="periode"
                                                placeholder="2023-2024"
                                                value={formationForm.periode}
                                                onChange={(e) => setFormationForm({ ...formationForm, periode: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="titre">Titre</Label>
                                            <Input
                                                id="titre"
                                                placeholder="Master en Ingénierie Informatique"
                                                value={formationForm.titre}
                                                onChange={(e) => setFormationForm({ ...formationForm, titre: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ecole">École</Label>
                                            <Input
                                                id="ecole"
                                                placeholder="EMIT Fianarantsoa"
                                                value={formationForm.ecole}
                                                onChange={(e) => setFormationForm({ ...formationForm, ecole: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="icon">Icône</Label>
                                            <Select
                                                value={formationForm.icon}
                                                onValueChange={(value) => setFormationForm({ ...formationForm, icon: value })}
                                            >
                                                <SelectTrigger className="bg-slate-900 border-slate-700">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-slate-700">
                                                    <SelectItem value="GraduationCap">GraduationCap (Diplôme)</SelectItem>
                                                    <SelectItem value="BookOpen">BookOpen (Livre)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Description (optionnel)</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Description de la formation"
                                                value={formationForm.description}
                                                onChange={(e) => setFormationForm({ ...formationForm, description: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="order">Ordre d&#39;affichage</Label>
                                            <Input
                                                id="order"
                                                type="number"
                                                value={formationForm.order}
                                                onChange={(e) => setFormationForm({ ...formationForm, order: parseInt(e.target.value) || 0 })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setFormationDialogOpen(false)}>
                                            Annuler
                                        </Button>
                                        <Button onClick={handleSaveFormation} className="bg-cyan-600 hover:bg-cyan-700">
                                            {editingFormation ? 'Modifier' : 'Ajouter'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {formations.map((formation) => (
                                <div
                                    key={formation.id}
                                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                                >
                                    <div className="flex items-start gap-3">
                                        <GraduationCap className="w-5 h-5 text-cyan-400 mt-1" />
                                        <div>
                                            <h4 className="font-medium text-white">{formation.titre}</h4>
                                            <p className="text-sm text-slate-400">{formation.ecole}</p>
                                            <p className="text-xs text-slate-500">{formation.periode}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEditFormation(formation)}
                                            className="text-cyan-400 hover:text-cyan-300"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDeleteFormation(formation.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {formations.length === 0 && (
                                <p className="text-center text-slate-500 py-8">Aucune formation</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-white">Certifications</CardTitle>
                                <CardDescription>Certificats obtenus</CardDescription>
                            </div>
                            <Dialog open={certificationDialogOpen} onOpenChange={setCertificationDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setEditingCertification(null);
                                            setCertificationForm({ date: '', titre: '', organisme: '', icon: 'Award', order: 0 });
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Ajouter
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                                    <DialogHeader>
                                        <DialogTitle>{editingCertification ? 'Modifier' : 'Ajouter'} une certification</DialogTitle>
                                        <DialogDescription>Remplissez les informations de la certification</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cert-date">Date</Label>
                                            <Input
                                                id="cert-date"
                                                placeholder="2024"
                                                value={certificationForm.date}
                                                onChange={(e) => setCertificationForm({ ...certificationForm, date: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cert-titre">Titre</Label>
                                            <Input
                                                id="cert-titre"
                                                placeholder="Certificat en Python"
                                                value={certificationForm.titre}
                                                onChange={(e) => setCertificationForm({ ...certificationForm, titre: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cert-organisme">Organisme</Label>
                                            <Input
                                                id="cert-organisme"
                                                placeholder="HackerRank"
                                                value={certificationForm.organisme}
                                                onChange={(e) => setCertificationForm({ ...certificationForm, organisme: e.target.value })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cert-order">Ordre d&#39;affichage</Label>
                                            <Input
                                                id="cert-order"
                                                type="number"
                                                value={certificationForm.order}
                                                onChange={(e) => setCertificationForm({ ...certificationForm, order: parseInt(e.target.value) || 0 })}
                                                className="bg-slate-900 border-slate-700"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setCertificationDialogOpen(false)}>
                                            Annuler
                                        </Button>
                                        <Button onClick={handleSaveCertification} className="bg-green-600 hover:bg-green-700">
                                            {editingCertification ? 'Modifier' : 'Ajouter'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {certifications.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                                >
                                    <div className="flex items-start gap-3">
                                        <Award className="w-5 h-5 text-green-400 mt-1" />
                                        <div>
                                            <h4 className="font-medium text-white">{cert.titre}</h4>
                                            <p className="text-sm text-slate-400">{cert.organisme}</p>
                                            <p className="text-xs text-slate-500">{cert.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEditCertification(cert)}
                                            className="text-cyan-400 hover:text-cyan-300"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDeleteCertification(cert.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {certifications.length === 0 && (
                                <p className="text-center text-slate-500 py-8">Aucune certification</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}