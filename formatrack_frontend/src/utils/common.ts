import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAbbreviation(
  name: string | undefined,
  length = 2
): string {
  if (!name) return "UN";
  const words = name.trim().split(/\s+/);

  if (words.length === 1) return words[0][0].toUpperCase();

  const limit = words.length >= length ? length : words.length;

  let abbreviation = "";
  for (let index = 0; index < limit; index++) {
    abbreviation += words[index][0].toUpperCase();
  }

  return abbreviation;
}

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getFileExtension = (filename: string): string | null => {
  const parts = (filename || "").split(".");
  return parts.length > 1 ? parts.pop() || null : null;
};

export const isTimeExpired = (expTimestamp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > expTimestamp;
};

export const formatTimeSpan = (
  seconds: number,
  shortFormat = false
): string => {
  if (seconds < 0) {
    return "";
  }

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const year = day * 365.25;

  let value: number;
  let unit: string;

  if (seconds < minute) {
    value = seconds;
    unit =
      seconds === 1
        ? shortFormat
          ? "s"
          : "second"
        : shortFormat
        ? "s"
        : "seconds";
  } else if (seconds < hour) {
    value = Math.floor(seconds / minute);
    unit =
      value === 1
        ? shortFormat
          ? "m"
          : "minute"
        : shortFormat
        ? "m"
        : "minutes";
  } else if (seconds < day) {
    value = Math.floor(seconds / hour);
    unit =
      value === 1 ? (shortFormat ? "h" : "hour") : shortFormat ? "h" : "hours";
  } else if (seconds < week) {
    value = Math.floor(seconds / day);
    unit =
      value === 1 ? (shortFormat ? "d" : "day") : shortFormat ? "d" : "days";
  } else if (seconds < year) {
    value = Math.floor(seconds / week);
    unit =
      value === 1 ? (shortFormat ? "w" : "week") : shortFormat ? "w" : "weeks";
  } else {
    value = Math.floor(seconds / year);
    unit =
      value === 1 ? (shortFormat ? "y" : "year") : shortFormat ? "y" : "years";
  }

  return `${value} ${unit}`;
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

export function minutesToSeconds(minutes: number | string): number {
  return Number(minutes || 0) * 60;
}

export function generateUppercaseSlug(text: string, separator = "_"): string {
  return text.replace(/\s+/g, separator).toUpperCase();
}

export const getAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const Genders = [
  { label: "Masculin", value: "masculin" },
  { label: "Féminin", value: "féminin" },
];

// Utilitaire pour nettoyer un objet
export function buildUpdateData<T extends object>(dto: Partial<T>): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([_, v]) => v !== undefined && v !== null)
  ) as Partial<T>;
}

export function formatShortDate(date?: Date | null) {
  if (!date) return '';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}min`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}min`;
  }
};
/**
 * Formate une date au format YYYY-MM-DD pour l'API
 */
export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });