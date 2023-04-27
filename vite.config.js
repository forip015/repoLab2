import fs from 'fs/promises';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  plugins: [
    react({
      name: "load-js-files-as-jsx",
      setup(build) {
        build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({ // i modified the regex here
          loader: "jsx",
          contents: await fs.readFile(args.path, "utf8"),
        }));
      },
    }),
  ],
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    rollupOptions: {
      output: {
        manualChunks: {
          appInsights: ['@microsoft/applicationinsights-web'],
        },
      },
    }
},
});
