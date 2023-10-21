import Cookies from "js-cookie";
import { VARIABLES, MODAL, MESSAGE } from "./variables.js";
import { clearInput, modalChange, isValueEmpty, isEmailValid, scrollToEnd } from "./utils.js";
import { receiveCodeByEmail, getUserDataRequest, changeUserName } from "./api.js";
import { renderMessages } from "./message.js";
import { connectToWebSocket, sendWebSoket, closeWebSocket } from "./websocket.js";

async function handleAuthenticationForm(event: Event) {
	try {
		event.preventDefault();
		if (!MODAL.AUTHORIZATION.EMAIL) {
			return;
		}
		const email = MODAL.AUTHORIZATION.EMAIL.value;
		if (isEmailValid(email)) {
			await receiveCodeByEmail(email);
			if (!MODAL.AUTHORIZATION.BTN_ENTER || !MODAL.AUTHORIZATION.BTN_GET) {
				return;
			}
			MODAL.AUTHORIZATION.EMAIL.classList.toggle("valid-value");
			MODAL.AUTHORIZATION.BTN_ENTER.removeAttribute("disabled");
			MODAL.AUTHORIZATION.BTN_GET.setAttribute("disabled", "true");
		} else {
			MODAL.AUTHORIZATION.EMAIL.classList.add("invalid-value");
			MODAL.AUTHORIZATION.EMAIL.focus();
			console.log("Неверный email");
		}
	} catch (err) {
		console.log((err as Error).message);
	}
}

async function handleVerificationForm(event: Event) {
	try {
		event.preventDefault();
		if (!MODAL.VERIFICATION.CODE || !MODAL.VERIFICATION.DIALOG || !VARIABLES.CHAT) {
			return;
		}
		const token = MODAL.VERIFICATION.CODE.value;
		const response = await getUserDataRequest(token);
		if (response) {
			Cookies.set("token", token, { expires: 3 });
			Cookies.set("email", response.email);
			Cookies.set("name", response.name);
			// connectToWebSocket(Cookies.get("token"));
			const tokenCookie = Cookies.get("token");
			if (tokenCookie) {
				connectToWebSocket(tokenCookie);
			} else {
				console.log("Ошибка получения токена из куки");
			}
			renderMessages();
			MODAL.VERIFICATION.DIALOG.close();
			VARIABLES.CHAT.classList.remove("hidden");
			scrollToEnd();
		} else {
			console.log("Ошибка верификации");
		}
		clearInput(MODAL.VERIFICATION.FORM);
	} catch (err) {
		console.log((err as Error).message);
	}
}

async function handleSettinsForm(event: Event) {
	try {
		event.preventDefault();
		if (!MODAL.SETTINGS.NAME || !MODAL.SETTINGS.DIALOG) {
			return;
		}
		const name = MODAL.SETTINGS.NAME.value;
		if (isValueEmpty(name)) {
			console.log("Введите имя");
			return;
		}
		const result = await changeUserName(name);
		if (result) {
			Cookies.set("name", name);
			closeWebSocket();
			console.log("Имя успешно сохранено");
			MODAL.SETTINGS.DIALOG.close();
		}
	} catch (err) {
		console.log((err as Error).message);
	}
}

async function handleSendMessageForm(event: Event) {
	event.preventDefault();
	if (!MESSAGE.INPUT) {
		return;
	}
	const messageText = MESSAGE.INPUT.value;
	if (!isValueEmpty(messageText)) {
		sendWebSoket(messageText);
		clearInput(VARIABLES.MESSAGE_FORM);
		scrollToEnd();
	} else {
		console.log("Введите сообщение");
	}
}

MODAL.AUTHORIZATION.FORM.addEventListener("submit", handleAuthenticationForm);
MODAL.VERIFICATION.FORM.addEventListener("submit", handleVerificationForm);
MODAL.SETTINGS.FORM.addEventListener("submit", handleSettinsForm);
VARIABLES.MESSAGE_FORM.addEventListener("submit", handleSendMessageForm);

MODAL.AUTHORIZATION.BTN_ENTER.addEventListener(
	"click",
	() => modalChange(MODAL.AUTHORIZATION.DIALOG, MODAL.VERIFICATION.DIALOG),
	MODAL.AUTHORIZATION.FORM.reset(),
);

VARIABLES.SETTINGS_BTN.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.showModal();
	MODAL.SETTINGS.NAME.value = Cookies.get("name");
});

MODAL.SETTINGS.BTN_CLOSE.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.close();
});

function authorization() {
	if (!MODAL.AUTHORIZATION.DIALOG || !MODAL.AUTHORIZATION.FORM || !MODAL.AUTHORIZATION.EMAIL) {
		return;
	}
	MODAL.AUTHORIZATION.DIALOG.showModal();
	MODAL.AUTHORIZATION.FORM.reset();
	MODAL.AUTHORIZATION.EMAIL.focus();
}

VARIABLES.EXIT_BTN.addEventListener("click", () => {
	if (!VARIABLES.CHAT) {
		return;
	}
	authorization();
	Cookies.remove("token");
	Cookies.remove("name");
	Cookies.remove("email");
	closeWebSocket();
	VARIABLES.CHAT.classList.add("hidden");
});

function initialization() {
	const token = Cookies.get("token");
	if (!VARIABLES.CHAT) {
		return;
	}
	if (!token) {
		authorization();
	} else {
		connectToWebSocket(token);
		VARIABLES.CHAT.classList.remove("hidden");
		renderMessages();
	}
}

document.addEventListener("DOMContentLoaded", initialization);
