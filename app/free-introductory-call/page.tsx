import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Free Introductory Call | Amy Jaffe Nutrition",
  description: "Request a free, brief introductory call with Amy Jaffe to see whether nutrition counseling feels like the right fit.",
  alternates: { canonical: "/free-introductory-call/" },
  openGraph: {
    title: "Free Introductory Call | Amy Jaffe Nutrition",
    description: "Request a free, brief introductory call with Amy Jaffe to see whether nutrition counseling feels like the right fit.",
    url: "/free-introductory-call/",
    siteName: "Amy Jaffe Nutrition",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amy Jaffe Nutrition - A healthier relationship with food" }],
  },
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../images/social-linkedin.svg" },
];

export default function FreeIntroductoryCallPage() {
  return (
    <main className="assessment-page consultation-page">
      <header className="site-header">
        <a className="brand" href="../#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>Amy Jaffe</strong><small>Nutrition</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="../#about">About</a>
          <a href="../#services">Services</a>
          <a href="../testimonials/">Testimonials</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="#request">Request a call <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="../#about">About</a><a href="../#services">Services</a>
            <a href="../testimonials/">Testimonials</a>
            <a href="#request">Request a call</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="assessment-detail-hero consultation-detail-hero">
        <div className="assessment-detail-hero-content">
          <a className="assessment-back-link" href="../#contact"><span aria-hidden="true">←</span> Back to contact</a>
          <p className="eyebrow light">A free, brief introduction</p>
          <h1>A first step,<br /><em>without pressure.</em></h1>
          <p className="assessment-detail-lede">A simple conversation to share what brings you here, ask questions, and see whether working together feels like the right fit.</p>
        </div>
        <div className="consultation-detail-mark" aria-hidden="true">✦</div>
      </section>

      <section className="assessment-detail-content consultation-detail-content">
        <div className="assessment-detail-heading">
          <p className="eyebrow">What to expect</p>
          <h2>A brief, human<br /><em>conversation.</em></h2>
        </div>
        <div className="assessment-detail-copy consultation-detail-copy">
          <p>This introductory call is a welcoming place to begin. There is no pressure and no special preparation needed.</p>
          <p>We&apos;ll talk briefly about the support you&apos;re looking for, answer your initial questions, and help you decide on a comfortable next step.</p>
          <ul aria-label="Topics for your introductory call">
            <li>What brings you to nutrition counseling</li>
            <li>What working together can look like</li>
            <li>Your questions about scheduling, telehealth, and care</li>
          </ul>
        </div>
      </section>

      <section className="contact consultation-request" id="request">
        <div className="contact-intro">
          <p className="eyebrow light">Let&apos;s connect</p>
          <h2>Request your<br /><em>introductory call.</em></h2>
          <p>Share a few details and Amy will follow up with you to arrange a convenient time.</p>
          <div className="contact-details">
            <a href="tel:3055866053">305-586-6053</a>
            <a href="mailto:amysjaffe@gmail.com">amysjaffe@gmail.com</a>
            <p>In-person in South Florida<br />and via secure telehealth</p>
          </div>
        </div>
        <form className="contact-form" action="https://formsubmit.co/amysjaffe@gmail.com" method="post">
          <input type="hidden" name="_subject" value="Website inquiry - Free introductory call" />
          <input type="hidden" name="Form type" value="Free introductory call request" />
          <input type="hidden" name="_template" value="table" />
          <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
          <label>First name<input type="text" name="First name" autoComplete="given-name" required /></label>
          <label>Last name<input type="text" name="Last name" autoComplete="family-name" required /></label>
          <label className="full">Email<input type="email" name="email" autoComplete="email" required /></label>
          <label className="full">Preferred phone number<input type="tel" name="Phone" autoComplete="tel" required /></label>
          <label className="full">A short note (optional)<textarea name="Short note" rows={3} placeholder="Please keep this message general and do not include private medical details." /></label>
          <button type="submit">Request my free call <span aria-hidden="true">↗</span></button>
          <small>Please do not include private medical details in this form.</small>
        </form>
      </section>

      <SiteFooter pathPrefix="../" />
    </main>
  );
}
