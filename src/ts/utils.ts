import { format } from "date-fns";
import { VARIABLES } from "./variables";

// * функция получения актуального времени

export function getCurrentTime(time: string): string {
	const newDate = new Date(time);
	const date = format(newDate, "HH:mm");
	return date;
}

// * функция очистки поля ввода сообщения

export function clearInput(value: HTMLFormElement): void {
	value.reset();
}

// * функция проверки пустой строки

export function isValueEmpty(value: string): boolean {
	return !value.trim();
}

// * функция смены модального окна

export function modalChange(actualModal: HTMLDialogElement, nextModal: HTMLDialogElement): void {
	actualModal.close();
	nextModal.showModal();
}

// * функция проверки валидности email

export function isEmailValid(value: string): boolean {
	const EMAIL_REGEXP =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	return EMAIL_REGEXP.test(value);
}

// * функция прокрутки скролла вниз

export function scrollToEnd(): void {
	if (!VARIABLES.CHAT_SCREEN) {
		return;
	}
	VARIABLES.CHAT_SCREEN.scrollIntoView({ behavior: "smooth", block: "end" });
}
