import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { wishlistService } from '../services/api';

const JobCard = ({ job }) => {
    const [isWishlisted, setIsWishlisted] = useState(job.is_wishlisted);
    const [isToggling, setIsToggling] = useState(false);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isToggling) return;

        setIsToggling(true);
        // Optimistic update
        setIsWishlisted(!isWishlisted);

        try {
            await wishlistService.toggleWishlist(job.id);
        } catch (error) {
            console.error("Failed to toggle wishlist", error);
            // Rollback on error
            setIsWishlisted(isWishlisted);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <div className="bg-white dark:bg-navy-light rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full relative">
            {/* Wishlist Heart */}
            <button
                onClick={handleWishlistToggle}
                disabled={isToggling}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-navy/80 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-error hover:scale-110 transition-all duration-300 shadow-sm backdrop-blur-sm"
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-error text-error' : ''}`}
                />
            </button>

            {/* Card Image/Header */}
            <div className="h-56 relative overflow-hidden">
                <img
                    src={job.image_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop"}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors"></div>
            </div>

            {/* Card Content */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-extrabold text-navy dark:text-white group-hover:text-primary transition-colors pr-8">
                        {job.title}
                    </h3>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {job.timeEstimate || '30 min'}
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-1">
                    {job.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                    {job.is_upcoming ? (
                        <div></div>
                    ) : (
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
                                +{job.participant_count || 0}
                            </div>
                        </div>
                    )}

                    {job.is_upcoming ? (
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg text-xs font-bold uppercase tracking-wider">
                            Coming Soon
                        </span>
                    ) : (
                        <Link
                            to={`/jobs/${job.id}`}
                            className="text-primary font-bold text-sm hover:underline"
                        >
                            Start Sim
                        </Link>
                    )}
                </div>
            </div>

            {/* Upcoming Overlay Badge */}
            {job.is_upcoming && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Upcoming
                </div>
            )}
        </div>
    );
};

export default JobCard;
