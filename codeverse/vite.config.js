// import { defineConfig } from "vite";
import { defineConfig } from "vite";
import { createStyleImportPlugin } from "vite-plugin-style-import";

export default defineConfig({
  plugins: [
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
