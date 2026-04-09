import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { Calendar, CheckCircle, ChevronLeft, CreditCard, MapPin, Shield, Star, Users } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useHomestays } from "@/hooks/useHomestays";
import { EMAIL_REGEX, PHONE_REGEX, isBlank } from "@/lib/validation";
import { saveBookingDraft } from "@/lib/bookingSession";

export default function BookingV2() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const homestays = useHomestays();
  const homestay = homestays.find((entry) => entry.id === id) || homestays[0];
  const checkIn = searchParams.get("checkin") || "";
  const checkOut = searchParams.get("checkout") || "";
  const guests = Number(searchParams.get("guests")) || 2;
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth?mode=signin", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user) {
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" "));
      setEmail(user.email);
    }
  }, [user]);

  const { nights, subtotal, taxes, finalTotal } = useMemo(() => {
    const checkInDate = checkIn ? new Date(checkIn) : null;
    const checkOutDate = checkOut ? new Date(checkOut) : null;
    const valid = !!checkInDate && !!checkOutDate && checkOutDate.getTime() > checkInDate.getTime();
    const totalNights = valid ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const amount = totalNights * (homestay?.price || 0);
    const gst = Math.round(amount * 0.12);
    const serviceFee = Math.round(amount * 0.05);
    return {
      nights: totalNights,
      subtotal: amount,
      taxes: gst,
      finalTotal: amount + gst + serviceFee + 200,
    };
  }, [checkIn, checkOut, homestay?.price]);

  if (!homestay) {
    return null;
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    if (!checkIn || !checkOut || nights <= 0) nextErrors.dates = "Select a valid check-in and check-out date.";
    if (isBlank(firstName)) nextErrors.firstName = "First name is required.";
    if (isBlank(lastName)) nextErrors.lastName = "Last name is required.";
    if (isBlank(email)) nextErrors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (isBlank(phone)) nextErrors.phone = "Phone number is required.";
    else if (!PHONE_REGEX.test(phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (!agreeToTerms) nextErrors.terms = "You must accept the terms to continue.";
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted booking fields.");
      return;
    }

    saveBookingDraft({
      homestayId: Number(id),
      touristId: Number(user?.id || 0),
      checkIn,
      checkOut,
      guests,
      specialRequests: specialRequests.trim(),
      guestName: `${firstName.trim()} ${lastName.trim()}`.trim(),
      guestEmail: email.trim(),
      guestPhone: phone.trim(),
      totalAmount: finalTotal,
    });

    navigate(`/payment/${id}?amount=${finalTotal}&nights=${nights}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <Link to={`/homestay/${id}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back to property
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Confirm your Booking
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="card-travel p-5 flex gap-4">
                <img src={homestay.image} alt={homestay.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{homestay.category}</p>
                  <h2 className="font-bold text-foreground">{homestay.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {homestay.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-sm font-semibold text-foreground">{homestay.rating}</span>
                    <span className="text-xs text-muted-foreground">({homestay.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="card-travel p-5">
                <h3 className="font-bold text-foreground mb-4">Trip Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase">Check In</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">{checkIn || "Not selected"}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase">Check Out</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">{checkOut || "Not selected"}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase">Guests</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">{guests} guests</p>
                  </div>
                </div>
                {fieldErrors.dates && <p className="mt-3 text-xs text-destructive">{fieldErrors.dates}</p>}
              </div>

              <div className="card-travel p-5">
                <h3 className="font-bold text-foreground mb-4">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-search w-full" placeholder="Your first name" />
                    {fieldErrors.firstName && <p className="mt-1 text-xs text-destructive">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-search w-full" placeholder="Your last name" />
                    {fieldErrors.lastName && <p className="mt-1 text-xs text-destructive">{fieldErrors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-search w-full" placeholder="your@email.com" />
                    {fieldErrors.email && <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-search w-full" placeholder="+91 98765 43210" />
                    {fieldErrors.phone && <p className="mt-1 text-xs text-destructive">{fieldErrors.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="card-travel p-5">
                <h3 className="font-bold text-foreground mb-2">Special Requests</h3>
                <p className="text-sm text-muted-foreground mb-3">Let your host know about any special needs or requests</p>
                <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="input-search w-full h-24 resize-none" placeholder="Early check-in, vegetarian food, baby cot required..." />
              </div>

              <div className="card-travel p-5 border-l-4 border-l-secondary">
                <h3 className="font-bold text-foreground mb-2">Cancellation Policy</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" /> Free cancellation up to 48 hours before check-in</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" /> 50% refund for cancellation within 48 hours</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" /> No refund for same-day cancellation</div>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="w-4 h-4 mt-0.5 accent-primary" />
                <span className="text-sm text-muted-foreground">I agree to the terms and privacy policy. I confirm my stay details are correct.</span>
              </label>
              {fieldErrors.terms && <p className="text-xs text-destructive">{fieldErrors.terms}</p>}

              <button onClick={handleProceedToPayment} className="btn-primary w-full flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Proceed to Payment · Rs.{finalTotal.toLocaleString()}
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="card-travel p-6 sticky top-24">
                <h3 className="font-bold text-foreground mb-5">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-foreground">
                    <span>Rs.{homestay.price.toLocaleString()} × {nights} nights</span>
                    <span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground"><span>Cleaning fee</span><span>Rs.200</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>StayVista service fee</span><span>Rs.{Math.round(subtotal * 0.05).toLocaleString()}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>GST (12%)</span><span>Rs.{taxes.toLocaleString()}</span></div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                    <span>Total</span>
                    <span className="text-primary">Rs.{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-5 p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-secondary" />
                    <span>Your payment is protected by our secure booking guarantee</span>
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
