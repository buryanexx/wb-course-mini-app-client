/**
 * Утилиты для работы с Telegram Mini App
 */

/**
 * Инициализация Telegram Mini App
 */
export const initTelegramApp = () => {
  try {
    // Проверяем, доступен ли объект Telegram
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      
      // Сообщаем Telegram, что приложение готово
      webApp.ready();
      
      // Устанавливаем основной цвет темы
      if (webApp.themeParams && webApp.themeParams.button_color) {
        document.documentElement.style.setProperty(
          '--primary-color', 
          webApp.themeParams.button_color
        );
      }
      
      // Устанавливаем цвета из темы Telegram
      if (webApp.themeParams) {
        document.documentElement.style.setProperty(
          '--tg-theme-bg-color', 
          webApp.themeParams.bg_color || '#ffffff'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-text-color', 
          webApp.themeParams.text_color || '#000000'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-hint-color', 
          webApp.themeParams.hint_color || '#999999'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-link-color', 
          webApp.themeParams.link_color || '#0088cc'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-button-color', 
          webApp.themeParams.button_color || '#0088cc'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-button-text-color', 
          webApp.themeParams.button_text_color || '#ffffff'
        );
      }
      
      console.log('Telegram WebApp initialized successfully');
    } else {
      console.log('Telegram WebApp is not available, running in standalone mode');
    }
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
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
 * Получение данных пользователя из Telegram
 * @returns {Object|null} Данные пользователя или null, если не доступны
 */
export const getTelegramUser = () => {
  try {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      return window.Telegram.WebApp.initDataUnsafe.user || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

/**
 * Показать всплывающее сообщение в Telegram
 * @param {string} message Текст сообщения
 */
export const showTelegramAlert = (message) => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error('Error showing Telegram alert:', error);
    alert(message);
  }
};

export default {
  initTelegramApp,
  openTelegramLink,
  getTelegramUser,
  showTelegramAlert
}; 