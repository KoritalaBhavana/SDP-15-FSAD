import { Link, useNavigate } from "react-router-dom";
import { Home, Mail, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Footer() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const navigateTo = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest";

  const openTouristLogin = () => {
    if (!isLoggedIn) {
      navigateTo("/auth?role=tourist");
      return;
    }

    if (user?.role === "tourist") {
      toast.success("You are already logged in as Tourist.");
      navigateTo(`/tourist-dashboard?tab=discover&t=${Date.now()}`);
      return;
    }

    toast.error(`You are logged in as ${roleLabel}. Please sign in as Tourist.`);
  };

  const openHostSignup = () => {
    if (!isLoggedIn) {
      toast.success("Create a Host account to list your property.");
      navigateTo("/auth?mode=signup&role=host");
      return;
    }

    if (user?.role === "host") {
      navigateTo(`/host-dashboard?tab=overview&t=${Date.now()}`);
      return;
    }

    toast.error(`You are ${roleLabel}. Please sign up as Homestay Host to list your property.`);
  };

  const openGuideSignup = () => {
    if (!isLoggedIn) {
      toast.success("Sign up as Guide to start offering local experiences.");
      navigateTo("/auth?mode=signup&role=guide");
      return;
    }

    if (user?.role === "guide") {
      navigateTo(`/guide-dashboard?tab=overview&t=${Date.now()}`);
      return;
    }

    toast.error(`You are ${roleLabel}. Please sign up as Guide to continue.`);
  };

  const openChefSignup = () => {
    if (!isLoggedIn) {
      toast.success("Sign up as Chef to start receiving cooking requests.");
      navigateTo("/auth?mode=signup&role=chef");
      return;
    }

    if (user?.role === "chef") {
      navigateTo(`/chef-dashboard?tab=overview&t=${Date.now()}`);
      return;
    }

    toast.error(`You are ${roleLabel}. Please sign up as Chef to continue.`);
  };

  const openTravelBlog = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in as Tourist to write a travel blog.");
      navigateTo("/auth?role=tourist");
      return;
    }

    if (user?.role !== "tourist") {
      toast.error(`You are ${roleLabel}. Travel blogs are available for Tourist accounts.`);
      return;
    }

    navigateTo(`/tourist-dashboard?tab=history&t=${Date.now()}`);
  };

  const openGiftCards = () => {
    toast.success("Gift cards support is available via support team. Call 1800-123-4567.");
    scrollToTop();
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-warm rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Stay<span className="text-accent">Vista</span>
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              Connecting travellers with authentic homestay experiences across India. Discover local life, hidden gems, and real hospitality.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-background/60 mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: "Homestays", path: "/homestays" },
                { label: "Tourist Attractions", path: "/attractions" },
                { label: "Dining & Chefs", path: "/dining" },
                { label: "Local Guides", path: "/guides" },
                { label: "Special Offers", path: "/homestays" },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => navigateTo(item.path)} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For You */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-background/60 mb-4">For You</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={openTouristLogin} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  Tourist Login
                </button>
              </li>
              <li>
                <button onClick={openHostSignup} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  List Your Property
                </button>
              </li>
              <li>
                <button onClick={openGuideSignup} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  Become a Guide
                </button>
              </li>
              <li>
                <button onClick={openChefSignup} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  Become a Chef
                </button>
              </li>
              <li>
                <button onClick={openTravelBlog} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  Travel Blog
                </button>
              </li>
              <li>
                <button onClick={openGiftCards} className="text-sm text-background/80 hover:text-accent transition-colors text-left">
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-background/60 mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@stayvista.com" className="flex items-center gap-2 text-sm text-background/80 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" /> hello@stayvista.com
              </a>
              <a href="tel:+911800123456" className="flex items-center gap-2 text-sm text-background/80 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" /> 1800-123-4567 (Toll Free)
              </a>
            </div>
            <div className="mt-4 p-3 bg-background/10 rounded-xl">
              <p className="text-xs text-background/60 font-medium mb-1">24/7 Support</p>
              <p className="text-xs text-background/80">Available in Hindi, English & 8 regional languages</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">© 2025 StayVista. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" onClick={scrollToTop} className="text-xs text-background/50 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={scrollToTop} className="text-xs text-background/50 hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" onClick={scrollToTop} className="text-xs text-background/50 hover:text-accent transition-colors">Cookie Policy</Link>
            <Link to="/about-us" onClick={scrollToTop} className="text-xs text-background/50 hover:text-accent transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
