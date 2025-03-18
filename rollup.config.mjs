import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default [
  {
    input: "lib/index.js",
    output: [
      {
        file: packageJson.main.replace(".js", ".cjs"), // ✅ CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module.replace(".js", ".mjs"), // ✅ ESM
        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(packageJson.dependencies || {}), // ✅ Exclude all dependencies
      "@navikt/aksel-icons", // ✅ Exclude `@navikt/aksel-icons` explicitly
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      postcss({
        extensions: [".css"],
      }),
    ],
  },
  {
    input: "lib/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
