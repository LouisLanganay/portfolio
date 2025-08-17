import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans a slug by removing leading slashes to avoid double slashes in URLs
 * @param slug - The slug to clean
 * @returns The cleaned slug without leading slashes
 */
export function cleanSlug(slug: string | undefined): string {
  if (!slug) return '';
  return slug.startsWith('/') ? slug.slice(1) : slug;
}
