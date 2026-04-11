import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, onDelete, onPinToggle }) => {
    if (!notes || notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center mt-12 glass rounded-2xl border-dashed border-2 border-slate-700">
                <div className="text-muted mb-3">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h3 className="text-xl font-medium text-text">No notes found</h3>
                <p className="text-muted text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map(note => (
                <NoteCard 
                    key={note._id} 
                    note={note} 
                    onEdit={onEdit} 
                    onDelete={onDelete}
                    onPinToggle={onPinToggle}
                />
            ))}
        </div>
    );
};

export default NoteList;
