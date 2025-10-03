/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spud: {
          // Primary brand colors from Spud Station design
          cream: '#F8F5ED',        // Main background - soft creamy beige
          brown: '#5C3A21',        // Primary text and headings - rich dark brown
          orange: '#C77D3F',       // Accent color - warm earthy orange-brown
          white: '#FFFFFF',        // Pure white for logo text
          dark: '#2D1B0F',         // Darker brown for contrast
          light: '#FDFCF9',        // Lighter cream for cards
          border: '#E5D5C8',       // Subtle border color
          hover: '#A05A2C'         // Darker orange for hover states
        },
        // Keep original ramen colors for backward compatibility
        ramen: {
          red: '#D7263D',
          dark: '#0B0A0A',
          charcoal: '#111113',
          cream: '#FFF3E0',
          beige: '#F7E7CE',
          gold: '#E0A106',
          sesame: '#D1C7B7',
          seaweed: '#1F2937',
          kimchi: '#B81D24'
        }
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
        'noto-kr': ['Noto Serif KR', 'serif']
      },
      backgroundImage: {
        'checkerboard': 'repeating-conic-gradient(#5C3A21 0% 25%, #C77D3F 0% 50%)',
        'checkerboard-small': 'repeating-conic-gradient(#5C3A21 0% 12.5%, #C77D3F 0% 25%)',
      },
      backgroundSize: {
        'checkerboard': '20px 20px',
        'checkerboard-small': '10px 10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};