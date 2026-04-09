import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Building2, CheckCircle, CreditCard, Shield, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHomestays } from "@/hooks/useHomestays";
import { useAuth } from "@/contexts/AuthContext";
import { CARD_EXPIRY_REGEX, CVV_REGEX, UPI_REGEX, isBlank } from "@/lib/validation";
import { bookingsApi } from "@/lib/api";
import { clearBookingDraft, readBookingDraft } from "@/lib/bookingSession";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Building2 },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

export default function PaymentV2() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const homestays = useHomestays();
  const homestay = homestays.find((entry) => entry.id === id) || homestays[0];
  const amount = Number(searchParams.get("amount")) || homestay?.price || 0;
  const nights = Number(searchParams.get("nights")) || 0;
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const draft = useMemo(() => readBookingDraft(), []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth?mode=signin", { replace: true });
      return;
    }
    if (!draft || !user?.id || draft.touristId !== Number(user.id)) {
      toast.error("Your booking session expired. Please review your booking again.");
      navigate(`/booking/${id}`, { replace: true });
    }
  }, [draft, id, isLoggedIn, navigate, user?.id]);

  if (!homestay || !draft) {
    return null;
  }

  const validatePayment = () => {
    const nextErrors: Record<string, string> = {};
    if (method === "card") {
      if (isBlank(cardName)) nextErrors.cardName = "Name on card is required.";
      if (cardNum.replace(/\s/g, "").length !== 16) nextErrors.cardNum = "Enter a valid 16-digit card number.";
      if (!CARD_EXPIRY_REGEX.test(cardExpiry.trim())) nextErrors.cardExpiry = "Use MM / YY format.";
      if (!CVV_REGEX.test(cardCvv.trim())) nextErrors.cardCvv = "Enter a valid 3-digit CVV.";
    }
    if (method === "upi" && !UPI_REGEX.test(upiId.trim())) nextErrors.upiId = "Enter a valid UPI ID.";
    if ((method === "netbanking" || method === "wallet") && !selectedProvider) {
      nextErrors.provider = `Please select a ${method === "netbanking" ? "bank" : "wallet"} provider.`;
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePay = async () => {
    if (!validatePayment()) {
      toast.error("Please fix the highlighted payment fields.");
      return;
    }

    setLoading(true);
    try {
      const createdBooking = await bookingsApi.create({
        homestayId: draft.homestayId,
        touristId: draft.touristId,
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        guests: draft.guests,
        specialRequests: draft.specialRequests,
      });
      setBookingReference(`SV${String(createdBooking?.id || Date.now()).padStart(8, "0")}`);
      clearBookingDraft();
      setSuccess(true);
      toast.success("Payment successful and booking created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment succeeded locally but booking creation failed.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Booking Confirmed
          </h1>
          <p className="text-muted-foreground mb-2">{homestay.name}</p>
          <p className="text-muted-foreground text-sm mb-6">{draft.checkIn} to {draft.checkOut} · {nights} nights</p>
          <div className="bg-muted/50 rounded-2xl p-5 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-bold text-foreground">{bookingReference}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount Paid</span><span className="font-bold text-primary">Rs.{amount.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment Method</span><span className="text-foreground capitalize">{method}</span></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/tourist-dashboard?tab=bookings")} className="btn-primary flex-1">View My Bookings</button>
            <button onClick={() => window.print()} className="btn-outline-primary flex-1">Download Invoice</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Complete Payment
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="card-travel p-5">
                <h3 className="font-bold text-foreground mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {PAYMENT_METHODS.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => {
                        setMethod(entry.id);
                        setFieldErrors({});
                      }}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        method === entry.id ? "border-primary bg-primary/8 text-primary" : "border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      <entry.icon className="h-4 w-4" /> {entry.label}
                    </button>
                  ))}
                </div>

                {method === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Card Number</label>
                      <input className="input-search w-full font-mono" placeholder="1234 5678 9012 3456" maxLength={19} value={cardNum} onChange={(e) => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} />
                      {fieldErrors.cardNum && <p className="mt-1 text-xs text-destructive">{fieldErrors.cardNum}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Expiry</label>
                        <input className="input-search w-full" placeholder="MM / YY" value={cardExpiry} maxLength={7} onChange={(e) => setCardExpiry(e.target.value)} />
                        {fieldErrors.cardExpiry && <p className="mt-1 text-xs text-destructive">{fieldErrors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">CVV</label>
                        <input className="input-search w-full" placeholder="123" maxLength={3} type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} />
                        {fieldErrors.cardCvv && <p className="mt-1 text-xs text-destructive">{fieldErrors.cardCvv}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Name on Card</label>
                      <input className="input-search w-full" placeholder="As on card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                      {fieldErrors.cardName && <p className="mt-1 text-xs text-destructive">{fieldErrors.cardName}</p>}
                    </div>
                  </div>
                )}

                {method === "upi" && (
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">UPI ID</label>
                    <input className="input-search w-full" placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                    {fieldErrors.upiId && <p className="mt-1 text-xs text-destructive">{fieldErrors.upiId}</p>}
                  </div>
                )}

                {(method === "netbanking" || method === "wallet") && (
                  <div className="grid grid-cols-3 gap-2">
                    {(method === "netbanking" ? ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"] : ["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"]).map((opt) => (
                      <button key={opt} type="button" onClick={() => setSelectedProvider(opt)} className={`p-3 border rounded-xl text-sm transition-colors text-foreground font-medium ${selectedProvider === opt ? "border-primary bg-primary/8 text-primary" : "border-border hover:border-primary/50 hover:bg-primary/5"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {fieldErrors.provider && <p className="mt-2 text-xs text-destructive">{fieldErrors.provider}</p>}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-secondary flex-shrink-0" />
                <span>Your payment is secured with 256-bit SSL encryption. We never store your card details.</span>
              </div>

              <button onClick={handlePay} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-60">
                {loading ? "Processing Payment..." : `Pay Rs.${amount.toLocaleString()} Securely`}
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="card-travel p-5 sticky top-24">
                <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
                <img src={homestay.image} alt={homestay.name} className="w-full h-36 object-cover rounded-xl mb-4" />
                <h4 className="font-bold text-foreground">{homestay.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{homestay.location} · {nights} nights</p>
                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between text-foreground"><span>Guest</span><span>{draft.guestName}</span></div>
                  <div className="flex justify-between text-foreground"><span>Stay dates</span><span>{draft.checkIn} to {draft.checkOut}</span></div>
                  <div className="flex justify-between font-bold text-foreground text-base border-t border-border pt-2">
                    <span>Total</span>
                    <span className="text-primary">Rs.{amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
