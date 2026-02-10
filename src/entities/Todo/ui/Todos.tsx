import { useTodosStore } from "../model/store/useTodosStore.ts";
import { Todo } from "./Todo.tsx";
import { Button, Container, Input, Stack } from "@mui/material";
import { useState } from "react";
import type { TodoType } from "../model/todoType.ts";

const Todos = () => {
	const todos = useTodosStore((state) => state.todos);
	const [newTodoTitle, setNewTodoTitle] = useState("");
	const [newTodoDescriprion, setNewTodoDescription] = useState("");
	const addTodos = useTodosStore((state) => state.addTodo);
	const setTodos = useTodosStore((state) => state.setTodos);

	console.log(todos);

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => (t._id === todo._id ? todo : t));
		setTodos(updatedTodos);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value);
	};
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value);
	};

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			description: newTodoDescriprion,
			completed: false,
			createdAt: new Date().toString(),
			updatedAt: new Date().toString(),
			order: todos.length + 1,
		};

		addTodos(newTodo);
	};

	return (
		<Container>
			<Input placeholder={"title"} value={newTodoTitle} onChange={handleTitleChange} />
			<Input
				placeholder={"description"}
				value={newTodoDescriprion}
				onChange={handleDescriptionChange}
			/>
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>
			<Stack
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: 1,
				}}
			>
				{todos.map((todo) => (
					<Todo todo={todo} key={todo._id} setTodo={setTodo} />
				))}
			</Stack>
		</Container>
	);
};

export default Todos;
