/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './packages/**/*.{ts,tsx}',
    './src/components/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      containers: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',
      },
      colors: {
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        button: {
          border: 'var(--atom-color-button-border)',
          bg: 'var(--atom-color-text-primary)',
          text: 'var(--color-foreground-layer1)',
          hover: 'var(--atom-color-button-grey-default)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // AInvest brand colors
        brand: {
          primary: 'var(--atom-color-brand-primary)',
          secondary: 'var(--atom-color-brand-secondary)',
        },
        // Text colors
        text: {
          primary: 'var(--atom-color-text-primary)',
          secondary: 'var(--atom-color-text-tertiary)',
          disabled: 'var(--atom-color-text-disabled)',
        },
        // Border colors
        border: {
          bt: 'var(--atom-color-border-bt)',
          primary: 'var(--atom-color-text-primary)',
          focus: 'var(--atom-color-border-focus)',
          disabled: 'var(--atom-color-border-disabled)',
        },
        // Status colors
        success: {
          DEFAULT: 'var(--atom-color-success)',
          foreground: 'var(--atom-color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--atom-color-warning)',
          foreground: 'var(--atom-color-warning-foreground)',
        },
        error: {
          DEFAULT: 'var(--atom-color-error)',
          foreground: 'var(--atom-color-error-foreground)',
        },
        // Data status colors
        positive: 'var(--atom-color-positive)',
        negative: 'var(--atom-color-negative)',
        neutral: 'var(--atom-color-neutral)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'radio-scale': {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'radio-scale': 'radio-scale 0.15s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
}
