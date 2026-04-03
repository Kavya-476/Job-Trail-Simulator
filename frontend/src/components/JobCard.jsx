import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white dark:bg-navy-light rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
            {/* Card Image/Header */}
            <div className="h-56 relative overflow-hidden">
                <img
                    src={`https://images.unsplash.com/photo-${job.id === 1 ? '1498050108023-c5249f4df085' : job.id === 2 ? '1550751827-4bd374c3f58b' : job.id === 3 ? '1552664730-d307ca884978' : '1551288049-bbbda5366392'}?w=800&auto=format&fit=crop`}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors"></div>
            </div>

            {/* Card Content */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-extrabold text-navy dark:text-white group-hover:text-primary transition-colors">
                        {job.title}
                    </h3>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {job.timeEstimate}
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-1">
                    {job.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <img
                                key={i}
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${job.id + i}`}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-navy-light bg-slate-100"
                            />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-navy-light bg-slate-50 dark:bg-navy flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-slate-500">
                            +{job.tasks?.length * 7 || 15}
                        </div>
                    </div>

                    <Link
                        to={`/jobs/${job.id}`}
                        className="text-primary font-bold text-sm hover:underline"
                    >
                        Start Sim
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
