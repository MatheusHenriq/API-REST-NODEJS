import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: eslintParser,
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
        },
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
];
