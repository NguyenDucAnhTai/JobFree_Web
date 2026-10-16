import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Landing page chạy ở mode mặc định, admin chạy với `--mode admin`
const LANDING_PORT = 5173
const ADMIN_PORT = 5174

// Dùng chung index.html, chỉ đổi entry script + title khi chạy admin
function adminEntryPlugin(): Plugin {
  return {
    name: 'jobfree-admin-entry',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace('/src/main.tsx', '/src/admin/main.tsx')
          .replace(/<title>.*<\/title>/, '<title>JobFree Admin</title>'),
    },
  }
}

export default defineConfig(({ mode }) => {
  const isAdmin = mode === 'admin'

  return {
    plugins: [react(), ...(isAdmin ? [adminEntryPlugin()] : [])],
    // Tách cache để 2 dev server chạy song song không ghi đè lẫn nhau
    cacheDir: isAdmin ? 'node_modules/.vite-admin' : 'node_modules/.vite',
    server: {
      port: isAdmin ? ADMIN_PORT : LANDING_PORT,
      strictPort: true,
    },
    preview: {
      port: isAdmin ? ADMIN_PORT : LANDING_PORT,
      strictPort: true,
    },
    build: {
      outDir: isAdmin ? 'dist-admin' : 'dist',
    },
  }
})
