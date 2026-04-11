import { Hash, FileText } from 'lucide-react';

const Sidebar = ({ selectedTag, setSelectedTag }) => {
    // Static set of general tags for quick filtering
    const popularTags = ['personal', 'work', 'ideas', 'react', 'javascript', 'important', 'planning'];

    return (
        <aside className="w-64 bg-surface/30 backdrop-blur border-r border-white/5 flex flex-col hidden md:flex h-full">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                    <FileText size={24} />
                    NoteFlow
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="mb-8">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Folders</h4>
                    <button 
                        onClick={() => setSelectedTag('')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${!selectedTag ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:text-text hover:bg-white/5'}`}
                    >
                        <FileText size={18} />
                        All Notes
                    </button>
                </div>

                <div>
                     <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Popular Tags</h4>
                     <div className="space-y-1">
                        {popularTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${selectedTag === tag ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:text-text hover:bg-white/5'}`}
                            >
                                <Hash size={16} className="opacity-50" />
                                {tag}
                            </button>
                        ))}
                     </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
