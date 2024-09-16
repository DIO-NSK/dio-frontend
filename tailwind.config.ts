import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            'sm' : '360px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1440px'
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                "text-gray": "#7E8E9F",
                "link-blue": "#0067B0",
                "black": "#040302",
                "white": "#FFFFFF",
                "bg-light-blue": "#F6FCFF",
                "light-gray": "#E3F6FF",
                "info-red": "#DA1869",
                "border-gray": "#D4DBE3"
            }
        },
    },
    plugins: [],
}
export default config
