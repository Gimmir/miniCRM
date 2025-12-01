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

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    enableClosingConfirmation: () => void;
    colorScheme: "light" | "dark";
    themeParams: Record<string, string>;
    initDataUnsafe: {
        user?: TelegramUser;
    };
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
}

const mockWebApp: TelegramWebApp = {
    ready: () => console.info("[MiniCRM] WebApp ready (mock)"),
    expand: () => console.info("[MiniCRM] WebApp expand (mock)"),
    enableClosingConfirmation: () =>
        console.info("[MiniCRM] Closing confirmation enabled (mock)"),
    colorScheme: "light",
    themeParams: {
        bg_color: "#ffffff",
        secondary_bg_color: "#f3f4f6",
        text_color: "#000000",
        hint_color: "#9ca3af",
        button_color: "#3b82f6",
        button_text_color: "#ffffff",
    },
    initDataUnsafe: {
        user: {
            id: 1,
            first_name: "Олексій",
            last_name: "Dev",
            username: "alex_dev",
        },
    },
    onEvent: () => {},
    offEvent: () => {},
};

export interface UseTelegramReturn {
    webApp: TelegramWebApp | null;
    user: TelegramUser | null;
    isReady: boolean;
    colorScheme: "light" | "dark";
    themeParams: Record<string, string>;
}

export function useTelegram(): UseTelegramReturn {
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
    const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
    const [themeParams, setThemeParams] = useState<Record<string, string>>(
        mockWebApp.themeParams
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const WebApp: TelegramWebApp =
            ((window as any)?.Telegram?.WebApp as TelegramWebApp) ?? mockWebApp;

        WebApp.ready?.();
        WebApp.expand?.();
        WebApp.enableClosingConfirmation?.();

        if (WebApp.initDataUnsafe?.user) {
            setUser(WebApp.initDataUnsafe.user);
        }

        setColorScheme(WebApp.colorScheme || "light");
        setThemeParams(WebApp.themeParams || {});
        setWebApp(WebApp);

        const handleThemeChange = () => {
            setColorScheme(WebApp.colorScheme || "light");
            setThemeParams(WebApp.themeParams || {});
        };

        WebApp.onEvent?.("themeChanged", handleThemeChange);
        setIsReady(true);

        return () => {
            WebApp.offEvent?.("themeChanged", handleThemeChange);
        };
    }, []);

    return {
        webApp,
        user,
        isReady,
        colorScheme,
        themeParams,
    };
}
