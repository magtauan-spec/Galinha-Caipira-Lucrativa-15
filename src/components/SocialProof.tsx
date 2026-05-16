import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

interface Notification {
  name: string;
  action: string;
  location: string;
  time: string;
}

const notifications: Notification[] = [
  { name: "João B.", action: "garantiu a Criação Lucrativa", location: "Uberaba MG", time: "há 1 min" },
  { name: "Carlos H.", action: "acabou de comprar", location: "Sinop MT", time: "há 2 min" },
  { name: "José A.", action: "pegou o guia completo", location: "Goiânia GO", time: "há 3 min" },
  { name: "Marcos S.", action: "garantiu o material", location: "Balsas MA", time: "há 1 min" },
  { name: "Ricardo T.", action: "liberou o acesso", location: "Juazeiro BA", time: "agora mesmo" },
  { name: "Antônio F.", action: "garantiu a Criação Lucrativa", location: "Londrina PR", time: "há 2 min" },
  { name: "Paulo R.", action: "acabou de comprar", location: "Campo Grande MS", time: "há 3 min" },
  { name: "Luiz C.", action: "pegou o guia completo", location: "Cuiabá MT", time: "há 1 min" },
  { name: "Fernando M.", action: "garantiu o material", location: "Imperatriz MA", time: "agora mesmo" },
  { name: "Gabriel L.", action: "liberou o acesso", location: "Barreiras BA", time: "há 2 min" },
  { name: "Roberto P.", action: "garantiu a Criação Lucrativa", location: "Patos de Minas MG", time: "há 1 min" },
  { name: "André S.", action: "acabou de comprar", location: "Anápolis GO", time: "agora mesmo" },
  { name: "Rafael V.", action: "pegou o guia completo", location: "Dourados MS", time: "há 3 min" },
  { name: "Lucas M.", action: "garantiu o material", location: "Cascavel PR", time: "há 2 min" },
  { name: "Bruno C.", action: "liberou o acesso", location: "Rondonópolis MT", time: "há 1 min" },
  { name: "Marcelo J.", action: "garantiu a Criação Lucrativa", location: "Chapecó SC", time: "agora mesmo" },
  { name: "Rodrigo A.", action: "acabou de comprar", location: "Sobral CE", time: "há 2 min" },
  { name: "Fábio N.", action: "pegou o guia completo", location: "Rio Verde GO", time: "há 3 min" },
  { name: "Diego O.", action: "garantiu o material", location: "Montes Claros MG", time: "há 1 min" },
  { name: "Tiago G.", action: "liberou o acesso", location: "Parauapebas PA", time: "há 2 min" },
];

export const SocialProof = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandom = () => {
      // Pick a random notification
      const randomIdx = Math.floor(Math.random() * notifications.length);
      setCurrentIdx(randomIdx);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before first notification
    const initialTimer = setTimeout(showRandom, 3000);

    // Loop
    const interval = setInterval(showRandom, 12000); // Show every 12 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const current = notifications[currentIdx];

  return (
    <div className="fixed bottom-4 left-4 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white rounded-lg shadow-2xl p-4 flex items-center gap-4 border border-gray-100 max-w-[280px]"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
  <ShoppingBag className="w-5 h-5 text-yellow-600" />
</div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                <span className="text-brand-blue">{current.name}</span> {current.action}
              </p>
              <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">
                {current.location} • {current.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
