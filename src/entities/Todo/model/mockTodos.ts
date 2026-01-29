import type { TodoType } from "./todoType.ts";

export const mockTodos: TodoType[] = [
	{
		_id: "67b01a8e5f4c3b2a1d9e8f7g1",
		title: "Изучить TypeScript generics",
		order: 1,
		completed: false,
		description:
			"Разобраться с продвинутыми типами и дженериками в TypeScript для улучшения типизации React компонентов",
		createdAt: "2026-01-28T18:50:00Z",
		updatedAt: "2026-01-28T20:50:00Z",
	},
	{
		_id: "67b02a8e5f4c3b2a1d9e8f7g2",
		title: "Настроить CI/CD для проекта",
		order: 2,
		completed: true,
		description: "Создать GitLab pipeline для автоматического деплоя и запуска тестов",
		createdAt: "2026-01-27T18:50:00Z",
		updatedAt: "2026-01-27T20:50:00Z",
	},
	{
		_id: "67b03a8e5f4c3b2a1d9e8f7g3",
		title: "Рефакторинг форм регистрации",
		order: 3,
		completed: false,
		description:
			"Оптимизировать компоненты форм, добавить валидацию и улучшить обработку ошибок",
		createdAt: "2026-01-26T18:50:00Z",
		updatedAt: "2026-01-26T20:50:00Z",
	},
	{
		_id: "67b04a8e5f4c3b2a1d9e8f7g4",
		title: "Добавить unit тесты",
		order: 4,
		completed: false,
		description:
			"Написать тесты для основных React компонентов с использованием Jest и React Testing Library",
		createdAt: "2026-01-25T18:50:00Z",
		updatedAt: "2026-01-25T20:50:00Z",
	},
	{
		_id: "67b05a8e5f4c3b2a1d9e8f7g5",
		title: "Обновить документацию API",
		order: 5,
		completed: false,
		description:
			"Задокументировать endpoints для REST API и добавить примеры использования",
		createdAt: "2026-01-24T18:50:00Z",
		updatedAt: "2026-01-24T20:50:00Z",
	},
];
