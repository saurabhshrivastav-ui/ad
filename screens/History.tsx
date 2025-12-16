import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { StorageService } from '../services/storage';
import { Recipe, FoodAnalysis } from '../types';

interface HistoryProps {
  onBack: () => void;
}

export const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [analyses, setAnalyses] = useState<FoodAnalysis[]>([]);
  const [activeTab, setActiveTab] = useState<'recipes' | 'checks'>('recipes');

  useEffect(() => {
    const loadData = async () => {
      const r = await StorageService.getRecipes();
      const a = await StorageService.getAnalyses();
      setRecipes(r);
      setAnalyses(a);
    };
    loadData();
  }, []);

  return (
    <Container className="bg-gray-50">
      <Header title="History" onBack={onBack} />
      
      <div className="p-4">
        <div className="flex p-1 bg-gray-200 rounded-xl mb-6">
            <button 
                onClick={() => setActiveTab('recipes')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'recipes' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            >
                Saved Plans
            </button>
            <button 
                onClick={() => setActiveTab('checks')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'checks' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            >
                Safety Checks
            </button>
        </div>

        <div className="space-y-4">
            {activeTab === 'recipes' ? (
                recipes.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No saved meal plans yet.</div>
                ) : (
                    recipes.map(r => (
                        <div key={r.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800">{r.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.description}</p>
                            <div className="mt-2 flex gap-2">
                                {r.tags.slice(0, 2).map(t => (
                                    <span key={t} className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))
                )
            ) : (
                analyses.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No analysis history found.</div>
                ) : (
                     analyses.map(a => (
                        <div key={a.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-800 capitalize">{a.foodName}</h3>
                                <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</p>
                            </div>
                             <div className={`px-2 py-1 rounded text-xs font-bold ${a.isSafe ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {a.isSafe ? 'Safe' : 'Unsafe'}
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
      </div>
    </Container>
  );
};
