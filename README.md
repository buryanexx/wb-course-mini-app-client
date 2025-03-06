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
- [Библиотека компонентов](#библиотека-компонентов)
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

## Библиотека компонентов

Проект включает в себя обширную библиотеку переиспользуемых компонентов React, которые можно использовать для быстрого создания пользовательского интерфейса.

### Базовые компоненты

#### Button

Компонент кнопки с различными вариантами и размерами.

```jsx
<Button 
  variant="primary" // primary, secondary, success, warning, error, info, default
  size="medium" // small, medium, large
  onClick={handleClick}
  disabled={false}
  fullWidth={false}
  icon={<Icon />}
>
  Текст кнопки
</Button>
```

#### Input

Компонент поля ввода с поддержкой различных типов и состояний.

```jsx
<Input 
  type="text" // text, password, email, number, etc.
  label="Имя пользователя"
  placeholder="Введите имя"
  value={value}
  onChange={handleChange}
  error="Ошибка ввода"
  disabled={false}
  icon={<Icon />}
/>
```

#### Checkbox

Компонент флажка (чекбокса).

```jsx
<Checkbox 
  label="Согласен с условиями"
  checked={checked}
  onChange={handleChange}
  disabled={false}
/>
```

#### Radio

Компонент радиокнопки.

```jsx
<Radio 
  label="Вариант 1"
  name="options"
  value="option1"
  checked={selected === 'option1'}
  onChange={handleChange}
  disabled={false}
/>
```

#### Toggle

Компонент переключателя.

```jsx
<Toggle 
  label="Включить уведомления"
  checked={enabled}
  onChange={handleChange}
  disabled={false}
/>
```

#### Select

Компонент выпадающего списка.

```jsx
<Select 
  label="Выберите категорию"
  options={[
    { value: 'category1', label: 'Категория 1' },
    { value: 'category2', label: 'Категория 2' }
  ]}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Выберите..."
  disabled={false}
  error="Ошибка выбора"
/>
```

### Компоненты навигации

#### Navbar

Компонент навигационной панели.

```jsx
<Navbar 
  title="Название приложения"
  onMenuClick={toggleSidebar}
  onDarkModeToggle={toggleDarkMode}
  darkMode={isDarkMode}
  actions={[
    { icon: <Icon />, onClick: handleAction }
  ]}
/>
```

#### Sidebar

Компонент боковой панели.

```jsx
<Sidebar 
  open={isOpen}
  onClose={closeSidebar}
  items={[
    { 
      label: 'Главная', 
      icon: <HomeIcon />, 
      to: '/' 
    },
    { 
      label: 'Модули', 
      icon: <ModulesIcon />, 
      to: '/modules' 
    }
  ]}
/>
```

#### Tabs

Компонент вкладок.

```jsx
<Tabs 
  tabs={[
    { id: 'tab1', label: 'Вкладка 1' },
    { id: 'tab2', label: 'Вкладка 2' }
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

### Компоненты обратной связи

#### Alert

Компонент уведомления.

```jsx
<Alert 
  variant="success" // success, warning, error, info
  title="Успешно!"
  message="Операция выполнена успешно."
  onClose={closeAlert}
/>
```

#### Toast

Компонент всплывающего сообщения.

```jsx
<Toast 
  variant="success" // success, warning, error, info
  title="Успешно!"
  message="Операция выполнена успешно."
  onClose={closeToast}
/>
```

#### Modal

Компонент модального окна.

```jsx
<Modal 
  open={isOpen}
  onClose={closeModal}
  title="Заголовок модального окна"
  footer={
    <Button onClick={closeModal}>Закрыть</Button>
  }
>
  Содержимое модального окна
</Modal>
```

### Компоненты отображения данных

#### Card

Компонент карточки.

```jsx
<Card 
  title="Заголовок карточки"
  description="Описание карточки"
  icon={<Icon />}
  footer={
    <Button>Действие</Button>
  }
  variant="default" // default, primary, secondary, etc.
/>
```

#### Badge

Компонент значка.

```jsx
<Badge 
  variant="primary" // primary, secondary, success, warning, error, info
  size="medium" // small, medium, large
>
  Новый
</Badge>
```

#### Avatar

Компонент аватара.

```jsx
<Avatar 
  src="path/to/image.jpg"
  alt="Имя пользователя"
  size="medium" // small, medium, large
  initials="ИП" // Отображается, если src не указан
/>
```

### Компоненты для работы с файлами

#### FileItem

Компонент элемента файла.

```jsx
<FileItem 
  name="document.pdf"
  type="pdf"
  size="2.5 MB"
  preview="path/to/preview.jpg"
  date="01.01.2023"
  onDownload={handleDownload}
  onDelete={handleDelete}
  onPreview={handlePreview}
/>
```

#### FileList

Компонент списка файлов.

```jsx
<FileList 
  files={[
    {
      name: "document.pdf",
      type: "pdf",
      size: "2.5 MB",
      preview: "path/to/preview.jpg",
      date: "01.01.2023"
    }
  ]}
  onDownload={handleDownload}
  onDelete={handleDelete}
  onPreview={handlePreview}
  emptyMessage="Нет файлов для отображения"
/>
```

### Компоненты для отображения статистики

#### Stat

Компонент статистики.

```jsx
<Stat 
  title="Продажи"
  value="15,000 ₽"
  icon={<Icon />}
  change="+15%"
  changeType="positive" // positive, negative, neutral
  variant="primary" // primary, secondary, success, warning, error, info
  size="medium" // small, medium, large
/>
```

#### StatGroup

Компонент группы статистики.

```jsx
<StatGroup 
  stats={[
    {
      title: "Продажи",
      value: "15,000 ₽",
      icon: <Icon />,
      change: "+15%",
      changeType: "positive"
    },
    {
      title: "Клиенты",
      value: "120",
      icon: <Icon />,
      change: "+5%",
      changeType: "positive"
    }
  ]}
  columns={2} // 1, 2, 3, 4
  variant="default"
  size="medium"
  gap="medium" // small, medium, large
/>
```

### Компоненты для отображения прогресса

#### ProgressBar

Компонент индикатора прогресса.

```jsx
<ProgressBar 
  value={75}
  max={100}
  height={8}
  variant="primary" // primary, secondary, success, warning, error, info
  showValue={true}
  valuePosition="right" // top, right, bottom
  label="Загрузка"
  animated={true}
  striped={true}
/>
```

### Компоненты для пустых состояний

#### EmptyState

Компонент пустого состояния.

```jsx
<EmptyState 
  title="Нет данных"
  description="Данные отсутствуют или не найдены."
  icon={<Icon />}
  action={handleAction}
  actionText="Создать"
  variant="default" // default, primary, secondary, success, warning, error, info
  size="medium" // small, medium, large
/>
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