import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="glass p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20"></div>
                
                <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">Welcome Back</h2>
                
                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-surface/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-surface/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 transform hover:scale-[1.02] mt-4"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-blue-400 font-medium">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
