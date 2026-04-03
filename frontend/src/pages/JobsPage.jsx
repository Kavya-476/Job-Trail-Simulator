import React, { useState } from 'react';
import { MOCK_JOBS } from '../data/mockData';
import JobCard from '../components/JobCard';
import { Search, Filter } from 'lucide-react';

const JobsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy dark:hover:text-white text-xs font-bold"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-navy-light rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 animate-in zoom-in duration-300">
                        <div className="bg-gray-100 dark:bg-navy p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        </div>
                        <h3 className="text-lg font-bold text-navy dark:text-white">No simulations found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2 text-sm">We couldn&apos;t find any roles matching &quot;{searchTerm}&quot;. Try a different keyword.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-primary font-bold text-sm hover:underline"
                        >
                            View all simulations
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsPage;
