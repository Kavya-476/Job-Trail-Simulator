import { useNavigate, useParams, Link } from 'react-router-dom';
import { jobService, simulationService } from '../services/api';
import { CheckCircle, XCircle, ExternalLink, Award, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

const FeedbackPage = () => {
    const { simId, level: levelParam } = useParams();
    const [job, setJob] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const normalizedLevel = useMemo(() =>
        levelParam ? levelParam.charAt(0).toUpperCase() + levelParam.slice(1).toLowerCase() : 'Beginner',
        [levelParam]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [jobData, tasksData, simsData] = await Promise.all([
                    jobService.getJob(simId),
                    jobService.getTasks(simId, normalizedLevel),
                    simulationService.getSubmissions()
                ]);
                setJob(jobData);
                setTasks(tasksData);
                setSubmissions(simsData);
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [simId, normalizedLevel]);

    const levelFeedback = useMemo(() => {
        if (!tasks.length) return null;

        const levelSubmissions = submissions.filter(s => tasks.some(t => t.id === s.task_id));
        if (!levelSubmissions.length) return null;

        const avgScore = Math.round(levelSubmissions.reduce((acc, s) => acc + s.score, 0) / levelSubmissions.length);

        // Aggregate unique recommendations from all tasks in this level
        const allRecommendations = [];
        levelSubmissions.forEach(sub => {
            try {
                const feedback = typeof sub.feedback === 'string' ? JSON.parse(sub.feedback) : sub.feedback;
                if (feedback && feedback.course_recommendations) {
                    feedback.course_recommendations.forEach(rec => {
                        // Avoid duplicates by title
                        if (!allRecommendations.find(r => r.title === rec.title)) {
                            allRecommendations.push(rec);
                        }
                    });
                }
            } catch (e) {
                console.error("Error parsing submission feedback for recommendations:", e);
            }
        });

        // Fallback recommendations if none derived from AI yet
        const recommendations = allRecommendations.length > 0 ? allRecommendations : [
            { title: "Advanced System Design", provider: "Coursera", url: "#" },
            { title: "Logic & Algorithms", provider: "Udacity", url: "#" }
        ];

        return {
            overall_score: avgScore,
            metrics: {
                accuracy: avgScore,
                time_efficiency: 85, // Mocked for now
                skill_relevance: 90  // Mocked for now
            },
            strengths: ["Consistent task completion", "Good technical command"],
            weaknesses: avgScore < 70 ? ["Focus on handling edge cases", "Review technical documentation"] : ["Minor efficiency optimizations possible"],
            skills_analysis: [
                { skill: "Problem Solving", score: avgScore },
                { skill: "Logic Construction", score: Math.min(100, avgScore + 5) }
            ],
            recommendations: recommendations
        };

    }, [tasks, submissions]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy transition-colors">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Generating Assessment...</p>
                </div>
            </div>
        );
    }

    if (!levelFeedback || !job) {
        return (
            <div className="text-center py-20 bg-white dark:bg-navy-light rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-navy dark:text-white">No feedback available yet</h3>
                <p className="text-slate-500 mt-2">Complete tasks in this level to see your assessment.</p>
                <Link to={`/jobs/${simId}/${levelParam}`} className="mt-4 inline-block text-primary font-bold hover:underline">Go to tasks</Link>
            </div>
        );
    }

    const { overall_score, metrics, strengths, weaknesses, skills_analysis, recommendations } = levelFeedback;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase mb-4 tracking-widest border border-primary/20">
                    {normalizedLevel} Tier Completed
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title} Assessment Feedback</h1>
                <p className="text-gray-500 dark:text-slate-400">Comprehensive summary of your performance in the {normalizedLevel} modules.</p>
            </div>

            {/* Score Summary */}
            <div className="bg-white dark:bg-navy-light rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-8 overflow-hidden relative transition-colors">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                    <div className="relative w-40 h-40">
                        {/* Simple CSS Circle for specific score */}
                        <svg viewBox="0 0 36 36" className="w-full h-full text-indigo-100">
                            <path className="stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <svg viewBox="0 0 36 36" className="w-full h-full text-primary absolute top-0 left-0 transform rotate-[-90deg]">
                            <path className="stroke-current" strokeDasharray={`${overall_score}, 100`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">{overall_score}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 uppercase">Score</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                        <div className="flex items-center space-x-3">
                            <Award className="w-6 h-6 text-yellow-500" />
                            <div>
                                <div className="text-sm text-gray-500 dark:text-slate-400">Performance Level</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{normalizedLevel} Expert</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-slate-800 pt-4">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{metrics.accuracy}%</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{metrics.time_efficiency}%</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400">Efficiency</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">{metrics.skill_relevance}%</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400">Skill</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths & Weaknesses */}
                <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Detailed Feedback</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" /> Tier Strengths
                            </h3>
                            <ul className="space-y-2">
                                {strengths.map((s, i) => (
                                    <li key={i} className="text-gray-600 dark:text-slate-300 text-sm flex items-start">
                                        <span className="mr-2">•</span> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                                <XCircle className="w-4 h-4 mr-2" /> Improvements
                            </h3>
                            <ul className="space-y-2">
                                {weaknesses.map((w, i) => (
                                    <li key={i} className="text-gray-600 dark:text-slate-300 text-sm flex items-start">
                                        <span className="mr-2">•</span> {w}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Skill Analysis */}
                {skills_analysis && (
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skill Proficiency</h2>
                        <div className="space-y-4">
                            {skills_analysis.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700 dark:text-slate-300">{skill.skill}</span>
                                        <span className="text-gray-500 dark:text-slate-400">{skill.score}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-navy rounded-full h-2">
                                        <div
                                            className="bg-primary rounded-full h-2"
                                            style={{ width: `${skill.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Award className="w-32 h-32 rotate-12" />
                </div>
                <h2 className="text-xl font-bold mb-1 relative z-10">Recommended Next Steps</h2>
                <p className="text-indigo-200 text-sm mb-6 relative z-10">Based on your {normalizedLevel} performance, we suggest these resources to level up.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {recommendations.map((rec, i) => (
                        <a key={i} href={rec.url} target="_blank" rel="noopener noreferrer" className="block bg-white/10 hover:bg-white/20 transition-all p-5 rounded-xl border border-white/10 group hover:translate-y-[-2px]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-primary-light transition-colors">{rec.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black">{rec.provider}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-primary-light" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <Link to={`/jobs/${simId}`} className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    Return to {job.title} Overview
                </Link>
            </div>
        </div>
    );
};

export default FeedbackPage;
