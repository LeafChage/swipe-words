Bun.build({
  entrypoints: ['./src/main.ts'],
  outdir: './',
  external: [
    "obsidian",
  ],
  format: "cjs",
  target: 'node',
  sourcemap: 'linked', // default 'none'
});
