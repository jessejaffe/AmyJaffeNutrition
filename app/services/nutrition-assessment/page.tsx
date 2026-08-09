import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Nutrition Assessment | Amy Jaffe Nutrition",
  description: "What to expect during a 90-minute initial nutrition assessment with Amy Jaffe.",
  alternates: { canonical: "/services/nutrition-assessment/" },
  openGraph: {
    title: "Nutrition Assessment | Amy Jaffe Nutrition",
    description: "What to expect during a 90-minute initial nutrition assessment with Amy Jaffe.",
    url: "/services/nutrition-assessment/",
    siteName: "Amy Jaffe Nutrition",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amy Jaffe Nutrition - A healthier relationship with food" }],
  },
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../../images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../../images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../../images/social-linkedin.svg" },
];

export default function NutritionAssessmentPage() {
  return (
    <main className="assessment-page">
      <header className="site-header">
        <a className="brand" href="../../#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>Amy Jaffe</strong><small>Nutrition</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="../../#about">About</a>
          <a href="../../#services" aria-current="page">Services</a>
          <a href="../../testimonials/">Testimonials</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="../../#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="../../#about">About</a><a href="../../#services" aria-current="page">Services</a>
            <a href="../../testimonials/">Testimonials</a>
            <a href="../../#contact">Contact</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="assessment-detail-hero">
        <div className="assessment-detail-hero-content">
          <a className="assessment-back-link" href="../../#services"><span aria-hidden="true">←</span> Back to services</a>
          <p className="eyebrow light">Initial session · 90 minutes</p>
          <h1>Nutrition<br /><em>assessment.</em></h1>
          <p className="assessment-detail-lede">A thoughtful place to begin, centered on your history, your experiences, and the goals we create together.</p>
        </div>
        <div className="assessment-detail-number" aria-hidden="true">01</div>
      </section>

      <section className="assessment-detail-content">
        <div className="assessment-detail-heading">
          <p className="eyebrow">What to expect</p>
          <h2>A complete picture,<br /><em>not just numbers.</em></h2>
        </div>
        <div className="assessment-detail-copy">
          <p>The assessment includes a detailed medical history, prior eating patterns, weight issues, physical activity, food and body challenges.</p>
          <p className="assessment-review-copy">We also review current food practices, determine the degree of interoceptive senses (internal cues of hunger and fullness), distribution of food throughout a normal day and an overview of nutrition education as it pertains to normal nutrition principles, physiological changes in metabolism and blood sugar, intuitive eating framework, physical/emotional hunger and fullness and body image.</p>
          <p>Goals are jointly determined and you&apos;ll leave the initial session with a concrete plan of action that is evaluated in follow-up sessions.</p>

          <aside className="assessment-resource-card">
            <p className="eyebrow">Between sessions</p>
            <h3>Simple tools to help you stay connected.</h3>
            <p>Often my clients will keep electronic food logs using the free apps, Recovery Record or Nourishly, as a way to stay connected between sessions, increase awareness of food behaviors and promote accountability.</p>
            <div className="assessment-resource-links">
              <a href="https://www.recoveryrecord.com/" target="_blank" rel="noreferrer">Recovery Record <span aria-hidden="true">↗</span></a>
              <a href="https://www.nourishly.com/" target="_blank" rel="noreferrer">Nourishly <span aria-hidden="true">↗</span></a>
            </div>
          </aside>
        </div>
      </section>

      <section className="assessment-detail-cta">
        <p className="eyebrow light">Ready to begin?</p>
        <h2>Let&apos;s create your<br /><em>next steps together.</em></h2>
        <a className="button button-cream" href="../../free-introductory-call/">Sign up for a free introductory call <span aria-hidden="true">↗</span></a>
      </section>

      <SiteFooter pathPrefix="../../" />
    </main>
  );
}
