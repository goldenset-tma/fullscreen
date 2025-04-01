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

async function initTelegramWebApp() {
    const tg = window.Telegram?.WebApp;
    
    if (!tg) {
        console.warn('Telegram WebApp не доступен');
        return;
    }
    
    try {
        await tg.ready();
        
        tg.expand();
        
        const platform = await window.Telegram.WebApp.platform;
        if (platform === "android" || platform === "ios") {
            if (viewport.requestFullscreen.isAvailable()) {
                await viewport.requestFullscreen();
            } else {
                tg.requestFullscreen();
            }
        }
    } catch (error) {
        console.error('Ошибка при инициализации Telegram WebApp:', error);
    }
}

initTelegramWebApp();