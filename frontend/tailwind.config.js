/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB', // Royal Blue
                    hover: '#1D4ED8',
                    light: '#DBEAFE',
                },
                navy: {
                    DEFAULT: '#0F172A', // Deep Slate / Navy
                    light: '#1E293B',
                },
                surface: '#FFFFFF', // White
                background: '#F8FAFC', // Light Gray-Blue
                accent: '#10B981', // Emerald Green (Success)
                warning: '#F59E0B', // Amber
                error: '#EF4444', // Red
                text: {
                    main: '#1E293B',    // Slate 900
                    body: '#475569',    // Slate 600
                    muted: '#94A3B8',   // Slate 400
                },
                // Simulation Design Tokens
                sim: {
                    teal: '#0D93A5',
                    cyan: '#00D1FF',
                    bg: '#0B0E14',
                    panel: '#161B22',
                    border: 'rgba(13, 147, 165, 0.2)',
                }
            },
            boxShadow: {
                'glow': '0 4px 14px 0 rgba(0, 212, 255, 0.39)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
