import path from 'node:path';
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

const rootDir = __dirname;
const mockDir = path.resolve(rootDir, 'tests/mocks');

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/setup/vitest.ts'],
  },
  resolve: {
    alias: [
      {find: '@site', replacement: rootDir},
      {find: /^@theme\/.+$/, replacement: path.join(mockDir, 'theme.tsx')},
      {
        find: /^@docusaurus\/Link$/,
        replacement: path.join(mockDir, 'docusaurus-link.tsx'),
      },
      {
        find: /^@docusaurus\/useDocusaurusContext$/,
        replacement: path.join(mockDir, 'docusaurus-context.ts'),
      },
      {
        find: /^@docusaurus\/Head$/,
        replacement: path.join(mockDir, 'docusaurus-head.tsx'),
      },
      {find: /^@docusaurus\/.+$/, replacement: path.join(mockDir, 'docusaurus-generic.ts')},
      {find: /^@generated\/.+$/, replacement: path.join(mockDir, 'docusaurus-generic.ts')},
    ],
  },
});
