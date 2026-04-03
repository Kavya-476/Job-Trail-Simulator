import React from 'react';

const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-extrabold text-navy dark:text-white mb-6">Terms of Service</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>By using Job Trail Simulator, you agree to these terms. Our platform is provided for educational and portfolio-building purposes.</p>
                <h2>1. Account Usage</h2>
                <p>You are responsible for safeguarding your account details. Do not share your credentials.</p>
                <h2>2. Code of Conduct</h2>
                <p>Please use our platform respectfully. Any abuse of the API or platform services may result in account termination.</p>
            </div>
        </div>
    );
};

export default TermsPage;
