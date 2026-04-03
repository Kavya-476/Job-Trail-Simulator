import React from 'react';
import { MOCK_USER, MOCK_SIMULATIONS } from '../data/mockData';
import { Mail, BookOpen, Calendar, Edit2, TrendingUp } from 'lucide-react';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [profileData, setProfileData] = React.useState({
        name: MOCK_USER.name || "John Doe",
        email: MOCK_USER.email,
        education: MOCK_USER.education,
        username: MOCK_USER.username
    });

    const handleSave = () => {
        // In a real app, this would hit an API. Locally, we update state.
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset to original mock data or stay as is? 
        // For simplicity, just close edit mode.
        setIsEditing(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Card */}
            <div className="bg-white dark:bg-navy-light rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                        <img
                            src={MOCK_USER.avatar}
                            alt={profileData.username}
                            className="w-32 h-32 rounded-full ring-4 ring-gray-50 dark:ring-navy bg-gray-100 dark:bg-navy shadow-lg"
                        />
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
                                        value={profileData.education}
                                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                                        className="bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-md px-2 py-0.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                ) : (
                                    profileData.education
                                )}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-slate-400 text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-primary" /> Joined Jan 2024
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
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{MOCK_USER.stats.simulations_completed}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Sims</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-gray-50 dark:bg-navy rounded-lg border border-gray-100 dark:border-slate-800">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{MOCK_USER.stats.average_score}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Score</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Simulation History */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Simulation History</h2>
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-navy text-xs uppercase text-gray-500 dark:text-slate-400 font-semibold border-b border-gray-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Job Role</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_SIMULATIONS.map(sim => (
                                    <tr key={sim.id} className="hover:bg-gray-50 dark:hover:bg-navy transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{sim.job_title}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{sim.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${sim.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {sim.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-primary">{sim.score}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Col: Stats/Wishlist */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Trend</h2>
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <TrendingUp className="w-12 h-12 text-gray-300 mb-2" />
                        <p className="text-gray-500 text-sm">Chart visualization would go here</p>
                        <p className="text-xs text-gray-400 mt-1">Using Recharts or Chart.js</p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wishlist</h2>
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
                        <div className="space-y-4">
                            {MOCK_USER.wishlist.map(wId => (
                                <div key={wId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy rounded-lg">
                                    <span className="font-bold text-gray-700 dark:text-slate-300">UI/UX Designer</span>
                                    <button className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProfilePage;
