export type BrhcThemeTokens = {
  brand: {
    red: string
    red2: string
    crimson: string
    rose: string
  }
  ink: {
    0: string
    1: string
  }
  surface: {
    0: string
    1: string
    2: string
  }
  glass: {
    bg: string
    border: string
  }
  text: {
    primary: string
    muted: string
  }
  ring: {
    focus: string
  }
  shadow: {
    soft: string
  }
  gradient: {
    primary: string
    hero: string
  }
}

export const brhcTokens: BrhcThemeTokens = {
  brand: {
    red: '#ff3b3b',
    red2: '#ff6a3d',
    crimson: '#d61f69',
    rose: '#ff2e63',
  },
  ink: {
    0: '#ffffff',
    1: '#f6f7fb',
  },
  surface: {
    0: '#ffffff',
    1: '#f6f7fb',
    2: '#eef0f6',
  },
  glass: {
    bg: 'rgba(17, 24, 39, 0.04)',
    border: 'rgba(17, 24, 39, 0.10)',
  },
  text: {
    primary: '#0b1020',
    muted: 'rgba(11, 16, 32, 0.68)',
  },
  ring: {
    focus: 'rgba(255, 59, 59, 0.45)',
  },
  shadow: {
    soft: '0 18px 55px rgba(11, 16, 32, 0.12)',
  },
  gradient: {
    primary: 'linear-gradient(90deg, #ff3b3b 0%, #d61f69 55%, #ff2e63 100%)',
    hero: 'radial-gradient(900px circle at 10% 10%, rgba(255,59,59,0.45), transparent 60%), radial-gradient(900px circle at 90% 0%, rgba(214,31,105,0.40), transparent 55%), radial-gradient(800px circle at 85% 95%, rgba(255,106,61,0.28), transparent 55%)',
  },
}

export function applyBrhcTokensToRoot(root: HTMLElement = document.documentElement) {
  root.style.setProperty('--brhc-brand-red', brhcTokens.brand.red)
  root.style.setProperty('--brhc-brand-red2', brhcTokens.brand.red2)
  root.style.setProperty('--brhc-brand-crimson', brhcTokens.brand.crimson)
  root.style.setProperty('--brhc-brand-rose', brhcTokens.brand.rose)

  root.style.setProperty('--brhc-ink-0', brhcTokens.ink[0])
  root.style.setProperty('--brhc-ink-1', brhcTokens.ink[1])

  root.style.setProperty('--brhc-surface-0', brhcTokens.surface[0])
  root.style.setProperty('--brhc-surface-1', brhcTokens.surface[1])
  root.style.setProperty('--brhc-surface-2', brhcTokens.surface[2])

  root.style.setProperty('--brhc-glass-bg', brhcTokens.glass.bg)
  root.style.setProperty('--brhc-glass-border', brhcTokens.glass.border)

  root.style.setProperty('--brhc-text-primary', brhcTokens.text.primary)
  root.style.setProperty('--brhc-text-muted', brhcTokens.text.muted)

  root.style.setProperty('--brhc-ring-focus', brhcTokens.ring.focus)

  root.style.setProperty('--brhc-shadow-soft', brhcTokens.shadow.soft)

  root.style.setProperty('--brhc-gradient-primary', brhcTokens.gradient.primary)
  root.style.setProperty('--brhc-gradient-hero', brhcTokens.gradient.hero)
}
