import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { Search, Filter, Loader2 } from 'lucide-react';
import { jobService } from '../services/api';

const JobsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(queryParam);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSearchTerm(queryParam);
    }, [queryParam]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await jobService.getJobs();
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    console.error("Invalid jobs data format:", data);
                    setError("Received invalid data from server.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError("Failed to connect to simulation server. Please check if the backend is running.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesSearch;
    });

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        if (value) {
            setSearchParams({ q: value });
        } else {
            setSearchParams({});
        }
    };


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-navy-light p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white">Explore Simulations</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Discover simulated work environments for top IT roles.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search roles or skills..."
                            className="w-full md:w-72 pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white transition-all placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => handleSearchChange('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy dark:hover:text-white text-xs font-bold"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Active Roles Section */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Roles...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-dashed border-red-200 dark:border-red-900/30">
                    <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-8 h-8 text-red-400 dark:text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-navy dark:text-white">Connection Error</h3>
                    <p className="text-red-600 dark:text-red-400 max-w-xs mx-auto mt-2 text-sm">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 text-primary font-bold text-sm hover:underline"
                    >
                        Retry Connection
                    </button>
                </div>
            ) : filteredJobs.length > 0 ? (
                <div className="space-y-12">
                    {/* Active Roles */}
                    {filteredJobs.filter(j => j.is_upcoming !== true).length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-bold text-navy dark:text-white">Active Roles</h2>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredJobs.filter(j => j.is_upcoming !== true).map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upcoming Roles */}
                    {filteredJobs.filter(j => j.is_upcoming === true).length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-bold text-navy dark:text-white">Upcoming Job Roles</h2>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredJobs.filter(j => j.is_upcoming === true).map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-navy-light rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 animate-in zoom-in duration-300">
                    <div className="bg-gray-100 dark:bg-navy p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-navy dark:text-white">No simulations found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2 text-sm">We couldn&apos;t find any roles matching &quot;{searchTerm}&quot;. Try a different keyword.</p>
                    <button
                        onClick={() => handleSearchChange('')}
                        className="mt-6 text-primary font-bold text-sm hover:underline"
                    >
                        View all simulations
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobsPage;
