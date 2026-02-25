import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { chefs } from "@/lib/mockData";
import { Calendar, ChefHat, Clock, Settings, Star, TrendingUp, User } from "lucide-react";
import { toast } from "sonner";

export default function ChefDashboard() {
  const { user, updateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [chefName, setChefName] = useState(user?.name || chefs[0].name);
  const [chefEmail, setChefEmail] = useState(user?.email || "");
  const [chefAvatar, setChefAvatar] = useState(user?.avatar || chefs[0].image);

  const [chefBookings, setChefBookings] = useState([
    { id: "cb1", guest: "Riya Sharma", homestay: "Mountain Dew Cottage", date: "Feb 28, 2026", meal: "Dinner", status: "Pending" as "Pending" | "Confirmed" | "Rejected", amount: 1800 },
    { id: "cb2", guest: "Arjun Menon", homestay: "Kerala Heritage Home", date: "Mar 02, 2026", meal: "Lunch", status: "Confirmed" as "Pending" | "Confirmed" | "Rejected", amount: 1500 },
  ]);

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    const allowedTabs = new Set(["overview", "bookings", "profile"]);

    if (tab && allowedTabs.has(tab)) {
      setActiveTab(tab);
      return;
    }

    setActiveTab("overview");
  }, [location.search]);

  const handleTabChange = (tabId: string) => {
    const allowedTabs = new Set(["overview", "bookings", "profile"]);
    if (!allowedTabs.has(tabId)) {
      return;
    }

    setActiveTab(tabId);

    const params = new URLSearchParams(location.search);
    params.set("tab", tabId);
    params.delete("t");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    setChefName(user?.name || chefs[0].name);
    setChefEmail(user?.email || "");
    setChefAvatar(user?.avatar || chefs[0].image);
  }, [user]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setChefAvatar(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    updateProfile({ name: chefName.trim(), email: chefEmail.trim(), avatar: chefAvatar });
    toast.success("Chef profile updated.");
  };

  const handleBookingStatus = (bookingId: string, status: "Confirmed" | "Rejected") => {
    setChefBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)));
    toast.success(status === "Confirmed" ? "Booking request accepted." : "Booking request rejected.");
  };

  const pendingBookings = chefBookings.filter((booking) => booking.status === "Pending").length;
  const confirmedBookings = chefBookings.filter((booking) => booking.status === "Confirmed").length;
  const monthlyEarnings = chefBookings.filter((booking) => booking.status === "Confirmed").reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <img src={chefAvatar || "https://i.pravatar.cc/150"} alt={chefName} className="w-12 h-12 rounded-2xl object-cover border-2 border-primary/30" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Chef Dashboard 👨‍🍳</h1>
                <p className="text-muted-foreground text-sm">Manage your meal bookings and profile</p>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-border">
              {[
                { id: "overview", label: "Overview" },
                { id: "bookings", label: "Bookings" },
                { id: "profile", label: "Profile" },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button type="button" onClick={() => handleTabChange("bookings")} className="card-travel p-4 text-left w-full">
                  <div className="flex items-center justify-between">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{pendingBookings}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Pending Requests</p>
                </button>
                <button type="button" onClick={() => handleTabChange("bookings")} className="card-travel p-4 text-left w-full">
                  <div className="flex items-center justify-between">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{confirmedBookings}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Confirmed Bookings</p>
                </button>
                <button type="button" onClick={() => handleTabChange("bookings")} className="card-travel p-4 text-left w-full">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">₹{monthlyEarnings.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Current Earnings</p>
                </button>
              </div>

              <div className="card-travel p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Your Chef Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" /> Available for breakfast, lunch, and dinner</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Star className="h-4 w-4 text-accent" /> 4.8 average guest rating</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Meal Booking Requests</h2>
              <div className="space-y-3">
                {chefBookings.map((booking) => (
                  <div key={booking.id} className="card-travel p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{booking.guest} • {booking.meal}</p>
                      <p className="text-xs text-muted-foreground">{booking.homestay} • {booking.date}</p>
                      <p className="text-xs text-primary font-semibold mt-1">₹{booking.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : booking.status === "Rejected" ? "bg-red-100 text-destructive" : "bg-yellow-100 text-yellow-700"}`}>
                        {booking.status}
                      </span>
                      {booking.status === "Pending" && (
                        <div className="flex gap-2 mt-2 justify-end">
                          <button onClick={() => handleBookingStatus(booking.id, "Confirmed")} className="btn-outline-primary text-xs py-1.5 px-2">Accept</button>
                          <button onClick={() => handleBookingStatus(booking.id, "Rejected")} className="btn-outline-primary text-xs py-1.5 px-2">Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Profile Settings</h2>
              <div className="card-travel p-6 max-w-xl">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={chefAvatar || "https://i.pravatar.cc/150"}
                    alt="Chef"
                    className="w-16 h-16 rounded-2xl object-cover border border-border"
                  />
                  <label className="btn-outline-primary text-sm py-1.5 px-3 cursor-pointer">
                    Change Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                  </label>
                </div>
                <div className="space-y-3">
                  <input value={chefName} onChange={(e) => setChefName(e.target.value)} className="input-search w-full" placeholder="Name" />
                  <input value={chefEmail} onChange={(e) => setChefEmail(e.target.value)} className="input-search w-full" placeholder="Email" />
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleSaveProfile} className="btn-primary text-sm py-1.5 flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
