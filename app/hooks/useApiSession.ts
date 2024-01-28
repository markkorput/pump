import { ApiSession, MemoryApiSession } from "@lib/api";
import { createLogger } from "@/lib/logging";

const localStorageKey = "pump-data";
const cache: { session?: ApiSession } = {};

const log = createLogger("api-session");

function createSession() {
  // in-memory session that loads from/save to local storage
  const session = new MemoryApiSession({
    save: async (data) => {
      log.debug("save");
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    load: async () => {
      log.debug("load");
      return JSON.parse(localStorage.getItem(localStorageKey) || "{}");
    },
  });

  session.load();
  return session;
}

export function useApiSession(): ApiSession {
  if (!cache.session) {
    cache.session = createSession();
  }

  return cache.session;
}
