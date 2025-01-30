import path from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers:['editorWorkerService', 'json']
    })
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: [
      {
        find: 'routes',
        replacement: path.join(process.cwd(), 'src/routes')
      },
      {
        find: 'themes',
        replacement: path.join(process.cwd(), 'src/themes')
      },
      {
        find: 'components',
        replacement: path.join(process.cwd(), 'src/components')
      },
      {
        find: 'utils',
        replacement: path.join(process.cwd(), 'src/utils')
      },
      {
        find: 'layout',
        replacement: path.join(process.cwd(), 'src/layout')
      },
      {
        find: 'pages',
        replacement: path.join(process.cwd(), 'src/pages')
      },
      {
        find: 'menu-items',
        replacement: path.join(process.cwd(), 'src/menu-items')
      },
      {
        find: 'api',
        replacement: path.join(process.cwd(), 'src/api')
      },
      {
        find: 'assets',
        replacement: path.join(process.cwd(), 'src/assets')
      },
      {
        find: 'config',
        replacement: path.join(process.cwd(), 'src/config')
      },
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1')
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1')
      }
    ]
  },
}));
