import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { TodoType } from "../model/todoType.ts";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { mockTodos } from "../model/mockTodos.ts";

type TodoProps = {
	todo: TodoType;
	setTodo: (todo: TodoType) => void;
};

const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);
	const [editDescription, setEditDescription] = useState(todo.description);
	const { enqueueSnackbar } = useSnackbar();

	const handleCheckClick = () => {
		setTodo({
			...todo,
			completed: !todo.completed,
			updatedAt: new Date().toISOString(),
		});
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditTitle(todo.title);
		setEditDescription(todo.description);
	};

	const handleSave = () => {
		const updatedTodo: TodoType = {
			...todo,
			title: editTitle,
			description: editDescription,
			updatedAt: new Date().toISOString(),
		};
		setTodo(updatedTodo);
		setIsEditing(false);
		enqueueSnackbar("Todo updated", { variant: "success" });
	};

	return (
		<Card variant={"outlined"} sx={{ maxWidth: 250 }}>
			<CardContent>
				{isEditing ? (
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<TextField
							variant={"standard"}
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							autoFocus
						/>
						<TextField
							variant={"standard"}
							multiline
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
						/>
					</Box>
				) : (
					<>
						<Typography
							gutterBottom
							sx={{ color: "text.secondary", fontSize: 14 }}
						>
							{todo.title}
						</Typography>
						<Typography variant={"body2"}>{todo.description}</Typography>
					</>
				)}
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
				<Checkbox checked={todo.completed} onChange={handleCheckClick} />
				{isEditing ? (
					<Box>
						<IconButton
							size={"small"}
							color={"primary"}
							onClick={handleSave}
							aria-label={"save"}
						>
							<CheckIcon fontSize={"small"} />
						</IconButton>
						<IconButton
							size={"small"}
							color={"inherit"}
							onClick={handleCancel}
							aria-label={"cancel"}
						>
							<CloseIcon fontSize={"small"} />
						</IconButton>
					</Box>
				) : (
					<IconButton
						size={"small"}
						color={"inherit"}
						onClick={handleEditClick}
						aria-label={"edit"}
					>
						<EditIcon fontSize={"small"} />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};
const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos);

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => (t._id === todo._id ? todo : t));
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
			{todos.map((todo) => (
				<Todo todo={todo} key={todo._id} setTodo={setTodo} />
			))}
		</Box>
	);
};

export default Todos;
