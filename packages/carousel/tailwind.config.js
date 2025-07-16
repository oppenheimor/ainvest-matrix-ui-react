/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./packages/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      containers: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1920px",
      },
      colors: {
        // border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // ============ atom-token colors start ============
        brand: {
          primary: {
            DEFAULT: "var(--atom-color-brand-primary)",
            black: "hsl(var(--atom-color-brand-primary-black))",
          },
        },
        price: {
          up: "var(--atom-color-price-up)",
          down: "var(--atom-color-price-down)",
          even: "var(--atom-color-price-even)",
          crypto: {
            up: "var(--atom-color-price-crypto-up)",
            down: "var(--atom-color-price-crypto-down)",
          },
        },
        status: {
          success: "var(--atom-color-status-success)",
          error: "var(--atom-color-status-error)",
          warning: "var(--atom-color-status-warning)",
          info: "var(--atom-color-status-info)",
        },
        text: {
          primary: "var(--atom-color-text-primary)",
          secondary: "var(--atom-color-text-secondary)",
          tertiary: "var(--atom-color-text-tertiary)",
          quaternary: "var(--atom-color-text-quaternary)",
          special: "var(--atom-color-text-special)",
          inverse: "var(--atom-color-text-inverse)",
          link: "var(--atom-color-text-link)",
          aime: "var(--atom-color-text-aime)",
        },
        background: {
          // TODO: DEFAULT 后面干掉
          DEFAULT: "hsl(var(--background))",
          layer1: "var(--atom-color-background-layer1)",
          layer2: "var(--atom-color-background-layer2)",
          layer3: "var(--atom-color-background-layer3)",
          layer4: "var(--atom-color-background-layer4)",
          layer5: "var(--atom-color-background-layer5)",
          mask: {
            level1: "var(--atom-color-background-mask-level1)",
            level2: "var(--atom-color-background-mask-level2)",
            level3: "var(--atom-color-background-mask-level3)",
          },
          weak: "var(--atom-color-background-weak)",
          nav: "var(--atom-color-background-nav)",
          list: {
            hover1: "var(--atom-color-background-list-hover)",
            hover2: "var(--atom-color-background-list-active-hover)",
          },
        },
        foreground: {
          // TODO: DEFAULT 后面干掉
          DEFAULT: "hsl(var(--foreground))",
          layer1: "var(--atom-color-foreground-layer1)",
          layer1_2: "var(--atom-color-foreground-layer1_2)",
          layer1_3: "var(--atom-color-foreground-layer1_3)",
          layer2: "var(--atom-color-foreground-layer2)",
        },
        divider: {
          level1: "var(--atom-color-divider-level1)",
          level2: "var(--atom-color-divider-level2)",
          level3: "var(--atom-color-divider-level3)",
        },
        border: {
          // TODO: DEFAULT 后面干掉
          DEFAULT: "hsl(var(--border))",
          bt: "var(--atom-color-border-bt)",
          level2: "var(--atom-color-divider-level2)",
        },
        grey: {
          97: "var(--atom-color-grey-97)",
          95: "var(--atom-color-grey-95)",
          90: "var(--atom-color-grey-90)",
          80: "var(--atom-color-grey-80)",
          70: "var(--atom-color-grey-70)",
          60: "var(--atom-color-grey-60)",
          50: "var(--atom-color-grey-50)",
          40: "var(--atom-color-grey-40)",
          20: "var(--atom-color-grey-20)",
          0: "var(--atom-color-grey-0)",
          100: "var(--atom-color-grey-100)",
        },
        blue: {
          DEFAULT: "var(--atom-color-blue)",
        },
        green: {
          DEFAULT: "var(--atom-color-green)",
        },
        red: {
          DEFAULT: "var(--atom-color-red)",
        },
        orange: {
          DEFAULT: "var(--atom-color-orange)",
        },
        yellow: {
          DEFAULT: "var(--atom-color-yellow)",
        },
        cyan: {
          DEFAULT: "var(--atom-color-cyan)",
        },
        acidblue: {
          DEFAULT: "var(--atom-color-acidblue)",
        },
        indigo: {
          DEFAULT: "var(--atom-color-indigo)",
        },
        purple: {
          DEFAULT: "var(--atom-color-purple)",
        },
        gold: {
          DEFAULT: "var(--atom-color-gold)",
        },
        transparent: {
          blue: "var(--atom-color-transparent-blue)",
          blue1: "var(--atom-color-transparent-blue1)",
          green: "var(--atom-color-transparent-green)",
          red: "var(--atom-color-transparent-red)",
          orange: "var(--atom-color-transparent-orange)",
          yellow: "var(--atom-color-transparent-yellow)",
          cyan: "var(--atom-color-transparent-cyan)",
          acidblue: "var(--atom-color-transparent-acidblue)",
          indigo: "var(--atom-color-transparent-indigo)",
          purple: "var(--atom-color-transparent-purple)",
          gold: "var(--atom-color-transparent-gold)",
        },
        visualization: {
          primary: "var(--atom-color-visualization-primary)",
          "01": "var(--atom-color-visialization-01)",
          "02": "var(--atom-color-visialization-02)",
          "03": "var(--atom-color-visialization-03)",
          "04": "var(--atom-color-visialization-04)",
          "05": "var(--atom-color-visialization-05)",
          "06": "var(--atom-color-visialization-06)",
          "07": "var(--atom-color-visialization-07)",
          "08": "var(--atom-color-visialization-08)",
          "09": "var(--atom-color-visialization-09)",
          divider: "var(--atom-color-visualization-divider)",
          tooltip: "var(--atom-color-visualization-tooltip)",
        },
        hover: {
          DEFAULT: "var(--atom-color-hover)",
          5: "var(--atom-color-hover-5)",
        },
        click: {
          DEFAULT: "var(--atom-color-click)",
          10: "var(--atom-color-click-10)",
        },
        toast: {
          background: "var(--atom-color-toast-background)",
        },
        link: {
          black: {
            text: {
              default: "var(--atom-color-link-black-text-default)",
            },
          },
          grey: {
            default: "var(--atom-color-link-grey-default)",
          },
        },
        // ============ atom-token colors end ============
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: 0,
          },
        },
        "spinner-leaf-fade": {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner-leaf-fade": "spinner-leaf-fade 800ms linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
};
