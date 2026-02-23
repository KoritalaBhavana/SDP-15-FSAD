import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mt-2">Last updated: 23 February 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">
          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">What Are Cookies</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cookies are small text files stored on your device that help us keep you signed in, remember preferences, and improve
              performance.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Types of Cookies We Use</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use essential cookies for core functionality, analytics cookies to understand usage trends, and preference cookies to
              enhance user experience.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Managing Cookies</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You can control cookies through browser settings. Disabling essential cookies may impact sign-in and booking features.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Need Help?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For cookie-related questions, reach out to hello@stayvista.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
