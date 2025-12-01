import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

// --- MOCK TELEGRAM WEB APP ---
const mockTelegramWebApp = {
  initDataUnsafe: {
    user: {
      first_name: "Олексій",
      last_name: "Dev",
      username: "alex_dev",
    }
  },
  themeParams: {
    bg_color: "#ffffff",
    secondary_bg_color: "#f3f4f6",
    text_color: "#000000",
    hint_color: "#9ca3af",
    button_color: "#3b82f6",
    button_text_color: "#ffffff",
    header_bg_color: "#ffffff"
  },
  expand: () => console.log("Expanded"),
  ready: () => console.log("Ready"),
  HapticFeedback: {
    impactOccurred: (style: string) => console.log(`Haptic ${style}`),
    notificationOccurred: (type: string) => console.log(`Haptic notification ${type}`)
  },
  BackButton: { isVisible: false, show: () => {}, hide: () => {}, onClick: () => {}, offClick: () => {} },
  MainButton: { isVisible: false, show: () => {}, hide: () => {}, onClick: () => {}, offClick: () => {} },
  onEvent: () => {},
  offEvent: () => {}
};

export type TelegramUser = {
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramSnapshot = {
  theme: typeof mockTelegramWebApp.themeParams | null;
  backButton: typeof mockTelegramWebApp.BackButton | null;
  mainButton: typeof mockTelegramWebApp.MainButton | null;
};

const isBrowser = typeof window !== "undefined";
const emptySnapshot: TelegramSnapshot = {
  theme: null,
  backButton: null,
  mainButton: null
};

// Singleton cache to ensure referential equality
let cachedSnapshot: TelegramSnapshot | null = null;

const getWebApp = () => {
  if (!isBrowser) return mockTelegramWebApp;
  return (window as any).Telegram?.WebApp || mockTelegramWebApp;
};

// Helper to create snapshot
const createSnapshot = (app: any): TelegramSnapshot => ({
  theme: app.themeParams ?? null,
  backButton: app.BackButton ?? null,
  mainButton: app.MainButton ?? null
});

const getSnapshot = (): TelegramSnapshot => {
  if (!isBrowser) {
    return emptySnapshot;
  }
  
  // Initialize lazily once
  if (!cachedSnapshot) {
    cachedSnapshot = createSnapshot(getWebApp());
  }
  
  return cachedSnapshot;
};

const subscribe = (callback: () => void) => {
  if (!isBrowser) {
    return () => undefined;
  }

  const app = getWebApp();
  
  const handleChange = () => {
    const newSnapshot = createSnapshot(app);
    // Simple shallow comparison or JSON comparison to avoid unnecessary updates
    if (JSON.stringify(newSnapshot) !== JSON.stringify(cachedSnapshot)) {
      cachedSnapshot = newSnapshot;
      callback();
    }
  };
  
  app.onEvent?.("themeChanged", handleChange);
  app.onEvent?.("mainButtonClicked", handleChange);
  app.onEvent?.("backButtonClicked", handleChange);

  return () => {
    app.offEvent?.("themeChanged", handleChange);
    app.offEvent?.("mainButtonClicked", handleChange);
    app.offEvent?.("backButtonClicked", handleChange);
  };
};

const getServerSnapshot = (): TelegramSnapshot => emptySnapshot;

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const app = getWebApp();
    app.ready?.();
    app.expand?.();
    setUser(app.initDataUnsafe?.user ?? null);

    // Apply theme CSS variables
    const root = document.documentElement;
    const params = app.themeParams;
    if (params) {
      root.style.setProperty('--tg-bg', params.bg_color || '#ffffff');
      root.style.setProperty('--tg-secondary-bg', params.secondary_bg_color || '#f3f4f6');
      root.style.setProperty('--tg-text', params.text_color || '#000000');
      root.style.setProperty('--tg-hint', params.hint_color || '#9ca3af');
      root.style.setProperty('--tg-button', params.button_color || '#3b82f6');
      root.style.setProperty('--tg-button-text', params.button_text_color || '#ffffff');
    }
  }, []);

  const webApp = getWebApp();
  const ready = isBrowser && typeof webApp.initDataUnsafe !== "undefined";

  return useMemo(
    () => ({
      webApp,
      user,
      ready,
      state
    }),
    [webApp, user, ready, state]
  );
}