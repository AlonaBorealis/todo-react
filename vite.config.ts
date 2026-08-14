import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	// На GitHub Pages проект отдаётся по адресу /todo-react/, а не с корня
	// домена. Без base ссылки на собранные файлы ведут мимо и страница пустая.
	base: "/todo-react/",
	plugins: [react()],
})
