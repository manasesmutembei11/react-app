// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'dist',
    loader: {
        '.js': 'jsx',
    },
    minify: true,
}).catch(() => process.exit(1));
