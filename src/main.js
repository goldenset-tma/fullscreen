import "./index.css";
import { viewport } from '@telegram-apps/sdk';
import { swipeBehavior } from '@telegram-apps/sdk';

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
        if (tg.isAvailable()) {
            const platform = await tg.WebApp.platform;
            if (platform == "android" || platform == "ios") {
                await viewport.requestFullscreen();
            }
        }
    }
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