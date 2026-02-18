import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import TagInput from '../components/ui/TagInput';
import { Plus, Database, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminConfig: React.FC = () => {
    // State for Config
    const [sources, setSources] = useState([
        { id: 1, name: 'Reddit (r/netsec)', active: true, type: 'Social' },
        { id: 2, name: 'Pastebin Scraper', active: true, type: 'Scraper' },
        { id: 3, name: 'Twitter (X) Stream', active: false, type: 'Social' },
        { id: 4, name: 'DarkWeb Tor Nodes', active: true, type: 'Intel' },
    ]);
    const [keywords, setKeywords] = useState([
        { id: 1, term: 'Aadhaar Leak', active: true },
        { id: 2, term: 'NTPC Power Grid', active: true },
        { id: 3, term: 'UPI Fraud Pattern', active: false },
    ]);
    const [newSource, setNewSource] = useState('');

    const toggleSource = (id: number) => {
        setSources(sources.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    const addSource = () => {
        if (!newSource.trim()) return;
        setSources([...sources, {
            id: Date.now(),
            name: newSource,
            active: true,
            type: 'Custom'
        }]);
        setNewSource('');
    };

    const removeSource = (id: number) => {
        setSources(sources.filter(s => s.id !== id));
    };

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto h-full flex flex-col gap-8">
                <header className="mb-4">
                    <h1 className="text-3xl font-bold text-text mb-2">System Configuration</h1>
                    <p className="text-muted">Manage data sources, intelligence rules, and system behavior.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                    {/* Source Management */}
                    <Card className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text flex items-center gap-2">
                                <Database className="text-muted" size={20} />
                                Data Sources
                            </h2>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{sources.filter(s => s.active).length} Active</span>
                        </div>

                        {/* Add Source Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add Forum URL or Source Name..."
                                value={newSource}
                                onChange={(e) => setNewSource(e.target.value)}
                                className="flex-1 bg-background text-text px-4 py-2 rounded-lg shadow-neumorphic-inset outline-none focus:shadow-neumorphic-pressed transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && addSource()}
                            />
                            <Button onClick={addSource}>
                                <Plus size={20} />
                            </Button>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                            {sources.map((source) => (
                                <div key={source.id} className="flex items-center justify-between p-3 rounded-xl bg-background shadow-neumorphic-inset">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${source.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-400'}`} />
                                        <div>
                                            <p className="font-semibold text-text text-sm">{source.name}</p>
                                            <p className="text-xs text-muted capitalize">{source.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Toggle
                                            enabled={source.active}
                                            onChange={() => toggleSource(source.id)}
                                            label=""
                                        />
                                        <button
                                            onClick={() => removeSource(source.id)}
                                            className="text-muted hover:text-crimson p-1 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex flex-col gap-8">
                        {/* Target Keywords Section */}
                        <Card className="flex flex-col gap-6">
                            <h2 className="text-xl font-semibold text-text">Target Keywords</h2>
                            <p className="text-sm text-muted mb-4">Monitor specific terms across all data sources.</p>

                            <TagInput
                                tags={keywords.map(k => k.term)}
                                onAdd={(term) => setKeywords([...keywords, { id: Date.now(), term, active: true }])}
                                onRemove={(term) => setKeywords(keywords.filter(k => k.term !== term))}
                                placeholder="Add keyword (e.g. 'UPI Fraud')..."
                            />

                            <div className="flex flex-wrap gap-2 mt-4">
                                {keywords.map((keyword) => (
                                    <div key={keyword.id} className="flex items-center gap-2 px-3 py-2 bg-background shadow-neumorphic-inset rounded-lg">
                                        <div className={`w-2 h-2 rounded-full ${keyword.active ? 'bg-green-500' : 'bg-slate-500'}`} />
                                        <span className="text-sm text-text">{keyword.term}</span>
                                        <Toggle
                                            enabled={keyword.active}
                                            onChange={() => {
                                                setKeywords(keywords.map(k => k.id === keyword.id ? { ...k, active: !k.active } : k));
                                            }}
                                            label=""
                                            size="sm"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-700/10 dark:border-slate-700/50">
                                <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Manage Keywords</h3>
                                <TagInput
                                    tags={keywords.map(k => k.term)}
                                    onAdd={(term) => setKeywords([...keywords, { id: Date.now(), term, active: true }])}
                                    onRemove={(term) => setKeywords(keywords.filter(k => k.term !== term))}
                                />
                            </div>
                        </Card>

                        {/* Credential Patterns Section */}
                        <Card className="flex flex-col gap-6 flex-1">
                            <h2 className="text-xl font-semibold text-text">Credential Patterns (RegEx)</h2>
                            <textarea
                                className="w-full h-full min-h-[150px] bg-background shadow-neumorphic-inset rounded-xl p-4 font-mono text-sm text-text outline-none resize-none focus:ring-2 focus:ring-gray-200/50"
                                defaultValue={`# API Keys
sk_live_[0-9a-zA-Z]{24}

# SSH Private Keys
-----BEGIN OPENSSH PRIVATE KEY-----
`}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminConfig;
