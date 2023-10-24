# Chat

Проект чата представляет собой веб-приложение, разработанное для отправки и получения сообщений в режиме реального времени с использованием технологии WebSocket.
Посмотреть работу (Демо) - [chat](https://sivchenko-anna.github.io/chat/chat/)

## Технологии и инструменты
- TypeScript
- Parcel
- WebSocket
- ESLint
- HTML, CSS

## Функциональность приложения

- **Авторизация по email** - Пользователь должен пройти авторизацию, введя свою почту, после чего отправить запрос на получение кода. После получения кода на почту, пользователь должен ввести его в модальном окне для подтверждения.
- **Отправка сообщений** - Пользователь имеет возможность отправлять сообщения через форму ввода.
- **Просмотр истории сообщений** - Была реализована функциональность подгрузки истории сообщений при прокрутке вверх. Это позволяет имитировать виртуализацию и обеспечивает удобный просмотр сообщений в чате.
- **Возможность изменения имени пользователя** - В составе проекта реализована функция "Настройки", которая позволяет пользователю изменить свое имя в чате. При нажатии на кнопку "Настройки" открывается модальное окно с возможностью редактирования имени.
- **WebSockets** - Приложение использует WebSockets для обмена сообщениями между клиентом и сервером. Таким образом, пользователи могут отправлять и получать новые сообщения без необходимости перезагрузки страницы.

## Примеры использования 
![1](https://github.com/Sivchenko-Anna/chat/assets/103916590/959c765f-802a-4a8a-8085-94a7ea4d8942)
![2](https://github.com/Sivchenko-Anna/chat/assets/103916590/a9146bbc-18a4-4cce-8513-ab1c418f004b)
![3](https://github.com/Sivchenko-Anna/chat/assets/103916590/3713a14c-eb85-47eb-b2b3-c8617622e4d1)
![4](https://github.com/Sivchenko-Anna/chat/assets/103916590/7543bb36-00f7-4ef0-9429-71900a55ed0d)

## Запуск проекта
1. Убедитесь, что у вас установлен Node.js
2. Склонируйте репозиторий на свой локальный компьютер
```sh
git clone https://github.com/Sivchenko-Anna/chat.git
```
3. Перейдите в директорию проекта 
```sh
cd chat
```
4. Установите зависимости 
```sh
npm install
```
5. Запустите проект
```sh
npm run start
```
