/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: '#6366F1', dark: '#4F46E5', light: '#818CF8' },
                secondary: { DEFAULT: '#10B981', dark: '#059669', light: '#34D399' },
                accent: { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FBBF24' },
                danger: { DEFAULT: '#EF4444', dark: '#DC2626', light: '#F87171' },
                'primary-text': 'rgb(var(--text-primary))',
                'secondary-text': 'rgb(var(--text-secondary))',
                'border-main': 'rgb(var(--border-main) / 0.5)',
                dark: { 900: '#0F172A', 800: '#1E293B', 700: '#334155', 600: '#475569' },
                slate: { 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8' }
            },
            fontFamily: {
                inter: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                slideIn: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                pulseGlow: { '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }, '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' } },
                float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
            }
        },
    },
    plugins: [],
}
