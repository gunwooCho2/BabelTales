import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능하게 함
    port: 3000,      // 원하는 포트 번호 (옵션)
  },
  define: {
    global: 'window',
    _URL_: JSON.stringify('http://localhost:8080/'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
