import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { createRequire } from "node:module";

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default [
  {
    input: "src/index.ts", // ✅ use src/index.ts not lib/index.js
    output: [
      {
        file: packageJson.main.replace(/\.js$/, ".cjs"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.main.replace(/\.js$/, ".mjs"),

        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(packageJson.dependencies || {}),
      "@navikt/aksel-icons",
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        include: ["src/**/*.ts", "src/**/*.tsx"],
        sourceMap: true,
        declaration: false,
      }),
      postcss({
        extensions: [".css"],
        extract: true,
        minimize: true,
        sourceMap: true,
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
