import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppBar from "./AppBar.tsx";
import {
	Button,
	Paper,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import Box from "@mui/material/Box";
import * as React from "react";
import { type SyntheticEvent, useState } from "react";

function App() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [loginFormName, setLoginFormName] = useState("login");

	const handleUserNameChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setUserName(e.currentTarget.value);
	};

	const handlePasswordChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setPassword(e.currentTarget.value);
	};

	const handleLogin = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleToggleButtonChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	return (
		<>
			<AppBar />

			<Paper
				elevation={6}
				sx={{
					margin: "100px auto",
					padding: "40px",
					width: "450px",
					maxWidth: "90vw",
				}}
			>
				<ToggleButtonGroup
					value={loginFormName}
					color={"primary"}
					exclusive
					fullWidth
					size={"medium"}
					disabled={loading}
					aria-label={"Platform"}
					onChange={handleToggleButtonChange}
					sx={{ mb: 4 }}
				>
					<ToggleButton value={"login"}>LOGIN</ToggleButton>
					<ToggleButton value={"register"}>REGISTER</ToggleButton>
				</ToggleButtonGroup>
				{loginFormName === "login" ? (
					<Stack spacing={3}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								disabled={loading}
								value={userName}
								onChange={handleUserNameChange}
								id={"input-with-sx"}
								label={"email"}
								fullWidth
								variant={"standard"}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								disabled={loading}
								value={password}
								onChange={handlePasswordChange}
								id={"input-with-sx"}
								label={"password"}
								variant={"standard"}
								type={"password"}
								fullWidth
							/>
						</Box>
						<Button
							fullWidth
							loadingPosition={"end"}
							variant={"contained"}
							onClick={handleLogin}
							loading={loading}
						>
							{loading ? "Processing" : "Login"}
						</Button>
					</Stack>
				) : (
					<Stack spacing={3}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								disabled={loading}
								value={userName}
								onChange={handleUserNameChange}
								id={"input-with-sx"}
								label={"email"}
								fullWidth
								variant={"standard"}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								disabled={loading}
								value={password}
								onChange={handlePasswordChange}
								id={"input-with-sx"}
								label={"password"}
								variant={"standard"}
								type={"password"}
								fullWidth
							/>
						</Box>
						<Button
							fullWidth
							loadingPosition={"end"}
							variant={"contained"}
							onClick={handleLogin}
							loading={loading}
						>
							{loading ? "Processing" : "Register"}
						</Button>
					</Stack>
				)}
			</Paper>
		</>
	);
}

export default App;
