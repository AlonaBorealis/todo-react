import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Todo = () => {
	return (
		<Card variant={"outlined"} sx={{ maxWidth: 200 }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
					Word of the Day
				</Typography>
				<Typography variant={"body2"}>well meaning and kindly.</Typography>
			</CardContent>
			<CardActions>
				<Button size={"small"}>Learn More</Button>
			</CardActions>
		</Card>
	);
};

const Todos = () => {
	const todos = [1, 2, 3, 4, 5, 6, 7];
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
				gap: 1,
			}}
		>
			{todos.map((todo) => {
				return <Todo key={todo} />;
			})}
		</Box>
	);
};

export default Todos;
