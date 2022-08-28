import { defineStore } from "pinia";
import { ref } from "vue";
import { useGlobalStore } from "./global";

export const useSettingsStore = defineStore("settings", () => {
  const username = ref(localStorage.getItem("username") || "Someone");
  const quote = ref(
    localStorage.getItem("quote") || "Don't let yesterday take up too much of today."
  );
  const session = ref(localStorage.getItem("session") || 25 * 60);
  const shortBreak = ref(localStorage.getItem("shortBreak") || 5 * 60);
  const longBreak = ref(localStorage.getItem("longBreak") || 20 * 60);

  const globalStore = useGlobalStore();

  const validate = (username, quote, session, shortBreak, longBreak) => {
    if (!username) return { error: "Please enter a username" };
    if (!quote) return { error: "Please enter a quote" };
    if (!session) return { error: "Please enter a session length" };
    if (!shortBreak) return { error: "Please enter a short break length" };
    if (!longBreak) return { error: "Please enter a long break length" };
    if (session > 7200) return { error: "Session length must be less than 2 hours" };
    if (shortBreak > 7200) return { error: "Short break length must be less than 2 hours" };
    if (longBreak > 7200) return { error: "Long break length must be less than 2 hours" };

    if (session < 60) return { error: "Session length must be at least 1 minute" };
    if (shortBreak < 60) return { error: "Short break length must be at least 1 minute" };
    if (longBreak < 60) return { error: "Long break length must be at least 1 minute" };
    return { ok: true };
  };

  const updateSettings = (newUsername, newQuote, newSession, newShortBreak, newLongBreak) => {
    const newSessionInMinutes = newSession * 60;
    const newShortBreakInMinutes = newShortBreak * 60;
    const newLongBreakInMinutes = newLongBreak * 60;
    const validation = validate(
      newUsername,
      newQuote,
      newSessionInMinutes,
      newShortBreakInMinutes,
      newLongBreakInMinutes
    );
    if (validation.error) return { error: validation.error };

    // Send setttings to the server
    globalStore.socket.emit("settings", {
      username: newUsername.trim(),
      session: session.value === newSessionInMinutes ? null : newSessionInMinutes,
      shortBreak: shortBreak.value === newShortBreakInMinutes ? null : newShortBreakInMinutes,
      longBreak: longBreak.value === newLongBreakInMinutes ? null : newLongBreakInMinutes,
    });

    username.value = newUsername;
    quote.value = newQuote;
    session.value = newSessionInMinutes;
    shortBreak.value = newShortBreakInMinutes;
    longBreak.value = newLongBreakInMinutes;

    localStorage.setItem("username", newUsername);
    localStorage.setItem("quote", newQuote);
    localStorage.setItem("session", newSessionInMinutes);
    localStorage.setItem("shortBreak", newShortBreakInMinutes);
    localStorage.setItem("longBreak", newLongBreakInMinutes);

    return { ok: true };
  };

  return {
    username,
    quote,
    session,
    shortBreak,
    longBreak,
    updateSettings,
  };
});
