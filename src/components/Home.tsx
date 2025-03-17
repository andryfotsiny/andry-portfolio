'use client';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu } from 'lucide-react';
import { MyPhoto } from '@/components/Myphoto';

export const Home = () => {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-6"
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
              <Terminal className="w-16 h-16 text-neon-blanc relative" />
            </div>

            <MyPhoto />
            

            <motion.h2 
              className="text-4xl md:text-6xl font-military text-center glitch"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Développeur Web Full-stack
            </motion.h2>

            {/* Rest of the component remains the same */}
            <motion.h3 
              className="text-xl md:text-2xl font-military neon-text text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ANDRINANTENAINA Jean Michel
            </motion.h3>

            <motion.p 
              className="max-w-2xl text-center text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Je suis un passionné des technologies de l&#39;information et de la transformation numérique.
              Actuellement en deuxième année de Master en Ingénierie Informatique, j&#39;ai enrichi mon
              parcours académique par la réalisation de plus de 30 projets.
            </motion.p>

            <motion.div 
              className="flex gap-8 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex flex-col items-center">
                <Code2 className="w-8 h-8 text-neon-green mb-2" />
                <p className="text-sm text-gray-400">Full Stack</p>
              </div>
              <div className="flex flex-col items-center">
                <Cpu className="w-8 h-8 text-neon-blue mb-2" />
                <p className="text-sm text-gray-400">Innovation</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};