const esbuild = require('esbuild');
const isProduction = process.env.NODE_ENV === 'production';

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    sourcemap: !isProduction,
    minify: isProduction,
    target: ['es2015'],
    jsx: 'react-jsx',
    jsx: "automatic",
    loader: { '.js': 'jsx' }

}).catch(() => process.exit(1));
