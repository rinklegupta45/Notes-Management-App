import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteList from '../components/NoteList';
import NoteModal from '../components/NoteModal';
import api from '../services/api';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const fetchNotes = async () => {
        try {
            let queryUrl = '/notes?';
            if (searchQuery) queryUrl += `search=${searchQuery}&`;
            if (selectedTag) queryUrl += `tags=${selectedTag}&`;
            if (sortOrder) queryUrl += `sort=${sortOrder}&`;

            const res = await api.get(queryUrl);
            setNotes(res.data);
        } catch (err) {
            console.error('Failed to fetch notes', err);
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(() => fetchNotes(), 300);
        return () => clearTimeout(debounceFetch);
    }, [searchQuery, selectedTag, sortOrder]);

    const handleSaveNote = async (noteData) => {
        try {
            if (editingNote) {
                await api.put(`/notes/${editingNote._id}`, noteData);
            } else {
                await api.post('/notes', noteData);
            }
            setIsModalOpen(false);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePinToggle = async (note) => {
        try {
            await api.put(`/notes/${note._id}`, { ...note, isPinned: !note.isPinned });
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const openCreateModal = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const openEditModal = (note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            
            <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
                <Navbar 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    user={user} 
                    logout={logout} 
                />
                
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Your Notes</h1>
                            <p className="text-muted mt-1">{notes.length} notes found</p>
                        </div>
                        <button 
                            onClick={openCreateModal}
                            className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition shadow-lg shadow-blue-500/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            New Note
                        </button>
                    </div>

                    <NoteList 
                        notes={notes} 
                        onEdit={openEditModal} 
                        onDelete={handleDelete}
                        onPinToggle={handlePinToggle}
                    />
                </main>
            </div>

            {isModalOpen && (
                <NoteModal 
                    closeModal={() => setIsModalOpen(false)} 
                    onSave={handleSaveNote}
                    initialData={editingNote} 
                />
            )}
        </div>
    );
};

export default Dashboard;
