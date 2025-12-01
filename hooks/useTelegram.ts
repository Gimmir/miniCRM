import { useEffect, useMemo, useSyncExternalStore } from "react";
import WebApp from "@twa-dev/sdk";
import type { BackButton, MainButton, ThemeParams } from "@twa-dev/types";

type TelegramSnapshot = {
  theme: ThemeParams | null;
  backButton: BackButton | null;
  mainButton: MainButton | null;
};

const isBrowser = typeof window !== "undefined";
const emptySnapshot: TelegramSnapshot = {
  theme: null,
  backButton: null,
  mainButton: null
};

const subscribe = (callback: () => void) => {
  if (!isBrowser) {
    return () => undefined;
  }

  WebApp.onEvent("themeChanged", callback);
  WebApp.onEvent("mainButtonClicked", callback);
  WebApp.onEvent("backButtonClicked", callback);

  return () => {
    WebApp.offEvent("themeChanged", callback);
    WebApp.offEvent("mainButtonClicked", callback);
    WebApp.offEvent("backButtonClicked", callback);
  };
};

const getSnapshot = (): TelegramSnapshot => {
  if (!isBrowser) {
    return emptySnapshot;
  }

  return {
    theme: WebApp.themeParams ?? null,
    backButton: WebApp.BackButton ?? null,
    mainButton: WebApp.MainButton ?? null
  };
};

export function useTelegram() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    WebApp.ready();
    WebApp.expand();
  }, []);

  const ready = isBrowser && typeof WebApp.initDataUnsafe !== "undefined";

  return useMemo(
    () => ({
      webApp: WebApp,
      ready,
      state
    }),
    [ready, state]
  );
}
