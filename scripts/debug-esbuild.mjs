import { buildSync } from 'esbuild';

const result = buildSync({
  stdin: {
    contents: "import { Button } from '@orbi/react'; console.log(Button);",
    resolveDir: process.cwd(),
    loader: 'ts',
    sourcefile: 'inline.ts',
  },
  bundle: true,
  write: false,
  platform: 'browser',
  format: 'esm',
  external: ['react','react-dom'],
  loader: {
    '.css': 'text'
  }
});

console.log('files', result.outputFiles.length);
console.log(result.outputFiles[0]?.text || '<no output>');
