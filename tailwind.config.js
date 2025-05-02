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
				'p-blue': 'var(--p-blue)',
				'gray-lite': 'var(--gray-lite)',
				'gray-middle': 'var(--gray-middle)',
				'p-blue-lite': 'var(--p-blue-lite)',
				'p-red': 'var(--p-red)',
			},
		},
	},

	plugins: [],
};
