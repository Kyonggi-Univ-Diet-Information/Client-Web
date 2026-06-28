import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * FSD (Feature Sliced Design) import rules
 *
 * Layer hierarchy (can only import from same or lower layer):
 *   app → page → widgets → features → entities → shared
 *   (Note: FSD "pages" layer is named "page" to avoid Next.js Pages Router conflict)
 *
 * Cross-slice rules:
 *   @/features/{Slice} can only be imported from page/{Slice}, features/{Slice}, or widgets/
 *   @/widgets/{Slice} can only be imported from page/ or widgets/{Slice} itself
 *   @/entities/{Slice} cannot be imported from another entities/{Slice}
 */

// Layers that each layer is forbidden from importing
const LAYER_FORBIDDEN_IMPORTS = {
  shared: ['page', 'widgets', 'features', 'entities'],
  entities: ['page', 'widgets', 'features'],
  features: ['page', 'widgets'],
  widgets: ['page'],
};

const LAYERS = Object.keys(LAYER_FORBIDDEN_IMPORTS);

const featureSlicePlugin = {
  rules: {
    'no-cross-slice-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'features/{Slice} 파일은 pages/{Slice} 또는 widgets/ 내부에서만 import 가능합니다.',
        },
        messages: {
          restricted:
            "'@/features/{{slice}}' 는 'pages/{{slice}}' 또는 'widgets/{{slice}}' 내부에서만 import 할 수 있습니다.",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/features\/([^/]+)/);
            if (!match) return;

            const slice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const isInPage = filename.includes('/src/page/');
            const isInSameFeature = filename.includes(
              `/src/features/${slice}/`
            );
            const isInWidgets = filename.includes('/src/widgets/');
            const isInApp = filename.includes('/src/app/');
            const isMiddleware = filename.endsWith('/src/middleware.ts');

            if (!isInPage && !isInSameFeature && !isInWidgets && !isInApp && !isMiddleware) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice },
              });
            }
          },
        };
      },
    },

    'no-cross-widget-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'widgets/{Slice}는 다른 widgets/{Slice}에서 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'@/widgets/{{slice}}' 는 'widgets/{{slice}}' 내부에서만 import 할 수 있습니다. (다른 widgets 슬라이스에서 참조 불가)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/widgets\/([^/]+)/);
            if (!match) return;

            const importedSlice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const currentWidgetMatch = filename.match(
              /\/src\/widgets\/([^/]+)\//
            );
            if (!currentWidgetMatch) return;

            const currentSlice = currentWidgetMatch[1];
            if (currentSlice !== importedSlice) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice: importedSlice },
              });
            }
          },
        };
      },
    },

    'no-cross-entity-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'entities/{Slice}는 다른 entities/{Slice}에서 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'@/entities/{{slice}}' 는 'entities/{{slice}}' 내부에서만 import 할 수 있습니다. (다른 entities 슬라이스에서 참조 불가)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const match = importPath.match(/^@\/entities\/([^/]+)/);
            if (!match) return;

            const importedSlice = match[1];
            const filename = context.filename.replace(/\\/g, '/');

            const currentEntityMatch = filename.match(
              /\/src\/entities\/([^/]+)\//
            );
            if (!currentEntityMatch) return;

            const currentSlice = currentEntityMatch[1];
            if (currentSlice !== importedSlice) {
              context.report({
                node,
                messageId: 'restricted',
                data: { slice: importedSlice },
              });
            }
          },
        };
      },
    },

    'no-upper-layer-import': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'FSD 계층 규칙: 하위 레이어는 상위 레이어를 import할 수 없습니다.',
        },
        messages: {
          restricted:
            "'{{currentLayer}}' 레이어는 '{{importLayer}}' 레이어를 import할 수 없습니다. (pages → features → entities → shared)",
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const filename = context.filename.replace(/\\/g, '/');

            const layerPattern = new RegExp(`/src/(${LAYERS.join('|')})/`);
            const currentMatch = filename.match(layerPattern);
            if (!currentMatch) return;
            const currentLayer = currentMatch[1];

            const importMatch = importPath.match(
              new RegExp(`^@/(${LAYERS.join('|')})/`)
            );
            if (!importMatch) return;
            const importLayer = importMatch[1];

            const forbidden = LAYER_FORBIDDEN_IMPORTS[currentLayer] ?? [];
            if (forbidden.includes(importLayer)) {
              context.report({
                node,
                messageId: 'restricted',
                data: { currentLayer, importLayer },
              });
            }
          },
        };
      },
    },
  },
};

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin,
      'feature-slice': featureSlicePlugin,
    },
    rules: {
      'feature-slice/no-cross-slice-import': 'error',
      'feature-slice/no-cross-entity-import': 'error',
      'feature-slice/no-upper-layer-import': 'error',
      'feature-slice/no-cross-widget-import': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
          pathGroups: [
            { pattern: '@/app/**', group: 'external', position: 'after' },
            { pattern: '@/page/**', group: 'external', position: 'after' },
            { pattern: '@/widgets/**', group: 'external', position: 'after' },
            { pattern: '@/features/**', group: 'external', position: 'after' },
            { pattern: '@/entities/**', group: 'external', position: 'after' },
            { pattern: '@/shared/**', group: 'external', position: 'after' },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
]);
