import React from 'react';

const SupportPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-navy dark:text-white mb-6">Need Help?</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
                If you encounter any issues with our simulations or have general inquiries, our team is here to assist you.
            </p>
            <div className="inline-block bg-slate-50 dark:bg-navy border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Contact Us Directly</h2>
                <a 
                    href="mailto:jts11197@gmail.com" 
                    className="text-2xl font-black text-primary hover:text-primary-hover hover:underline transition-colors"
                >
                    jts11197@gmail.com
                </a>
            </div>
        </div>
    );
};

export default SupportPage;
