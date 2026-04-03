import { Search, Briefcase, BarChart3, ArrowUpRight, Twitter, Linkedin, Clock, Terminal, Activity, Loader2, Shield, AlertCircle, XCircle } from 'lucide-react';
import { jobService, authService, simulationService } from '../services/api';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import JobCard from '../components/JobCard';

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isNewUser = location.state?.newUser;
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);
    const [simulations, setSimulations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthError, setIsAuthError] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [jobsData, userData, simsData] = await Promise.all([
                    jobService.getJobs(),
                    authService.getProfile(),
                    simulationService.getSubmissions()
                ]);
                setJobs(Array.isArray(jobsData) ? jobsData : []);
                setUser(userData);
                setSimulations(Array.isArray(simsData) ? simsData : []);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (error.response && error.response.status === 401) {
                    setIsAuthError(true);
                } else {
                    setError("Failed to load dashboard data. Please check your connection.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/jobs');
        }
    };

    const handleShareLinkedIn = () => {
        const badgesEarned = user?.stats?.badgesEarned || 0;
        if (badgesEarned === 0) return;
        
        let suffix = 'th';
        if (badgesEarned === 1) suffix = 'st';
        else if (badgesEarned === 2) suffix = 'nd';
        else if (badgesEarned === 3) suffix = 'rd';

        const text = `I just earned my ${badgesEarned}${suffix} badge on Job Trail Simulator! By completing real-world tech simulations, I'm building industry-ready skills. Check it out! #JobTrailSimulator #TechReady`;
        const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-navy rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 text-center text-white relative overflow-hidden shadow-2xl min-h-[300px] md:min-h-[350px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 space-y-4 md:space-y-6 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        {isNewUser ? 'Welcome to JOB TRAIL SIMULATOR,' : 'Welcome back,'} <span className="text-primary">{user?.name || 'User'}</span>!
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg font-medium opacity-80 max-w-2xl mx-auto">
                        {isNewUser
                            ? "Your journey to a dream IT career starts here. Pick a role below to begin."
                            : "Continue building your portfolio with real-world simulations."}
                    </p>

                    <form className="relative max-w-2xl mx-auto mt-6 md:mt-10 w-full" onSubmit={handleSearch}>
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Try 'UX Designer'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 md:pr-32 py-4 bg-white dark:bg-navy-light text-navy dark:text-white rounded-xl md:rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-primary/20 outline-none font-medium text-base md:text-lg placeholder:text-slate-400"
                        />
                        <button
                            type="submit"
                            className="hidden md:block absolute right-2 top-2 bottom-2 px-8 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg"
                        >
                            Search
                        </button>
                    </form>
                    <button
                        onClick={handleSearch}
                        className="md:hidden w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg mt-4 transition-transform active:scale-95"
                    >
                        Search Jobs
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Session/Loading Status Alert */}
                    {(isLoading || isAuthError || error) && (
                        <div className="bg-white dark:bg-navy-light p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-500">
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Updating Dashboard Data...</p>
                                </>
                            ) : isAuthError ? (
                                <>
                                    <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-full">
                                        <Shield className="w-8 h-8 text-red-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-navy dark:text-white">Session Expired</h3>
                                        <p className="text-xs text-slate-500 max-w-xs">Please log in to see your personalized progress and simulations.</p>
                                    </div>
                                    <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary-hover transition-all">
                                        Login Now
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-8 h-8 text-red-400" />
                                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                                </>
                            )}
                        </div>
                    )}

                    {/* Your Progress */}
                    <section>
                        <div className="flex items-center space-x-2 mb-6 sm:mb-8">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Your Progress</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {[
                                { label: 'Simulations', value: user?.stats?.simulationsStarted || 0 },
                                { label: 'Hours Learned', value: user?.stats?.hoursLearned || 0 },
                                { label: 'Badges', value: user?.stats?.badgesEarned || 0, isBadges: true }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white dark:bg-navy-light p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">{stat.label}</div>
                                            <div className="text-2xl sm:text-4xl font-extrabold text-navy dark:text-white">{stat.value}</div>
                                        </div>
                                        {stat.isBadges && stat.value > 0 && (
                                            <button 
                                                onClick={handleShareLinkedIn}
                                                className="bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] p-2 rounded-xl transition-colors flex items-center gap-2 group-hover:scale-105"
                                                title="Share to LinkedIn"
                                            >
                                                <Linkedin className="w-4 h-4" fill="currentColor" />
                                                <span className="text-xs font-bold hidden sm:block">Share</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recommended Roles */}
                    <section>
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Recommended Roles</h2>
                            <Link to="/jobs" className="text-primary font-bold text-sm hover:underline flex items-center">
                                View all <ArrowUpRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {error ? (
                                <div className="col-span-full p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-dashed border-red-200 dark:border-red-900/30 text-center">
                                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                                </div>
                            ) : jobs.length > 0 ? (
                                jobs.slice(0, 4).map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))
                            ) : (
                                <div className="col-span-full p-8 bg-gray-50 dark:bg-navy-light rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 text-center">
                                    <p className="text-slate-500 font-medium">No roles found.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Activity History */}
                    <section>
                        <div className="flex items-center space-x-2 mb-8">
                            <Activity className="w-6 h-6 text-primary" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">Activity History</h2>
                        </div>
                        <div className="bg-white dark:bg-navy-light rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead className="bg-slate-50 dark:bg-navy border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Role</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 sm:px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {simulations.slice(0, 5).map(sim => (
                                            <tr key={sim.id} className="hover:bg-slate-50 dark:hover:bg-navy transition-colors group">
                                                <td className="px-6 sm:px-8 py-5 font-bold text-navy dark:text-slate-200 group-hover:text-primary transition-colors">{sim.job_title}</td>
                                                <td className="px-6 sm:px-8 py-5 text-sm text-slate-500 dark:text-slate-400 font-medium">{sim.date}</td>
                                                <td className="px-6 sm:px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${sim.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                        }`}>
                                                        {sim.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 sm:px-8 py-5 text-right font-extrabold text-primary dark:text-primary-light">{sim.score}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Profile Summary Card */}
                    <div className="bg-white dark:bg-navy-light p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" /> Profile Summary
                            </h3>

                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-navy rounded-full mb-4 flex items-center justify-center text-3xl overflow-hidden shadow-inner border-4 border-white dark:border-navy">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-black text-navy dark:text-white">{user?.name || 'Guest User'}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{user?.email || 'No email'}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-navy rounded-xl">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account ID</span>
                                    <span className="text-sm font-mono font-bold text-navy dark:text-white">#{user?.id?.toString().padStart(4, '0') || '----'}</span>
                                </div>
                                <Link to="/profile" className="block w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-center transition-all text-sm uppercase tracking-widest">
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Simple Footer */}
            <footer className="pt-12 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Terminal className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-navy dark:text-white">JOB TRAIL SIMULATOR</span>
                    </div>
                    <div className="flex space-x-8">
                        <Link to="/about" className="hover:text-primary">About</Link>
                        <Link to="/terms" className="hover:text-primary">Terms</Link>
                        <Link to="/privacy" className="hover:text-primary">Privacy</Link>
                        <Link to="/support" className="hover:text-primary">Support</Link>
                    </div>
                </div>
                <div className="text-center text-xs text-slate-400 mt-12 mb-8">
                    © 2026 JOB TRAIL SIMULATOR Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;
