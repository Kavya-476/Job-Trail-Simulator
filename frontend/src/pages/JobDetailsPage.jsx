import { useNavigate, useParams, Link } from 'react-router-dom';
import { jobService } from '../services/api';
import { Clock, BarChart, CheckCircle, ArrowLeft, Play, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setIsLoading(true);
                const data = await jobService.getJob(jobId);
                setJob(data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobDetails();
    }, [jobId]);


    return (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link to="/jobs" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Jobs
            </Link>

            {/* Header */}
            <div className="bg-white dark:bg-navy-light rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Job Details...</p>
                        </div>
                    ) : !job ? (
                        <div className="text-center py-10">
                            <h3 className="text-lg font-bold text-navy dark:text-white">Job not found</h3>
                            <Link to="/jobs" className="mt-4 inline-block text-primary font-bold hover:underline">Back to all jobs</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                            <div className="space-y-4 w-full">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-navy dark:text-white leading-tight">{job.title}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm font-bold mt-4">
                                    <span className="flex items-center bg-gray-100 dark:bg-navy px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 transition-colors">
                                        <Clock className="w-4 h-4 mr-2 text-primary dark:text-primary-light" /> {job.time || '45 min'}
                                    </span>
                                    <span className="flex items-center bg-gray-100 dark:bg-navy px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 transition-colors">
                                        <CheckCircle className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" /> {job.tasks?.length || 0} Tasks
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Select Experience Level</h3>
                                <div className="flex flex-col sm:flex-row gap-2 w-full">
                                    <Link
                                        to={`/jobs/${job.id}/beginner/overview`}
                                        className="flex-1 text-center px-6 py-3 bg-white dark:bg-navy border-2 border-slate-100 dark:border-slate-800 text-navy dark:text-white rounded-xl hover:border-primary dark:hover:border-primary hover:text-primary transition-all font-bold text-sm shadow-sm"
                                    >
                                        Beginner
                                    </Link>
                                    <Link
                                        to={`/jobs/${job.id}/intermediate/overview`}
                                        className="flex-1 text-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all font-bold text-sm shadow-md shadow-primary/20"
                                    >
                                        Intermediate
                                    </Link>
                                    <Link
                                        to={`/jobs/${job.id}/professional/overview`}
                                        className="flex-1 text-center px-6 py-3 bg-navy dark:bg-slate-800 text-white rounded-xl hover:bg-navy-light dark:hover:bg-slate-700 transition-all font-bold text-sm shadow-md"
                                    >
                                        Professional
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            {job && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-navy-light rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                            <h2 className="text-xl font-bold mb-4 text-navy dark:text-white flex items-center gap-2">
                                <BarChart className="w-5 h-5 text-primary dark:text-primary-light" />
                                About this Role
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                                {job.detailed_description || job.description}
                            </p>
                            <h3 className="font-bold text-navy dark:text-white mb-3">Simulation Overview</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                In this simulation, you will tackle real-world scenarios faced by {job.title}s.
                                You will be evaluated on accuracy, time management, and technical proficiency across multiple stages.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-navy-light rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                            <h3 className="font-bold text-navy dark:text-white mb-4">Skills Required</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skills ? job.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-indigo-50 dark:bg-primary/10 text-indigo-700 dark:text-primary-light rounded-lg text-xs font-bold transition-colors">
                                        {skill}
                                    </span>
                                )) : (
                                    <span className="text-slate-400 text-xs italic">No skills listed</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-navy dark:bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <h3 className="font-bold mb-2 flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    Pro Tip
                                </h3>
                                <p className="text-slate-300 dark:text-white/80 text-sm font-medium leading-relaxed">
                                    Focus on understanding the requirements before coding. Speed matters, but accuracy determines your score.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetailsPage;
