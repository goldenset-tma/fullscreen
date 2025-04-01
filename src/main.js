import "./index.css";
import "@mdi/font/css/materialdesignicons.min.css";
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
