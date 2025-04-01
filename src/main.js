async function initViewport() {
    try {
        const viewport = window.TelegramApps?.viewport;
        if (!viewport) {
            console.warn('TelegramApps SDK не доступен');
            return;
        }
        
        if (viewport.mount.isAvailable()) {
            viewport.mount();
            if (viewport.bindCssVars.isAvailable()) {
                viewport.bindCssVars();
            }

            if (viewport.expand.isAvailable()) {
                viewport.expand();
            }

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

// Инициализация swipeBehavior
async function initSwipeBehavior() {
    try {
        const swipeBehavior = window.TelegramApps?.swipeBehavior;
        if (!swipeBehavior) {
            console.warn('TelegramApps SDK не доступен');
            return;
        }
        
        if (swipeBehavior.mount.isAvailable()) {
            swipeBehavior.mount();
            
            if (swipeBehavior.enableVertical.isAvailable()) {
                swipeBehavior.enableVertical();
            }
              
            if (swipeBehavior.disableVertical.isAvailable()) {
                swipeBehavior.disableVertical();
            }
        }
    } catch (error) {
        console.error('Ошибка при инициализации swipeBehavior:', error);
    }
}

// Упрощенная версия без использования SDK
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
        
        // Расширяем окно
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
    initTelegramWebApp();
});

// Также запускаем инициализацию сразу (как запасной вариант)
(async () => {
    try {
        console.log('Запуск инициализации...');
        await initTelegramWebApp();
        console.log('Инициализация завершена');
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
})();