import { STORAGE_KEY_NAME } from "@/constants/app.constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
const { localStorage } = window;

const prefix = `${STORAGE_KEY_NAME}-`;

const exist = (key: string) => {
  const item = localStorage.getItem(prefix + key);
  return item !== null && item !== undefined && item !== "undefined" && item !== "";
};

const getJson = <T = object>(key: string): T | null => {
  if (exist(key)) {
    return JSON.parse(localStorage.getItem(prefix + key) || "{}");
  }
  return null;
};

const setJson = (key: string, data: any) => {
  localStorage.setItem(prefix + key, JSON.stringify(data));
};

const get = <T = string>(key: string): T | null => {
  if (exist(key)) {
    return localStorage.getItem(prefix + key) as T;
  }
  return null;
};

const set = (key: string, data: any) => {
  localStorage.setItem(prefix + key, data);
  // Déclencher un événement personnalisé pour notifier les changements
  window.dispatchEvent(new CustomEvent('localStorageChange', {
    detail: { key: prefix + key, value: data }
  }));
};

const remove = (key: string) => {
  localStorage.removeItem(prefix + key);
  // Déclencher un événement personnalisé pour notifier les changements
  window.dispatchEvent(new CustomEvent('localStorageChange', {
    detail: { key: prefix + key, value: null }
  }));
};

const clear = () => {
  localStorage.clear();
};

export default {
  exist,
  setJson,
  getJson,
  set,
  get,
  remove,
  clear,
  // Méthode de débogage pour vérifier l'état du storage
  debug: () => {
    console.log("LocalStorage debug:");
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        console.log(`${key}:`, localStorage.getItem(key));
      }
    });
  }
};
