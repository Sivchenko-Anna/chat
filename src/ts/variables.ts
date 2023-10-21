export const VARIABLES = {
	CHAT: document.querySelector(".chat"),
	SETTINGS_BTN: document.querySelector(".chat-btn_settings"),
	EXIT_BTN: document.querySelector(".chat-btn_exit"),
	MESSAGE_FORM: document.querySelector(".chat-send_form") as HTMLFormElement,
	CHAT_SCREEN: document.querySelector(".chat-screen"),
	CHAT_WINDOW: document.querySelector(".chat__screen-wrapper"),
	MESSAGE_TEMPLATE: document.querySelector("#message-template"),
	API: {
		SERVER_URL: "https://edu.strada.one/api/user",
		USER_URL: "https://edu.strada.one/api/user/me",
		MESSAGE_URL: "https://edu.strada.one/api/messages/",
	},
};

export const MESSAGE = {
	CONTAINER: (VARIABLES.MESSAGE_TEMPLATE as HTMLTemplateElement).content.querySelector(
		".chat-message",
	),
	SENDER: (VARIABLES.MESSAGE_TEMPLATE as HTMLTemplateElement).content.querySelector(
		".message-sender",
	),
	TEXT: (VARIABLES.MESSAGE_TEMPLATE as HTMLTemplateElement).content.querySelector(".message-text"),
	TIME: (VARIABLES.MESSAGE_TEMPLATE as HTMLTemplateElement).content.querySelector(".message-time"),
	INPUT: document.querySelector(".chat-send_input") as HTMLInputElement,
};

export const MODAL = {
	AUTHORIZATION: {
		SING_IN: document.querySelector(".chat-btn_sign-in"),
		DIALOG: document.querySelector(".authorization") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_authorization") as HTMLFormElement,
		EMAIL: document.querySelector(".input-authorization") as HTMLInputElement,
		BTN_GET: document.querySelector(".authorization-btn_get"),
		BTN_ENTER: document.querySelector(".authorization-btn_enter"),
	},
	VERIFICATION: {
		DIALOG: document.querySelector(".verification") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_verification") as HTMLFormElement,
		CODE: document.querySelector(".input-verification") as HTMLInputElement,
		BTN_ENTER: document.querySelector(".verification-btn"),
	},
	SETTINGS: {
		DIALOG: document.querySelector(".settings") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_settings") as HTMLFormElement,
		NAME: document.querySelector(".input-settings") as HTMLInputElement,
		BTN_ENTER: document.querySelector(".settings-btn"),
		BTN_CLOSE: document.querySelector(".close-settings"),
	},
};
