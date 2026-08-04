import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Introductory Call | Amy Jaffe Nutrition",
  description: "Request a free, brief introductory call with Amy Jaffe to see whether nutrition counseling feels like the right fit.",
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
          <input type="hidden" name="_url" value="https://jessejaffe.github.io/AmyJaffeNutrition/free-introductory-call/" />
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

      <footer>
        <div className="footer-grid">
          <a className="footer-brand" href="../#home"><img src="../images/amy-jaffe-logo.avif" alt="Amy Jaffe Nutrition" /></a>
          <section className="footer-location" aria-labelledby="consultation-footer-location-title">
            <h2 id="consultation-footer-location-title">Location</h2>
            <div className="footer-map">
              <iframe src="https://www.google.com/maps?q=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181&amp;output=embed" title="Map of Amy Jaffe Nutrition in Miami" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a className="footer-address" href="https://www.google.com/maps/dir/?api=1&amp;destination=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181" target="_blank" rel="noreferrer" aria-label="Get directions to Amy Jaffe Nutrition">
              <address>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</address><span aria-hidden="true">↗</span>
            </a>
          </section>
          <div className="footer-summary">
            <p>Serving South Florida and telehealth clients with compassionate, expert nutrition care.</p>
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
