import Cookies from "js-cookie";
import { VARIABLES } from "./variables";

interface UserDataRequest {
	email: string;
	name: string;
	token: string;
}

interface User {
	email: string;
	name: string;
}

interface Messages {
	text: string;
	updatedAt: string;
	user: User;
}

interface MessagesRequest {
	messages: Messages[];
}

// * функция запроса для авторизации

export async function receiveCodeByEmail(email: string): Promise<void> {
	try {
		const response = await fetch(VARIABLES.API.SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			console.log("Error from the server");
		}
	} catch (err) {
		console.log((err as Error).message);
	}
}

// * функция получения данных пользователя

export async function getUserDataRequest(token: string): Promise<UserDataRequest | boolean> {
	try {
		const response = await fetch(VARIABLES.API.USER_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			console.log("Error from the server");
		}
		const data = await response.json();
		return data;
	} catch (err) {
		console.log((err as Error).message);
		return false;
	}
}

// * функция смены имени

export async function changeUserName(name: string): Promise<void | boolean> {
	try {
		const token = Cookies.get("token");
		const response = await fetch(VARIABLES.API.SERVER_URL, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			console.log("Error from the server");
		}
		return await response.json();
	} catch (err) {
		console.log((err as Error).message);
		return false;
	}
}

// * функция получения истории сообщений

export async function getMessageHistory(): Promise<MessagesRequest | boolean> {
	try {
		const token = Cookies.get("token");
		const response = await fetch(VARIABLES.API.MESSAGE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			console.log("Error from the server with getMessageHistory");
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.log((err as Error).message);
		return false;
	}
}
