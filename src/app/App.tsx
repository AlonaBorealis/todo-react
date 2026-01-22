import { useState } from "react";
import Button from "@mui/material/Button";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppBar from "./AppBar.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	useColorScheme,
} from "@mui/material";

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});
function App() {
	const [count, setCount] = useState(0);
	const { mode, setMode } = useColorScheme();
	if (!mode) {
		return null;
	}
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar />
				<div style={{ marginTop: "100px" }}>
					<a href="https://vite.dev" target="_blank" rel="noreferrer">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
					<a href="https://react.dev" target="_blank" rel="noreferrer">
						<img src={reactLogo} className="logo react" alt="React logo" />
					</a>
				</div>
				<h1>Vite + React</h1>
				<div className="card">
					<Button variant="contained" onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</Button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className="read-the-docs">
					Click on the Vite and React logos to learn more
				</p>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						bgcolor: "background.default",
						color: "text.primary",
						borderRadius: 1,
						p: 3,
						minHeight: "56px",
					}}
				>
					<ToggleButtonGroup
						aria-labelledby="demo-theme-toggle"
						color="primary"
						value={mode}
						exclusive
						onChange={(event) => setMode(event.target.value as "light" | "dark")}
						aria-label="Platform"
					>
						<ToggleButton value="light">light</ToggleButton>
						<ToggleButton value="dark">dark</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</ThemeProvider>
		</>
	);
}

export default App;
