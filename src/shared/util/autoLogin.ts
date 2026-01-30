import { jwtDecode, type JwtPayload } from "jwt-decode";

export const autoLogin = () => {
	const token = localStorage.getItem("accessToken"); // Изменено на "accessToken"

	if (token) {
		try {
			const decodedToken = jwtDecode<JwtPayload & { username: string }>(token);

			if (decodedToken.exp && Date.now() / 1000 < decodedToken.exp) {
				// Исправлена проверка
				return { username: decodedToken.username, access_token: token };
			}
			localStorage.removeItem("accessToken"); // Изменено на "accessToken"
			return null;
		} catch (error) {
			console.error(error);
			localStorage.removeItem("accessToken"); // Изменено на "accessToken"
			return null;
		}
	}
	return null;
};
