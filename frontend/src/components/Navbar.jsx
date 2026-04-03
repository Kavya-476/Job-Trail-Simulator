import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, Bell, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { authService } from '../services/api';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname.startsWith(path);

    const [user, setUser] = React.useState(null);
    const [isHeaderLoading, setIsHeaderLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) {
                setIsHeaderLoading(false);
                return;
            }
            try {
                const userData = await authService.getProfile();
                setUser(userData);
            } catch (error) {
                console.error("Navbar auth check failed", error);
                // If 401, clear token
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    setUser(null);
                }
            } finally {
                setIsHeaderLoading(false);
            }
        };
        fetchUser();
    }, [location.pathname]); // Re-check on route change

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-navy-light border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard" className="flex items-center space-x-2 group">
                            <div className="bg-primary p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                <Terminal className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-navy dark:text-white tracking-tight">JOB TRAIL SIMULATOR</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/dashboard" active={isActive('/dashboard')}>Home</NavLink>
                        <NavLink to="/jobs" active={isActive('/jobs')}>Jobs</NavLink>
                        <NavLink to="/profile" active={isActive('/profile')}>Profile</NavLink>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-slate-50 dark:hover:bg-navy-light/50"
                            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <Link
                            to="/notifications"
                            className={`p-2 transition-colors relative rounded-xl hover:bg-slate-50 dark:hover:bg-navy-light/50 ${isActive('/notifications') ? 'text-primary' : 'text-slate-400 hover:text-navy dark:hover:text-white'}`}
                            title="Notifications"
                        >
                            <Bell className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white dark:border-navy-light"></span>
                        </Link>

                        <div className="hidden sm:flex items-center space-x-4 border-l border-slate-100 dark:border-slate-800 pl-4 md:pl-6">
                            <div className="text-right">
                                <div className="text-sm font-bold text-navy dark:text-white">{user?.name || 'User'}</div>
                                <div className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">{user?.role || 'Developer'}</div>
                            </div>
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                                alt="User Profile"
                                className="w-9 h-9 rounded-full border-2 border-slate-100 dark:border-slate-800 shadow-sm"
                            />
                            <button
                                onClick={handleLogout}
                                className="p-2 text-slate-400 hover:text-error transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-navy-light rounded-xl transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-navy-light border-b border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/dashboard"
                            className={`block px-4 py-3 rounded-xl font-bold ${isActive('/dashboard') ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={`block px-4 py-3 rounded-xl font-bold ${isActive('/jobs') ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/profile"
                            className={`block px-4 py-3 rounded-xl font-bold ${isActive('/profile') ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile
                        </Link>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-error font-bold"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`text-sm font-bold transition-all relative py-1 ${active
            ? 'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
            : 'text-slate-500 hover:text-navy dark:hover:text-white dark:text-slate-400'
            }`}
    >
        {children}
    </Link>
);


export default Navbar;
