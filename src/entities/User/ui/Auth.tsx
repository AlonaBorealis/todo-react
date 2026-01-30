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
import { rootApi } from "../../../shared/api/rootApi.ts";
import { useSnackbar } from "notistack";
import type { AxiosError } from "axios";

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const Auth = ({ setUser }: AuthProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [loginFormName, setLoginFormName] = useState("login");

	const { enqueueSnackbar } = useSnackbar();

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
			const loginData = await rootApi.post<UserType>("/auth/login", {
				username: email,
				password: password,
			});

			const accessToken = loginData.data.access_token;
			console.warn(jwtDecode(accessToken));

			localStorage.setItem("accessToken", accessToken);
			setUser(loginData.data);
			enqueueSnackbar("Welcome!", { variant: "success" });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			enqueueSnackbar(axiosError.response?.data.message || "Unknown error", {
				variant: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async () => {
		setLoading(true);
		try {
			const registerData = await rootApi.post<UserType>("/auth/register", {
				username: email,
				password: password,
			});

			console.log("Регистрация успешна:", registerData.data);

			// Автоматически логинимся после регистрации для получения токена
			const loginData = await rootApi.post<UserType>("/auth/login", {
				username: email,
				password: password,
			});

			const accessToken = loginData.data.access_token;
			console.warn(jwtDecode(accessToken));

			localStorage.setItem("accessToken", accessToken);
			setUser(loginData.data);
			enqueueSnackbar("Registration successful!", { variant: "success" });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			enqueueSnackbar(axiosError.response?.data.message || "Registration failed", {
				variant: "error",
			});
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
