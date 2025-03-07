/**
 * Утилиты для работы с Telegram Mini App
 */

/**
 * Инициализация Telegram Mini App
 */
export const initTelegramApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Сообщаем Telegram, что приложение готово
    tg.ready();
    
    // Расширяем приложение на весь экран
    tg.expand();
    
    // Устанавливаем тему
    const isDarkMode = tg.colorScheme === 'dark';
    document.body.classList.toggle('dark-theme', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    
    // Добавляем обработчик изменения темы
    tg.onEvent('themeChanged', () => {
      const newDarkMode = tg.colorScheme === 'dark';
      document.body.classList.toggle('dark-theme', newDarkMode);
      localStorage.setItem('darkMode', newDarkMode);
    });
    
    return tg;
  }
  
  return null;
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
 * Получение данных пользователя из Telegram
 * @returns {Object|null} Данные пользователя или null, если не доступны
 */
export const getTelegramUser = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      return tg.initDataUnsafe.user;
    }
  }
  
  return null;
};

/**
 * Показать всплывающее уведомление в Telegram
 * @param {string} message Текст уведомления
 */
export const showTelegramAlert = (message) => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    tg.showPopup({
      title: 'Уведомление',
      message,
      buttons: [{ type: 'ok' }]
    });
  }
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
  showTelegramAlert,
  closeTelegramApp
}; 