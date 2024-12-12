import { createEsbuildPlugin as createEsbuildNodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill/dist/index.js";
import { createEsbuildPlugin as createEsbuildNodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill/dist/index.js";

export {
  createEsbuildNodeGlobalsPolyfillPlugin,
  createEsbuildNodeModulesPolyfillPlugin,
};
