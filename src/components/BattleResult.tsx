import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';

interface Props {
  victory: boolean;
  experienceGained: number;
  spkGained: number;
  onClose: () => void;
}

export function BattleResult({ victory, experienceGained, spkGained, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          {victory ? (
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <h2 className="text-2xl font-bold mb-2">
            {victory ? '¡Victoria!' : 'Derrota'}
          </h2>
          <p className="text-gray-600">
            {victory 
              ? '¡Has ganado la batalla!' 
              : 'Has perdido esta vez, ¡pero puedes intentarlo de nuevo!'}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-medium text-blue-800">Experiencia Ganada</div>
            <div className="text-2xl font-bold text-blue-900">+{experienceGained} XP</div>
          </div>

          {victory && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="font-medium text-yellow-800">SPK Ganados</div>
              <div className="text-2xl font-bold text-yellow-900">+{spkGained} SPK</div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}