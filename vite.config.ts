import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGitHubPages = process.env.GITHUB_PAGES === "true";

  return {
    base: isGitHubPages && repo ? `/${repo}/` : "/",
    plugins: [inspectAttr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});
