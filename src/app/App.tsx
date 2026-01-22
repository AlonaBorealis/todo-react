import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppBar from "./AppBar.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Container, Stack, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar />
			<div style={{ marginTop: "100px" }}>
				<Container maxWidth={"sm"}>
					<Typography variant={"h4"} gutterBottom>
						{"Login"}
					</Typography>
					<Stack spacing={2}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								id={"input-with-sx"}
								label={"email"}
								variant={"standard"}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								id={"input-with-sx"}
								label={"password"}
								variant={"standard"}
							/>
						</Box>
						<Button variant={"contained"}>{"LOGIN"}</Button>
					</Stack>
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;
