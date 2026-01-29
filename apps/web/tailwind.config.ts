import type { Config } from 'tailwindcss'
import brhcPreset from '@brhc/ui/tailwind-preset'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [brhcPreset],
  theme: {
    extend: {
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '15px',
        lg: '17px',
        xl: '20px',
        '2xl': '26px',
        '3xl': '34px',
        '4xl': '42px',
        hero: ['44px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'brhc-gradient-hero': 'radial-gradient(ellipse at top, rgba(255,77,90,0.15), transparent 50%)',
      },
    },
  },
  plugins: [],
} satisfies Config
