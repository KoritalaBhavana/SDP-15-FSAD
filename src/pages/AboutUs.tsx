import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-card border-b border-border py-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Us
            </h1>
            <p className="text-muted-foreground mt-2">
              StayVista connects travellers with authentic homestays, local culture, and unforgettable journeys across India.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">
          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Who We Are</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are a travel platform focused on meaningful stays with local hosts. Our goal is to make travel personal,
              transparent, and rooted in real community experiences.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">What We Offer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From verified homestays to local guides, attractions, and curated dining options, we help travellers plan complete
              trips in one place.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Our Mission</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To promote responsible tourism that benefits both travellers and local communities through trust, quality, and
              authentic hospitality.
            </p>
          </section>

          <section className="card-travel p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Email: hello@stayvista.com
              <br />
              Support: 1800-123-4567 (Toll Free)
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
