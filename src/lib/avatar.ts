export const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

export const getAvatarSrc = (...sources: Array<string | null | undefined>) =>
  sources.find((value) => typeof value === "string" && value.trim().length > 0) || DEFAULT_AVATAR;
