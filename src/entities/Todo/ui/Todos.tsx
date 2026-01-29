import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { TodoType } from "../model/todoType.ts";
import { Checkbox } from "@mui/material";
import { mockTodos } from "../model/mockTodos.ts";
import { useState } from "react";

type TodoProps = {
	todo: TodoType;
	setTodo: (todo: TodoType) => void;
};

const Todo = ({ todo, setTodo }: TodoProps) => {
	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed });
	};
	return (
		<Card variant={"outlined"} sx={{ maxWidth: 200 }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
					{todo.title}
				</Typography>
				<Typography variant={"body2"}>{todo.description}</Typography>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckClick} />
			</CardActions>
		</Card>
	);
};

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos);

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo;
			}
			return t; // Важно! Возвращаем оригинальный элемент
		});
		setTodos(updatedTodos);
	};

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
				gap: 1,
			}}
		>
			{todos.map((todo) => {
				// Используйте todos из state, а не mockTodos
				return <Todo todo={todo} key={todo._id} setTodo={setTodo} />;
			})}
		</Box>
	);
};

export default Todos;
