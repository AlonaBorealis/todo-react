import {
	Button,
	Paper,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import { AccountCircle, Lock } from "@mui/icons-material";
import * as React from "react";
import { type Dispatch, type SetStateAction, type SyntheticEvent, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { UserType } from "../model/userType.ts";

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const Auth = ({ setUser }: AuthProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [loginFormName, setLoginFormName] = useState("login");

	const handleUserNameChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setEmail(e.currentTarget.value);
	};

	const handlePasswordChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setPassword(e.currentTarget.value);
	};

	const handleLogin = async () => {
		setLoading(true);
		try {
			const loginResponse = await fetch("https://todos-be.vercel.app/auth/login", {
				method: "POST",
				body: JSON.stringify({ username: email, password }),
				mode: "cors",
				headers: { "Content-Type": "application/json" },
			});
			const loginData = (await loginResponse.json()) as {
				access_token: string;
				username: string;
			};
			const accessToken = loginData?.access_token;
			console.log(jwtDecode(accessToken));

			localStorage.setItem("accessToken", accessToken);
			setLoading(false);
			setUser(loginData);
		} catch (e) {
			alert("Invalid username or password");
			console.error(1);
			setLoading(false);
		}
	};

	const handleRegister = async () => {
		setLoading(true);
		try {
			const registerResponse = await fetch("https://todos-be.vercel.app/auth/register", {
				method: "POST",
				body: JSON.stringify({ username: email, password }),
				mode: "cors",
				headers: { "Content-Type": "application/json" },
			});

			if (!registerResponse.ok) {
				const messages: Record<number, string> = {
					400: "Неверные данные",
					401: "Неверный логин или пароль",
					409: "Пользователь уже существует",
					500: "Ошибка сервера",
				};
				throw new Error(messages[registerResponse.status] || "Произошла ошибка");
			}

			const registerData = await registerResponse.json();
			console.log("Регистрация успешна:", registerData);

			// Автоматически логинимся после регистрации
			const loginResponse = await fetch("https://todos-be.vercel.app/auth/login", {
				method: "POST",
				body: JSON.stringify({ username: email, password }),
				mode: "cors",
				headers: { "Content-Type": "application/json" },
			});

			if (!loginResponse.ok) {
				throw new Error("Ошибка входа после регистрации");
			}

			const loginData = await loginResponse.json();

			if (!loginData?.access_token) {
				throw new Error("Токен не получен");
			}

			console.log(jwtDecode(loginData.access_token));
			localStorage.setItem("accessToken", loginData.access_token);
			setUser(loginData);
		} catch (e) {
			if (e instanceof Error) {
				alert(e.message);
				console.error("Ошибка регистрации:", e.message);
			} else {
				alert("Произошла неизвестная ошибка");
				console.error("Неизвестная ошибка:", e);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleToggleButtonChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	return (
		<div>
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
								value={email}
								onChange={handleUserNameChange}
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
								value={email}
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
							onClick={handleRegister}
							loading={loading}
						>
							{loading ? "Processing" : "Register"}
						</Button>
					</Stack>
				)}
			</Paper>
		</div>
	);
};

export default Auth;
