import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shadow1 = "shadow-[0_1px_5px_rgb(0,0,0,0.1)] border border-red-50"
export const shadow2 = "shadow-[inset_-2px_-2px_18px_#46464620]"