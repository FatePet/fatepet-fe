/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'p-black': 'var(--p-black)',
				'p-brown': 'var(--p-brown)',
				'p-brown-lite': 'var(--p-brown-lite)',
				'p-green': 'var(--p-green)',
				'p-green-lite': 'var(--p-green-lite)',
				'gray-lite': 'var(--gray-lite)',
				'gray-middle': 'var(--gray-middle)',
				'p-blue-lite': 'var(--p-blue-lite)',
				'p-red': 'var(--p-red)',
			},
			boxShadow: {
				md: '0 0 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)',
				lg: '0 0 15px -3px rgb(0 0 0/0.1), 0 4px 6px -4px rgb(0 0 0/0.1)'
			}
		},
	},

	plugins: [],
};
