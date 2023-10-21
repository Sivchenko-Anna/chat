export const VARIABLES = {
	CHAT: document.querySelector(".chat") as HTMLDivElement,
	SETTINGS_BTN: document.querySelector(".chat-btn_settings") as HTMLButtonElement,
	EXIT_BTN: document.querySelector(".chat-btn_exit") as HTMLButtonElement,
	MESSAGE_FORM: document.querySelector(".chat-send_form") as HTMLFormElement,
	CHAT_SCREEN: document.querySelector(".chat-screen") as HTMLDivElement,
	CHAT_WINDOW: document.querySelector(".chat__screen-wrapper") as HTMLDivElement,
	MESSAGE_TEMPLATE: document.querySelector("#message-template") as HTMLTemplateElement,
	API: {
		SERVER_URL: "https://edu.strada.one/api/user",
		USER_URL: "https://edu.strada.one/api/user/me",
		MESSAGE_URL: "https://edu.strada.one/api/messages/",
	},
};

export const MESSAGE = {
	CONTAINER: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".chat-message") as HTMLDivElement,
	SENDER: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-sender") as HTMLDivElement,
	TEXT: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-text") as HTMLDivElement,
	TIME: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-time") as HTMLDivElement,
	INPUT: document.querySelector(".chat-send_input") as HTMLInputElement,
};

export const MODAL = {
	AUTHORIZATION: {
		DIALOG: document.querySelector(".authorization") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_authorization") as HTMLFormElement,
		EMAIL: document.querySelector(".input-authorization") as HTMLInputElement,
		BTN_GET: document.querySelector(".authorization-btn_get") as HTMLButtonElement,
		BTN_ENTER: document.querySelector(".authorization-btn_enter") as HTMLButtonElement,
	},
	VERIFICATION: {
		DIALOG: document.querySelector(".verification") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_verification") as HTMLFormElement,
		CODE: document.querySelector(".input-verification") as HTMLInputElement,
		BTN_ENTER: document.querySelector(".verification-btn") as HTMLButtonElement,
	},
	SETTINGS: {
		DIALOG: document.querySelector(".settings") as HTMLDialogElement,
		FORM: document.querySelector(".modal-form_settings") as HTMLFormElement,
		NAME: document.querySelector(".input-settings") as HTMLInputElement,
		BTN_ENTER: document.querySelector(".settings-btn") as HTMLButtonElement,
		BTN_CLOSE: document.querySelector(".close-settings") as HTMLButtonElement,
	},
};
