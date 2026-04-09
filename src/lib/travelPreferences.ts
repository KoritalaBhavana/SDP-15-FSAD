import { wishlistApi } from "@/lib/api";

const wishlistStorageKey = (userId: number) => `travelnestpro:wishlist:${userId}`;
const itineraryStorageKey = (userId: number) => `travelnestpro:itinerary:${userId}`;

const readIds = (key: string): number[] => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(Number).filter((id) => Number.isFinite(id)) : [];
  } catch {
    return [];
  }
};

const writeIds = (key: string, ids: number[]) => {
  window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids))));
};

export const loadWishlistIds = async (userId: number) => {
  try {
    const entries = await wishlistApi.getByTourist(userId);
    const ids = Array.isArray(entries)
      ? entries.map((entry: { homestayId: number }) => Number(entry.homestayId)).filter((id) => Number.isFinite(id))
      : [];
    writeIds(wishlistStorageKey(userId), ids);
    return ids;
  } catch {
    return readIds(wishlistStorageKey(userId));
  }
};

export const isWishlistedLocally = (userId: number, homestayId: number) =>
  readIds(wishlistStorageKey(userId)).includes(homestayId);

export const toggleWishlist = async (userId: number, homestayId: number) => {
  const key = wishlistStorageKey(userId);
  const current = readIds(key);
  const exists = current.includes(homestayId);

  if (exists) {
    try {
      await wishlistApi.remove(userId, homestayId);
    } catch {
      // Keep local fallback behavior if backend is unavailable.
    }
    const next = current.filter((id) => id !== homestayId);
    writeIds(key, next);
    return { wishlisted: false, ids: next };
  }

  try {
    await wishlistApi.add(userId, homestayId);
  } catch {
    // Keep local fallback behavior if backend is unavailable.
  }
  const next = [...current, homestayId];
  writeIds(key, next);
  return { wishlisted: true, ids: next };
};

export const loadSavedItineraryIds = (userId: number) => readIds(itineraryStorageKey(userId));

export const toggleSavedAttraction = (userId: number, attractionId: number) => {
  const key = itineraryStorageKey(userId);
  const current = readIds(key);
  const exists = current.includes(attractionId);
  const next = exists ? current.filter((id) => id !== attractionId) : [...current, attractionId];
  writeIds(key, next);
  return { saved: !exists, ids: next };
};
