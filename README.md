# .gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/client/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# README.md
# WB-курс Telegram Mini App

Telegram Mini App для обучающего курса по выходу на Wildberries от нуля до прибыли в 300.000 рублей.

## Содержание
- [Описание проекта](#описание-проекта)
- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Установка и запуск](#установка-и-запуск)
- [Интеграция с Telegram](#интеграция-с-telegram)
- [API документация](#api-документация)

## Описание проекта

Приложение представляет визуальную структуру обучающего курса по выходу на маркетплейс Wildberries. Оно включает в себя 8 модулей, каждый из которых охватывает определенный аспект бизнеса на Wildberries - от анализа рынка до масштабирования.

Пользователи могут:
- Просматривать общую информацию о курсе
- Изучать модули и их содержание
- Отправлять обратную связь

## Технологии

### Фронтенд:
- React.js
- React Router
- Axios
- React Feather (иконки)
- CSS (адаптивный дизайн)
- Telegram Mini App SDK

### Бэкенд:
- Node.js
- Express.js
- REST API

## Структура проекта

Проект разделен на две основные части:
- `client/` - фронтенд на React
- `server/` - бэкенд на Node.js + Express

## Установка и запуск

### Предварительные требования:
- Node.js (версия 14.x или выше)
- npm (версия 6.x или выше)

### Шаги по установке:

1. Клонировать репозиторий:
```
git clone <url-репозитория>
cd wb-course-mini-app
```

2. Установить зависимости:
```
npm run install-all
```

3. Запустить приложение в режиме разработки:
```
npm start
```

Это запустит:
- Клиентскую часть на http://localhost:3000
- Серверную часть API на http://localhost:5000

### Сборка для продакшн:
```
npm run build
```

## Интеграция с Telegram

Для интеграции приложения с Telegram Bot API и создания Mini App:

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Разместите приложение на хостинге (например, Vercel, Netlify)
4. Настройте веб-приложение через BotFather:
   - `/mybots` → Выберите вашего бота → Edit Menu → Web App Info
   - Добавьте URL вашего развернутого приложения

## API документация

### Эндпоинты:

#### GET `/api/modules`
Получение списка всех модулей курса.

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Введение в работу с Wildberries",
    "shortDescription": "Базовые принципы работы маркетплейса и ключевые моменты для успешного старта.",
    "icon": "rocket"
  },
  ...
]
```

#### GET `/api/modules/:id`
Получение подробной информации о конкретном модуле.

**Ответ:**
```json
{
  "id": 1,
  "title": "Введение в работу с Wildberries",
  "shortDescription": "Базовые принципы работы маркетплейса и ключевые моменты для успешного старта.",
  "icon": "rocket",
  "sections": [
    {
      "title": "Цели модуля",
      "content": "..."
    },
    ...
  ],
  "duration": "4 часа",
  "difficulty": "Начальный"
}
```

#### POST `/api/feedback`
Отправка обратной связи.

**Запрос:**
```json
{
  "name": "Имя пользователя",
  "email": "user@example.com",
  "message": "Текст сообщения",
  "moduleId": 1 // Опционально
}
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "name": "Имя пользователя",
    "email": "user@example.com",
    "message": "Текст сообщения",
    "moduleId": 1,
    "date": "2023-05-20T12:00:00.000Z"
  }
}
```