import Cookies from "js-cookie";
import { VARIABLES } from "./variables";
import { createMessage } from "./message";
import { scrollToEnd } from "./utils";

let socket: WebSocket | null = null;

interface CustomEvent {
	data: string;
}

// * функция парсинга сообщения

async function parseMessage(event: CustomEvent): Promise<void> {
	try {
		const data = JSON.parse(event.data);
		const {
			user: { email, name },
			text,
			updatedAt,
		} = data;
		const message = await createMessage({
			userName: name,
			text,
			time: updatedAt,
			email: email,
		});
		if (!VARIABLES.CHAT_SCREEN) {
			return;
		}
		VARIABLES.CHAT_SCREEN.append(message as Node);
		scrollToEnd();
	} catch (err) {
		console.log((err as Error).message);
	}
}

// * функция отлова закрытия соединения с Web Socket

export function handleClose(): number | null {
	console.log("WebSocket is closed");
	const token = Cookies.get("token");
	return token ? setTimeout(() => connectToWebSocket(token), 1000) : null;
}

// * функция подключения к Web Socket

export function connectToWebSocket(token: string): void {
	try {
		if (socket !== null && socket.readyState === 1) {
			console.log("соединение уже открыто");
			return;
		}
		socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
		socket.addEventListener("message", parseMessage);
		socket.addEventListener("close", handleClose);
	} catch (err) {
		console.log((err as Error).message);
	}
}

// * функция отправки сообщения всем клиентам

export function sendWebSoket(text: string): void {
	try {
		if (!socket) {
			console.log("!socket");
			return;
		}
		socket.send(JSON.stringify({ text: text }));
	} catch (err) {
		console.log((err as Error).message);
	}
}

// * функция закрытия соединения с Web Socket

export function closeWebSocket(): void {
	if (!socket) {
		console.log("!socket");
		return;
	}
	socket.close();
}
