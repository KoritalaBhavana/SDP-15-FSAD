export interface BookingCheckoutDraft {
  homestayId: number;
  touristId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  totalAmount: number;
}

const STORAGE_KEY = "travelnest_booking_checkout_draft";

export const saveBookingDraft = (draft: BookingCheckoutDraft) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const readBookingDraft = (): BookingCheckoutDraft | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as BookingCheckoutDraft;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
