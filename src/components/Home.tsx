'use client';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu} from 'lucide-react';
import { MyPhoto } from '@/components/Myphoto';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  photoUrl?: string;  // ✅ Ajouté
}

interface StatsData {
  projectsCount: number;
  yearsExp: number;
  skillsCount: number;
}

export const Home = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/stats')
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback data
  const displayProfile = profile || {
    name: "ANDRINANTENAINA Jean Michel",
    title: "Développeur Web Full-stack",
    description: "Je suis un passionné des technologies de l'information et de la transformation numérique. Actuellement en deuxième année de Master en Ingénierie Informatique, j'ai enrichi mon parcours académique par la réalisation de plus de 30 projets."
  };

  const displayStats = stats || {
    projectsCount: 30,
    yearsExp: 2,
    skillsCount: 15
  };

  return (
      <div className="min-h-screen pt-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
              className="glass-panel p-4 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <motion.div
                className="flex flex-col items-center gap-4 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                    className="absolute inset-0 bg-neon-blue/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <Terminal className="w-12 h-12 md:w-16 md:h-16 text-neon-blanc relative" />
              </div>

              {/* ✅ CORRECTION ICI : Passer la photoUrl */}
              <MyPhoto photoUrl={profile?.photoUrl} />

              {loading ? (
                  <motion.div
                      className="text-neon-blue text-lg md:text-xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Chargement...
                  </motion.div>
              ) : (
                  <>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-military text-center text-neon-blanc px-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                      {displayProfile.title}
                    </motion.h2>

                    <motion.h3
                        className="text-lg sm:text-xl md:text-2xl font-military neon-text text-center px-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                      {displayProfile.name}
                    </motion.h3>

                    <motion.p
                        className="max-w-2xl text-center text-gray-300 text-sm md:text-base px-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                      {displayProfile.description}
                    </motion.p>

                    <motion.div
                        className="flex gap-6 md:gap-8 mt-4 md:mt-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                      <div className="flex flex-col items-center">
                        <Code2 className="w-6 h-6 md:w-8 md:h-8 text-neon-blue mb-2" />
                        <p className="text-xs md:text-sm text-gray-400">Full Stack</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Cpu className="w-6 h-6 md:w-8 md:h-8 text-neon-blue mb-2" />
                        <p className="text-xs md:text-sm text-gray-400">Innovation</p>
                      </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-8 md:mt-12 w-full max-w-2xl px-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                      <div className="glass-panel p-3 sm:p-4 md:p-6 text-center">
                        <motion.div
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-blue mb-1 md:mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                        >
                          {displayStats.projectsCount}+
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-400">Projets</div>
                      </div>

                      <div className="glass-panel p-3 sm:p-4 md:p-6 text-center">
                        <motion.div
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-blue mb-1 md:mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.1, type: "spring" }}
                        >
                          {displayStats.yearsExp}+
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-400">Années d&#39;expérience</div>
                      </div>

                      <div className="glass-panel p-3 sm:p-4 md:p-6 text-center">
                        <motion.div
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-blanc mb-1 md:mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, type: "spring" }}
                        >
                          {displayStats.skillsCount}+
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-400">Compétences</div>
                      </div>
                    </motion.div>
                  </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
};