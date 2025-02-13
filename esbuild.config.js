const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    minify: true,
    sourcemap: true,
    target: ['es2015'],
    jsx: 'react-jsx',
    jsx: "automatic",
    loader: { '.js': 'jsx' }

}).catch(() => process.exit(1));
