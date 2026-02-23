import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Terms of Service
            </h1>
            <p className="text-muted-foreground mt-2">Last updated: 23 February 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">
          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Account Responsibility</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Users must provide accurate profile details and keep account credentials secure. You are responsible for activity under
              your account.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Bookings and Payments</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Booking confirmations depend on host availability and successful payment. Cancellation or refund rules may vary based on
              the selected listing and booking timeline.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Platform Conduct</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Harassment, fraud, and misuse of platform services are prohibited. We may suspend or terminate accounts that violate
              community or legal standards.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Support and Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For disputes, support, or policy clarifications, contact hello@stayvista.com or call 1800-123-4567.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
