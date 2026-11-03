// Chạy đồng thời landing page và admin, mỗi app một port (xem vite.config.ts)
import { createServer } from 'vite'

for (const mode of ['development', 'admin']) {
  const server = await createServer({ mode })
  await server.listen()
  console.log(`\n  ${mode === 'admin' ? 'Admin' : 'Landing page'}:`)
  server.printUrls()
}
