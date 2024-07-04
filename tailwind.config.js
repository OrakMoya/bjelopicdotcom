/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.{html,js,svelte,ts}"],
    theme: {
        fontFamily: {
            'bjelopic': ['BjeloPIC'],
            'sans': ['Noto Sans', 'ui-sans-serif', 'system-ui'],
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
            },

        },
    },
    plugins: [],
}

