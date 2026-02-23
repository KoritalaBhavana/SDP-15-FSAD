import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mt-2">Last updated: 23 February 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">
          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Information We Collect</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We collect account information you provide, including name, email, phone number, profile image, booking preferences,
              and communication details needed to provide homestay, guide, and dining services.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">How We Use Your Data</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your data is used to create and manage accounts, process bookings, improve service quality, personalize recommendations,
              provide customer support, and send important updates about your trips or account.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Data Sharing</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We only share necessary details with verified hosts, guides, payment providers, and support partners to complete your
              booking and provide requested services. We do not sell personal information.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Choices</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You may review and update your profile details from your dashboard. For deletion or privacy requests, contact
              hello@stayvista.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
