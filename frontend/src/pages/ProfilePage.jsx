import { authService, simulationService, wishlistService } from '../services/api';
import { Mail, BookOpen, Calendar, Edit2, TrendingUp, Loader2, User as UserIcon, Shield, XCircle, AlertCircle, Heart, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [simulations, setSimulations] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isAuthError, setIsAuthError] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        education: "",
        username: "",
        joinedDate: "",
        rawCreatedAt: ""
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setIsLoading(true);
                const [userData, simsData, wishData] = await Promise.all([
                    authService.getProfile(),
                    simulationService.getSubmissions(),
                    wishlistService.getWishlist()
                ]);
                setUser(userData);
                setSimulations(simsData);
                setWishlist(wishData);

                const joined = userData.created_at
                    ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Jan 2024';

                setProfileData({
                    name: userData.name,
                    email: userData.email,
                    education: userData.education || "",
                    username: userData.name.toLowerCase().replace(/\s+/g, '_'),
                    joinedDate: joined,
                    rawCreatedAt: userData.created_at ? userData.created_at.split('T')[0] : ""
                });
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsAuthError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    const handleRemoveFromWishlist = async (jobId) => {
        try {
            await wishlistService.toggleWishlist(jobId);
            setWishlist(wishlist.filter(item => item.id !== jobId));
        } catch (error) {
            console.error("Failed to remove from wishlist", error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedUser = await authService.updateProfile({
                name: profileData.name,
                email: profileData.email,
                education: profileData.education,
                created_at: profileData.rawCreatedAt
            });
            setUser(updatedUser);

            const joined = updatedUser.created_at
                ? new Date(updatedUser.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Jan 2024';

            setProfileData({
                name: updatedUser.name,
                email: updatedUser.email,
                education: updatedUser.education || "",
                username: updatedUser.name.toLowerCase().replace(/\s+/g, '_'),
                joinedDate: joined,
                rawCreatedAt: updatedUser.created_at ? updatedUser.created_at.split('T')[0] : ""
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            const joined = user.created_at
                ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Jan 2024';

            setProfileData({
                name: user.name,
                email: user.email,
                education: user.education || "",
                username: user.name.toLowerCase().replace(/\s+/g, '_'),
                joinedDate: joined,
                rawCreatedAt: user.created_at ? user.created_at.split('T')[0] : ""
            });
        }
    };


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Card */}
            {/* Header Card */}
            {isAuthError && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 dark:text-red-400 text-sm font-medium">Session expired. Please log in again to save changes.</p>
                    </div>
                    <Link to="/login" className="text-xs font-bold text-red-600 hover:underline">Go to Login</Link>
                </div>
            )}
            <div className="bg-white dark:bg-navy-light rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full ring-4 ring-gray-50 dark:ring-navy bg-gray-100 dark:bg-navy shadow-lg flex items-center justify-center overflow-hidden">
                            {isLoading ? (
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            ) : isAuthError ? (
                                <Shield className="w-12 h-12 text-red-500 animate-pulse" />
                            ) : (
                                <UserIcon className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                            )}
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-all active:scale-90 group"
                                title="Edit Profile"
                            >
                                <Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </button>
                        )}
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        {isEditing ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="block w-full text-2xl font-bold bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-1 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <p className="text-gray-500">@{profileData.username}</p>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h1>
                                <p className="text-gray-500">@{profileData.username}</p>
                            </>
                        )}

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                            <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm">
                                <Mail className="w-4 h-4 mr-2 text-primary" />
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-md px-2 py-0.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                ) : (
                                    profileData.email
                                )}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm">
                                <BookOpen className="w-4 h-4 mr-2 text-primary" />
                                {isEditing ? (
                                    <input
                                        type="text"
                                        placeholder="Add Qualification"
                                        value={profileData.education}
                                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                                        className="bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-md px-2 py-0.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                ) : (
                                    profileData.education || <span className="text-gray-400 italic">Add Qualification</span>
                                )}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-primary" />
                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={profileData.rawCreatedAt}
                                        onChange={(e) => setProfileData({ ...profileData, rawCreatedAt: e.target.value })}
                                        className="bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-md px-2 py-0.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                ) : (
                                    <>Joined {profileData.joinedDate}</>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-md active:scale-95 text-sm"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-100 dark:bg-navy text-gray-600 dark:text-slate-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-800 transition-all text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <div className="text-center px-4 py-2 bg-gray-50 dark:bg-navy rounded-lg border border-gray-100 dark:border-slate-800">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{user?.stats?.simulationsStarted || 0}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Sims</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-gray-50 dark:bg-navy rounded-lg border border-gray-100 dark:border-slate-800">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {simulations.length > 0
                                    ? Math.round(simulations.reduce((acc, s) => acc + s.score, 0) / simulations.length)
                                    : 0}%
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Score</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Simulation History */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Simulation History</h2>
                    <div className="space-y-4">
                        {simulations.length > 0 ? simulations.map(sim => (
                            <div
                                key={sim.id}
                                className="group relative bg-white dark:bg-navy-light rounded-2xl p-5 border border-gray-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-grow">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 
                                            ${sim.score >= 80 ? 'bg-green-50 dark:bg-green-900/10 text-green-500' :
                                                sim.score >= 50 ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-500' :
                                                    'bg-blue-50 dark:bg-blue-900/10 text-primary'}`}>
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                                {sim.job_title}
                                            </h3>
                                            <p className="text-xs font-medium text-gray-600 dark:text-slate-400 truncate mb-1">
                                                {sim.task_title}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {sim.date}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700"></span>
                                                <span className="font-bold text-primary/80 uppercase tracking-wider text-[10px]">
                                                    {sim.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <div className={`text-xl font-black mb-0.5
                                            ${sim.score >= 80 ? 'text-green-500' :
                                                sim.score >= 50 ? 'text-amber-500' :
                                                    'text-primary'}`}>
                                            {sim.score}%
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Score</div>
                                    </div>

                                    <div className="hidden sm:block text-gray-300 dark:text-slate-700">
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="bg-white dark:bg-navy-light rounded-2xl border-2 border-dashed border-gray-100 dark:border-slate-800 p-12 text-center">
                                <TrendingUp className="w-12 h-12 text-gray-200 dark:text-slate-800 mx-auto mb-4" />
                                <h3 className="text-gray-900 dark:text-white font-bold">No simulations yet</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-[240px] mx-auto">
                                    Your simulation history will appear here once you complete your first task.
                                </p>
                                <Link to="/jobs" className="inline-flex items-center gap-2 mt-6 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all text-sm shadow-lg shadow-primary/20">
                                    Explore Jobs
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Col: Stats/Wishlist */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Trend</h2>
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 h-[300px]">
                        {simulations.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={[...simulations].sort((a, b) => new Date(a.date) - new Date(b.date))}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemStyle={{ color: '#3b82f6' }}
                                        cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={4}
                                        dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 8, fill: '#3b82f6', strokeWidth: 0 }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <TrendingUp className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-gray-500 text-sm">No data yet</p>
                                <p className="text-xs text-gray-400 mt-1">Complete simulations to see your trend</p>
                            </div>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wishlist</h2>
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                        <div className="space-y-4">
                            {wishlist.length > 0 ? wishlist.map(job => (
                                <div key={job.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy border border-gray-100 dark:border-slate-800 group hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-primary fill-primary" />
                                        </div>
                                        <div>
                                            <Link to={`/jobs/${job.id}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors block">
                                                {job.title}
                                            </Link>
                                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{job.category}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(job.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove from wishlist"
                                    >
                                        <XCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            )) : (
                                <p className="text-slate-400 text-center py-4 italic text-sm">No saved jobs yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProfilePage;
