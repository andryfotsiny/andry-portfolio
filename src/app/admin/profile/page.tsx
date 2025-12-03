'use client';

import React, { useEffect, useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Github, Linkedin, Upload, X, Loader2, Save, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProfileData {
    id?: string;
    name: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    photoUrl: string;
    githubUrl: string;
    linkedinUrl: string;
}

interface StatsData {
    id?: string;
    projectsCount: number;
    yearsExp: number;
    skillsCount: number;
}

export default function ProfilePage() {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [form, setForm] = useState<ProfileData>({
        name: '',
        title: '',
        description: '',
        email: '',
        phone: '',
        location: '',
        photoUrl: '',
        githubUrl: '',
        linkedinUrl: '',
    });

    const [stats, setStats] = useState<StatsData>({
        projectsCount: 0,
        yearsExp: 0,
        skillsCount: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, statsRes] = await Promise.all([
                fetch('/api/profile'),
                fetch('/api/stats')
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                if (profileData) {
                    setForm({
                        id: profileData.id,
                        name: profileData.name || '',
                        title: profileData.title || '',
                        description: profileData.description || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        location: profileData.location || '',
                        photoUrl: profileData.photoUrl || '',
                        githubUrl: profileData.githubUrl || '',
                        linkedinUrl: profileData.linkedinUrl || '',
                    });
                    setImagePreview(profileData.photoUrl || '');
                }
            }

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                if (statsData) {
                    setStats({
                        id: statsData.id,
                        projectsCount: statsData.projectsCount || 0,
                        yearsExp: statsData.yearsExp || 0,
                        skillsCount: statsData.skillsCount || 0,
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast({ title: 'Erreur', description: 'Impossible de charger les données', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast({
                title: 'Erreur',
                description: 'Format invalide. Utilisez JPEG, PNG, WebP ou GIF.',
                variant: 'destructive'
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'Erreur',
                description: 'Image trop grande. Maximum 5MB.',
                variant: 'destructive'
            });
            return;
        }

        try {
            setUploading(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const data = await response.json();
            setForm({ ...form, photoUrl: data.url });

            toast({
                title: 'Succès',
                description: 'Photo uploadée avec succès'
            });
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: 'Erreur',
                description: 'Échec de l\'upload de la photo',
                variant: 'destructive'
            });
            setImagePreview(form.photoUrl);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setForm({ ...form, photoUrl: '' });
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const method = form.id ? 'PUT' : 'POST';
            const [profileRes, statsRes] = await Promise.all([
                fetch('/api/profile', {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                }),
                fetch('/api/stats', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(stats),
                })
            ]);

            if (!profileRes.ok || !statsRes.ok) {
                throw new Error('Erreur lors de la sauvegarde');
            }

            toast({
                title: 'Succès',
                description: 'Profil et statistiques mis à jour avec succès',
            });

            fetchData();
        } catch (error) {
            console.error('Save error:', error);
            toast({
                title: 'Erreur',
                description: 'Impossible de sauvegarder les données',
                variant: 'destructive'
            });
        } finally {
            setSaving(false);
        }
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
                <h2 className="text-3xl font-bold text-white mb-2">Profil</h2>
                <p className="text-slate-400">Gérer les informations de votre profil</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Photo de profil */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-400" />
                            Photo de profil
                        </CardTitle>
                        <CardDescription>Image par défaut si vide</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {imagePreview || form.photoUrl ? (
                                <div className="relative w-full aspect-square">
                                    <Image
                                        src={imagePreview || form.photoUrl}
                                        alt="Profile"
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        className="absolute top-2 right-2"
                                        onClick={handleRemoveImage}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-slate-500 transition-colors aspect-square flex flex-col items-center justify-center"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploading ? (
                                        <Loader2 className="w-12 h-12 animate-spin text-cyan-400" />
                                    ) : (
                                        <>
                                            <Upload className="w-12 h-12 text-slate-400 mb-3" />
                                            <p className="text-sm text-slate-400 mb-1">
                                                Cliquez pour uploader
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                JPEG, PNG, WebP (max 5MB)
                                            </p>
                                            <p className="text-xs text-cyan-400 mt-2">
                                                Image par défaut utilisée si vide
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Informations principales */}
                <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Informations personnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-slate-300">Nom complet *</Label>
                            <Input
                                id="name"
                                placeholder="ANDRINANTENAINA Jean Michel"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                            />
                        </div>

                        <div>
                            <Label htmlFor="title" className="text-slate-300">Titre professionnel *</Label>
                            <Input
                                id="title"
                                placeholder="Développeur Web Full-stack"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-slate-300">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Je suis un passionné des technologies..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 min-h-[120px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Statistiques */}
                <Card className="bg-slate-800 border-slate-700 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-cyan-400" />
                            Statistiques
                        </CardTitle>
                        <CardDescription>Nombre de projets, années d'expérience, compétences</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="projectsCount" className="text-slate-300">Nombre de projets</Label>
                                <Input
                                    id="projectsCount"
                                    type="number"
                                    min="0"
                                    placeholder="30"
                                    value={stats.projectsCount}
                                    onChange={(e) => setStats({ ...stats, projectsCount: parseInt(e.target.value) || 0 })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="yearsExp" className="text-slate-300">Années d'expérience</Label>
                                <Input
                                    id="yearsExp"
                                    type="number"
                                    min="0"
                                    placeholder="2"
                                    value={stats.yearsExp}
                                    onChange={(e) => setStats({ ...stats, yearsExp: parseInt(e.target.value) || 0 })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="skillsCount" className="text-slate-300">Nombre de compétences</Label>
                                <Input
                                    id="skillsCount"
                                    type="number"
                                    min="0"
                                    placeholder="15"
                                    value={stats.skillsCount}
                                    onChange={(e) => setStats({ ...stats, skillsCount: parseInt(e.target.value) || 0 })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact */}
                <Card className="bg-slate-800 border-slate-700 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-white">Coordonnées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email" className="flex items-center gap-2 text-slate-300">
                                    <Mail className="w-4 h-4" />
                                    Email *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Andryfotsiny1410@gmail.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone" className="flex items-center gap-2 text-slate-300">
                                    <Phone className="w-4 h-4" />
                                    Téléphone *
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder="+261 34 27 583 01"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="location" className="flex items-center gap-2 text-slate-300">
                                    <MapPin className="w-4 h-4" />
                                    Localisation *
                                </Label>
                                <Input
                                    id="location"
                                    placeholder="Fianarantsoa, Madagascar"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="github" className="flex items-center gap-2 text-slate-300">
                                    <Github className="w-4 h-4" />
                                    GitHub URL
                                </Label>
                                <Input
                                    id="github"
                                    placeholder="https://github.com/andryfotsiny"
                                    value={form.githubUrl}
                                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="linkedin" className="flex items-center gap-2 text-slate-300">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn URL
                                </Label>
                                <Input
                                    id="linkedin"
                                    placeholder="https://www.linkedin.com/in/jean-michel-andrianantenaina-483056304"
                                    value={form.linkedinUrl}
                                    onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sauvegarde...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder le profil
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}