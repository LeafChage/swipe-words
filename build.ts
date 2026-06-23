import { env } from "bun";

const sourceMap: Bun.BuildConfig["sourcemap"] = env.NODE_ENV === "PRODUCTION" ? "none" : "linked";

Bun.build({
  entrypoints: ['./src/main.ts'],
  outdir: './dist',
  external: [
    "obsidian",
  ],
  format: "cjs",
  target: 'node',
  sourcemap: sourceMap,
});
