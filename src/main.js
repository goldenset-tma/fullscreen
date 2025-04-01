async function initTelegramWebApp() {
    try {
        // Проверяем доступность WebApp
        if (!window.Telegram?.WebApp) {
            throw new Error('Telegram WebApp не доступен');
        }

        const webapp = window.Telegram.WebApp;
        
        // Дожидаемся готовности WebApp
        await webapp.ready();
        console.log('WebApp готов');
        
        // Расширяем окно до максимального размера
        webapp.expand();
        console.log('Окно расширено');
        
        // Отключаем вертикальные свайпы
        webapp.disableVerticalSwipes();
        console.log('Вертикальные свайпы отключены');

        // Логируем начальные значения безопасных зон
        console.log('Safe Area Insets:', {
            top: webapp.safeAreaInset.top,
            right: webapp.safeAreaInset.right,
            bottom: webapp.safeAreaInset.bottom,
            left: webapp.safeAreaInset.left
        });
        
        console.log('Content Safe Area Insets:', {
            top: webapp.contentSafeAreaInset.top,
            right: webapp.contentSafeAreaInset.right,
            bottom: webapp.contentSafeAreaInset.bottom,
            left: webapp.contentSafeAreaInset.left
        });

        // Подписываемся на изменения безопасных зон
        webapp.onEvent('safeAreaChanged', () => {
            console.log('Safe Area изменена:', webapp.safeAreaInset);
        });

        webapp.onEvent('contentSafeAreaChanged', () => {
            console.log('Content Safe Area изменена:', webapp.contentSafeAreaInset);
        });
        
        // Запрашиваем полноэкранный режим на мобильных устройствах
        const platform = await webapp.platform;
        console.log('Платформа:', platform);
        
        if (platform === "android" || platform === "ios") {
            webapp.requestFullscreen();
            console.log('Запрошен полноэкранный режим для', platform);
        }
        
        
    } catch (error) {
        console.error('Ошибка при инициализации:', error?.message || error);
    }
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена, начинаем инициализацию...');
    initTelegramWebApp();
});