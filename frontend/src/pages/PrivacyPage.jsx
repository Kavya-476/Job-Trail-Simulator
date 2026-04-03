import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-extrabold text-navy dark:text-white mb-6">Privacy Policy</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>At Job Trail Simulator, we take your privacy seriously. This policy explains how we collect and use your data.</p>
                <h2>1. Information Collection</h2>
                <p>We collect basic profile information (like Name and Email) to provision your account and track your simulation progress.</p>
                <h2>2. Data Usage</h2>
                <p>Your data is exclusively used to improve your Job Trail Simulator experience. We do not sell your personal data to third parties.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;
