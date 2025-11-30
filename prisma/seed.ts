import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // ============================================
    // 1. PROFILE
    // ============================================
    const profile = await prisma.profile.upsert({
        where: { id: 'default-profile' },
        update: {},
        create: {
            id: 'default-profile',
            name: 'ANDRINANTENAINA Jean Michel',
            title: 'Développeur Web Full-stack',
            description: "Je suis un passionné des technologies de l'information et de la transformation numérique. Actuellement en deuxième année de Master en Ingénierie Informatique, j'ai enrichi mon parcours académique par la réalisation de plus de 30 projets.",
            email: 'Andryfotsiny1410@gmail.com',
            phone: '+261 34 27 583 01',
            location: 'Fianarantsoa, Madagascar',
        },
    });
    console.log('✅ Profile created:', profile.name);

    // ============================================
    // 2. STATS
    // ============================================
    const stats = await prisma.stats.upsert({
        where: { id: 'default-stats' },
        update: {},
        create: {
            id: 'default-stats',
            projectsCount: 30,
            yearsExp: 2,
            skillsCount: 20,
        },
    });
    console.log('✅ Stats created');

    // ============================================
    // 3. SKILL CATEGORIES & SKILLS
    // ============================================

    // Langages de programmation
    const langagesCategory = await prisma.skillCategory.create({
        data: {
            name: 'Langages de programmation',
            icon: 'Code',
            order: 1,
        },
    });

    const langagesSkills = [
        'JavaScript/TypeScript',
        'Python',
        'PHP',
    ];

    for (let i = 0; i < langagesSkills.length; i++) {
        await prisma.skill.create({
            data: {
                name: langagesSkills[i],
                categoryId: langagesCategory.id,
                order: i,
            },
        });
    }

    // Frameworks
    const frameworksCategory = await prisma.skillCategory.create({
        data: {
            name: 'Frameworks',
            icon: 'Terminal',
            order: 2,
        },
    });

    const frameworksSkills = [
        'Express.js',
        'NestJS',
        'React/Next.js',
        'Django',
        'Laravel',
        'CodeIgniter',
    ];

    for (let i = 0; i < frameworksSkills.length; i++) {
        await prisma.skill.create({
            data: {
                name: frameworksSkills[i],
                categoryId: frameworksCategory.id,
                order: i,
            },
        });
    }

    // Bases de données
    const databaseCategory = await prisma.skillCategory.create({
        data: {
            name: 'Bases de données',
            icon: 'Database',
            order: 3,
        },
    });

    const databaseSkills = [
        'MySQL',
        'PostgreSQL',
        'PostGIS',
        'Neo4j',
        'Supabase',
    ];

    for (let i = 0; i < databaseSkills.length; i++) {
        await prisma.skill.create({
            data: {
                name: databaseSkills[i],
                categoryId: databaseCategory.id,
                order: i,
            },
        });
    }

    // Outils
    const outilsCategory = await prisma.skillCategory.create({
        data: {
            name: 'Outils',
            icon: 'Cpu',
            order: 4,
        },
    });

    const outilsSkills = [
        'Docker',
        'Git',
        'Jira',
        'Nginx',
    ];

    for (let i = 0; i < outilsSkills.length; i++) {
        await prisma.skill.create({
            data: {
                name: outilsSkills[i],
                categoryId: outilsCategory.id,
                order: i,
            },
        });
    }

    console.log('✅ Skill categories and skills created');

    // ============================================
    // 4. LANGUAGES
    // ============================================
    const languages = [
        { name: 'Malagasy', level: 'Natif', order: 1 },
        { name: 'Français', level: 'Courant', order: 2 },
        { name: 'Anglais', level: 'Niveau moyen', order: 3 },
        { name: 'Allemand', level: 'Notions', order: 4 },
    ];

    for (const lang of languages) {
        await prisma.language.create({ data: lang });
    }
    console.log('✅ Languages created');

    // ============================================
    // 5. PROJECTS
    // ============================================
    const projects = [
        {
            titre: 'youtube-downloader',
            description: 'Site web de téléchargement de vidéos YouTube avec interface utilisateur intuitive.',
            technologies: JSON.stringify(['TypeScript', 'React', 'Node.js', 'Express']),
            order: 1,
        },
        {
            titre: 'TradingBot',
            description: "Bot de trading automatisé analysant les marchés et exécutant des ordres selon des stratégies prédéfinies.",
            technologies: JSON.stringify(['Python', 'TensorFlow', 'API Trading', 'Pandas']),
            order: 2,
        },
        {
            titre: 'Globalinfo',
            description: 'Application de gestion de vente avec suivi de stock, facturation et reporting.',
            technologies: JSON.stringify(['C#', '.NET', 'SQL Server', 'WPF']),
            order: 3,
        },
        {
            titre: 'screensite',
            description: 'Application sous licence MIT permettant de capturer un site web et de le convertir en code.',
            technologies: JSON.stringify(['Python', 'Selenium', 'BeautifulSoup', 'Flask']),
            order: 4,
        },
    ];

    for (const project of projects) {
        await prisma.project.create({ data: project });
    }
    console.log('✅ Projects created');

    // ============================================
    // 6. EXPERIENCES
    // ============================================
    const experiences = [
        {
            poste: 'Développeur React Native',
            entreprise: 'Relia Consulting',
            periode: 'Août 2024 - Février 2025',
            description: "Refactoring et optimisation d'une application mobile (PokerApply) en React Native.",
            technologies: JSON.stringify(['React Native', 'TypeScript', 'Redux', 'API REST']),
            startDate: new Date('2024-08-01'),
            endDate: new Date('2025-02-28'),
            current: true,
            order: 1,
        },
        {
            poste: 'Développeur Web',
            entreprise: 'CHU Fianarantsoa',
            periode: 'Juillet 2022 - Septembre 2022',
            description: 'Conception et mise en place d\'un site web pour le CHU Fianarantsoa.',
            technologies: JSON.stringify(['PHP', 'MySQL', 'HTML/CSS', 'JavaScript']),
            startDate: new Date('2022-07-01'),
            endDate: new Date('2022-09-30'),
            current: false,
            order: 2,
        },
        {
            poste: 'Développeur Java',
            entreprise: 'CHU Fianarantsoa',
            periode: 'Juin 2021 - Juillet 2021',
            description: "Développement d'une application de gestion des congés, absences et ordres de mission.",
            technologies: JSON.stringify(['Java', 'JavaFX', 'SQL']),
            startDate: new Date('2021-06-01'),
            endDate: new Date('2021-07-31'),
            current: false,
            order: 3,
        },
        {
            poste: 'Analyste de données',
            entreprise: 'EMIT Fianarantsoa',
            periode: 'Septembre 2023 - Décembre 2023',
            description: 'Analyse de données satellitaires pour la gestion des ressources en eau.',
            technologies: JSON.stringify(['QGIS', 'Python', 'Analyse spatiale']),
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-12-31'),
            current: false,
            order: 4,
        },
    ];

    for (const exp of experiences) {
        await prisma.experience.create({ data: exp });
    }
    console.log('✅ Experiences created');

    // ============================================
    // 7. FORMATIONS
    // ============================================
    const formations = [
        {
            periode: '2023-2024',
            titre: 'Master 2 en Ingénierie Informatique',
            ecole: 'EMIT Fianarantsoa',
            icon: 'GraduationCap',
            order: 1,
        },
        {
            periode: '2021-2022',
            titre: 'Licence en Informatique',
            ecole: 'EMIT Fianarantsoa',
            icon: 'GraduationCap',
            order: 2,
        },
        {
            periode: '2017-2018',
            titre: 'Baccalauréat série D',
            ecole: 'LRR Fianarantsoa',
            icon: 'BookOpen',
            order: 3,
        },
    ];

    for (const formation of formations) {
        await prisma.formation.create({ data: formation });
    }
    console.log('✅ Formations created');

    // ============================================
    // 8. CERTIFICATIONS
    // ============================================
    const certifications = [
        {
            date: '2024',
            titre: 'Certificat en Langage Python',
            organisme: 'HackerRank',
            icon: 'Award',
            order: 1,
        },
        {
            date: '2024',
            titre: 'Certificat en SQL',
            organisme: 'HackerRank',
            icon: 'Award',
            order: 2,
        },
        {
            date: '2024',
            titre: 'Certificat en ReactJs',
            organisme: 'SkillValue',
            icon: 'Award',
            order: 3,
        },
        {
            date: '2024',
            titre: 'Certificat en PHP (Laravel)',
            organisme: 'SkillValue',
            icon: 'Award',
            order: 4,
        },
    ];

    for (const cert of certifications) {
        await prisma.certification.create({ data: cert });
    }
    console.log('✅ Certifications created');

    // ============================================
    // 9. CONTACT INFO
    // ============================================
    const contactInfos = [
        {
            type: 'email',
            label: 'Email',
            value: 'Andryfotsiny1410@gmail.com',
            link: 'mailto:Andryfotsiny1410@gmail.com',
            icon: 'Mail',
            order: 1,
        },
        {
            type: 'phone',
            label: 'Téléphone',
            value: '+261 34 27 583 01',
            link: 'tel:+261342758301',
            icon: 'Phone',
            order: 2,
        },
        {
            type: 'location',
            label: 'Localisation',
            value: 'Fianarantsoa, Madagascar',
            link: null,
            icon: 'MapPin',
            order: 3,
        },
        {
            type: 'github',
            label: 'GitHub',
            value: 'github.com/andryfotsiny',
            link: 'https://github.com/andryfotsiny',
            icon: 'Github',
            order: 4,
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            value: 'linkedin.com/in/jean-michel-andrianantenaina-483056304',
            link: 'https://www.linkedin.com/in/jean-michel-andrianantenaina-483056304',
            icon: 'Linkedin',
            order: 5,
        },
    ];

    for (const info of contactInfos) {
        await prisma.contactInfo.create({ data: info });
    }
    console.log('✅ Contact info created');

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });