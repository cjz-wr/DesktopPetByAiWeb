tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9f0',
                    100: '#dbf2db',
                    200: '#bae4ba',
                    300: '#8cd08c',
                    400: '#5ab35a',
                    500: '#4CAF50', // 主色
                    600: '#3d9c41',
                    700: '#338336',
                    800: '#2d682f',
                    900: '#275529',
                },
                secondary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#1a73e8',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#ea4335',
                    700: '#dc2626',
                    800: '#b91c1c',
                    900: '#991b1b',
                },
                dark: '#1f2937',
                light: '#f8fafc',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'gradient-x': 'gradientX 15s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                gradientX: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'medium': '0 10px 40px rgba(0, 0, 0, 0.12)',
                'hard': '0 20px 60px rgba(0, 0, 0, 0.15)',
            },
        }
    }
}