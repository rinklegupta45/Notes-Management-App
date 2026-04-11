import { Search, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ searchQuery, setSearchQuery, sortOrder, setSortOrder, user, logout }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
            <div className="flex-1 max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-muted" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes by title, content, or tags..."
                    className="w-full bg-surface/50 border border-slate-700 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-text placeholder-slate-500 transition-all"
                />
            </div>

            <div className="flex items-center gap-6 ml-4">
                <button 
                    onClick={toggleTheme}
                    className="p-2 bg-surface/50 border border-slate-700 hover:bg-surface rounded-md transition text-muted hover:text-primary"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-surface border border-slate-700 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text appearance-none"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>

                <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
                    <span className="text-sm font-medium hidden sm:block">Hello, {user?.name}</span>
                    <button 
                        onClick={logout}
                        className="p-2 hover:bg-surface rounded-full transition text-muted hover:text-red-400 group"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
