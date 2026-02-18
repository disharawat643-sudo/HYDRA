import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Bot, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIInsightCard: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [text, setText] = useState('');
    const fullText = "Analysis complete. Detected anomalous traffic pattern from IP 192.168.1.105 matching Lazarus Group signatures. Recommend immediate isolation of Finance subnet and credential reset for affected users.";

    useEffect(() => {
        if (isAnalyzing) {
            setText('');
            let i = 0;
            const interval = setInterval(() => {
                setText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) {
                    clearInterval(interval);
                    setIsAnalyzing(false);
                }
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    // Initial analysis on mount
    useEffect(() => {
        setIsAnalyzing(true);
    }, []);

    const handleReanalyze = () => {
        setIsAnalyzing(true);
    };

    return (
        <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot size={64} />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Bot size={20} />
                    <h3>Sentinel AI Analysis</h3>
                </div>
                <button
                    onClick={handleReanalyze}
                    className={`p-2 rounded-lg hover:bg-white/5 transition-colors text-muted hover:text-primary ${isAnalyzing ? 'animate-spin' : ''}`}
                    disabled={isAnalyzing}
                    title="Re-analyze"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            <div className="relative z-10 min-h-[80px]">
                <p className="text-sm text-text leading-relaxed font-mono">
                    {text}
                    {isAnalyzing && <span className="animate-pulse">_</span>}
                </p>
            </div>

            <div className="mt-4 flex gap-2">
                <div className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs border border-red-500/30 flex items-center gap-1">
                    <Zap size={10} /> Critical
                </div>
                <div className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                    Confidence: 98%
                </div>
            </div>
        </Card>
    );
};

export default AIInsightCard;
