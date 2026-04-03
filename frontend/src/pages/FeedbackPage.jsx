import React from 'react';
import { MOCK_FEEDBACK } from '../data/mockData';
import { CheckCircle, XCircle, ExternalLink, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeedbackPage = () => {
    const { overall_score, level, metrics, strengths, weaknesses, skills_analysis, recommendations } = MOCK_FEEDBACK;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulation Completed</h1>
                <p className="text-gray-500 dark:text-slate-400">Here&apos;s how you performed in your role assessment.</p>
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
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{level}</div>
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
                                <CheckCircle className="w-4 h-4 mr-2" /> Top Strengths
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
                                <XCircle className="w-4 h-4 mr-2" /> Areas for Improvement
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
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-xl shadow-lg p-6 text-white">
                <h2 className="text-lg font-bold mb-4">Recommended Next Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((rec, i) => (
                        <a key={i} href={rec.url} className="block bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg border border-white/10 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{rec.title}</h3>
                                    <p className="text-sm text-gray-300 mt-1">{rec.provider}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <Link to="/dashboard" className="btn-secondary">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default FeedbackPage;
