"use client";

import { useEffect, useState } from "react";

export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

export interface UseTelegramReturn {
    webApp: any | null;
    user: TelegramUser | null;
    isReady: boolean;
    colorScheme: "light" | "dark";
    themeParams: any;
}

export function useTelegram(): UseTelegramReturn {
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
    const [webApp, setWebApp] = useState<any>(null);
    const [themeParams, setThemeParams] = useState<any>({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Dynamically import Telegram WebApp SDK
            import("@twa-dev/sdk").then((WebAppModule) => {
                const WebApp = WebAppModule.default;

                // Initialize Telegram WebApp
                WebApp.ready();
                WebApp.expand();

                // Enable closing confirmation
                WebApp.enableClosingConfirmation();

                // Set user data
                if (WebApp.initDataUnsafe.user) {
                    setUser(WebApp.initDataUnsafe.user as TelegramUser);
                }

                // Set color scheme
                setColorScheme(WebApp.colorScheme);
                setThemeParams(WebApp.themeParams);
                setWebApp(WebApp);

                // Listen for theme changes
                const handleThemeChange = () => {
                    setColorScheme(WebApp.colorScheme);
                    setThemeParams(WebApp.themeParams);
                };

                WebApp.onEvent("themeChanged", handleThemeChange);

                setIsReady(true);

                return () => {
                    WebApp.offEvent("themeChanged", handleThemeChange);
                };
            });
        }
    }, []);

    return {
        webApp,
        user,
        isReady,
        colorScheme,
        themeParams,
    };
}
