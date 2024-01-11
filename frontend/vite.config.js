import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      '/api':{
<<<<<<< HEAD
        target:'e-learning-pxb7.vercel.app',
=======
        target:'e-learning-backend-iota.vercel.app',
>>>>>>> b8e7f3e9161fb66156c97ba7db4554c39a45a9fb
        changeOrigin:true,
      },
    },
  },
})
