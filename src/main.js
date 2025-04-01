/**
 * Инициализирует viewport для Telegram Mini Apps
 * Настраивает отображение приложения в Telegram
 */
async function initViewport() {
    try {
        const viewport = window.TelegramApps?.viewport;
        if (!viewport) {
            console.warn('TelegramApps SDK не доступен');
            return;
        }
        
        // Монтирование viewport если доступно
        if (viewport.mount.isAvailable()) {
            viewport.mount();
            // Привязка CSS-переменных для адаптивного дизайна
            if (viewport.bindCssVars.isAvailable()) {
                viewport.bindCssVars();
            }

            // Расширение viewport до максимального размера
            if (viewport.expand.isAvailable()) {
                viewport.expand();
            }

            // Запрос полноэкранного режима для мобильных устройств
            if (viewport.requestFullscreen.isAvailable()) {
                const tg = window.Telegram;
                if (tg && tg.isAvailable && tg.isAvailable()) {
                    const platform = await tg.WebApp.platform;
                    if (platform == "android" || platform == "ios") {
                        await viewport.requestFullscreen();
                    }
                }
            }
        }
    } catch (error) {
        console.error('Ошибка при инициализации viewport:', error);
    }
}

/**
 * Инициализирует поведение свайпов в приложении
 * Управляет вертикальными свайпами для навигации
 */
async function initSwipeBehavior() {
    try {
        const swipeBehavior = window.TelegramApps?.swipeBehavior;
        if (!swipeBehavior) {
            console.warn('TelegramApps SDK не доступен');
            return;
        }
        
        // Монтирование обработчика свайпов
        if (swipeBehavior.mount.isAvailable()) {
            swipeBehavior.mount();
            
            // Включение вертикальных свайпов
            if (swipeBehavior.enableVertical.isAvailable()) {
                swipeBehavior.enableVertical();
            }
              
            // Отключение вертикальных свайпов
            // Примечание: обычно используется только одно из действий - enable или disable
            if (swipeBehavior.disableVertical.isAvailable()) {
                swipeBehavior.disableVertical();
            }
        }
    } catch (error) {
        console.error('Ошибка при инициализации swipeBehavior:', error);
    }
}

/**
 * Альтернативная инициализация через стандартное Telegram WebApp API
 * Используется, когда TelegramApps SDK недоступен
 */
async function initTelegramWebApp() {
    try {
        const tg = window.Telegram?.WebApp;
        
        if (!tg) {
            console.warn('Telegram WebApp не доступен');
            return;
        }
        
        console.log('Инициализация Telegram WebApp...');
        
        // Дожидаемся готовности WebApp
        await tg.ready();
        console.log('WebApp готов');
        
        // Расширяем окно до максимального размера
        tg.expand();
        console.log('Окно расширено');
        
        // Запрашиваем полноэкранный режим на мобильных устройствах
        try {
            const platform = await tg.platform;
            console.log('Платформа:', platform);
            
            if (platform === "android" || platform === "ios") {
                tg.requestFullscreen();
                console.log('Запрошен полноэкранный режим');
            }
        } catch (error) {
            console.error('Ошибка при запросе полноэкранного режима:', error);
        }
    } catch (error) {
        console.error('Ошибка при инициализации Telegram WebApp:', error);
    }
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена, начинаем инициализацию...');
    initViewport();
    initSwipeBehavior();
});