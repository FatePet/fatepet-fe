import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		'next/core-web-vitals',
		'next',
		'next/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier', // prettier와 충돌하는 규칙 제거
	),
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			// 필요시 custom rule 추가
		},
	},
];

export default eslintConfig;
