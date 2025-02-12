const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outfile: 'dist/bundle.js',
    minify: true,
    sourcemap: true,
    target: ['es2015'],
    jsx: 'react-jsx',
}).catch(() => process.exit(1));
