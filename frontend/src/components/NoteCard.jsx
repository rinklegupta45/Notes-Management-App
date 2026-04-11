import { useState } from 'react';
import { format } from 'date-fns';
import { Pin, Trash2, Edit2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onPinToggle }) => {
    return (
        <div className={`p-5 rounded-xl border transition hover:-translate-y-1 flex flex-col group bg-notebg backdrop-blur-md hover:shadow-md dark:shadow-xl border-primary/20 ${note.isPinned ? 'ring-2 ring-primary/80' : ''}`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-notetext truncate pr-4">{note.title}</h3>
                <button
                    onClick={() => onPinToggle(note)}
                    className={`p-1.5 rounded-md transition ${note.isPinned ? 'text-primary bg-primary/10' : 'text-sky-500 hover:text-sky-700 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-sky-100 dark:hover:bg-white/10'}`}
                >
                    <Pin size={18} fill={note.isPinned ? 'currentColor' : 'none'} />
                </button>
            </div>

            <p className="text-notetext opacity-90 text-sm mb-4 line-clamp-4 flex-1">
                {note.content}
            </p>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags && note.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded bg-black/5 dark:bg-black/20 border border-primary/10 text-xs font-medium text-notetext">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-4">
                    <span className="text-xs font-medium text-muted">
                        {format(new Date(note.updatedAt), 'MMM dd, yyyy')}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(note)}
                            className="p-1.5 text-muted hover:text-primary transition"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="p-1.5 text-muted hover:text-red-400 transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
