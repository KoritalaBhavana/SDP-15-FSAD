export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[0-9+\-\s]{10,15}$/;
export const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
export const CARD_EXPIRY_REGEX = /^\d{2}\s?\/\s?\d{2}$/;
export const CVV_REGEX = /^\d{3}$/;

export const isBlank = (value: string | undefined | null) => !value || !value.trim();
