import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Introductory Call | Amy Jaffe Nutrition",
  description: "Request a free introductory call with Amy Jaffe Nutrition.",
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../images/social-linkedin.svg" },
];

export default function FreeIntroductoryCallPage() {
  return (
    <main className="intro-call-page">
      <header className="site-header">
        <a className="brand" href="../#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>Amy Jaffe</strong><small>Nutrition</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="../#about">About</a>
          <a href="../#services">Services</a>
          <a href="../testimonials/">Testimonials</a>
          <a href="../#resources">Resources</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="#introductory-call-form">Let&apos;s talk <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="../#about">About</a><a href="../#services">Services</a>
            <a href="../testimonials/">Testimonials</a><a href="../#resources">Resources</a>
            <a href="#introductory-call-form">Contact</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="intro-call-hero">
        <div>
          <a className="assessment-back-link" href="../#services"><span aria-hidden="true">←</span> Back to services</a>
          <p className="eyebrow light">A simple first step</p>
          <h1>Free introductory<br /><em>call.</em></h1>
          <p>Bring your general questions about working together. We&apos;ll talk briefly about what you&apos;re looking for and whether Amy&apos;s approach feels like the right fit.</p>
        </div>
      </section>

      <section className="intro-call-form-section" id="introductory-call-form" aria-labelledby="intro-call-form-title">
        <div className="intro-call-form-intro">
          <p className="eyebrow">Request your call</p>
          <h2 id="intro-call-form-title">Let&apos;s find a time<br /><em>to connect.</em></h2>
          <p>Please share the best way to reach you. This form is for general scheduling questions only.</p>
        </div>

        <form className="contact-form intro-call-form" action="https://formsubmit.co/amysjaffe@gmail.com" method="post">
          <input type="hidden" name="_subject" value="Website inquiry - Free introductory call" />
          <input type="hidden" name="Form type" value="Free introductory call request" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_url" value="https://jessejaffe.github.io/AmyJaffeNutrition/free-introductory-call/" />
          <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
          <label>First name<input type="text" name="First name" autoComplete="given-name" required /></label>
          <label>Last name<input type="text" name="Last name" autoComplete="family-name" required /></label>
          <label className="full">Email<input type="email" name="email" autoComplete="email" required /></label>
          <label className="full">Phone<input type="tel" name="Phone" autoComplete="tel" required /></label>
          <label className="full">A short note (optional)<textarea name="Short note" rows={3} placeholder="Please keep this message general and do not include private medical details." /></label>
          <button type="submit">Request free introductory call <span aria-hidden="true">↗</span></button>
          <small>Please do not include private medical details in this form.</small>
        </form>
      </section>

      <footer>
        <div className="footer-grid">
          <a className="footer-brand" href="../#home"><img src="../images/amy-jaffe-logo.avif" alt="Amy Jaffe Nutrition" /></a>
          <section className="footer-location" aria-labelledby="intro-call-footer-location-title">
            <h2 id="intro-call-footer-location-title">Location</h2>
            <div className="footer-map">
              <iframe src="https://www.google.com/maps?q=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181&amp;output=embed" title="Map of Amy Jaffe Nutrition in Miami" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a className="footer-address" href="https://www.google.com/maps/dir/?api=1&amp;destination=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181" target="_blank" rel="noreferrer" aria-label="Get directions to Amy Jaffe Nutrition">
              <address>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</address><span aria-hidden="true">↗</span>
            </a>
          </section>
          <div className="footer-summary">
            <p>Serving Miami and telehealth clients with compassionate, non-diet nutrition care.</p>
            <div className="social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </div>
        </div>
        <small className="footer-copyright">© {new Date().getFullYear()} Amy Jaffe Nutrition</small>
      </footer>
    </main>
  );
}
