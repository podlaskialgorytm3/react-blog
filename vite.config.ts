import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const cherryPickedKeys = [
  "REACT_APP_API_URL",
  "REACT_APP_API_TINY",
  "REACT_APP_APP_ID",
  "REACT_APP_MESSAGING_SENDER_ID",
  "REACT_APP_STORAGE_BUCKET",
  "REACT_APP_PROJECT_ID",
  "REACT_APP_AUTH_DOMAIN",
  "REACT_APP_API_KEY"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  }
})