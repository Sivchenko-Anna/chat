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

interface User {
	user: {
		name: string;
		email: string;
	};
	text: string;
	createdAt: string;
}

interface Message {
	userName: string | null;
	text: string | null;
	time: string;
	email: string | null;
}

// * функция создания сообщения

export function createMessage({ userName, text, time, email }: Message): Promise<HTMLDivElement> {
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

const messageHistory = {
	messageArray: [],
	currentMessage: 0,
	nextMessages: 20,
};

async function loadMessagesHistory() {
	const messagesData = await getMessageHistory();
	messageHistory.messageArray = messagesData.messages;
}

// * функция рендера сообщений

export async function renderMessages() {
	if (!VARIABLES.CHAT_WINDOW) {
		return;
	}
	const prevScrollHeight = VARIABLES.CHAT_WINDOW.scrollHeight;
	await loadMessagesHistory();

	const messagesForRender = messageHistory.messageArray
		.slice(
			messageHistory.currentMessage,
			messageHistory.currentMessage + messageHistory.nextMessages,
		)
		.reverse();
	const messagesPromises = messagesForRender.map((element: User) => {
		const { user, text, createdAt } = element;
		return createMessage({
			userName: user.name,
			text,
			time: createdAt,
			email: user.email,
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

	messageHistory.currentMessage += messageHistory.nextMessages;
}

(VARIABLES.CHAT_WINDOW as HTMLElement).addEventListener("scroll", () => {
	if (!VARIABLES.CHAT_WINDOW) {
		return;
	}
	return VARIABLES.CHAT_WINDOW.scrollTop === 0 && renderMessages();
});
