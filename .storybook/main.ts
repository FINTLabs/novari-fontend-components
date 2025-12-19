import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-vitest',
        '@storybook/addon-a11y',
        '@chromatic-com/storybook'
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    // docs: {
    //   autodocs: "tag",
    // },
    viteFinal: async (config) => {
        // Ensure Tailwind CSS plugin is included
        const plugins = config.plugins || [];
        const hasTailwind = plugins.some(
            (plugin: any) => plugin && typeof plugin === 'object' && plugin.name === '@tailwindcss/vite'
        );
        
        if (!hasTailwind) {
            plugins.push(tailwindcss());
        }
        
        return {
            ...config,
            plugins,
            optimizeDeps: {
                ...config.optimizeDeps,
                include: [
                    'react',
                    'react-dom',
                    '@navikt/ds-react',
                    '@navikt/aksel-icons',
                    ...(config.optimizeDeps?.include || []),
                ],
            },
            server: {
                ...config.server,
                fs: {
                    ...config.server?.fs,
                    allow: ['..'],
                },
            },
        };
    },
};

export default config;
