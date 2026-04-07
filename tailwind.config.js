/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'royal-blue': {
                    DEFAULT: '#4169E1',
                    50: '#EBF2FF',
                    100: '#D6E4FF',
                    200: '#ADC9FF',
                    300: '#85AEFF',
                    400: '#5C93FF',
                    500: '#4169E1',
                    600: '#1E3A8A',
                    700: '#1A2F6F',
                    800: '#152454',
                    900: '#0F1939',
                },
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-in',
                'slide-up': 'slideUp 0.8s ease-out',
                'slide-in-left': 'slideInLeft 1s ease-out',
                'slide-in-right': 'slideInRight 1s ease-out',
                'scale-in': 'scaleIn 0.6s ease-out',
                'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
                'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
