import Cookies from "js-cookie";
import { VARIABLES, MESSAGE } from "./variables";
import { getCurrentTime } from "./utils";
import { getMessageHistory } from "./api";

// * функция добавления стиля расположения сообщения

export function addClassToMessage(sender: string): void {
	if (!MESSAGE.CONTAINER) {
		return;
	}
	if (sender === "I") {
		MESSAGE.CONTAINER.classList.add("chat-message_user");
	} else {
		MESSAGE.CONTAINER.classList.remove("chat-message_user");
		MESSAGE.CONTAINER.classList.add("chat-message_companion");
	}
}

interface CreateMessageArgs {
	userName: string | null;
	text: string | null;
	time: string;
	email: string | null;
}

// * функция создания сообщения

export function createMessage({ userName, text, time, email }: CreateMessageArgs): HTMLDivElement {
	const sender = email === Cookies.get("email") ? "I" : "COMPANION";
	if (!MESSAGE.SENDER || !MESSAGE.TEXT || !MESSAGE.TIME) {
		throw new Error("Some required fields are missing!");
	}
	MESSAGE.SENDER.textContent = userName;
	MESSAGE.TEXT.textContent = text;
	MESSAGE.TIME.textContent = getCurrentTime(time);
	addClassToMessage(sender);
	const message = (VARIABLES.MESSAGE_TEMPLATE as HTMLTemplateElement).content.cloneNode(true);
	return message as HTMLDivElement;
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

let loadedMessages: Messages[] = [];
let currentMessage = 0;
const nextMessages = 20;

async function loadMessagesHistory(): Promise<void> {
	const messagesData = await getMessageHistory();
	if (typeof messagesData !== "boolean") {
		loadedMessages = messagesData.messages;
	}
}

// * функция рендера сообщений

export async function renderMessages(): Promise<void> {
	if (!VARIABLES.CHAT_WINDOW) {
		return;
	}

	const prevScrollHeight = VARIABLES.CHAT_WINDOW.scrollHeight;
	await loadMessagesHistory();

	const messagesForRender = loadedMessages
		.slice(currentMessage, currentMessage + nextMessages)
		.reverse();
	const messagesPromises = messagesForRender.map((element) => {
		const {
			user: { email, name },
			text,
			updatedAt,
		} = element;
		return createMessage({
			userName: name,
			text,
			time: updatedAt,
			email: email,
		});
	});

	if (!VARIABLES.CHAT_SCREEN) {
		return;
	}

	const messages = await Promise.all(messagesPromises);
	VARIABLES.CHAT_SCREEN.prepend(...messages);
	const validMessages = messages.filter((message) => message !== undefined) as Node[];
	VARIABLES.CHAT_SCREEN.prepend(...validMessages);
	const newScrollHeight = VARIABLES.CHAT_WINDOW.scrollHeight;
	VARIABLES.CHAT_WINDOW.scrollTop += newScrollHeight - prevScrollHeight;
	currentMessage += nextMessages;
}

(VARIABLES.CHAT_WINDOW as HTMLElement).addEventListener("scroll", () => {
	if (!VARIABLES.CHAT_WINDOW) {
		return;
	}
	if (VARIABLES.CHAT_WINDOW.scrollTop === 0) {
		renderMessages();
	}
});
