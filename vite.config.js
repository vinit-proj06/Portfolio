import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import githubStatsHandler from './api/github-stats.js';

function githubStatsDevApi() {
  return {
    name: 'github-stats-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/github-stats', async (request, response, next) => {
        response.status = (statusCode) => {
          response.statusCode = statusCode;
          return response;
        };
        response.json = (payload) => {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify(payload));
          return payload;
        };

        try {
          await githubStatsHandler(request, response);
        } catch (error) {
          next(error);
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, process.cwd(), '');

  // Keep GitHub credentials server-side while making them available to the
  // local API middleware. Only VITE_-prefixed variables are exposed to client code.
  for (const key of ['GITHUB_TOKEN', 'GITHUB_USERNAME']) {
    if (!process.env[key] && serverEnv[key]) {
      process.env[key] = serverEnv[key];
    }
  }

  return {
    plugins: [react(), githubStatsDevApi()],
    server: {
      port: 3000,
      open: true
    }
  };
});
