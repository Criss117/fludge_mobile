import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function firstLetterToUpperCase(...str: string[]) {
  return str.map((s) => s.slice(0, 1).toUpperCase());
}

export function spliText(str: string, maxLength = 10) {
  if (str.length <= maxLength) return str;

  return `${str.slice(0, maxLength)}...`;
}
