import type { TodoType } from "../model/todoType.ts";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodosStore } from "../model/store/useTodosStore.ts";

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};
export const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);
	const [editDescription, setEditDescription] = useState(todo.description);
	const { enqueueSnackbar } = useSnackbar();
	const { deleteTodo } = useTodosStore();

	const handleCheckClick = () => {
		setTodo?.({
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
		setTodo?.(updatedTodo);
		setIsEditing(false);
		enqueueSnackbar("Todo updated", { variant: "success" });
	};

	const handleDelete = () => {
		deleteTodo(todo._id);
	};

	return (
		<Card
			variant={"outlined"}
			sx={{ maxWidth: 250, display: "flex", flexDirection: "column" }}
		>
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
			<CardActions
				sx={{
					mt: "auto",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Checkbox checked={todo.completed} onChange={handleCheckClick} />
				<IconButton
					size={"small"}
					color={"primary"}
					onClick={handleDelete}
					aria-label={"delete"}
				>
					<DeleteIcon fontSize={"small"} />
				</IconButton>
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
