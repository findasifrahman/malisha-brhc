import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
      colors: {
        brhc: {
          red: 'var(--brhc-brand-red)',
          red2: 'var(--brhc-brand-red2)',
          crimson: 'var(--brhc-brand-crimson)',
          rose: 'var(--brhc-brand-rose)',
          ink0: 'var(--brhc-ink-0)',
          ink1: 'var(--brhc-ink-1)',
          surface0: 'var(--brhc-surface-0)',
          surface1: 'var(--brhc-surface-1)',
          surface2: 'var(--brhc-surface-2)',
          glass: 'var(--brhc-glass-bg)',
          glassBorder: 'var(--brhc-glass-border)',
          text: 'var(--brhc-text-primary)',
          muted: 'var(--brhc-text-muted)',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        glow: '0 0 0 6px var(--brhc-ring-focus)',
        soft: 'var(--brhc-shadow-soft)',
      },
      backgroundImage: {
        'brhc-primary': 'var(--brhc-gradient-primary)',
        'brhc-hero': 'var(--brhc-gradient-hero)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
      },
    },
  },
}

export default preset
