import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: ["./resources/**/*.{html,js,svelte,ts}"],
    safelist: ["dark"],
    theme: {
        fontFamily: {
            'bjelopic': ['BjeloPIC'],
            'sans': ['Noto Sans', 'ui-sans-serif', 'system-ui'],
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                'bjelopic-neutral': {
                    1: '#F6F5F4',
                    2: '#DEDDDA',
                    3: '#C0BFBC',
                    4: '#9A9996',
                    5: '#77767B',
                    6: '#5E5C64',
                    7: '#3D3846',
                    8: '#241F31'
                },
                'bjelopic-brown': {
                    1: '#CDAB8F',
                    2: '#B5835A',
                    3: '#986A44',
                    4: '#865E3C',
                    5: '#63452C',
                },
                'bjelopic-red': {
                    1: '#F66151',
                    2: '#ED333B',
                    3: '#E01B24',
                    4: '#C01C28',
                    5: '#A51D2D',
                },
                'bjelopic-orange': {
                    1: '#FFBE6F',
                    2: '#FFA348',
                    3: '#FF7800',
                    4: '#E66100',
                    5: '#C64600',
                },
                'bjelopic-blue': {
                    1: '#99C1F1',
                    2: '#62A0EA',
                    3: '#3584E4',
                    4: '#1C71D8',
                    5: '#1A5FB4',
                },
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            fontFamily: {
                sans: [...fontFamily.sans]
            }
        }
    },
};

export default config;
