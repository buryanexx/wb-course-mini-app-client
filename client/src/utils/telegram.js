/**
 * Утилиты для работы с Telegram Mini App
 */

/**
 * Инициализация Telegram Mini App
 */
export const initTelegramApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    // Расширяем на весь экран
    window.Telegram.WebApp.expand();
    
    // Устанавливаем цвет основной кнопки
    window.Telegram.WebApp.MainButton.setParams({
      text: 'Открыть',
      color: '#7B68EE',
      text_color: '#ffffff',
      is_active: true,
      is_visible: false
    });
    
    // Устанавливаем цвет темы
    const colorScheme = window.Telegram.WebApp.colorScheme;
    if (colorScheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
    
    // Сохраняем данные пользователя
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
      localStorage.setItem('telegramUser', JSON.stringify(user));
    }
    
    console.log('Telegram WebApp initialized successfully');
  } else {
    console.log('Telegram WebApp is not available');
  }
};

/**
 * Открытие внешней ссылки в Telegram
 * @param {string} url URL для открытия
 */
export const openTelegramLink = (url) => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  } catch (error) {
    console.error('Error opening Telegram link:', error);
    window.open(url, '_blank');
  }
};

/**
 * Получение данных пользователя Telegram
 * @returns {Object|null} Данные пользователя или null
 */
export const getTelegramUser = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe?.user || null;
  }
  
  const savedUser = localStorage.getItem('telegramUser');
  return savedUser ? JSON.parse(savedUser) : null;
};

/**
 * Показать основную кнопку Telegram
 * @param {string} text Текст кнопки
 * @param {Function} onClick Функция, вызываемая при нажатии
 */
export const showMainButton = (text, onClick) => {
  if (window.Telegram && window.Telegram.WebApp) {
    const mainButton = window.Telegram.WebApp.MainButton;
    
    mainButton.setText(text);
    mainButton.show();
    mainButton.onClick(onClick);
  }
};

/**
 * Скрыть основную кнопку Telegram
 */
export const hideMainButton = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.MainButton.offClick();
  }
};

/**
 * Поделиться контентом через Telegram
 * @param {string} text Текст для шаринга
 */
export const shareViaTelegram = (text) => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(text)}`);
  }
};

/**
 * Показать всплывающее уведомление в Telegram
 * @param {string} message Текст уведомления
 */
export const showTelegramPopup = (message) => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.showPopup({
      title: 'WB Решение',
      message,
      buttons: [{ type: 'close' }]
    });
  }
};

/**
 * Проверка, запущено ли приложение в Telegram
 * @returns {boolean} true, если приложение запущено в Telegram
 */
export const isRunningInTelegram = () => {
  return Boolean(window.Telegram && window.Telegram.WebApp);
};

/**
 * Закрытие Telegram Mini App
 */
export const closeTelegramApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.close();
  }
};

export default {
  initTelegramApp,
  openTelegramLink,
  getTelegramUser,
  showMainButton,
  hideMainButton,
  shareViaTelegram,
  showTelegramPopup,
  isRunningInTelegram,
  closeTelegramApp
}; 