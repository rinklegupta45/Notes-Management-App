import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NoteModal = ({ closeModal, onSave, initialData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setTags(initialData.tags || []);
            setIsPinned(initialData.isPinned || false);
        }
    }, [initialData]);

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTags = tagInput.split(',').map(t => t.trim()).filter(t => t);
            setTags([...new Set([...tags, ...newTags])]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, content, tags, isPinned });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal}></div>
            
            <div className="relative glass w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] border border-slate-700/50">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-semibold">{initialData ? 'Edit Note' : 'Create Note'}</h2>
                    <button onClick={closeModal} className="text-muted hover:text-text transition p-1">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-transparent text-2xl font-semibold border-none focus:outline-none focus:ring-0 placeholder-slate-500 text-text"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <textarea
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full h-48 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-500 text-text resize-none text-base leading-relaxed"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <label className="block text-sm font-medium text-slate-400 mb-2">Tags (Press enter to add)</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 bg-surface border border-slate-700 px-3 py-1 rounded-md text-sm text-slate-300">
                                    #{tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition ml-1">
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add tags... e.g. personal, urgent (comma separated)"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="w-full bg-surface/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                         <input
                             type="checkbox"
                             id="pin"
                             checked={isPinned}
                             onChange={(e) => setIsPinned(e.target.checked)}
                             className="w-4 h-4 rounded border-slate-700 text-primary focus:ring-primary bg-surface/50"
                         />
                         <label htmlFor="pin" className="text-sm text-slate-400 select-none">Pin this note</label>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-4">
                        <button 
                            type="button" 
                            onClick={closeModal}
                            className="px-5 py-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 transition"
                        >
                            Save Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
