import { create } from "zustand";
import { mockTodos } from "../mockTodos.ts";
import type { TodoType } from "../todoType.ts";
import { devtools } from "zustand/middleware";

type TodosState = {
	todos: TodoType[];
	addTodo: (newTodo: TodoType) => void;
	setTodos: (todos: TodoType[]) => void;
	deleteTodo: (id: string) => void;
};

export const useTodosStore = create<TodosState>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo: TodoType) =>
				set((state) => ({ todos: [newTodo, ...state.todos] })),
			setTodos: (todos: TodoType[]) => set({ todos }),
			deleteTodo: (id: string) =>
				set((state) => ({ todos: state.todos.filter((todo) => todo._id !== id) })),
		};
	}),
);
